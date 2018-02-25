 #  _____                         _ _
 # |  __ \                       | (_)
 # | |__) |___ _ __ ___   ___  __| |_
 # |  _  // _ \ '_ ` _ \ / _ \/ _` | |
 # | | \ \  __/ | | | | |  __/ (_| | |
 # |_|  \_\___|_| |_| |_|\___|\__,_|_|

# Azure Vision API Key 1: 8ce845a5fcb44327aeed5dbd0debc2c0
# Azure Vision API Key 2: 3e8a6f7e78694f9787c7cae8c760f0ec

# Using 'https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts/python'
# Image URL is located at: "https://i.imgur.com/MhOJquU.jpg"

import requests
import json
import math
import collections
import medical_api

def myround(x, base=10):
    return int(base * round(float(x)/base))

def machine_vision_stuff(image_url):
    subscription_key = "8ce845a5fcb44327aeed5dbd0debc2c0"
    vision_base_url = "https://southcentralus.api.cognitive.microsoft.com/vision/v1.0/"
    ocr_url = vision_base_url + "ocr"

    headers  = {'Ocp-Apim-Subscription-Key': subscription_key}
    params   = {'language': 'unk', 'detectOrientation ': 'true'}
    data     = {'url': image_url}
    response = requests.post(ocr_url, headers=headers, params=params, json=data)
    response.raise_for_status()

    analysis = response.json()

    # Create a dictionary to hold the operation code, cost, and combined
    cost_dict = {}
    code_dict = {}
    # operations_dict format is y_axis:[code(0),orig_cost(1),uninsured_cost_est(2),insured_cost_est(3),short_desc(4),long_desc(5),CPT_code(6)]
    operations_dict = collections.defaultdict(lambda: [0,0,0,0,0,0,0])

    # Parse through the JSON looking for the code and cost columns
    for region in analysis['regions']:
        for line in region['lines']:
            for word in line['words']:
                if word['text'] == 'CODE':
                    boundingBox = word['boundingBox']
                    CODE_x_axis = int(boundingBox.split(',')[0])-10
                    CODE_y_axis = int(boundingBox.split(',')[1])
                elif word['text'] == 'AMOUNT':
                    boundingBox = word['boundingBox']
                    COST_x_axis = int(boundingBox.split(',')[0])
                    COST_y_axis = int(boundingBox.split(',')[1])


    # Parse through the JSON again looking for elements in the code and cost columns, adding them both to the operations_dict
    for region in analysis['regions']:
        for line in region['lines']:
            for word in line['words']:
                boundingBox = word['boundingBox']
                x_axis = int(boundingBox.split(',')[0])
                y_axis = int(boundingBox.split(',')[1])
                # Check if element in the code column
                if math.isclose(x_axis, CODE_x_axis, abs_tol=20) and y_axis > CODE_y_axis:
                    code_dict[y_axis] = word['text']
                # Check if element in the cost column
                elif math.isclose(x_axis, COST_x_axis, abs_tol=20) and y_axis > COST_y_axis:
                    cost_dict[y_axis] = word['text']

    # Combine the code dict and the cost dict
    for key, code in code_dict.items():
        operations_dict[key][0] = code
    for key,cost in cost_dict.items():
        for fuzziness in range(5):
            if (key + fuzziness) in operations_dict:
                operations_dict[key + fuzziness][1] = cost
                break
            elif (key - fuzziness) in operations_dict:
                operations_dict[key - fuzziness][1] = cost
                break

    # Using the provided hardcoded dicts, populate the rest of the data
    for key,value in operations_dict.items():
        operations_dict[key][2] = medical_api.operation_price[value[0]][0]            # Uninsured cost estimate
        operations_dict[key][3] = medical_api.operation_price[value[0]][1]            # Insured cost estimate
        operations_dict[key][4] = medical_api.operation_short_description[value[0]]   # Short description
        operations_dict[key][5] = medical_api.operation_long_description[value[0]]    # Long description
        operations_dict[key][6] = medical_api.operation_CPT_code[value[0]]            # Relevant CPT code

    return operations_dict

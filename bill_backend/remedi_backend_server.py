 #  _____                         _ _
 # |  __ \                       | (_)
 # | |__) |___ _ __ ___   ___  __| |_
 # |  _  // _ \ '_ ` _ \ / _ \/ _` | |
 # | | \ \  __/ | | | | |  __/ (_| | |
 # |_|  \_\___|_| |_| |_|\___|\__,_|_|

from http.server import BaseHTTPRequestHandler, HTTPServer
from remedi_backend_processor import machine_vision_stuff
import json

operations_JSON = ""

# HTTPRequestHandler class
class remediHTTPServer_RequestHandler(BaseHTTPRequestHandler):

    # Define do_GET to handle transmission of processed data
    def do_GET(self):
        # Send response status code
        self.send_response(200)

        # Send headers
        self.send_header('Content-type','application/json')
        self.end_headers()

        # Send message back to client
        message = operations_JSON
        # Write content as utf-8 data
        self.wfile.write(bytes(message, "utf8"))
        return

        # POST
    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length).decode('UTF-8') # <--- Gets the data itself
        print(post_data)
        global operations_JSON
        operations_JSON = json.dumps(machine_vision_stuff(post_data))
        self.send_response(200)

def run():
    print('Starting backend Remedi server...')

    # Server settings
    # Choose port 8080, for port 80, which is normally used for a http server, you need root access
    server_address = ('127.0.0.1', 8080)
    httpd = HTTPServer(server_address, remediHTTPServer_RequestHandler)
    print('Running server...')
    httpd.serve_forever()


run()

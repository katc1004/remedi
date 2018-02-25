## Inspiration
We really were started off motivated by our mutual confusion about medical bills. Some quick searches on the internet revealed that another 74% of Americans also shared in our confusion- and 94% thought medical bills were too expensive. We also discovered that it's actually quite easy to reduce the cost of your bill- if you're uninsured, or have low income, you may dispute your bill and many hospitals will actually gladly oblige. Another gaping problem- a recent study revealed up to 90% of medical bills may have some sort of error, and a $10,000 bill, will, on average, have $1,300 in erroneous billing. We set out to help the average American consumer remedy that.

## What it does
Anybody can go to our website and create an account to submit an image of their itemized medical bill. Our application will then interpret the image and allow you to mouse over parts of the bill to get varying levels of information on them, like- what does this operation code even mean, and how much does this usually cost on average? By informing consumers on what their bill actually entails, and comparing their bills with averages, we can help empower them to dispute erroneously-charged operations and high prices.

## How I built it
We used React for our frontend application, which was linked up to a backend server that held a MongoDB database of registered user accounts. In addition our backend server provided a RESTful API that allowed our website to send images of medical bills for processing. Our server would then use Microsoft Azure's Computer Vision API to detect text and positional data on the bill. We'd parse this information to classify each operation and cost, then cross-referenced operation codes and cost with data we've gathered on what these codes actually mean, and what they usually cost (for both uninsured and insured patients), so we can return that data to the webapp.

## Challenges I ran into
A major initial problem we ran into was the unstandardized medical billing format- each hospital had their own format of medical bill, and many didn't even use the same codes to represent certain operations. On top of that, because medical bills are private information, we had to scour the internet for a limited amount of sample bills that were provided by hospitals. In the end, we decided to optimize our computer vision parsing algorithm to work for medical bills from a certain hospital where we had found a couple high-quality samples.

Initially, we wanted to use a medical API to query for information on operation codes, as well as to compare costs the patient paid with average cost estimates for a patient living in their zip code with their insurance plan and health information. We did find a great API for this- however, it cost money to use, and even worse- the American Medical Association requires us to get a license in order to even call APIs to interpret medical codes. We had to instead pull all of our data by hand from other websites.


## Accomplishments that I'm proud of

## What I learned

## What's next for Remedi
In the future, we'd like to work out an agreement with the AMA and the owner of the medical API we found, to see if we could use their information- that would greatly aid in the flexibility and response of our website. On top of that, we'd also look into contacting more hospitals and asking for their medical billing formats, so we could improve our computer vision parsing algorithms to handle different kinds of medical bill formats, so we could help more Americans interpret their medical bills.
A small feature that we ran out of time to implement was to suggest possible courses of action that a patient using our website could take- especially if they were uninsured or low-income, to help reduce their bill.
In the even farther future, we could look into demystifying and explaining other confusing bills as well- not just medical bills. This would expand our reach even further.

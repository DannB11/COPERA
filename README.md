# Info
The source code for this project is located in the main branch in its original state.
The minified and concatenated build files are located in the gh-pages branch and can be viewed at https://dannb11.github.io/copera/

# Decisions made
Most of the choices I had to make were due to this project being a quick 2 week prototype in which I was learning the languages used while creating the product.

One choice I made was to use my own system for tracking which checkbox is active. This was due to simplicity but I'm sure the ngform object or something similar could handle this if I used it correctly.
Another choice I made was to have the ID value be selected by the user. This is because my interpretation of this ID value was that it would be some official ID number given to the song by an organization or something similar.
The ID is still used like a unique key and will not allow duplicate entries, but all other fields will allow duplicates to account for re-recorded songs or alternate versions. It would be easy to change it to assign a unique ID on the creation of a new entry.

A few other design choices I made were adding a some features that were not requested in the design documentation.
This first decision I made was to use pagination to better display the data set. This also required me to start with more than the requested 5 songs to properly display this functionality. All songs were selected at random by year for a wide spread of dates for the testing of sorting.
The other feature I added that wasn't specifically mentioned was a load button. Although this may not be needed for the final build, I feel it makes testing the functionality of the save feature from the end users perspective much more clear.

I chose to write my unit tests using Karma and Jasmine. I thought this was a good idea because the goal of this project was to understand the capabilities of Angular so using the native testing suite seemed like a good start. I wanted to add end to end testing as I saw angular easily supports it but did not write any due to lack of time.
I did not use the sinon.js library as I was not sure if this would work in an angular build. I found there is a ts-sinon that seems like the typescript counterpart but decided to just mock the server in a traditional way for simplicity.

As far as styling goes, I decided to keep the page as simple as possible since it is my first webpage build.
A style choice I did make though was the bold blue column lines with the dotted light green row lines. I wanted the data to be easily readable while not looking like an excel spreadsheet.


# Programmeerproject

[![BCH compliance](https://bettercodehub.com/edge/badge/jantjehier/programmeerproject)](https://bettercodehub.com)
(For the full project. Separate javascript files can score 6 or 7.)

![GitHub excample](/doc/printscreen.PNG)
![GitHub excample](/doc/printscreen2.PNG)

### Visualisations

#### Bar chart: 
I have chosen to make a bar chart.
In this bar chart the size of the bars show how much albums are sold. A scale from 75 million to 600 million.
The red and green colors show if a band is still active. If the color is green the band is still active. 
If the color is gray the band isn't active anymore. There is a checkbox that will sort the bars from the barchart.
When you hover over the bars the values will show.

#### Timeline:
There will also be a timeline that is linked to the barchart. when you click on a bar the band shows in the timeline.
In the timeline you can see when a band was active and which musicians played in the band at which moment. The search funtion will work for the timeline. When you hover over a line you can see which instrument was played. On the top there is also a legend that shows the instruments.

#### Piechart:
In the piechart you can see if a band had a lot of very succelfull albums or just sold a lot of different albums. For all the albums that where sold more than 20 million times you can see how much percent it was of the total albums sales. The other part of the pie chart shows on hover how much albums and how much sales. The albums are the studio albums, live albums and compilation albums because that albums are also counted in the list with most sold albums.

### Story
The visualisation will show how it is possible that some bands are performing for a long time. Do they change members? Do they take breaks? Or are the performers healty enough to perform when they are 80? It also shows why bands sold the most albums. Can you be succesfull when you change your bandmembers a lot? Are older bands more succelfull? Are bands that are active for a long time more populair?

### The data
For this visualisation I needed datasets with the years where in a band is active. I also need data or timelines that show wich member was a bandmember at a certain time. 
Most of this information I can got from wikipedia. On wikipedia a couple of bands do have timelines. For the other bands i had to find the data on their wikipedia pages. For the bar chart i can use the list of best selling music artists. For the pie chart i used data about the best sold albums.

### Sources

#### Timeline
http://bl.ocks.org/bunkat/2338034, 
http://bl.ocks.org/rengel-de/5603464
#### Pie chart
https://github.com/jantjehier/Dataprocessing/blob/master/homework/D3LinkedViews/D3LinkedViews.js,
https://jsfiddle.net/ragingsquirrel3/qkHK6/
#### Bar chart
https://github.com/jantjehier/Dataprocessing/blob/master/homework/d3/barchart.js,
https://bl.ocks.org/mbostock/3885304 (copyrighted Released under the GNU General Public License, version 3.)

### Data
https://en.wikipedia.org/wiki/List_of_best-selling_albums
https://en.wikipedia.org/wiki/List_of_best-selling_music_artists
and seperate artist pages and discographies.

### Linking
The piechart and the timeline will be linked to the bar chart. 

### Extra features
the extra features are the checkbox for the bar chart and the search function for the timeline and bar chart.


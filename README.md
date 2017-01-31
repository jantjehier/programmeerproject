# programmeerproject

![GitHub excample](/doc/dataproject3.PNG)
The design changed a little. The pie chart will show different data. The drop down menu is a checkbox and the red in the barchart is changed to gray. Also the legends are in different places.

### visualisations
#### bar chart: 
I have chosen to make a bar chart.
In this bar chart the size of the bars show how much albums are sold. A scale from 75 million to 600 million.
The red and green colors show if a band is still active. If the color is green the band is still active. 
If the color is red the band isn't active anymore. There is a checkbox that will sort the bars from the barchart.
When you hover over the bars the values will show.
#### timeline:
There will also be a timeline that is linked to the barchart. when you click on a bar the band shows in the timeline.
In the timeline you can see when a band was active and which musicians played in the band at which moment. Optional there will be lines
that show when the albums where made. This makes it easy to see which musician made which album. The search funtion will work for the timeline. When you hover over a line you can see which instrument was played. On the right there is also a legend that shows the instruments.
#### piechart:
In the piechart you can see if a band had a lot of very succelfull albums or just sold a lot of different albums. For all the albums that where sold more than 20 million times you can see how much percent it was of the total albums sales. The other part of the pie chart shows on hover how much albums and how much sales. The albums are the studio albums, live albums and compilation albums because that albums are also counted in the list with most sold albums.

### The Minimum viable product
At least I want to make the time line linked to the bar and the pie chart. I also need the search function and  as extra features.
The optional part is the lines for the albums. I can make tables of the albums that where made, and make eventual the album versions in a table. 

### Story
The visualisation will show how it is possible that some bands are performing for a long time. Do they change members? Do they take breaks? Or are the performers healty enough to perform when they are 80? It also shows why bands sold the most albums. Can you be succesfull when you change your bandmembers a lot? Are older bands more succelfull? Are bands that are active for a long time more populair?

### The data
For this visualisation I need datasets with the years where in a band is active. I also need data or timelines that show wich member was a bandmember at a certain time. Optional I need to know in wich year the albums where made. 
Most of this information I can get from wikipedia. On wikipedia a couple of bands do have timelines. For the other bands i have to find the data on their wikipedia pages. For the bar chart i can use the list of best selling music artists. The pie chart data i can calculate. 

### sources
http://bl.ocks.org/bunkat/2338034, 
http://bl.ocks.org/rengel-de/5603464, 
https://bl.ocks.org/mbostock/4063269, 
d3 linked views for the pie chart

### technical problems
The technical problems that could arise during the development are the linking of the visualisation, the new timeline visualisation and the way I organize the data. The linking of the visualisation didn't go well in the dataprocessing psets. Some times one of the visualisations didn't work. I also never made a timeline visualisation and there aren't as much timeline visualisations made as line graphs or barcharts. It will be harder to find the right information I need. In the dataprocessing assignments I had to change the data format a lot because it didn't work with the simple JSON files. All the data i get from the wikipedia pages are slightly different so i have to make changes to them and make the format the same. The best thing I can do to solve this problem is to do a lot of research and work structured. 

### linking
the piechart and the timeline will be linked to the bar chart. 

### extra features
the extra features are the checkbox for the bar chart and the search function for the timeline and bar chart.

# design

### barchart
The barchart is a simple visualisation. I allready have made something that is close to what i need. The changes i need to make are the red and green bars and the new data. I also have to change the hover to a slightly lighter color than red or green (different for the red and green bars.) The barchart should give a band id on click to the other visualisations. When I click on the barchart the timeline should show up.

### timeline
For the timeline i need to make a artist dataset. this dataset contains the a bar id, a startdate of the bar, an enddate, the band and the instrument. I have to make data for every bar i want to draw so when a musician plays 5 instrument i make 5 new JSON parts. If an artist is in the bandid's band the artist should be added to the timeline. the old timeline should be deleted when you click on a bar of the barchart.

### the pie chart
the id is also needed for the pie chart. For the pie chart i first need to check which members are in a band. Then i need to check which members where the first members. the piechart data will contain a startdate of every band. If the startdate is the same as a musicians startdate it should be used in the piechart. the problem is that i made multiple JSON parts for every musician so it should only count one. If the end date is present the the musician should be part of the green part of the pie chart. The old pie chart has to be deleted when you click on another bar from the barchart.

### search function
I've never implemented a searchfuntion for a visualisation. The search funtion should be searching in the data for the timeline. when the band name is typed the timeline should show up. the old visualisation has to be deleted before i can show the new timeline.

### drop downn menu
I used a dropdown menu before. But this never worked well. i Think i have to use an on change function in stead of the if statements. The dropdown should change the part that will be loaded in for the visualisation and delete the old bars.

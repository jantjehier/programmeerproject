/*Jan Maarten de Vries Student number: 11408731*/
function timeline(BandId, Totalalbums)
{
  // removing the timeline container
  d3.select('#container').remove()

  // changing the text for the timeline
  document.getElementById("TimelineText").innerHTML = BandId + " timeline";

  // adding the legend when the timeline function starts
  document.getElementById("legend").style.visibility = "visible";

  // loading in the artistlist
  d3.json("artistlist.json", function(error, data) {

  data.forEach(function(d) {
    d.id = d.id;
    d.lane = d.lane;
    d.lanenr = +d.lanenr;
    d.start = +d.start;
    d.end = +d.end;
    d.band = d.band;
    d.number = +d.number;
  });

  // defining the artists in a band
  var lanes = []
  var Allitems = []
  var item = {}
  var highest = 0;
  var lowest = 3000;

  for (var i = 0; i < data.length; i++)
  {
    if (BandId == data[i].band)
    {
      item[i] =
      {
        'lane': data[i].lanenr,
        'id': data[i].id,
        'start': data[i].start,
        'end': data[i].end
      }
      Allitems.push(item[i]);
      if (highest < data[i].end)
      {
        highest = data[i].end;
      }
      if (lowest > data[i].start)
      {
        lowest = data[i].start;
      }
      if (data[i].number == 1)
      {
        lanes.push(data[i].lane);
      }
    }
  }

  // change the years of the timeline
  var begin = lowest - 1;
  var end = highest + 1;

  // adding the lanelength, items, begintime and endtime
  laneLength = lanes.length,
  items = Allitems;
  timeBegin = begin,
  timeEnd = end;

  // defining the width, height and margins
  var m = [20, 15, 10, 120], //top right bottom lef
  w = 960 - m[1] - m[3],
  h = 920 - m[0] - m[2],
  timelineHeight = laneLength * 12 + 50,
  mainHeight = h - timelineHeight - 50;

  // scales
  var x = d3.scale.linear()
  .domain([timeBegin, timeEnd])
  .range([0, w]);
  var x1 = d3.scale.linear()
  .range([0, w]);
  var y1 = d3.scale.linear()
  .domain([0, laneLength])
  .range([0, timelineHeight]);
  var y2 = d3.scale.linear()
  .domain([0, laneLength])
  .range([0, timelineHeight]);

  // text for the tooltip
  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
  return "<span style='color:white'>" + lanes[d.lane] + ", " + d.id + " (" + d.start + ", " + d.end + ")" + "</span>";
  });

  // container for the scroll function
  var container = d3.select('body').append('div')
  .attr('id','container');

  // adding the timelinesvg to the container
  var chart = container.append("svg")
    .attr("id", "timeLine")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .attr("class", "chart");

  // call tip
  chart.call(tip);

  // adding the x axis
  var xAxis = d3.svg.axis()
        .orient("bottom")
        .scale(x)
        .tickFormat(d3.format("d"));

  chart.append("g")
          .attr("class", "xaxis")
          .attr("transform", "translate(" + m[3] + "," + (h) + ")")
          .call(xAxis);

  var timeline = chart.append("g")
    .attr("transform", "translate(" + m[3] + "," + (mainHeight + m[0]) + ")")
    .attr("width", w)
    .attr("height", timelineHeight)
    .attr("class", "timeline");

  // timeline lanes and texts
  timeline.append("g").selectAll(".laneLines")
  .data(items)
  .enter().append("line")
  .attr("x1", m[1])
  .attr("y1", function(d) {return y2(d.lane);})
  .attr("x2", w)
  .attr("y2", function(d) {return y2(d.lane);})
  .attr("stroke", "lightgray");

  // adding the names to the timeline
  timeline.append("g").selectAll(".laneText")
  .data(lanes)
  .enter().append("text")
  .text(function(d) {return d;})
  .attr("x", -m[1])
  .attr("y", function(d, i) {return y2(i + .5);})
  .attr("dy", ".5ex")
  .attr("text-anchor", "end")
  .attr("class", "laneText");

  // adding the timeline item rects
  timeline.append("g").selectAll("timelineItems")
  .data(items)
  .enter().append("rect")
  .attr("class", function(d) {return "timelineItem" + d.id;})
  .attr("x", function(d) {return x(d.start);})
  .attr("y", function(d) {return y2(d.lane + .5) - 5;})
  .attr("width", function(d) {return ((x(d.end)) - (x(d.start)));})
  .attr("height", function(d) {if (['voc','flute2','key2','bass2','harmonica2','piano2'].indexOf(d.id) >= 0)
    {
      return 4;
    }
    else
    {
      return 10;
    }
  })
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide);

  // scroll down the container
  var element = document.getElementById("container");
  element.scrollTop = element.scrollHeight;

  // when the visualisations is made go to the bottom of the page
  window.scrollTo(0,document.body.scrollHeight);
  });
}

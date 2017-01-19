window.onload = function(){
  var margin = {top: 20, right: 20, bottom: 180, left: 80},
    width = 1500 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
  var y = d3.scale.linear().range([height, 0.1]);

  // define the axis
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

  var colors = d3.scale.ordinal()
      .domain(['yes','no'])
      .range(['green','red'])
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
    return "<strong>Total albums:</strong> <span style='color:white'>" + d.sales + ", " + d.artist + "</span>";
  })

  // add the SVG element
  var svg = d3.select("#barChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // call tip
  svg.call(tip);

  // load the data
  d3.json("bardata.json", function(error, data) {

    data.forEach(function(d) {
        d.artist = d.artist;
        d.sales = +d.sales;
        d.active = d.active;
    });

  // scale the range of the data
  x.domain(data.map(function(d) { return d.artist; }));
  y.domain([0.00001, d3.max(data, function(d) { return d.sales; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

 // add axis text
  svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height +160)
      .text("Artist (sorted alphabetically)")
      .style("font", "20px times");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 10)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Total albums sold (x1000000)")
    .style("font", "20px times");

  // Add bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d, i) { return 'bar_' + d.active} )
      .attr("fill", function(d, i) { return colors(d.active)})
      .attr("x", function(d) { return x(d.artist); })
      .attr("y", function(d) { return y(parseInt(d.sales)); })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return height - y(d.sales); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on('click', function(d,i){ console.log(d.artist); Bandid = d.artist; timeline(Bandid); piechart(Bandid); });
  });

function timeline(BandId)
{
  d3.json("test.json", function(error, data) {

    data.forEach(function(d) {
        d.id = d.id;
        d.lane = d.lane;
        d.lanenr = +d.lanenr;
        d.start = +d.start;
        d.end = +d.end;
        d.band = d.band;
        d.number = +d.number;
    });

    var lanes = []

    for (var i = 0; i < data.length; i++)
    {
      if (BandId == data[i].band)
      {
        if (data[i].number == 1)
        {
          lanes.push(data[i].lane);
        }
      }
    }

    var Allitems = []
    var item = {}
    for (var j = 0; j < data.length;  j++)
    {
      if (BandId == data[j].band)
      {
        item[j] = {
          'lane': data[j].lanenr,
          'id': data[j].id,
          'start': data[j].start,
          'end': data[j].end
        }
        Allitems.push(item[j]);
      }
    }

    var name = [];
    var names = [];
    var highest = 0;
    var lowest = 3000;
    for (var k = 0; k < data.length; k++)
    {
      for (var l = 0; l < data.length; l++)
      {
        console.log(data[l].start)
        console.log(data[l].end)
        console.log(data[k].start)
        console.log(data[k].end)
        if (data[k].lane == data[l].lane && (data[k].end >= data[l].start >= data[k].start || data[k].end >= data[l].end >= data[k].start)) // sorting the same name
        {

          name[l] = [];
          name[l].push(data[l].lane);
          console.log(name[l])
          //if at the same time
          //counting how much at the same time.
          //changing height

        }
      }
      if (BandId == data[k].band)
      {
        if (highest < data[k].end)
        {
          highest = data[k].end;
        }

        if (lowest > data[k].start)
        {
          lowest = data[k].start;
        }
      }
    }

    var begin = lowest - 1;
    var end = highest + 1;

    laneLength = lanes.length,
    items = Allitems;
    timeBegin = begin,
    timeEnd = end;

  var m = [20, 15, 15, 120], //top right bottom left
    w = 960 - m[1] - m[3],
    h = 380 - m[0] - m[2],
    miniHeight = laneLength * 12 + 50,
    mainHeight = h - miniHeight - 50;

  //scales
  var x = d3.scale.linear()
      .domain([timeBegin, timeEnd])
      .range([0, w]);
  var x1 = d3.scale.linear()
      .range([0, w]);
  var y1 = d3.scale.linear()
      .domain([0, laneLength])
      .range([0, miniHeight]);
  var y2 = d3.scale.linear()
      .domain([0, laneLength])
      .range([0, miniHeight]);

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
    return "<strong>Artist:</strong> <span style='color:white'>" + lanes[d.lane] + ", " + d.id + "</span>";
  });

  var chart = d3.select("body")
        .append("svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .attr("class", "chart");

        // call tip
        chart.call(tip);

  chart.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", w)
    .attr("height", mainHeight);

  var main = chart.append("g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
        .attr("width", w)
        .attr("height", mainHeight)
        .attr("class", "main");

  var mini = chart.append("g")
        .attr("transform", "translate(" + m[3] + "," + (mainHeight + m[0]) + ")")
        .attr("width", w)
        .attr("height", miniHeight)
        .attr("class", "mini");

  //mini lanes and texts
  mini.append("g").selectAll(".laneLines")
    .data(items)
    .enter().append("line")
    .attr("x1", m[1])
    .attr("y1", function(d) {return y2(d.lane);})
    .attr("x2", w)
    .attr("y2", function(d) {return y2(d.lane);})
    .attr("stroke", "lightgray");

  mini.append("g").selectAll(".laneText")
    .data(lanes)
    .enter().append("text")
    .text(function(d) {return d;})
    .attr("x", -m[1])
    .attr("y", function(d, i) {return y2(i + .5);})
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("class", "laneText");

  var itemRects = main.append("g")
            .attr("clip-path", "url(#clip)");

  //mini item rects
  // daanmaken voor elke soort?
  mini.append("g").selectAll("miniItems")
    .data(items)
    .enter().append("rect")
    .attr("class", function(d) {return "miniItem" + d.id;})
    .attr("x", function(d) {return x(d.start);})
    .attr("y", function(d) {return y2(d.lane + .5) - 5;})
    .attr("width", function(d) {return ((x(d.end)) - (x(d.start)));})
    .attr("height", 10)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

  //mini labels
  mini.append("g").selectAll(".miniLabels")
    .data(items)
    .enter().append("text")
    .text(function(d) {return d.id;})
    .attr("x", function(d) {return x(d.start);})
    .attr("y", function(d) {return y2(d.lane + .5);})
    .attr("dy", ".5ex");

    mini.append("g")
			.attr("class", "x brush")
			.selectAll("rect")
			.attr("y", 1)
			.attr("height", miniHeight - 1);

    });
}

function piechart(BandId)
{

  // adding the width, height, radius, color.
    var w = 330;
    var h = 330;
    var r = h/2;
    var color = d3.scale.linear()
              .range(['green', 'red'])

    // the size by hovering
    var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(100);

      var arcOver = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(100 + 40);

    d3.json("test.json", function(error, data) {
      data.forEach(function(d) {
          d.band = d.band;
          d.end = +d.end;
          d.start = +d.start;
          d.lane = d.lane;
          d.number = +d.number;
    })

    var lowest = 1956;
    var highest = 2017;
    var countl = 0;
    var counts = 0;

    // changing the format to the needed format for pie charts.
    for (var l = 0; l < data.length; l++)
    {
      if (data[l].band == BandId)
      {
        if (data[l].number == 1)
        {
          if (data[l].start == lowest) // lowest
          {
            if (data[l].end == highest)
            {
              countl++;
            }
            else
            {
              counts++;
            }
          }
        }
      }
    }
    var data = [{"label":"left", "value": countl},
                {"label":"stayed", "value": counts}];

    // selecting the div and adding data.
    var vis = d3.select('body')
          .append("svg:svg")
          .data([data])
          .attr("width", w)
          .attr("height", h).append("svg:g")
          .attr("id", "piechart2")
          .attr("transform", "translate(" + r + "," + r + ")");

    var pie = d3.layout.pie().value(function(d){return d.value;});

    // declare an arc generator function
    var arc = d3.svg.arc().outerRadius(r);

    // select paths, use arc generator to draw and the mouseover and on click funtions for the pie chart.
    var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice").attr("id", "piechart");
    arcs.append("svg:path")
        .attr("fill", function(d, i){
            return color(i);
        })
        .attr("d", function (d) {
            return arc(d);
        })
        .on("mouseover", function(d) {
          d3.select(this).transition()
            .duration(1000)
            .attr("d", arcOver);
        })
        .on("mouseout", function(d) {
          d3.select(this).transition()
            .duration(1000)
            .attr("d", arc);
        })

        // add the text to the pie chart.
        arcs.append("svg:text").attr("transform", function(d){
              d.innerRadius = 0;
              d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
            return d.value; });
      });
    }
}

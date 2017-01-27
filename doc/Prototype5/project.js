//voc and lvoc
window.onload = function(){
  var margin = {top: 20, right: 20, bottom: 180, left: 80},
    width = 1500 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

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
      .range(['green','gray'])

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
        d.albums = +d.albums;
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
    .attr("y", -60)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Total albums sold (x1000000)")
    .style("font", "20px times");

  // Add bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d, i) { return 'bar_' + d.active})
      .attr("fill", function(d, i) { return colors(d.active)})
      .attr("x", function(d) { return x(d.artist); })
      .attr("y", function(d) { return y(parseInt(d.sales)); })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return height - y(d.sales); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on('click', function(d,i){Bandid = d.artist; Totalsold = d.sales; Totalalbums = d.albums; timeline(Bandid); piechart(Bandid, Totalsold, Totalalbums); });

      d3.select("input").on("change", change);
        var sortTimeout = setTimeout(function() {
          d3.select("input").property("checked", false).each(change);
        }, 50);

        function change() {
          clearTimeout(sortTimeout);

          // Copy-on-write since tweens are evaluated after a delay.
          var x0 = x.domain(data.sort(this.checked
              ? function(a, b) { return b.sales - a.sales; }
              : function(a, b) { return d3.ascending(a.artist, b.artist);})
              .map(function(d) { return d.artist; }))
              .copy();

          svg.selectAll(".bar_no")
              .sort(function(a, b) { return x0(a.artist) - x0(b.artist); });

          svg.selectAll(".bar_yes")
              .sort(function(a, b) { return x0(a.artist) - x0(b.artist); });

          var transition = svg.transition().duration(750),
              delay = function(d, i) { return i * 50; };

          transition.selectAll(".bar_no")
              .delay(delay)
              .attr("x", function(d) { return x0(d.artist); });

          transition.selectAll(".bar_yes")
              .delay(delay)
              .attr("x", function(d) { return x0(d.artist); });

          transition.select(".x.axis")
              .call(xAxis)
            .selectAll("g")
              .delay(delay)
            .selectAll("text")
             .style("text-anchor", "end")
             .attr("dx", "-.8em")
             .attr("dy", "-.55em")
             .attr("transform", "rotate(-90)" );
        }
  });

document.getElementById("clickMe").onclick = test;
function test()
{
  var userInput = document.getElementById("userInput").value;

    d3.json("bardata.json", function(error, data) {

      data.forEach(function(d) {
          d.artist = d.artist;
          d.sales = +d.sales;
          d.active = d.active;
          d.albums = +d.albums;
      });

    var BandId;
    var Totalsold;
    var Totalalbums;
    for (var i = 0; i < data.length; i++)
    {
      if (data[i].artist == userInput)
      {
        BandId = data[i].artist;
        Totalsold = data[i].sales;
        Totalalbums = data[i].albums;
      }
      else if (data[i].artist.toLowerCase() == userInput)
      {
        BandId = data[i].artist;
        Totalsold = data[i].sales;
        Totalalbums = data[i].albums;
      }
    }
    if (BandId != undefined)
    {
      timeline(BandId, Totalalbums);
      piechart(BandId, Totalsold, Totalalbums);
    }
    else
    {
      alert("Sorry, couldn't find this band")
    }
  });
}

function timeline(BandId, Totalalbums)
{
  document.getElementById("demo").innerHTML = BandId + " timeline";
  d3.select('#timeLine').remove()
  d3.select('#container').remove()

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

  var height = [];
  var heights = [];
  var highest = 0;
  var lowest = 3000;
  for (var k = 0; k < data.length; k++)
  {
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

  var m = [20, 15, 10, 120], //top right bottom left
      w = 960 - m[1] - m[3],
      h = 910 - m[0] - m[2],
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
    return "<span style='color:white'>" + lanes[d.lane] + ", " + d.id + " (" + d.start + ", " + d.end + ")" + "</span>";
  });

  var container = d3.select('body').append('div')
      .attr('id','container');

  var chart = container.append("svg")
        .attr("id", "timeLine")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .attr("class", "chart");

/* for the lines
        var today = new Date();
        var dd = today.getDate();    //<<===== no need
        var mm = today.getMonth()+1; //January is 0!   //<<===== no need
        var yyyy = today.getFullYear();  //<<===== no need


        svg.append("line")
        .attr("x1", x(today))  //<<== change your code here
        .attr("y1", 0)
        .attr("x2", x(today))  //<<== and here
        .attr("y2", height - margin.top - margin.bottom)
        .style("stroke-width", 2)
        .style("stroke", "red")
        .style("fill", "none");
        */

  // call tip
  chart.call(tip);

  var xAxis = d3.svg.axis()
            .orient("bottom")
            .scale(x)
            .tickFormat(d3.format("d"));

  chart.append("g")
              .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
              .attr("transform", "translate(" + m[3] + "," + (h) + ")")
              .call(xAxis);

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

  //mini item rects
  mini.append("g").selectAll("miniItems")
    .data(items)
    .enter().append("rect")
    .attr("class", function(d) {return "miniItem" + d.id;})
    .attr("x", function(d) {return x(d.start);})
    .attr("y", function(d) {return y2(d.lane + .5) - 5;})
    .attr("width", function(d) {return ((x(d.end)) - (x(d.start)));})
    .attr("height", function(d) {if(d.id == "voc"||d.id =="flute2" || d.id == "key2" || d.id == "bass2" || d.id == "harmonica2"){return 4}else{return 10}})
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

  mini.append("g")
		.attr("class", "x brush")
		.selectAll("rect")
		.attr("y", 1)
		.attr("height", miniHeight - 1);

    var element = document.getElementById("container");
    element.scrollTop = element.scrollHeight;

    window.scrollTo(0,document.body.scrollHeight);
  });
}

function piechart(BandId, Totalsold, Totalalbums)
{
  d3.select("#pieChart").remove();
  // adding the width, height, radius, color.
  var w = 330;
  var h = 330;
  var r = h/2;
  var color = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  // the size by hovering
  var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(100);

  var arcOver = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(120 + 40);

  d3.json("bestsoldalbums.json", function(error, data) {
    data.forEach(function(d) {
        d.artist = d.artist;
        d.album = d.album;
        d.sales = +d.sales;
        d.totalsales = +d.totalsales;
        d.year = +d.year;
  })

  var albumdata = {}
  var albumsalespart = 0;
  var restalbums;
  var albumdata2;
  var data2 = []
  // changing the format to the needed format for pie charts.
  for (var l = 0; l < data.length; l++)
  {
    if (data[l].artist == BandId)
    {
      albumdata[l] =
      {
        "label": data[l].album,
        "value": data[l].sales,
        "year": data[l].year
      }
      Totalalbums = Totalalbums - 1
      data2.push(albumdata[l])
      albumsalespart = albumsalespart + data[l].sales;
      restalbums = Totalsold - albumsalespart;
      albumdata2 =
      {
        "label": Totalalbums + " studio-albums with less than 20 million sales",
        "value": restalbums
      }
    }
  }

  if (albumdata2 == undefined)
  {
    albumdata2 =
    {
      "label": Totalalbums + " studio-albums with less than 20 million sales",
      "value": Totalsold
    }
  }

  data2.push(albumdata2)
  data = data2;

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
    return "<span style='color:white'>" + d.data.label + ", " + d.value + " million" + "</span>";
  });

  // selecting the div and adding data.
  var vis = d3.select('#divPiechart')
        .append("svg:svg")
        .attr("id", "pieChart")
        .data([data])
        .attr("width", w)
        .attr("height", h).append("svg:g")
        .attr("id", "piechart2")
        .attr("transform", "translate(" + r + "," + r + ")")

  // call tip
  vis.call(tip);

  var pie = d3.layout.pie().value(function(d){return d.value;});

  // declare an arc generator function
  var arc = d3.svg.arc().outerRadius(r);

  // select paths, use arc generator to draw and the mouseover and on click funtions for the pie chart.
  var arcs = vis.selectAll("g.slice").data(pie(data)).enter().append("svg:g").attr("class", "slice").attr("id", "piechart");
  arcs.append("svg:path")
      .attr("fill", function(d, i){
          return color(i);
      })
      .attr("d", function (d) {
          return arc(d);
      })
      .on('mouseover', tip.show)
      //.on('mouseover', function(d,i){console.log(d.year)})
      .on('mouseout', tip.hide)
      //.on('click', function(d,i){console.log(d.year); /*albumline(d.year);*/ });

      // add the text to the pie chart.
      arcs.append("svg:text").attr("transform", function(d){
            d.innerRadius = 0;
            d.outerRadius = r;
          return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
          return Math.round(d.value/Totalsold*100) + "%";}).style("font-size", "15px");
    });
  }
}

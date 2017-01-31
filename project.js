window.onload = function(){

  // setting margins, width and height barchart
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

  // add the colors
  var colors = d3.scale.ordinal()
      .domain(['yes','no'])
      .range(['green','gray'])

  // the tooltip text
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

  // load the bardata
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

    // Add bars, tooltip showing and hiding and on click start functions
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

    // sorting the barchart
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

      // sorting the bar_no
      svg.selectAll(".bar_no")
          .sort(function(a, b) { return x0(a.artist) - x0(b.artist); });

      // sorting the bar_yes
      svg.selectAll(".bar_yes")
          .sort(function(a, b) { return x0(a.artist) - x0(b.artist); });

      var transition = svg.transition().duration(750),
          delay = function(d, i) { return i * 50; };

      // transition barno and bar yes
      transition.selectAll(".bar_no")
          .delay(delay)
          .attr("x", function(d) { return x0(d.artist); });

      transition.selectAll(".bar_yes")
          .delay(delay)
          .attr("x", function(d) { return x0(d.artist); });

      // changing th x axis
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

  // start the
  document.getElementById("clickMe").onclick = search;
  function search()
  {
  // getting the user input from the textbox
  var userInput = document.getElementById("userInput").value;

  // loading the bardata in the search function
  d3.json("bardata.json", function(error, data) {

  data.forEach(function(d) {
      d.artist = d.artist;
      d.sales = +d.sales;
      d.active = d.active;
      d.albums = +d.albums;
    });

    // defining bandId, Totalsold and Totalalbums
    var BandId;
    var Totalsold;
    var Totalalbums;
    for (var i = 0; i < data.length; i++)
    {
      // search with capital letters
      if (data[i].artist == userInput)
      {
        BandId = data[i].artist;
        Totalsold = data[i].sales;
        Totalalbums = data[i].albums;
      }
      // search in lowercase letters
      else if (data[i].artist.toLowerCase() == userInput)
      {
        BandId = data[i].artist;
        Totalsold = data[i].sales;
        Totalalbums = data[i].albums;
      }
    }

    // when Bandid is defined start the timeline and piechart functions
    if (BandId != undefined)
    {
      timeline(BandId, Totalalbums);
      piechart(BandId, Totalsold, Totalalbums);
    }
    // else the band is not in the list
    else
    {
      alert("Sorry, couldn't find this band")
    }
    });
  }

  function timeline(BandId, Totalalbums)
  {
  // removing the timeline container
  //d3.select('#timeLine').remove()
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
    .attr("height", function(d) {if(d.id == "voc"||d.id =="flute2" || d.id == "key2" || d.id == "bass2" || d.id == "harmonica2" || d.id == "piano2"){return 4}else{return 10}})
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

    // scroll down the container
    var element = document.getElementById("container");
    element.scrollTop = element.scrollHeight;

    // when the visualisations is made go to the bottom of the page
    window.scrollTo(0,document.body.scrollHeight);
    });
  }

  function piechart(BandId, Totalsold, Totalalbums)
  {
  // adding the pie chart title
  document.getElementById("PiechartText").innerHTML = "Percentage of total sales " + BandId + " (" + Totalsold + " million)"
  d3.select("#pieChart").remove();

  // adding the width, height, radius, color.
  var w = 330;
  var h = 330;
  var r = h/2;
  var color = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  // adding the data
  d3.json("bestsoldalbums.json", function(error, data) {
  data.forEach(function(d) {
    d.artist = d.artist;
    d.album = d.album;
    d.sales = +d.sales;
    d.totalsales = +d.totalsales;
    d.year = +d.year;
  })

    // changing the data format
    var albumdata = {}
    var restalbumdata;
    var albumsalespart = 0;
    var restalbumsales;
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
        restalbumsales = Totalsold - albumsalespart;
        restalbumdata =
        {
          "label": Totalalbums + " studio-albums with less than 20 million sales",
          "value": restalbumsales
        }
      }
    }

    if (restalbumdata == undefined)
    {
      restalbumdata =
      {
        "label": Totalalbums + " studio-albums with less than 20 million sales",
        "value": Totalsold
      }
    }

    data2.push(restalbumdata)
    data = data2;

    // adding the tooltip text
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
    .attr("transform", "translate(" + r + "," + r + ")");

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
    .on('mouseout', tip.hide);

    // add the text to the pie chart.
    arcs.append("svg:text").attr("transform", function(d){
      d.innerRadius = 0;
      d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
    return Math.round(d.value/Totalsold*100) + "%";}).style("font-size", "15px");
    });
  }
}

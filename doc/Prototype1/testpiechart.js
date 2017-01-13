window.onload = function(){

// adding the width, height, radius, color.
  var w = 400;
  var h = 400;
  var r = h/2;
  var color = d3.scale.linear()
            .range(['red', 'green'])

  // the size by hovering
  var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(100);

    var arcOver = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(150 + 40);

    // determine wich file has to be loaded.

  d3.json(file2, function(error, data) {
    // removing old pie chart if any.
    d3.select("#chart").select("svg").remove();

    data.forEach(function(d) {
        d.artist = d.artist;
        d.members = d.members;
        d.membersartist
  })

  if (d.artist == d.membersartist)
  {
    
  }

  // changing the format to the needed format for pie charts.
  for (var k = 0; k < 248; k++)
  {
    for (var l = 0; l < data.length; l++)
    {
      if (country_codes[k][1] == countrycode)
      {
        if (data[l].country == country_codes[k][2])
        {
          var data = [{"label":"left", "value": left},
                      {"label":"member", "value": member}];
        }
      }
    }
  }
  // selecting the div and adding data.
  var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("id", "piechart2").attr("transform", "translate(" + r + "," + r + ")");
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
          return d.value;
        });
    });
}

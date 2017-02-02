/*Jan Maarten de Vries Student number: 11408731*/
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
        "label": Totalalbums + " Albums with less than 20 million sales",
        "value": restalbumsales
      }
    }
  }

  if (restalbumdata == undefined)
  {
    restalbumdata =
    {
      "label": Totalalbums + " Albums with less than 20 million sales",
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

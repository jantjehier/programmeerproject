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
  var svg = d3.select("body").append("svg")
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
      .text("Artist (sorted alphabetically)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 10)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Total albums sold");

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
      //.on('click', .....)

  });
}

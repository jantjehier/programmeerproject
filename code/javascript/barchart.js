function barchart()
{
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
}


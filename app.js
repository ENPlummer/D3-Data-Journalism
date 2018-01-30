//Define the SVG area dimensions.
var svgWidth = 1000
var svgHeight = 500

//Define the chart's margins as an object.
var margin = {
	top: 100,
	right: 100,
	bottom: 100,
	left: 100
};

//Define the dimensions of the chart area.
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

//Create a SVG warper and append the SVG group that will hold our chart and 
//the latter by the top and right margins.
var svg = d3.select(".scatter-plot")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chart = svg.append("g");

//Append a div to the body to create tooltips, and assign it a class.
d3.select(".scatter-plot")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

//Load the data from the data.csv file.
d3.csv("data/data.csv", function(error, data) {
	if (error) throw error;

	data.forEach(function(data) {
		data.poverty = +data.poverty;
		data.healthStatus = +data.healthStatus;
	});

	//Create the x scale function.
	var xLinearScale = d3.scaleLinear()
		.range([0, chartWidth]);

	//Create the y scale function.
	var yLinearScale = d3.scaleLinear()
		.range([chartHeight, 0]);

	//Create the axis functions.
	var bottomAxis = d3.axisBottom(xLinearScale);
	var leftAxis = d3.axisLeft(yLinearScale);

	//Scale the domain.
	xLinearScale.domain([50, d3.max(data, function(data) {
		return +data.poverty;
	})]);

	yLinearScale.domain([0, d3.max(data, function(data){
		return +data.healthStatus * 1.5;
	})]);

	//Associate the tooltips with the data.
	var toolTip = d3.tip()
	  .attr("class", "tooltip")
	  .offset([80, -60])
	  .html(function(data){
	    var state = data.state;
	    var povertyRate = data.poverty;
	    var healthStatus = data.healthStatus;
	    return (state + "<br> Poverty Rate: " + povertyRate + "<br> Percentage of the population in fair or poor health: " + healthStatus);
	  });

	chart.call(toolTip);

	//Function to append the data points to the chart.
	chart.selectAll("circle")
	  .data(data)
	  .enter().append("circle")
	    .attr("cx", function(data, index) {
	    	console.log(data.poverty);
	    	return xLinearScale(data.poverty);
	    })
	    .attr("cy", function(data, index) {
	    	console.log(data.healthStatus);
	    	return yLinearScale(data.healthStatus);
	    })
	    .attr("r", 15)
	    .attr("fill", "blue")
	    .on("click", function(data) {
	    	toolTip.show(data);
	    })
	    //On mouseout event.
	    on("mouseout", function(data, index) {
	    	toolTip.hide(data);
	    });

	//Append the bottom axis.
	chart.append("g")
	  .attr("transform", `translate(0, ${height})`)
	  .call(bottomAxis);

   //Append the left axis.
   chart.append("g")
     .call(leftAxis);

   //Append the y-axis labels.
   chart.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left + 40)
     .attr("x", 0 - (height/2))
     .attr("dy", "1em")
     .attr("class", "axisText")
     .attr("Percentage of the Population in Fair or Poor Health");

   //Append the x-axis labels.
   chart.append("text")
     .attr("transform", "translate(" + (width / 2) + "," + (height + margin.top + 30) + ")") 
     .attr("class", "axisText")
     .attr("Percentage of the Population Below the Poverty Line")

});






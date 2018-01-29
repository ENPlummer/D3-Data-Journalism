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
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chart = svg.append("g");

//Append a div to the body to create tooltips, and assign it a class.
d3.select(".chart")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

//Load the data from the data.csv file.
d3.csv("data/data.csv", function(error, data) {
	if (error) throw error;

	data.forEach(function(data) {
		data.poverty = +data.poverty;
		data.noDoctor = +data.noDoctor;
	});

	//Create the x scale function.
	var xLinearScale = d3.scaleLinear()
		.range([0, width]);

	//Create the y scale function.
	var yLinearScale = d3.scaleLinear()
		.range([height, 0]);

	//Create the axis functions.
	var bottomAxis = d3.axisBottom(xLinearScale);
	var leftAxis = d3.axisLeft(yLinearScale);

	//Scale the domain.
	xLinearScale.domain([50, d3.max(data, function(data) {
		return +data.poverty;
	})]);

	yLinearScale.domain([0, d3.max(data, function(data){
		return +data.noDoctor * 1.5;
	})]);



})






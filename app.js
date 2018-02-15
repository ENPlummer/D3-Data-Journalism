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

//Create the xBandScale function.
var xBandScale = d3.scaleBand().range([0, chartWidth]).padding(0.1);

//Create the yLinearScale function.

var yLinearScale = d3.scaleLinear().range([chartHeight,0]);

//Load the data from the data.csv file.
d3.csv("data.csv", function(error, healthData) {
	if (error) throw error;

	healthData.forEach(function(data) {
		data.poverty = +data.poverty;
		data.healthStatus = +data.healthStatus;
	});

	//Set the domaine of the xBandScale poverty data.
	xBandScale.domain(healthData.map(function(data){
		return data.poverty;
	}));

	//Set the yScaleLinear function to the health status data.
	yLinearScale.domain(healthData.map(function(data){
		return data.healthStatus;
	}));

	//Create the axis functions.
	var bottomAxis = d3.axisBottom(xBandScale);
	var leftAxis = d3.axisLeft(yLinearScale);

	//Associate the tooltips with the data.
	//var toolTip = d3.tip()
	 // .attr("class", "toolTip")
	  //.offset([80, -60])
	  //.html(function(data){
	    //var state = data.state;
	    //var povertyRate = data.poverty;
	    //var healthStatus = data.healthStatus;
	    //return (state + "<br> Poverty Rate: " + povertyRate + "<br> Percentage of the population in fair or poor health: " + healthStatus);
	  //});

	     //chart.call(toolTip);

	//Function to append the data points to the chart.
	 chart.selectAll("circle")
	  .data(healthData)
	  .enter().append("circle")
	    .attr("class", "scatter")
	    .attr("cx", function(data, index) {
	    	console.log(data.poverty);
	    	return xBandScale(data.poverty);
	    })
	    .attr("cy", function(data, index) {
	    	console.log(data.healthStatus);
	    	return yLinearScale(data.healthStatus);
	    })
	    .attr("r", 15)
	    .attr("fill", "blue");
	    //.on("click", function(data) {
	    	//toolTip.show(data);
	    //);
	    //On mouseout event.
	    //on("mouseout", function(data, index) {
	    	//toolTip.hide(data);

	  //Append the bottom axis.
	  chart.append("g")
	   .attr("transform", `translate(0, ${chartHeight})`)
	   .call(bottomAxis);

     //Append the left axis.
     chart.append("g")
       .call(leftAxis);

     //Append the y-axis labels.
     //chart.append("text")
       //.attr("transform", "rotate(-90)")
       //.attr("y", 0 - margin.left + 40)
       //.attr("x", 0 - (chartHeight/2))
       //.attr("dy", "1em")
       //.attr("class", "axisText")
       //.attr("Percentage of the Population in Fair or Poor Health");

     //Append the x-axis labels.
    //chart.append("text")
     // .attr("transform", "translate(" + (chartWidth / 2) + "," + (chartHeight + margin.top + 30) + ")") 
      //.attr("class", "axisText")
      //.attr("Percentage of the Population Below the Poverty Line");

});






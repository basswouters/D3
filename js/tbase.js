d3.csv("data/tbase.csv", function (data) {

	//Variabelen
	var width = 960;
	var height = 325;

	var canvas = d3.select("#tbase").append("svg")
			.attr("width", width)
			.attr("height", height)

	var widthScale = d3.scale.linear()
			.domain([0, 50])
			.range([0, 600]);

	var color = d3.scale.linear()
			.domain([0, 10])
			.range(["red", "green"])

	var axis = d3.svg.axis()
			.ticks(10)
			.scale(widthScale);

	//Cirkels
	canvas.selectAll("circle")
		.data(data)
		.enter()
			.append("circle")
			.attr("fill", "#4c6cf5")
			.attr("width", function(d) { return widthScale(d); })
			.attr("cx", function (d) { return 190 + d.tbase * 12; })
			.attr("cy", function (d, i) { return i * 50 + 50; })
			.attr("r", 10)

	//Tekst
	var text = canvas.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.attr("x", 100)
			.attr("y", function (d, i) { return i * 50 + 50; })
			.text( function (d) { return d.speler; })
			.attr("font-size", "1em")
			.attr("fill", "#aaa")

	//Axis
	canvas.append("g")
		.attr("transform", "translate(190, 300)")
		.attr("fill", "#aaa")
		.attr("class", "axis")
		.call(axis);

	//Button clicks
	d3.select('#tbaseBtn').on('click', function() {
	var canvas = d3.select("#tbase").selectAll("circle")
			.transition()
			.delay(100)
			.ease("elastic")
			.duration(2000)
			.attr("cx", function (d) { return 190 + d.tbase * 12;})
			.attr("fill", "#4c6cf5");
	})

	d3.select('#runsBtn').on('click', function() {
	var canvas = d3.select("#tbase").selectAll("circle")
			.transition()
			.delay(100)
			.ease("elastic")
			.duration(2000)
			.attr("cx", function (d) { return 190 + d.runs * 12;})
			.attr("fill", "#6cefbf");
	})

}) //einde function (data)
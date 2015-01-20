d3.csv("data/stats.csv", function(data) {
	var canvas = d3.select("#mijnStat").append("svg")
		.attr("height", 350)
		.attr("width", 960)

	canvas.selectAll("rect")
		.data(data)
		.enter()
			.append("rect")
			.attr("fill", "#4c6cf5")
			.attr("width", 0)
			.transition()
			.delay(1000)
			.duration(2000)
			.attr("height", 20)
			.attr("width", function(d) { return d.value * 2; })
			.attr("class", function(d) { return d.key; })
			.attr("x", function(d,i) { return 20;})
			.attr("y", function(d,i) { return i * 30; })

	canvas.selectAll("text")
				.data(data)
				.enter()
					.append("text")
					.attr("class", function(d) { return "procent" + d.key; })
					.attr("fill", "#444")
					.attr("visibility", "hidden")
					.attr("font-size", "0.80em")
					.text(function (d) { return d.key + " " + d.value; })
					.attr("x", function (d) { return d.value * 2 + 25; })
					.attr("y", function (d, i) { return i *30 + 15; })

	canvas.selectAll("rect").on("mouseenter", function(){

				var barClass = $(this).attr("class");

				d3.selectAll("." + barClass)
				.transition()
				.style("fill", "#6cefbf")

				d3.selectAll(".procent" + barClass)
				.transition()
				.attr("visibility", "visible")
			})
	canvas.selectAll("rect").on("mouseleave", function() {
				var barClass = $(this).attr("class");

				d3.selectAll("."+ barClass)
				.transition()
				.style("fill", "#4c6cf5")

				d3.selectAll(".procent" + barClass)
				.transition()
				.attr("visibility", "hidden")
			})
 });
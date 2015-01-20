var csv = d3.dsv(';');

function createScale(data, maxWidth) {
    return d3.scale.linear()
        .domain([0, 9])
        .range([0, maxWidth])
}

function loadChart(csvFile, dataType) {
    csv(csvFile, function(err, data) {
        data = d3.entries(data[0]);

        if (dataType === 'newData') {
			var values = data.map(function(d) {
				return parseInt(d.value);
			});

			var scale = createScale(
				values,
				parseInt(d3.select('#stats').style('width'))
			);

			d3.select('#stats').selectAll('div')
				.data(data)
				.enter()
				.append('div')
				.transition()
				.ease("bounce")
				.duration(2000)

				.style('width', function(d) {
					return scale(d.value) + 'px';
				})
				.text(function(d) {
					return d.key + ' (' + d.value + ')';
				})
        } else {
		    var values = data.map(function(d) {
		        return parseInt(d.value);
		    });

		    var scale = createScale(
		        values,
		        parseInt(d3.select('#stats').style('width'))
		    );

		    d3.select('#stats').selectAll('div')
		        .data(data)
		        .transition()
		        .duration(1000)
		        .ease("bounce")
		        .style('width', function(d) {
		            return scale(d.value) + 'px';
		        })
		        .text(function(d) {
		            return d.key + ' (' + d.value + ')';
		        })
        }
    });
}

d3.select('#drieslag').on('click', function() {
    loadChart('data/drieslag.csv', 'changeData');
});
d3.select('#vierwijd').on('click', function() {
    loadChart('data/vierwijd.csv', 'changeData');
});

loadChart('data/drieslag.csv', 'newData');

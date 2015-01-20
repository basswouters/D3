// Links staat de waarde van 1000 minus het slaggemiddelde. Rechts staat het slaggemiddelde.
var data1 = {
    left: {
        Sjors: 492,
        Bwino: 500,
        Thies: 522,
        Bram: 595,
        Dirk: 640,
        Thijs: 643
    },
    right: {
        Sjors: 508,
        Bwino: 500,
        Thies: 478,
        Bram: 405,
        Dirk: 360,
        Thijs: 357
    }
};

// De variabelen vullen met bovenstaande data.
var data = dataSjors;
var dataSjors = [data1.right.Sjors, data1.left.Sjors];
var dataBwino = [data1.right.Bwino, data1.left.Thies];
var dataThies = [data1.right.Thies, data1.left.Thies];
var dataBram = [data1.right.Bram, data1.left.Bram];
var dataDirk = [data1.right.Dirk, data1.left.Dirk];
var dataThijs = [data1.right.Thijs, data1.left.Thijs];

// Uiterlijk donutgrafiek
var w = 960,
	h = 400,
	outer = 200,
	inner = 20,
	color = d3.scale.category20c().domain([22, 100]).range(["#6cefbf", "#4c6cf5"]),
	donut = d3.layout.pie().sort(null),
	arc = d3.svg.arc().innerRadius(inner).outerRadius(outer);

// Creeër de SVG
var svg = d3.select("#donut").append("svg:svg")
	.attr("width", w)
	.attr("height", h)
	.append("svg:g")
	.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

// Vul de data in de donutgrafiek
var arcs = svg.selectAll("path")
	.data(donut(dataSjors))
	.enter().append("svg:path")
	.attr("fill", function(d, i) { return color(i); })
	.attr("d", arc)
	.each(function(d) { this._current = d; })


// Switchen van persoon. Ik verander de variabele in een nieuw persoon waarmee dan de data veranderd.
// Er zit een duration in welke de elastische ease beter laat zien.
$("#bwino").click(function(){
	data = dataBwino;
	arcs = arcs.data(donut(data));
	arcs.transition().ease("elastic").duration(2000).attrTween("d", arcTween);
});
$("#sjors").click(function(){
	data = dataSjors;
	arcs = arcs.data(donut(data));
	arcs.transition().ease("elastic").duration(2000).attrTween("d", arcTween);
});

$("#thies").click(function(){
	data = dataThies;
	arcs = arcs.data(donut(data));
	arcs.transition().ease("elastic").duration(2000).attrTween("d", arcTween);
});

$("#bram").click(function(){
	data = dataBram;
	arcs = arcs.data(donut(data));
	arcs.transition().ease("elastic").duration(2000).attrTween("d", arcTween);
});

$("#dirk").click(function(){
	data = dataDirk;
	arcs = arcs.data(donut(data));
	arcs.transition().ease("elastic").duration(2000).attrTween("d", arcTween);
});

$("#thijs").click(function(){
		data = dataThijs;
		arcs = arcs.data(donut(data));
		arcs.transition().ease("elastic").duration(2000).attrTween("d", arcTween);
});

// Vergelijk waardes en geef nieuwe terug voor transitie
function arcTween(a) {
	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
		return arc(i(t));
	};
}


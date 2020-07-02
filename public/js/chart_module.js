function graph_chart(type, data, name) {
	Chart.defaults.global.defaultFontSize = 30;
	var canvas = document.createElement('canvas');
	canvas.setAttribute('id', name);
	var obj = {};
	obj['type'] = type;
	obj['data'] = data;
	obj['options'] = {
		responsive: true,
		maintainAspectRatio: true,
	    scales: {
	        yAxes: [{
	            ticks: {
	                beginAtZero: true
	            }
	        }],
	    },
	    legend: {
	    	labels: {
	    		fontColor: 'black'
	    	}
	    }
	}
	var name1 = new Chart(canvas, obj);
	$('#myChart').append(canvas);
}

function transform_data(data, type) {
	if (type === 'pie') {
		var arr = {
			series: []
		};
		for (var i = 0; i < data.length; i++) {
			arr.series.push(data[i].columns.length);
		}
	}
	else if (type === 'donut') {
		var arr = {
			series: []
		};
		var donut = {
			donut: true
		};
		for (var i = 0; i < data.length; i++) {
			arr.series.push(data[i].columns.length);
		}
		arr += ','+donut;
	}
	else {
		var arr = {
			labels: [], series: [[]]
		};
		for (var i = 0; i < data.length; i++) {
			arr.labels.push(data[i].table_name);
			arr.series[0].push(data[i].columns.length);
		}
	}

	console.log(arr);
	return arr;
}

function chart_tooltip(chart, type) {
	var e;
	var $tooltip = $('<div class="tooltip tooltip-hidden"></div>').appendTo($(chart));

	if (type === 'bar')
		e = '.ct-bar';
	else if (type === 'line')
		e = '.ct-point';
	else if (type === 'pie')
		e = '.ct-slice-pie';

	$(document).on('mouseenter', e, function() {
	  var seriesDesc = $(this).closest(e).attr('ct:meta'),
	      value = $(this).attr('ct:value');
	  $tooltip.text('Count: '+ value);
	  $tooltip.removeClass('tooltip-hidden');
	});

	$(document).on('mouseleave', e, function() {
	  $tooltip.addClass('tooltip-hidden');
	});

	$(document).on('mousemove', e, function(event) {
	  $tooltip.css({
	    left: event.offsetX + 5,
	    top: event.offsetY - $tooltip.height() - 30
	  });
	});

	$(document).ready(function(){
	  $('[data-toggle="tooltip"]').tooltip();
	});
}
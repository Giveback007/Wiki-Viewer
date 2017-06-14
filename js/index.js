// Expand btn function
function toggle(num) {
	var x = '#result-body-'+num;
	var y = '#btn'+num;
	$(x).show(500);
	$(y).fadeOut(250);
}

// </> Remove old results before new ones
function action(data) {
	$('#head-div').hide(1000);
	
	var resultDivs = document.getElementsByClassName('result-cards');
	while(resultDivs[0]) {
		resultDivs[0].parentNode.removeChild(resultDivs[0]);
	}
	resultDivGen(data);
}

// </> Search Results -- HTML generator
function resultDivGen(data) {
	for (var i = 0; i < data[1].length; i++) {
		// outer div element
		var result = document.createElement('div');
		result.id = 'result-'+i;
		result.className = 'result-cards';
		// a element for expanding
		var expand = document.createElement('div');
		expand.className = 'btn-div';
		expand.innerHTML = '<button id="btn'+i+'" class="btn" onClick="toggle('+i+')"><i class="fa fa-expand" aria-hidden="true"></i> Preview Summary</button>'
		// a element for link
		var link = document.createElement('a');
		link.href = data[3][i];
		link.target= '_blank'
		// title & body
		var title = '<div class="result-title">'+data[1][i]+'</div>'
		var body =  '<div id="result-body-'+i+'" class="result-body"><hr><p>'+data[2][i]+'</p></div>'
		link.innerHTML = '<div>'+title+body+'</div>';
		// creation
		document.getElementById('results-main-div').appendChild(result);
		document.getElementById('result-'+i).appendChild(link);
		document.getElementById('result-'+i).appendChild(expand);
		var timer = 0 + (i * 100);
		$('.result-cards').delay(timer).fadeIn(200);
	}
}

// </> Wikipedia api
function wikiAPI(searchVal) {
$.ajax({
		url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+searchVal+'&limit='+10,
		type: 'get',
		dataType: "jsonp",
		success: function(data) {
			action(data);
		}
	});
}
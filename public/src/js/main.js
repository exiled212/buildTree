$(document).ready(()=>{


	function setSelect(data, elementClass){
		let sheets = data.file;
		elementClass.setData(sheets);
		let select = $('.selectSheet');
		select.html('');
		for(let i in sheets){
			let sheet = sheets[i];
			let option = document.createElement('option');
			$(option).html(sheet.name);
			$(option).val(i);
			$(select).append(option);
		}
		$(select).trigger('change');
	}

	function selectSheet(){
		let data = treeBuild.getData();
		let value = $(this).val();
		let sheet = data[value];
		let select = $('.selectId');
		let labels = sheet.data[0];
		select.html('');
		for(let i in labels){
			let label = labels[i];
			let option = document.createElement('option');
			$(option).html(label);
			$(option).val(i);
			$(select).append(option);
		}
	}

	function dropTree(){
		let select = $('.selectSheet');
		select.html('');
		treeBuild.clearNodes();
		treeBuild.clearEdges();
		treeBuild.build();
	}

	function getTree(){
		let fontData = {};
		let indexSheet = $('.selectSheet').val();
		let indexLabel = $('.selectLabel').val();
		let indexTitle = $('.selectTitle').val();
		let indexParent = $('.selectParent').val();
		let indexChildren = $('.selectChildren').val();
		let data = treeBuild.getData();
		let sheet = data[indexSheet];
		let dataSheet = sheet.data.filter((value,key)=>key > 0);
		treeBuild.clearNodes();
		treeBuild.clearEdges();
		treeBuild.setIndexData(indexLabel, indexTitle, indexParent, indexChildren);
		for(let i in dataSheet){
			let row = dataSheet[i];
			treeBuild.setNode(row);
			treeBuild.setEdge(row);
		}
		treeBuild.build();
	}


	let options = {
		height: '400px',
		manipulation: true,
		layout: {
			hierarchical: {
				enabled: true,
				direction: "UD",
				sortMethod: "directed",
				nodeSpacing: 350,
				treeSpacing: 150,
				parentCentralization: true,
			}
		},
		interaction: { dragNodes: true, zoomView: true,},
		physics: {
			enabled: false
		},
	};

	let container = document.querySelector('#tree');

	let treeBuild = new TreeBuild(container, options);


	$('#fileTree').on('change', function(){
		let file = this.files;
		treeBuild
			.uploadFile(file)
			.done(function(result){
				setSelect(result, treeBuild);
			})
	});


	$('#reload').on('click', function(){
		dropTree();
		let file = document.querySelector('#fileTree').files;
		treeBuild
			.uploadFile(file)
			.done(function(result){
				setSelect(result, treeBuild);
			})
	})

	$('.selectSheet').on('change', selectSheet);
	$('#build').on('click', getTree);

});



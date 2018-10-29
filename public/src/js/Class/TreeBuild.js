class TreeBuild{

	constructor(container, options = {}){
		this.container = container;
		this.config = options;
		this.nodes = [{id: 0, label: 'Arbol', size: 150, shape: 'box', font: { face: 'monospace', align: 'left'}}];
		this.edges = [];
	}

	build(){
		let dataTree = {
			nodes: this.nodesSet,
			edges: this.edgesSet
		};
		new vis.Network(this.container, dataTree, this.config);
	}

	setNode(row){
		let findNode = this.nodes.filter(item=>item.id == row[this.childrenIndex]);
		if(row.length > 0 && row[this.childrenIndex] && findNode.length == 0){
			this.nodes.push({id: row[this.childrenIndex], label: row[this.titleIndex], size: 150, shape: 'box', font: { face: 'monospace', align: 'left'}});
		}
		this.nodesSet = new vis.DataSet(this.nodes);
	}

	setEdge(row){
		if(row.length > 0 && row[this.childrenIndex] && row[this.parentIndex] != null && row[this.parentIndex] != undefined){
			this.edges.push({from: row[this.parentIndex], to: row[this.childrenIndex] , label:row[this.labelIndex], arrows: 'to', 'physics': true, 'smooth': { 'type': 'cubicBezier' }});
		}
		this.edgesSet = new vis.DataSet(this.edges);
	}

	clearNodes(nodes){
		this.nodes = [{id: 0, label: 'Arbol', size: 150, shape: 'box', font: { face: 'monospace', align: 'left'}}];
	}

	clearEdges(edges){
		this.edges = [];
	}

	setData(data){
		this.data = data;
	}

	getData(){
		return this.data;
	}

	setIndexData(labelIndex, titleIndex, parentIndex, childrenIndex){
		this.titleIndex = titleIndex;
		this.labelIndex = labelIndex;
		this.parentIndex = parentIndex;
		this.childrenIndex = childrenIndex;
	}

	uploadFile(file){
		let fileBlob = new Blob(file, {type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
		let form = new FormData();
		form.append('file', fileBlob);

		return $.ajax({
			type:'POST',
			url:'/file',
			data: form,
			processData: false,
			contentType: false
		})
	}

}
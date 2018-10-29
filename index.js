(()=>{

	require('rootpath')();

	const 	express 		= 	require('express')
	,		bodyParser		=	require('body-parser')
	,		methodOverride	=	require('method-override')
	, 		cons 			= 	require("consolidate")
	, 		fastCsv 		= 	require("fast-csv")
	, 		xlsx 			= 	require("node-xlsx")
	,		path			=	require('path')
	,		fs				=	require('fs')
	,		fileUpload		=	require('express-fileupload')

	let 	app	= express();

	app
	//Configuracion de Express
		.use(express.static('./public'))
		.use(bodyParser.urlencoded({ extended: true }))
		.use(bodyParser.json())
		.use(methodOverride())
		.use(fileUpload())

		.engine('html', cons.swig)

		.set('views', `./public/views`)
		.set('view engine', 'ejs')


		.get('/', (req, res)=>{
			res.render('./index.html');
		})

		.post('/file', (req, res)=>{
			let file = req.files.file;
			let dataFile = xlsx.parse(file.data);
			res.status(200).json({file:dataFile});
		})
	
		.set('port', (process.env.PORT || 3000))

		.listen(app.get('port'), function() {
			console.log('Iniciando drawTree', app.get('port'));
		});

})()
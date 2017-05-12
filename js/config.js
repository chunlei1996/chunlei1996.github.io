


require.config({
	baseUrl: 'js',
	paths: {
		"layer":"plug/layer/layer",
		"jquery": "lib/jquery-1.11.3",
		"template": "plug/template",
		"jquery.cookie": "plug/jquery.cookie",
		"banner":"js/banner"
	},
	shim: {
		"banner":['jquery'],
		"jquery.cookie": ['jquery'],
		 "layer":['jquery']
	}
});
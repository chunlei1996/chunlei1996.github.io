


require.config({
	baseUrl: 'js',
	paths: {
		"layer":"plug/layer/layer",
		"jquery": "lib/jquery-1.11.3",
		"template": "plug/template",
		"jquery.cookie": "plug/jquery.cookie",
		"lazyload":"plug/jquery.lazyload",
		"pagination":"plug/jquery.pagination",
		"banner":"js/banner",
		 "search":"js/search"
	},
	shim: {
		"banner":['jquery'],
		"jquery.cookie": ['jquery'],
		 "layer":['jquery'],
		 "pagination":['jquery'],
		 "lazyload":['jquery']

	}
});
export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["fav.png","favblank.png","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-d1b7557e.js","imports":["_app/immutable/start-d1b7557e.js","_app/immutable/chunks/index-a1b3c11a.js","_app/immutable/chunks/singletons-a7b8be1c.js","_app/immutable/chunks/preload-helper-9b728935.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

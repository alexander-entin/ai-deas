/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
	serverBuildTarget: "cloudflare-pages",
	server: "./server.js",
	devServerBroadcastDelay: 3000,
	ignoredRouteFiles: ["**/.*"],
	// appDirectory: "app",
	// assetsBuildDirectory: "public/build",
	// serverBuildPath: "functions/[[path]].js",
	// publicPath: "/build/",
	future: {
		// v2_routeConvention: true,
	}
};

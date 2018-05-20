const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function init() {
	const features = path.resolve(__dirname, "../features");
	const defaultYamlPath = "./config/default.yaml";

	let arrayOfDirs = [];

	fs.readdirSync(features).forEach(file => {
		if (file.indexOf(".module") > -1) {
			arrayOfDirs.push(`server/features/${file}/`);
		}
	});

	let defaultYaml = yaml.safeLoad(fs.readFileSync(defaultYamlPath));
	defaultYaml.swagger.bagpipes._router.controllersDirs = arrayOfDirs;

	let yamlString = yaml.safeDump(defaultYaml);

	fs.writeFileSync(defaultYamlPath, yamlString);

	console.log("Successfully add controllers dirs to swagger");
}

module.exports = {
	init
};
let fs = require("fs");
let yaml = require("js-yaml");

module.exports = yaml.load(fs.readFileSync("./config/server.yaml"));
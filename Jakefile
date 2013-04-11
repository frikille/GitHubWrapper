var DEPLOY = __dirname + "/pkg/",
    _path = require('path'),
	UglifyJS = require('uglify-js'),
    fs = require('fs');

function include(files, transform) { 
    files = files.map ? files : [files];
    return files.map(function (file) {
        var str = fs.readFileSync(file, "utf-8") + "\n";
        return transform ? transform(str, file) : str;
    }).join('\n');
}

function collect(path, files, matches) {
    matches = matches || function (path) {
        return path.match(/\.js$/);
    };

    if (fs.statSync(path).isDirectory()) {
        fs.readdirSync(path).forEach(function (item) {
            collect(_path.join(path, item), files, matches);
        });
    } else if (matches(path)) {
        files.push(path);
    }
}

desc("runs jake build");
task('default', ['build'], function () {});

desc("clean");
task('clean', [], function () {
    var childProcess = require('child_process'),
        cmd = 'rm -rf ' + DEPLOY + ' && ' +
              'mkdir ' + DEPLOY;

    childProcess.exec(cmd, complete);
}, true);

desc("package everything for a release");
task('build', ['clean'], function () {
    var output = "",
		license = "",
		minified,
		version,
		versionText = "",
        modules = [],
        utils = [];

	// Retrieve the version information
	console.log('Version increment')
    version = JSON.parse(include("JakeVersion"));
	version.build++;
	versionText = '/* VERSION: ' + version.major + '.' + version.minor + '.' + version.revision + '.' + version.build + '*/\n\n';

	// Retrieve our license information
    console.log('Including license'); 
	license = include("JakeLicense");
	license += versionText;

	// Gather our core JS files
    console.log("Gathering Files...");
    output = include("src/GitHubWrapper.js");
    collect(__dirname + "/src/module", modules);
    modules.forEach(function (module) {
        output += include(module);
    });
    collect(__dirname + "/src/util", utils);
    utils.forEach(function (util) {
        output += include(util);
    });

	// Write our our JS files
    console.log('Writing developer version') ;
    fs.writeFileSync(__dirname + "/pkg/GitHubWrapper.js", license + output);

	// Minify
	console.log("Minifying...");
	// First the JavaScript
	license = '/*! GitHubWrapper VERSION: ' + version.major + '.' + version.minor + '.' + version.revision + '.' + version.build + ' | github.com/frikille/GitHubWrapper/blob/master/LICENSE !*/';
	minified = UglifyJS.minify(__dirname + "/pkg/GitHubWrapper.js");
	fs.writeFileSync(__dirname + "/pkg/GitHubWrapper-min.js", license + minified.code);

	// Update our build version
	console.log('Updateing build version');
    versionText = '{"major" : ' + version.major +',	"minor" : ' + version.minor +', "revision" : ' + version.revision + ', "build" : '+ version.build+'}';
	fs.writeFileSync("JakeVersion", versionText);

    console.log("All done. Nice job, Jarvis!");
});
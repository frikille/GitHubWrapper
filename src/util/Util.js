String.prototype.format = function () {
	var str = this,
		args = arguments;
	return str.replace(String.prototype.format.regex, function(item) {
		var intVal = parseInt(item.substring(1, item.length - 1)),
			replace;
		if (intVal >= 0) {
			replace = args[intVal];
		} else if (intVal === -1) {
			replace = "{";
		} else if (intVal === -2) {
			replace = "}";
		} else {
			replace = "";
		}
		return replace;
	});
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
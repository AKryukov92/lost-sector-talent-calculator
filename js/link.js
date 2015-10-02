function TalentLink(linkString) {
	
	this.linkString = linkString;
	this.parts = [];
	
	this.processParts = function() {
		var array = [];
		if (linkString.length != 0) {
			linkString.replace("?", "").split("&").forEach(function(UriItem) {
				var keyvalue = UriItem.split("=");
				var key = keyvalue[0];
				var value = keyvalue[1];
				array.push({"key":key , "value":value });
			});
		}
		this.parts = array;
	}
	
	this.getGameVersion = function() {
		for (var i = 0; i < this.parts.length; i++) {
			if (this.parts[i].key == "t" || this.parts[i].key == "talent") {
				return /(\d*)\das|sc|ju|su_\w*/.exec(this.parts[i].value)[1];
			}
		}
		return 0;
	}
	
	this.processParts();
}
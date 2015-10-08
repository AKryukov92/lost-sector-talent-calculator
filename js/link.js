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
	this.processParts();
}
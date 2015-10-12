var calculator = new Calculator();
var patchdata = {};
var images = [];
function analyze() {
	var reportText = "";
	for (var i = 0; i < calculator.items.length; i++) {
		if (calculator.items[i].base().status == TALENT_LEARNED) {
			reportText += calculator.items[i].base().name + "</br>";
		}
	}
	$("#report").append(reportText);
}
function talentUriHandler(key, value, target) {
	talent = decodeURIComponent(value);
	var match = /(\d*)(\d)(as|sc|ju|su)_(\w*)/.exec(value);
	var initialTalentData = {};
	if (match != null) {
		initialTalentData = {
			gameVersion : match[1],
			dataVersion : match[2],
			classPrefix : match[3],
			talentInput : match[4]
		};
	} else {
		initialTalentData = {
			gameVersion : 101,
			classPrefix : "as"
		};
	}
	var sources = {
		atlasActive: "images/Skills" + initialTalentData.gameVersion + ".png",
		atlasInactive: "images/inactiveSkills" + initialTalentData.gameVersion + ".png",
		items: "images/Items.png"
	};
	loadImages(sources, function(imgs) {
		images = imgs;
		$.get("/talent_data.php?version=" + initialTalentData.gameVersion, function(data) {
			this.patchdata = data;
			if (initialTalentData.classPrefix == "ju") {
				calculator.init(this.patchdata.juggernaut_data);
			}
			if (initialTalentData.classPrefix == "sc") {
				calculator.init(this.patchdata.scout_data);
			}
			if (initialTalentData.classPrefix == "su") {
				calculator.init(this.patchdata.support_data);
			}
			calculator.init(this.patchdata.assault_data);
			calculator.learnTalentsFromString(initialTalentData.talentInput);
			analyze();
		});
	});
}
talentUriHandler("", talentString);
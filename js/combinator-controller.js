var calculator = new Calculator();
var patchdata = {};
var images = [];
function combine() {
	var reportText = "";
	for (var i = 0; i < calculator.items.length; i++) {
		if (calculator.items[i].base().status == TALENT_LEARNED) {
			reportText += calculator.items[i].base().name + "</br>";
		}
	}
	$("#report").append(reportText);
	var combinator = new Combinator();
	combinator.addFromCalculator(calculator);
	combinator.addFromItem(primary);
	combinator.addFromItem(secondary);
	combinator.addFromItem(consumable1);
	combinator.addFromItem(consumable2);
	combinator.addFromItem(consumable3);
	combinator.addFromItem(consumable4);
	combinator.addFromItem(consumable5);
	var temp = combinator.createRoots();
	var total = [];
	reportText = "";
	while(temp.length > 0) {
		total.concat(temp);
		reportText += "<div class='actionset'>";
		for (var i = 0; i < temp.length; i++) {
			var row = temp[i].actions.length + " ";
			for (var j = 0; j < temp[i].actions.length; j++) {
				row += "(" + temp[i].actions[j].name + ") ";
			}
			console.log(row);
		}
		temp = combinator.produceLeaves(temp);
	}
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
			classPrefix : "as",
			talentInput : ""
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
			if (initialTalentData.talentInput.length > 0) {
				calculator.learnTalentsFromString(initialTalentData.talentInput);
			}
			combine();
		});
	});
}
talentUriHandler("", talentString);
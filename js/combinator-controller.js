var calculator = new Calculator();
var patchdata = {};
var images = [];
var combinator = new Combinator();
function fillAvailableActions(combinator) {
	var text = "";
	for (var i = 0; i < combinator.actions.length; i++) {
		var action = combinator.actions[i];
		var imagesource = "";
		var boxSize = 0;
		if (action.imagesrc == "items") {
			imagesource = "images/Items.png";
			boxSize = 64;
		} else if (action.imagesrc == "talents") {
			imagesource = "images/Skills" + initialTalentData.gameVersion + ".png";
			boxSize = 48;
		} else {
			imagesource = "";
		}
		var dx = (action.imageid % 20) * boxSize;
		var dy = (~~(action.imageid / 20)) * boxSize;
		text += 
		"<div style='float:left; width:80px'>" +
			"<div class='action' style='width:" + boxSize + "px;height:" + boxSize + "px;'>"
				+ "<img src='" + imagesource + "' style='margin-left:-" + dx + "px;margin-top:-" + dy + "px'/>"
			+ "</div>"
			+ "<div>"
				+ action.source.name 
			+ "</div>"
			+ "<div>"
				+ action.name
			+ "</div>"
			+ "<input type='checkbox' id='useAction" + action.id + "' checked onclick='actionToggle(" + action.id + ")'>Вкл</input>"
		+ "</div>";
	}
	$("#availableActions").append(text);
}
function actionToggle(actionId) {
	for (var i = 0; i < combinator.actions.length; i++) {
		var action = combinator.actions[i];
		if (action.id == actionId) {
			action.isActive = $("#useAction" + actionId).is(":checked");
			return;
		}
	}
}
$("#runAnalysis").click(function() {
	combine();
});
function prepareActions() {
	var reportText = "";
	$("#report").append(reportText);
	combinator.addSwap();
	combinator.addDuck();
	combinator.addFromCalculator(calculator);
	combinator.addFromItem(primary);
	combinator.addFromItem(secondary);
	combinator.addFromItem(consumable1);
	combinator.addFromItem(consumable2);
	combinator.addFromItem(consumable3);
	combinator.addFromItem(consumable4);
	combinator.addFromItem(consumable5);
	fillAvailableActions(combinator);
}
function combine() {
	var totalSets = combinator.createTree();
	var rowCount = 0;
	for (var i = totalSets.length - 1; i >= 0; i--) {
		totalSets[i].validateRepeatedActions();
		if (!totalSets[i].valid) {
			continue;
		}
		totalSets[i].validateSwapBeforeOtherWeapon();
		if (!totalSets[i].valid) {
			continue;
		}
		for (var j = 0; j < totalSets[i].actions.length; j++) {
			var row = totalSets[i].actions.length + " ";
			for (var j = 0; j < totalSets[i].actions.length; j++) {
				row += "(" + totalSets[i].actions[j].name + " " + totalSets[i].actions[j].source.name + ") ";
			}
			rowCount ++;
			console.log(row);
		}
	}
	console.log(rowCount);
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
			prepareActions();
		});
	});
}
talentUriHandler("", talentString);
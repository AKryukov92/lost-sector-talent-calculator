var calculator = new Calculator();
var patchdata = {};
var images = [];
var combinator = new Combinator();
var initialTalentData = {};
var currentSets = [];

function fillAvailableActions(combinator) {
	var text = "";
	for (var i = 0; i < combinator.actions.length; i++) {
		var action = combinator.actions[i];
		var imagesource = "";
		var boxSize = 0;
		if (action.imagesrc == "items") {
			imagesource = "/images/Items.png";
			boxSize = 64;
		} else if (action.imagesrc == "talents") {
			imagesource = "/images/Skills" + talentsVersionFallback(initialTalentData.gameVersion) + ".png";
			boxSize = 48;
		} else {
			imagesource = "";
		}
		var dx = (action.imageid % 20) * boxSize;
		var dy = (~~(action.imageid / 20)) * boxSize;
		text += 
		"<div style='float:left;'>" +
			"<label><div class='action' style='width:" + boxSize + "px;height:" + boxSize + "px;'>"
				+ "<img src='" + imagesource + "' style='margin-left:-" + dx + "px;margin-top:-" + dy + "px'/>"
			+ "</div>"
			+ "<div>"
				+ getLocalizedProperty(action, "name")
			+ "</div>"
			+ "<input type='checkbox' id='useAction" + action.id + "' checked onclick='actionToggle(" + action.id + ")'/>Вкл</label>"
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
$("#runAnalysis").click(combine);
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
	currentSets = [];
	for (var i = totalSets.length - 1; i >= 0; i--) {
		totalSets[i].validateRepeatedActions();
		if (!totalSets[i].valid) {
			continue;
		}
		totalSets[i].validateSwapBeforeOtherWeapon();
		if (!totalSets[i].valid) {
			continue;
		}
		currentSets.push(totalSets[i]);
		//console.log(totalSets[i].toString());
	}
	estimate(currentSets[0], calculator);
	console.log(currentSets.length);
}
function talentUriHandler(key, value, target) {
	talent = decodeURIComponent(value);
	var match = /(\d*)(\d)(as|sc|ju|su)_(\w*)/.exec(value);
	if (match != null) {
		initialTalentData = {
			gameVersion : match[1],
			dataVersion : match[2],
			classPrefix : match[3],
			talentInput : match[4]
		};
	} else {
		initialTalentData = {
			gameVersion : 102,
			classPrefix : "as",
			talentInput : ""
		};
	}
	var sources = {
		atlasActive: "/images/Skills" + talentsVersionFallback(initialTalentData.gameVersion) + ".png",
		items: "/images/Items.png"
	};
	loadImages(sources, function(imgs) {
		images = imgs;
		$.get("/talent_data.php?version=" + initialTalentData.gameVersion, function(data) {
			this.patchdata = data;
			if (typeof initialTalentData.classPrefix != 'undefined'){
				calculator.init(this.patchdata[initialTalentData.classPrefix]);
			} else {
				calculator.init(this.patchdata.as);
			}
			if (initialTalentData.talentInput.length > 0) {
				calculator.learnTalentsFromString(initialTalentData.talentInput);
			}
			prepareActions();
			$("#runAnalysis").prop('disabled',false);
		});
	});
}
talentUriHandler("", talentString);
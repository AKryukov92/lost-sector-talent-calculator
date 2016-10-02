var calculator = new Calculator();
var patchdata = {};
var images = [];
var combinator = new Combinator();
var initialTalentData = {};
var currentSets = [];
var inventoryApp = new InventoryModel("en", defaultVersion);

function fillAvailableActions(combinator) {
	var text = "";
	for (var i = 0; i < combinator.actions.length; i++) {
		text += "<div style='float:left;'><label>" + combinator.actions[i].toString()
		+ "<input type='checkbox' id='useAction" + this.id + "' checked onclick='actionToggle(" + this.id + ")'/>Вкл</label>"
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
	var estimatedResults = [];
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
		estimatedResults.push(estimate(totalSets[i], calculator));
		//console.log(totalSets[i].toString());
	}
	estimatedResults.sort(function(l,r) {
		return r.totalMin - l.totalMin;
	});
	var report = "";
	for (var i = 0; i < 200 && i < estimatedResults.length; i++){
		estimatedResults[i].actionSet.validateSwapBeforeOtherWeapon();
		report += "<div class='action-set'>" 
			+ estimatedResults[i].actionSet.toString() 
			+ "<span style='float:right'>min:" + estimatedResults[i].totalMin 
			+ " max:" + estimatedResults[i].totalMax + "</span>"
		"</div>";
	}
	$("#report").html(report);
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
			gameVersion : defaultVersion,
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
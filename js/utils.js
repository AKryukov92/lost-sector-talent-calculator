function loadImages(sources, callback) {
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	// get num of sources
	for(var src in sources) {
		numImages++;
	}
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadedImages >= numImages) {
				callback(images);
			}
		};
		images[src].src = sources[src];
	}
}
// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
var recentId;

function resizeIframe(obj) {
	window.setTimeout(function() {
		if (obj.contentWindow.document.body != null) {
			obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
		}
	}, 100);
}
function update_link() {
	var link = location.origin + "/?t=" +
	talentApplication.patchdata.game_version + talentApplication.patchdata.data_version + talentApplication.activeClass.calculator.prefix + "_" + talentApplication.activeClass.calculator.getTalentString();
	if (typeof player_model != 'undefined') {
		var slot = player_model.slots["primary"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&p=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
		}
		slot = player_model.slots["secondary"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&s=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
		}
		slot = player_model.slots["armor"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&a=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
		}
		slot = player_model.slots["hat"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&h=" + slot.item.id;
		}
		slot = player_model.slots["consumable_1"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&c1=" + slot.item.id;
		}
		slot = player_model.slots["consumable_2"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&c2=" + slot.item.id;
		}
		slot = player_model.slots["consumable_3"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&c3=" + slot.item.id;
		}
		slot = player_model.slots["consumable_4"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&c4=" + slot.item.id;
		}
		slot = player_model.slots["consumable_5"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&c5=" + slot.item.id;
		}
	}
	$("#link-to-build").val(link);
}
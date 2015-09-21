$(document).ready(function(){ 
  document.oncontextmenu = function() {return false;};
  
    $( "#armor-slider" ).slider({
      value:0,
      min: 0,
      max: 15,
      step: 1,
      change: function( event, ui ) {
		quality_change_handler("armor");
      },
	  slide: function( event, ui ) {
		slider_slide_handler("armor", event, ui);
	  }
    });
	$( "#armor-value" ).html( "" );
	$("[name=\"armor-quality\"]").change(
		function(){
			quality_change_handler("armor");
		}
	);
	$("#armor-container").tooltip({
		show:{delay:200},
		content:""
	});
	
    $( "#primary-slider" ).slider({
      value:0,
      min: 0,
      max: 15,
      step: 1,
      change: function( event, ui ) {
		  quality_change_handler("primary");
      },
	  slide: function(event, ui) {
		slider_slide_handler("primary", event, ui);
	  }
    });
    $( "#primary-value" ).html( "" );
	$("[name=\"primary-quality\"]").change(
		function(){
			quality_change_handler("primary");
		}
	);
	$("#primary-container").tooltip({
		show:{delay:200},
		content:""
	});
	
    $( "#secondary-slider" ).slider({
      value:0,
      min: 0,
      max: 15,
      step: 1,
      change: function( event, ui ) {
		  quality_change_handler("secondary");
      },
	  slide: function(event, ui) {
		slider_slide_handler("secondary", event, ui);
	  }
    });
    $( "#secondary-value" ).html( "" );
	$("[name=\"secondary-quality\"]").change(
		function(){
			quality_change_handler("secondary");
		}
	);
	$("#secondary-container").tooltip({
		show:{delay:200},
		content:""
	});
	
	$("#hat-container").tooltip({content:""});
	$("#consumable_1-container").tooltip({
		show:{delay:200},
		content:""
	});
	$("#consumable_2-container").tooltip({
		show:{delay:200},
		content:""
	});
	$("#consumable_3-container").tooltip({
		show:{delay:200},
		content:""
	});
	$("#consumable_4-container").tooltip({
		show:{delay:200},
		content:""
	});
	$("#consumable_5-container").tooltip({
		show:{delay:200},
		content:""
	});
	fill_available_items();
});

function quality_change_handler(slot_name) {
	if ($.isEmptyObject(player_model.slots[slot_name].item)) {
		return;
	}
	player_model.update_slot_tooltip(slot_name);
	if (typeof update_link != 'undefined') {
		update_link();
	}
}

function set_grade(slot_name, value){
  var element = $("#" + slot_name + "-value");
  player_model.slots[slot_name].grade = value;
  if (value === 0) {
	element.html( "" );
  } else {
	element.html( " +" + value );
  }
}

function slider_slide_handler(slot_name, event, ui) {
	if ($.isEmptyObject(player_model.slots[slot_name].item)) {
		return;
	}
	set_grade(slot_name, ui.value);	
	if (typeof update_link != 'undefined') {
		update_link();
	}
}

var player_model = {
	slots:{
		primary: {short_name :"p", item:{} },
		secondary: { short_name :"s", item:{} },
		armor: { short_name :"a", item:{} },
		hat: { short_name :"h", item:{} },
		consumable_1: { short_name :"c1", item:{} },
		consumable_2: { short_name :"c2", item:{} },
		consumable_3: { short_name :"c3", item:{} },
		consumable_4: { short_name :"c4", item:{} },
		consumable_5: { short_name :"c5", item:{} },
	},
	add_item:function(slot_name, item){
		var slot = player_model.slots[slot_name];
		if (typeof(slot) == 'undefined')
			return;
		slot.item = item;
	},
	update_slot_tooltip:function(slot_name){
		var selected_color = $("input[name=" + slot_name +"-quality]:checked", "#" + slot_name).val();
		if (typeof selected_color == 'undefined') {
			selected_color = "white";
		}
		this.slots[slot_name].color = selected_color;
		var selected_quality = $("#" + slot_name + "-slider").slider("option", "value");
		var item = player_model.slots[slot_name].item;
		if (!$.isEmptyObject(item) && typeof item.id != 'undefined'){
			set_grade(slot_name, selected_quality);
			$("#" + slot_name + "-name").text(item.name);
			var link = "/item.php?id=" + item.id + "&color=" + selected_color + "&quality=" + selected_quality;
			$("#" + slot_name + "-link").attr("href", link);
			$("#" + slot_name + "-link").removeClass("grey-link white-link green-link blue-link").addClass(selected_color + "-link");
			$("#" + slot_name + "-iframe").attr("src", link + "&iframe=true");
		}
	},
	reset_inventory_slot:function(slot_name) {
		player_model.add_item(slot_name, {});
		$("#" + slot_name + "-link").attr("href", "");
		$("#" + slot_name + "-container").html("<img src=\"itemspng/slot-" + slot_name + ".png\">");
		$("#" + slot_name + "-name").text("");
		$("#" + slot_name + "-value").text("");
		if (typeof update_link != 'undefined') {
			update_link();
		}
	},
	remove_item:function(item){
		for (slot in this.slots) {
			if(slot.item.id === item.id) {
				slot.item = null;
			}
		}
	}
};
function equip_item(item, slot_name) {
	var old_item = player_model.slots[slot_name].item;
	if (!$.isEmptyObject(old_item)) {
		player_model.reset_inventory_slot(slot_name);
	}
	player_model.add_item(slot_name, item);
	$("#" + slot_name + "-container").empty();
	$("#" + slot_name + "-container").prop("title");
	var image_id;
	if (typeof item.imageid != 'undefined') {
		image_id = item.imageid;
	} else {
		image_id = item.id;
	}
	$("#" + slot_name + "-container").html("<img id='item_" + item.id + "' src='itemspng/item" + image_id + "00.png'/>");
	player_model.update_slot_tooltip(slot_name);
	if (typeof update_link != 'undefined') {
		update_link();
	}
}
function get_item_by_id(query_id){
	for (var i = 0; i < patchdata.item_data.length; i++) {
		var current = patchdata.item_data[i];
		if (typeof(current) == 'undefined') {
			continue;
		}
		if (typeof(current.id) == 'undefined') {
			continue;
		}
		if (typeof(current.category) == 'undefined') {
			continue;
		}
		if (current.id == query_id){
			return current;
		}
	}
}
function add_item_to_pool(item){
	if (typeof item.imageid != 'undefined') {
		var item_image_id = item.imageid;
	} else {
		var item_image_id = item.id;
	}
	var diffy = (~~(item_image_id / 20)) * 64;
	var diffx = item_image_id % 20 * 64;
	$("#" + item.category + "-pool")
		.append("<div class=\"swimmer\">" +
			"<div id=\"item_" + item.id + "\" class=\"swimmer-image-container\">" +
				"<img src=\"items.png\" style=\"margin-left:-" + diffx + "px;margin-top:-" + diffy + "px;\"/>" +
			"</div>" +
			"<span class=\"fake-tooltip\">" + item.name + "</span>" +
		"</div>");
	$("#item_" + item.id).draggable({
		containment:"document",
		helper:"clone",
		appendTo: "body"
	});
}
function fill_available_items(){
	var possible_slots = {
		primary:"",
		secondary:"",
		armor:"",
		consumable_1:"",
		consumable_2:"",
		consumable_3:"",
		consumable_4:"",
		consumable_5:"",
		hat:""
	};
	for (var i = 0; i < patchdata.item_data.length; i++) {
		var current = patchdata.item_data[i];
		if (typeof(current) == 'undefined') {
			continue;
		}
		if (typeof(current.id) == 'undefined') {
			continue;
		}
		if (typeof(current.category) == 'undefined') {
			continue;
		}
		//console.log("adding " + current.name + " to pool");
		add_item_to_pool(current);
		var slots_of_item = patchdata.weapontype_map[current.category].slots;
		for (var j = 0; j < slots_of_item.length; j ++) {
			if (possible_slots[slots_of_item[j]] === "") {
				possible_slots[slots_of_item[j]] += "#item_" + current.id;
			} else {
				possible_slots[slots_of_item[j]] += ", #item_" + current.id;
			}
		}
	}
	for (slot in possible_slots) {
		$("#" + slot + "-container").droppable({
			accept:possible_slots[slot],
			activeClass: "ui-state-hover",
			hoverClass: "ui-state-active",
			drop:function(event, ui) {
				var item_id = ui.draggable.context.id.split("_")[1];
				var item = get_item_by_id(item_id);
				var slot_name = $(this).context.id.split("-")[0];
				equip_item(item, slot_name);
			}
		});
	}
}

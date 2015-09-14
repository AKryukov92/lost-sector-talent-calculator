function talentclick(event){
	var talent = event.data;
	var ranks = talent_grid_model.layout_model[talent_grid_model.get_row_for_level(talent.lvlreq)].columns[talent.column].items;
	var i;
	for (i = 0; i < ranks.length; i++) {
		if (!player_model.talent_learned(ranks[i]))
			break;
	}
	if (i < ranks.length) {
		if (player_model.can_learn_talent(ranks[i])){
			player_model.learn_talent(ranks[i]);
			talent_grid_model.update_layout_options();
		}
	}
}
function talentrightclick(event){
	if (typeof last_visited_element == 'undefined')
		return;
	var talent = last_visited_element;
	var ranks = talent_grid_model.layout_model[talent_grid_model.get_row_for_level(talent.lvlreq)].columns[talent.column].items;
	var i;
	for (i = ranks.length; i > 0; i--) {
		if (player_model.talent_learned(ranks[i-1]))
			break;
	}
	if (i > 0) {
		if (player_model.can_unlearn_talent(ranks[i-1])) {
			player_model.unlearn_talent(ranks[i-1]);
			talent_grid_model.update_layout_options();
		}
	}
}

//Эта группа функций отвечает за то, чтобы событие правой кнопки мыши корректно вызывало соответствующую функцию для талантов
function talenthover(event) {
	last_visited_element = event.data;
	handled_recently = true;
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

$(document).ready(function(){ 
  document.oncontextmenu = function() {return false;};
  
	$("#tabs").mouseover(function(){
		if (!handled_recently)
			last_visited_element = undefined;
		handled_recently = false;
	});

	$("#tabs").mousedown(function(e){ 
		if( e.button == 2 ) { 
			talentrightclick(e);
			return false; 
		}
		return true; 
	});
	$('#tabs').on('mousedown', function(e) {
		e.preventDefault();
	});
	$("#assault-link").click(function(){
		talent_grid_model.select_data("as");
	});
	$("#juggernaut-link").click(function(){
		talent_grid_model.select_data("ju");
	});
	$("#scout-link").click(function(){
		talent_grid_model.select_data("sc");
	});
	$("#support-link").click(function(){
		talent_grid_model.select_data("su");
	});

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
	$("#link-to-build").click(function(){window.prompt("Для копирования нажмите: Ctrl+C, Enter", $("#link-to-build").val());});
	var talent,
		tmp = [];
	location.search
		.replace ( "?", "" )
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			if (tmp[0] === "talent") {
				talent = decodeURIComponent(tmp[1]);
				var game_version = talent.split("_")[0];
				var talent_input = talent.split("_")[1];
				var class_prefix = game_version.substr(game_version.length - 2, 2);
				talent_grid_model.select_data(class_prefix);
				var index = $('#tabs a[href="#tabs-'+ class_prefix + '"]').parent().index();
				$("#tabs").tabs("option", "active", index);
				var data_version = game_version.substr(game_version.length - 3, 1);
				if (data_version == patchdata.data_version) {
					player_model.learn_encoded_talents(talent_input);
				}
			}
			if (tmp[0] === "primary") {
				itemstring = decodeURIComponent(tmp[1]);
				var item = get_item_by_id(itemstring.split("_")[0]);
				player_model.slots["primary"].color = itemstring.split("_")[1];
				player_model.slots["primary"].quality = itemstring.split("_")[2];
				$("#primary-slider").slider("value", player_model.slots["primary"].quality);
				$("#primary-quality-" + player_model.slots["primary"].color).prop('checked', true);
				equip_item(item, "primary");
			}
			if (tmp[0] === "secondary") {
				itemstring = decodeURIComponent(tmp[1]);
				var item = get_item_by_id(itemstring.split("_")[0]);
				player_model.slots["secondary"].color = itemstring.split("_")[1];
				player_model.slots["secondary"].quality = itemstring.split("_")[2];
				$("#secondary-slider").slider("value", player_model.slots["secondary"].quality);
				$("#secondary-quality-" + player_model.slots["secondary"].color).prop('checked', true);
				equip_item(item, "secondary");
			}
			if (tmp[0] === "armor") {
				itemstring = decodeURIComponent(tmp[1]);
				var item = get_item_by_id(itemstring.split("_")[0]);
				player_model.slots["armor"].color = itemstring.split("_")[1];
				player_model.slots["armor"].quality = itemstring.split("_")[2];
				$("#armor-slider").slider("value", player_model.slots["armor"].quality);
				$("#armor-quality-" + player_model.slots["armor"].color).prop('checked', true);
				equip_item(item, "armor");
			}
			if (tmp[0] === "hat") {
				itemstring = decodeURIComponent(tmp[1]);
				var item = get_item_by_id(itemstring.split("_")[0]);
				equip_item(item, "hat");
			}
			if (tmp[0] === "consumable1") {
				itemstring = decodeURIComponent(tmp[1]);
				var item = get_item_by_id(itemstring.split("_")[0]);
				equip_item(item, "consumable_1");
			}
			if (tmp[0] === "consumable2") {
				itemstring = decodeURIComponent(tmp[1]);
				var item = get_item_by_id(itemstring.split("_")[0]);
				equip_item(item, "consumable_2");
			}
			if (tmp[0] === "consumable3") {
				itemstring = decodeURIComponent(tmp[1]);
				var item = get_item_by_id(itemstring.split("_")[0]);
				equip_item(item, "consumable_3");
			}
			if (tmp[0] === "consumable4") {
				itemstring = decodeURIComponent(tmp[1]);
				var item = get_item_by_id(itemstring.split("_")[0]);
				equip_item(item, "consumable_4");
			}
			if (tmp[0] === "consumable5") {
				itemstring = decodeURIComponent(tmp[1]);
				var item = get_item_by_id(itemstring.split("_")[0]);
				equip_item(item, "consumable_5");
			}
		});
	if (typeof talent == 'undefined') {
		talent_grid_model.select_data("as");
	}
});
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


function quality_change_handler(slot_name) {
	if ($.isEmptyObject(player_model.slots[slot_name].item)) {
		return;
	}
	player_model.update_slot_tooltip(slot_name);
	player_model.update_link();
}

function slider_slide_handler(slot_name, event, ui) {
	if ($.isEmptyObject(player_model.slots[slot_name].item)) {
		return;
	}
	set_grade(slot_name, ui.value);	
	player_model.update_link();
}

var last_visited_element = {};
var handled_recently = false;

var talent_grid_model = {
	//load data
	maxrow: 0,
	maxcol: 0,
	layout_model: [],
	current_class_data: {},
	select_data: function(class_name){
		switch(class_name){
			case "ju":
			this.current_class_data = patchdata.juggernaut_data;
			break;
			case "sc":
			this.current_class_data = patchdata.scout_data;
			break;
			case "su":
			this.current_class_data = patchdata.support_data;
			break;
			default: //"assault":
			this.current_class_data = patchdata.assault_data;
		}
		player_model.clear();
		this.assign_power_to_talents();
		this.create_layout_model();
		this.prepare_layout_model();
		//Раскомментируй следующие три строчки, чтобы сетка талантов построилась динамически.
		// this.prepare_grid();
		// this.fill_grid_rows();
		// this.draw_talent_forks();
		this.assign_click_routines();
		this.prepare_tooltips();
		this.update_layout_options();
	},
	assign_power_to_talents:function(){
		this.maxrow = this.current_class_data.grid_height;
		var i;
		var power = 1;
		this.maxcol = 0;
		for(i = 0; i < this.current_class_data.talents.length;i++){
			if (this.current_class_data.talents[i].column > this.maxcol)
				this.maxcol = this.current_class_data.talents[i].column;
			this.current_class_data.talents[i].power = power;
			power *= 2;
		}
		this.maxcol++;
	},
	create_layout_model:function(){
		this.layout_model = [];
		this.maxrow = this.current_class_data.grid_height;
		var i;
		var rowindex;
		var colindex;
		//Готовим сетку
		for (rowindex = 0; rowindex < this.maxrow; rowindex++) {
			this.layout_model[rowindex] = {};
			this.layout_model[rowindex].columns = new Array();
			for(colindex = 0; colindex < this.maxcol; colindex++) {
				this.layout_model[rowindex].columns[colindex] = {};
				this.layout_model[rowindex].columns[colindex].items = new Array();
			}
			if (rowindex >= this.current_class_data.rows.length){
				console.log("rowindex is out of bounds");
			}
		}
	},
	prepare_grid: function(){
		$("#" + this.current_class_data.prefix + "-layout").empty();
		this.maxrow = this.current_class_data.grid_height;
		var i;
		var rowindex;
		var colindex;
		//Готовим сетку
		for (rowindex = 0; rowindex < this.maxrow; rowindex++) {
			if (rowindex >= this.current_class_data.rows.length){
				console.log("rowindex is out of bounds");
			}
			var div_content;
			div_content = "<div id=\"" + this.current_class_data.prefix + "-lvl" + rowindex + "\" class=\"level-content\">";
			div_content += "<div class=\"level-header\">Уровень " + this.current_class_data.rows[rowindex].level + "</div></div>";
			$("#" + this.current_class_data.prefix + "-layout").append(div_content);
		}
	},
	prepare_layout_model: function(){
		//Заполняем сетку строками с уровнями
		var i;
		for (i = 0; i < this.current_class_data.talents.length; i++) {
			var current = this.current_class_data.talents[i];
			var target_row;
			if (typeof current.column == 'undefined'){
				console.log("Column index for " + current.name + " is missing.");
			}
			if (typeof current.lvlreq == 'undefined'){
				console.log("Required level for " + current.name + " is missing.");
			}
			if (current.column >= this.current_class_data.grid_width || target_row >= this.current_class_data.grid_height) {
				console.log("Talent " + current.name + " is out of bounds");
			}
			if (typeof current.rankof != 'undefined'){
				console.log("last pushed:" + current.name + "variant 1. row " + target_row + " level " + current.lvlreq + " column " + current.column);
				target_row = this.get_row_for_level(this.get_base_for_rank(current).lvlreq);
			} else {
				console.log("last pushed:" + current.name + " variant 2. row " + target_row + " level " + current.lvlreq + " column " + current.column);
				target_row = this.get_row_for_level(current.lvlreq);
			}
			this.layout_model[target_row].columns[current.column].items.push(current);
		}
	},
	setTalentImageBackground: function(imageName, talent) {
		if (typeof talent.imageid != 'undefined') {
			var talent_image_id = talent.imageid;
		} else {
			var talent_image_id = talent.id;
		}
		var diffy = (~~(talent_image_id / 20)) * 40;
		var diffx = talent_image_id % 20 * 40;
		$("#" + this.current_class_data.prefix + "-talent-container" + talent.id).css("background","url(" + imageName +") -" + diffx + "px -" + diffy + "px");
	},
	fill_grid_rows: function(){
		// Проецируем модель таблицы в html
		for (rowindex = 0; rowindex < this.maxrow; rowindex++) {
			for	(colindex = 0; colindex < this.maxcol; colindex++) {
				if (this.layout_model[rowindex].columns[colindex].items.length > 0) {
					var current = this.layout_model[rowindex].columns[colindex].items[0];
					$("#" + this.current_class_data.prefix + "-lvl" + rowindex).append("<div id=\"" + this.current_class_data.prefix + "-talent-container" + current.id + "\" class=\"talent-container\" title=\"\"></div>");
					this.setTalentImageBackground("/inactiveSkills.png", current);
					$("#" + this.current_class_data.prefix + "-talent-container" + current.id).append("<div id=\"" + this.current_class_data.prefix + "-lock-rect" + current.id + "\" class=\"lock-rect\"></div>");
					if (typeof current.AP_cost != 'undefined'){
						$("#" + this.current_class_data.prefix + "-talent-container" + current.id).append("<div class=\"talent-green\"></div>");
					}
					
					//$("#talent-container" + current.id).append("<div class=\"lock-rect\"></div>");
					if (this.layout_model[rowindex].columns[colindex].items.length > 1) {
						$("#" + this.current_class_data.prefix + "-talent-container" + current.id).append("<div id=\"talent-container-rank\" class=\"talent-rank\">0/" + this.layout_model[rowindex].columns[colindex].items.length + "</div>");
					}
				} else {
					$("#" + this.current_class_data.prefix + "-lvl" + rowindex).append("<div class=\"talent-placeholder\"/>");
				}
			}
		}
	},
	assign_click_routines:function(){
		for (rowindex = 0; rowindex < this.maxrow; rowindex++) {
			for	(colindex = 0; colindex < this.maxcol; colindex++) {
				if (this.layout_model[rowindex].columns[colindex].items.length > 0) {
					var current = this.layout_model[rowindex].columns[colindex].items[0];
					if (current.id > 100) {
						var temptemp = 0;
					}
					$("#" + this.current_class_data.prefix + "-talent-container" + current.id).click(current, talentclick);
					$("#" + this.current_class_data.prefix + "-talent-container" + current.id).mouseover(current, talenthover);
				}
			}
		}
	},
	update_tooltip:function(current) {
		var class_prefix = talent_grid_model.current_class_data.prefix;
		$(function(){
			$("#" + talent_grid_model.current_class_data.prefix + "-talent-container" + current.id).tooltip({
				track:true,
				show:{delay:200},
				content:"<iframe scrolling=\"no\" src=\"/talent.php?id=" + current.id + "&prefix=" + class_prefix +"&iframe=true\" frameBorder=\"0\" onload=\"javascript:resizeIframe(this);\"></iframe>"
			})
		});
	},
	prepare_tooltips:function(){
		var i;
		for(i = 0; i < talent_grid_model.current_class_data.talents.length; i++) {
			this.update_tooltip(talent_grid_model.current_class_data.talents[i]);
		}
	},
	draw_talent_forks:function(){
		var rowindex;
		var colindex;
		for (rowindex = 0; rowindex < this.maxrow; rowindex++) {
			for	(colindex = 0; colindex < this.maxcol; colindex++) {
				if (this.layout_model[rowindex].columns[colindex].items.length == 0)
					continue;
				var current = this.layout_model[rowindex].columns[colindex].items[0];
				var subs = this.get_submissive_talents(current);
				var i = 0;
				for(i = 0; i < subs.length; i++){//рисуем простые белые линии ко всем дочерним талантам
					var div_content;
					if (subs[i].column >= current.column){
						var coldiff = subs[i].column-current.column;
						var rowdiff = this.get_row_for_level(subs[i].lvlreq) - this.get_row_for_level(current.lvlreq);
						div_content = "<svg class=\"talent-fork\" style=\"left:0px\" width=\"" + (44+coldiff*40) + "\"";
						div_content+= " height=\"" + ((rowdiff-1)*49+9) + "\">";
						div_content+= "<path style=\"fill:none;stroke-width:1;stroke-opacity:1;stroke:white;\"";
						div_content+= " d=\"m 20,0 " + (coldiff*44) + ", " + ((rowdiff-1)*49+9)+ "\"></path>";
						div_content+= "</svg>";
					} else {
						var coldiff = current.column - subs[i].column;
						var rowdiff = this.get_row_for_level(subs[i].lvlreq) - this.get_row_for_level(current.lvlreq);
						div_content = "<svg class=\"talent-fork\" style=\"right:0px\" width=\"" + (42 + coldiff*42) + "\"";
						div_content+= " height=\""+((rowdiff-1)*49+9)+"\">";
						div_content+="<path style=\"fill:none;stroke-width:1;stroke-opacity:1;stroke:white;\"";
						div_content+=" d=\"m "+(coldiff*40+24)+",0 " + ((-coldiff)*44-4)+", " + ((rowdiff-1)*49+9) + "\"></path>";
						div_content+="</svg>";
					}
					$("#" + this.current_class_data.prefix + "-talent-container" + current.id).append(div_content);
				}
			}
		}
	},
	get_row_for_level: function(level){
		var i;
		for (i = 0; i < this.current_class_data.rows.length; i++){
			if (this.current_class_data.rows[i].level == level)
				return i;
		}
	},
	get_base_for_rank: function(talent){
		if (typeof talent.rankof == 'undefined')
			return talent;
		var j;
		for (j = 0; j < this.current_class_data.talents.length; j++) {
			if (this.current_class_data.talents[j].id == talent.rankof) {
				return this.current_class_data.talents[j];
			}
		}
	},
	get_submissive_talents: function (talent){
		var _ret = [];
		var i;
		for(i = 0; i < this.current_class_data.talents.length;i++){
			if (this.current_class_data.talents[i].talentreq == talent.id)
				_ret.push(this.current_class_data.talents[i]);
		}
		return _ret;
	},
	update_layout_options:function(){
		var rowindex, colindex;
		for (rowindex = 0; rowindex < this.maxrow; rowindex++) {
			for	(colindex = 0; colindex < this.maxcol; colindex++) {
				if (this.layout_model[rowindex].columns[colindex].items.length == 0)
					continue;
				var current = this.layout_model[rowindex].columns[colindex].items[0];
				if (player_model.talent_learned(current)) {
					this.setTalentImageBackground("/Skills.png", current);
				} else {
					this.setTalentImageBackground("/inactiveSkills.png", current);
					if (player_model.can_learn_talent(current))
						$("#" + this.current_class_data.prefix + "-lock-rect" + current.id).hide();
					else
						$("#" + this.current_class_data.prefix + "-lock-rect" + current.id).show();
				}
				if (this.layout_model[rowindex].columns[colindex].items.length > 1){
					var basic = this.get_base_for_rank(current);
					var ranks = this.layout_model[talent_grid_model.get_row_for_level(current.lvlreq)].columns[current.column].items;
					var i;
					var learned_count = 0;
					for (i = 0; i < ranks.length; i++) {
						if (player_model.talent_learned(ranks[i])){
							learned_count++;
						}
					}
					$("#" + this.current_class_data.prefix + "-talent-container" + basic.id + " #talent-container-rank").html(learned_count + "/" + this.layout_model[rowindex].columns[colindex].items.length);
				}
			}
		}
	},
	update_requiremens_layout:function(lvlreq, ptsleft){
		$("#merc-level").html(lvlreq);
		$("#points-left").html(ptsleft);
	}
}
//Количество доступных очков навыка вычисляется по формуле: (уровень - 4)*3+4
var player_model = {
	required_level:0,
	talents: [],
	slots:{
		primary: {short_name :"p", item:{} },
		secondary: { short_name :"s", item:{} },
		armor: { short_name :"a", item:{} },
		hat: { short_name :"h", item:{} },
		consumable_1: { short_name :"c1", item:{} },
		consumable_2: { short_name :"c2", item:{} },
		consumable_3: { short_name :"c3", item:{} },
		consumable_4: { short_name :"c4", item:{} },
		consumable_5: { short_name :"c5", item:{} },},
	clear:function(){
		this.talents = [];
		talent_grid_model.update_requiremens_layout(1,1);
	},
	get_spent_talents_points: function (){
		var i;
		var count = 0;
		for (i = 0; i < this.talents.length; i++) {
			if (typeof this.talents[i].cost != 'undefined')
				count += this.talents[i].cost;
		}
		return count;
	},
	get_powersum:function(){
		var i;
		var powersum = 0;
		for(i = 0; i < this.talents.length; i++) {
			powersum += this.talents[i].power;
		}
		return powersum;
	},
	convert_powersum_to_string:function(){
		var powersum = this.get_powersum();
		var modulo;
		var code = "";
		do {
			modulo = powersum % 33;
			powersum = (powersum-modulo)/33;
			if (modulo >= 10) {
				code += String.fromCharCode(modulo+87);
			} else {
				code += modulo;
			}
		} while (powersum > 0);
		return code;
	},
	convert_string_to_powersum:function(input){
		if (input == 'undefined') {
			return;
		}
		var powersum = 0;
		var power = 1;
		var chr;
		var i = 0;
		while (i < input.length){
			chr = input.charCodeAt(i);
			if (chr >= 97 && chr <= 122){
				powersum += (chr - 87) * power;
			} else if (chr >= 48 && chr <= 57){
				powersum += (chr - 48) * power;
			} else {
				console.log("unexpected character: " + chr)
			}
			power *= 33;
			i++;
		}
		return powersum;
	},
	learn_encoded_talents:function(input){
		var powersum = this.convert_string_to_powersum(input);
		var i;
		if (powersum >= talent_grid_model.current_class_data.talents[talent_grid_model.current_class_data.talents.length - 1].power*2) {
			powersum = 0;
		}
		for (i = talent_grid_model.current_class_data.talents.length - 1; i >= 0; i--) {
			var talent = talent_grid_model.current_class_data.talents[i];
			if (talent.power <= powersum) {
				this.add_talent(talent);
				powersum -= talent.power;
			}
		}
		var spent_points = this.get_spent_talents_points();
		talent_grid_model.update_requiremens_layout(this.get_required_level(spent_points), this.get_available_talent_points(spent_points));
		talent_grid_model.update_layout_options();
	},
	get_required_level: function (spent_points) {
		var max_level_to_invest;
		if (spent_points == 0)
			max_level_to_invest = 1;
		if (spent_points <= 4) {
			max_level_to_invest = spent_points;
		} else {
			max_level_to_invest = Math.ceil((spent_points - 4) / 3) + 4;
		}
		var i;
		var max_level_to_pick = 0;
		for(i = 0; i < this.talents.length; i++) {
			if (this.talents[i].lvlreq > max_level_to_pick)
				max_level_to_pick = this.talents[i].lvlreq;
		}
		if (max_level_to_invest > max_level_to_pick)
			return max_level_to_invest;
		else
			return max_level_to_pick;
	},
	get_available_talent_points: function(spent_points) {
		var expected_level = this.get_required_level(spent_points);
		var total_talent_points;
		if (expected_level < 5)
			total_talent_points = expected_level;
		else
			total_talent_points = (expected_level - 4) * 3 + 4;
		return total_talent_points - spent_points;
	},
	talent_learned: function (talent) {
		var i;
		for (i = 0; i < this.talents.length; i++) {
			if (this.talents[i] == talent) {
				return true;
			}
		}
		return false;
	},
	can_learn_talent: function(talent){
		if (this.talent_learned(talent))
			return false;
		if (typeof talent.talentreq != 'undefined') {
			var can_learn = false;
			var i;
			for (i = 0; i < this.talents.length; i++) {
				if (this.talents[i].id == talent.talentreq) {
					can_learn = true;
				}
			}
			if (!can_learn)
				return false;
			else{
				for (i = 0; i < this.talents.length; i++) {
					if (this.talents[i].talentreq == talent.talentreq) {
						return false;
					}
				}
				return true;
			}	
		}
		return true;
	},
	learn_talent: function (talent){
		if (this.talent_learned(talent))
			return;
		this.add_talent(talent);
		var spent_points = this.get_spent_talents_points();
		talent_grid_model.update_requiremens_layout(this.get_required_level(spent_points), this.get_available_talent_points(spent_points));
	},
	add_talent:function(talent){
		console.log("learning " + talent.name);
		this.talents.push(talent);
		talent_grid_model.update_tooltip(talent);
		this.update_link();
	},
	can_unlearn_talent: function (talent) {
		var i;
		for (i = 0; i < this.talents.length; i++) {
			if (typeof this.talents[i].talentreq != 'undefined') {
				if (this.talents[i].talentreq == talent.id) {
					return false;
				}
			}
		}
		return true;
	},
	unlearn_talent: function (talent){
		if(!this.talent_learned(talent))
			return;
		this.remove_talent(talent);
		var spent_points = this.get_spent_talents_points();
		talent_grid_model.update_requiremens_layout(this.get_required_level(spent_points), this.get_available_talent_points(spent_points));
	},
	remove_talent:function(talent){
		console.log("unlearning " + talent.name);
		this.talents.splice(this.talents.indexOf(talent),1);
		talent_grid_model.update_tooltip(talent);
		this.update_link();
	},
	update_link:function(){
		var link = "http://lstc.wc.lt?talent=" + patchdata.game_version + patchdata.data_version + talent_grid_model.current_class_data.prefix + "_" + this.convert_powersum_to_string();
		var slot = player_model.slots["primary"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&primary=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
		}
		slot = player_model.slots["secondary"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&secondary=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
		}
		slot = player_model.slots["armor"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&armor=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
		}
		slot = player_model.slots["hat"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&hat=" + slot.item.id;
		}
		slot = player_model.slots["consumable_1"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&consumable1=" + slot.item.id;
		}
		slot = player_model.slots["consumable_2"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&consumable2=" + slot.item.id;
		}
		slot = player_model.slots["consumable_3"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&consumable3=" + slot.item.id;
		}
		slot = player_model.slots["consumable_4"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&consumable4=" + slot.item.id;
		}
		slot = player_model.slots["consumable_5"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&consumable5=" + slot.item.id;
		}
		$("#link-to-build").val(link);
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
			$("#" + slot_name + "-fake-tooltip").html("<iframe scrolling=\"no\"" +
				" src=\"" +link + "&iframe=true\" frameBorder=\"0\"" +
				" onload=\"javascript:resizeIframe(this);\"></iframe>");
		}
	},
	reset_inventory_slot:function(slot_name) {
		player_model.add_item(slot_name, {});
		$("#" + slot_name + "-link").attr("href", "");
		$("#" + slot_name + "-container").html("<img src=\"itemspng/slot-" + slot_name + ".png\">");
		$("#" + slot_name + "-name").text("");
		$("#" + slot_name + "-value").text("");
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
	player_model.update_link();
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
		console.log("adding " + current.name + " to pool");
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
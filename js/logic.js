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

function setgrade(slot_name, value){
  var element = $("#" + slot_name + "-value");
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
	$("#link-to-build").click(function(){window.prompt("Для копирования нажмите: Ctrl+C, Enter", $("#link-to-build").val());});
	var result,
		tmp = [];
	location.search
		.replace ( "?", "" )
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			if (tmp[0] === "talent")
				result = decodeURIComponent(tmp[1]);
		});
	if (typeof result != 'undefined') {
		var game_version = result.split("_")[0];
		var talent_input = result.split("_")[1];
		var class_prefix = game_version.substr(game_version.length - 2, 2);
		talent_grid_model.select_data(class_prefix);
		var index = $('#tabs a[href="#tabs-'+ class_prefix + '"]').parent().index();
		$("#tabs").tabs("option", "active", index);
		var data_version = game_version.substr(game_version.length - 3, 1);
		if (data_version == patchdata.data_version) {
			player_model.learn_encoded_talents(talent_input);
		}
	} else {
		talent_grid_model.select_data("as");
	}

    $( "#armor-slider" ).slider({
      value:0,
      min: 0,
      max: 15,
      step: 1,
      change: function( event, ui ) {
		player_model.update_slot_tooltip("armor");
      },
	  slide: function( event, ui ) {
		setgrade("armor", ui.value);
	  }
    });
	$( "#armor-value" ).html( "" );
	$("[name=\"armor-quality\"]").change(
		function(){
			player_model.update_slot_tooltip("armor");
		}
	);
	$("#armor-container").tooltip({content:""});
	
    $( "#primary-slider" ).slider({
      value:0,
      min: 0,
      max: 15,
      step: 1,
      change: function( event, ui ) {
		player_model.update_slot_tooltip("primary");
      },
	  slide: function(event, ui) {
		setgrade("primary", ui.value);
	  }
    });
    $( "#primary-value" ).html( "" );
	$("[name=\"primary-quality\"]").change(
		function(){
			player_model.update_slot_tooltip("primary");
		}
	);
	$("#primary-container").tooltip({content:""});
	
    $( "#secondary-slider" ).slider({
      value:0,
      min: 0,
      max: 15,
      step: 1,
      change: function( event, ui ) {
		player_model.update_slot_tooltip("secondary");
      },
	  slide: function(event, ui) {
		setgrade("secondary", ui.value);
	  }
    });
    $( "#secondary-value" ).html( "" );
	$("[name=\"secondary-quality\"]").change(
		function(){
			player_model.update_slot_tooltip("secondary");
		}
	);
	$("#secondary-container").tooltip({content:""});
	fill_available_items();
});

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
		//Раскомментируй следующие две строчки, чтобы сетка талантов построилась динамически.
		// this.prepare_grid();
		// this.fill_grid_rows();
		this.assign_click_routines();
		this.prepare_tooltips();
		this.draw_talent_forks();
		this.update_layout_options();
	},
	assign_power_to_talents:function(){
		this.maxrow = this.current_class_data.grid_height;
		var i;
		var power = 1;
		this.maxcol = 0
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
				target_row = this.get_row_for_level(this.get_base_for_rank(current).lvlreq);
				//console.log("last pushed:" + current.name + "variant 1. row " + target_row + " level " + current.lvlreq + " column " + current.column);
			} else {
				target_row = this.get_row_for_level(current.lvlreq);
				//console.log("last pushed:" + current.name + " variant 2. row " + target_row + " level " + current.lvlreq + " column " + current.column);
			}
			this.layout_model[target_row].columns[current.column].items.push(current);
		}
	},
	fill_grid_rows: function(){
		// Проецируем модель таблицы в html
		for (rowindex = 0; rowindex < this.maxrow; rowindex++) {
			for	(colindex = 0; colindex < this.maxcol; colindex++) {
				if (this.layout_model[rowindex].columns[colindex].items.length > 0) {
					var current = this.layout_model[rowindex].columns[colindex].items[0];
					$("#" + this.current_class_data.prefix + "-lvl" + rowindex).append("<div id=\"" + this.current_class_data.prefix + "-talent-container" + current.id + "\" class=\"talent-container\" title=\"\"></div>");
					
					$("#" + this.current_class_data.prefix + "-talent-container" + current.id).append("<img src=\"skillspng/" + current.imageid + "g00.png\"/>");
					$("#" + this.current_class_data.prefix + "-talent-container" + current.id).append("<img id=\"" + this.current_class_data.prefix + "-bright-img" + current.id + "\" class=\"bright-img\" src=\"skillspng/" + current.imageid + "00.png\"/>");
					$("#" + this.current_class_data.prefix + "-talent-container" + current.id).append("<div id=\"" + this.current_class_data.prefix + "-lock-rect" + current.id + "\" class=\"lock-rect\"></div>");
					if (typeof current.AP_cost != 'undefined'){
						$("#" + this.current_class_data.prefix + "-talent-container" + current.id).append("<div " + current.id + " class=\"talent-green\"></div>");
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
					$("#" + this.current_class_data.prefix + "-talent-container" + current.id).click(current, talentclick);
					$("#" + this.current_class_data.prefix + "-talent-container" + current.id).mouseover(current, talenthover);
				}
			}
		}
	},
	build_tooltip_header:function(current){
		var tooltip_content = "<h3>" + current.name + "</h3>";
		if (typeof current.cost != 'undefined')
			tooltip_content += "<div><span>Стоимость:</span> " + current.cost + " очков навыков</div>";
		if (typeof current.lvlreq != 'undefined') {
			tooltip_content += "<div><span>Требуется:</span> Боец уровня " + current.lvlreq;
			if (typeof current.talentreq != 'undefined'){
				var j;
				for (j = 0; j < this.current_class_data.talents.length; j++){
					if (this.current_class_data.talents[j].id == current.talentreq) {
						tooltip_content += ", " + this.current_class_data.talents[j].name;
					}
				}
			}
			tooltip_content += "</div>";
		}
		if (typeof current.number_of_uses != 'undefined')
			tooltip_content += "<div><span>Число использований:</span> " + current.number_of_uses + "</div>";";";
		if (typeof current.AP_cost != 'undefined')
			tooltip_content += "<div><span>Затраты ОД:</span> " + current.AP_cost + "</div>";
		if (typeof current.description != 'undefined')
			tooltip_content += "<div><span>Описание:</span> " + current.description + "</div>";
		return tooltip_content;
	},
	update_tooltip:function(current) {
		$(function(){
			$("#" + talent_grid_model.current_class_data.prefix + "-talent-container" + current.id).tooltip({
				track:true,
				content:"<iframe scrolling=\"no\" src=\"/talent.php?id=" + current.id + "\" frameBorder=\"0\" onload=\"javascript:resizeIframe(this);\"></iframe>"
			})
		});
	},
	old_update_tooltip:function(current){
		var tooltip_content = "";
		var tooltip_header = "";
		if (typeof current.effect != 'undefined') {
			var ranks = this.layout_model[this.get_row_for_level(this.get_base_for_rank(current).lvlreq)].columns[current.column].items;
			if (ranks.length == 0)
				console.log("No ranks found for " + current.name);
			var j;
			var max_learned;
			var max_learned_index;
			for (j = 0; j < ranks.length; j++) {
				if (player_model.talent_learned(ranks[j])) {
					if (typeof max_learned == 'undefined') {
						max_learned = ranks[j];
						max_learned_index = j;
					} else if (ranks[j].lvlreq > max_learned.lvlreq) {
						max_learned = ranks[j];
						max_learned_index = j;
					}
				}
			}
			max_learned_index++;
			if (typeof max_learned != 'undefined') {
				if (typeof max_learned.effect == 'undefined') {
					console.log("effect not found for " + max_learned.name);
				}
				tooltip_header = this.build_tooltip_header(max_learned);
				tooltip_content += "<div><span>Текущий ранг:" + max_learned_index + "/" + ranks.length + "<br/>Эффект:</span>";
				tooltip_content += max_learned.effect;
				tooltip_content += "</div>";
			}
			var min_unlearned;
			var min_unlearned_index;
			for (j = 0; j < ranks.length; j++) {
				if (!player_model.talent_learned(ranks[j])) {
					if (typeof min_unlearned == 'undefined') {
						min_unlearned = ranks[j];
						min_unlearned_index = j;
					} else if (ranks[j].lvlreq < min_unlearned.lvlreq) {
						min_unlearned = ranks[j];
						min_unlearned_index = j;
					}
				}
			}
			min_unlearned_index++;
			if (typeof min_unlearned == 'undefined') {
				if (typeof max_learned == 'undefined') {
					tooltip_header = this.build_tooltip_header(ranks[0]);
					tooltip_content += "<div><span>Следующий ранг:1/" + ranks.length + "<br/>Эффект:</span>";
					tooltip_content += ranks[0].effect;
					tooltip_content += "</div>";
				}
			} else {
				if (typeof min_unlearned.effect == 'undefined') {
					console.log("effect not found for " + min_unlearned.name);
				}
				tooltip_header = this.build_tooltip_header(min_unlearned);
				tooltip_content += "<div><span>Следующий ранг:" + min_unlearned_index + "/" + ranks.length + "<br/>Эффект:</span>";
				tooltip_content += min_unlearned.effect;
				tooltip_content += "</div>";
			}
			$(function(){
				var class_prefix = talent_grid_model.current_class_data.prefix;
				var talent_id = talent_grid_model.get_base_for_rank(current).id;
				$("#" + class_prefix + "-talent-container" + talent_id).tooltip({
					track:true,
					content:"<iframe  scrolling=\"no\" src=\"/talent.php?id=" + current.id + "\" frameBorder=\"0\" onload=\"javascript:resizeIframe(this);\"></iframe>"
				})
			});
		} else {
			$(function(){
				$("#" + talent_grid_model.current_class_data.prefix + "-talent-container" + current.id).tooltip({
					track:true,
					content:"<iframe  scrolling=\"no\" src=\"/talent.php?id=" + current.id + "\" frameBorder=\"0\" onload=\"javascript:resizeIframe(this);\"></iframe>"
				})
			});

		}
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
					$("#" + this.current_class_data.prefix + "-bright-img" + current.id).show();
					$("#" + this.current_class_data.prefix + "-lock-rect" + current.id).hide();
				} else {
					$("#" + this.current_class_data.prefix + "-bright-img" + current.id).hide();
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
	slots:[
		{ name:"primary", item:{} },
		{ name:"secondary", item:{} },
		{ name:"armor", item:{} },
		{ name:"hat", item:{} },
		{ name:"consumable_1", item:{} },
		{ name:"consumable_2", item:{} },
		{ name:"consumable_3", item:{} },
		{ name:"consumable_4", item:{} },
		{ name:"consumable_5", item:{} },],
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
		$("#link-to-build").val(link);
	},
	add_item:function(slot_name, item){
		var slot = this.get_slot(slot_name);
		if (typeof(slot) == 'undefined')
			return;
		slot.item = item;
	},
	get_item:function(slot_name){
		var slot = this.get_slot(slot_name);
		if (typeof(slot) == 'undefined')
			return;
		return slot.item;
	},
	update_slot_tooltip:function(slot_name){
		var selected_color = $("input[name=" + slot_name +"-quality]:checked", "#" + slot_name).val();
		if (selected_color == 'undefined') {
			selected_color = white;
		}
		var selected_quality = $("#" + slot_name + "-slider").slider("option", "value");
		var item = this.get_item(slot_name);
		$("#" + slot_name + "-name").text(item.name);
		if (typeof item != 'undefined' && typeof item.id != 'undefined'){
			var link = "/item.php?id=" + item.id + "&color=" + selected_color + "&quality=" + selected_quality;
			$("#" + slot_name + "-link").attr("href", link);
			$("#" + slot_name + "-link").removeClass("grey-link white-link green-link blue-link").addClass(selected_color + "-link");
			$("#" + slot_name + "-container").tooltip("option", "content", "<iframe scrolling=\"no\"" +
				" src=\"" +link + "\" frameBorder=\"0\"" +
				" onload=\"javascript:resizeIframe(this);\"></iframe>");
		}
	},

	remove_item:function(item){
		for(var i=0; i<this.slots.length; i++){
			if (this.slots[i].item.id === item.id){
				this.slots[i].item = null;
				break;
			}
		}
	},
	get_slot:function(slot_name){
		for(var i=0; i<this.slots.length; i++){
			if (this.slots[i].name === slot_name){
				return this.slots[i];
			}
		}
	}
};
function drop_item_to_inventory(event, ui){
	var item_id = ui.draggable.context.id.split("_")[1];
	var item = get_item_by_id(item_id);
	var slot_name = $(this).context.id.split("-")[0];
	player_model.add_item(slot_name, item);
	$("#" + slot_name + "-container").empty();
	$("#" + slot_name + "-container").append(ui.draggable);
	player_model.update_slot_tooltip(slot_name);
}
function drop_item_to_pool(event, ui){
	var item_id = ui.draggable.context.id.split("_")[1];
	var item = get_item_by_id(item_id);
	var target = $(this).context.id.split("-")[0];
	var category = get_category_by_id(item.category);
	var slot;
	for(var i=0; i<player_model.slots.length; i++){
		if (player_model.slots[i].item.id == item.id) {
			slot = player_model.slots[i];
		}
	}
	player_model.remove_item(item);
	$("#" + slot.name + "-container").append("<img src=\"itemspng/item44000.png\"/>");
	$("#" + category.category_name + "-pool").append(ui.draggable);
}
function get_category_by_id(category_id) {
	for (var j = 0; j < patchdata.weapontype_map.length; j++){
		if (patchdata.weapontype_map[j].category_id === category_id){
			return patchdata.weapontype_map[j];
		}
	}
	return;
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
	return;
}
function add_item_to_pool(item){
	for (var j = 0; j < patchdata.weapontype_map.length; j++){
		if (patchdata.weapontype_map[j].category_id === item.category){
			$("#" + patchdata.weapontype_map[j].category_name + "-pool")
				.append("<img id=\"item_" + item.id + "\" src=\"itemspng/item" + item.id + "00.png\"/>");
			$("#item_" + item.id).draggable({
				containment:"document",
				helper:"clone",
				appendTo: "body"
			});
			return j;
		}
	}
	return -1;
}
function fill_available_items(){
	var current_category_index = -1;
	var possible_slots = [
		{name:"primary", allowed_items:""},
		{name:"secondary", allowed_items:""},
		{name:"armor", allowed_items:""},
		{name:"consumables", allowed_items:""},
		{name:"hat", allowed_items:""}
	];
	for (var j = 0; j < patchdata.weapontype_map.length; j++){
		patchdata.weapontype_map[j].allowed_items = "";
	}
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
		current_category_index = add_item_to_pool(current);
		var category = get_category_by_id(current.category);
		if (category.allowed_items === ""){
			category.allowed_items += "#item_" + current.id;
		} else {
			category.allowed_items += ", #item_" + current.id;
		}
		if (current_category_index < 0){
			continue;
		}
		console.log("category index: " + current_category_index)
		for (var j = 0; j < possible_slots.length; j++) {
			if ($.inArray(possible_slots[j].name, patchdata.weapontype_map[current_category_index].slots) != -1){
				if (possible_slots[j].allowed_items === ""){
					possible_slots[j].allowed_items += "#item_" + current.id;
				} else {
					possible_slots[j].allowed_items += ", #item_" + current.id;
				}
			}
		}
	}
	$("#items-pool").droppable({
		activeClass: "ui-state-hover",
		hoverClass: "ui-state-active",
		drop:drop_item_to_pool
	});
	for (var j = 0; j < possible_slots.length; j++) {
		$("#" + possible_slots[j].name + "-container").droppable({
			accept:possible_slots[j].allowed_items,
			activeClass: "ui-state-hover",
			hoverClass: "ui-state-active",
			drop:drop_item_to_inventory
		});
	}
}
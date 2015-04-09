function talentclick(event){
	var talent = event.data;
	var ranks = model.layout_model[model.get_row_for_level(talent.lvlreq)].columns[talent.column].items;
	var i;
	for (i = 0; i < ranks.length; i++) {
		if (!player_model.talent_learned(ranks[i]))
			break;
	}
	if (i < ranks.length) {
		if (player_model.can_learn_talent(ranks[i])){
			player_model.learn_talent(ranks[i]);
			model.set_rank(model.get_row_for_level(ranks[0].lvlreq), ranks[i].column, ++i);
			model.update_layout_options();
		}
	}
}
function talentrightclick(event){
	if (typeof last_visited_element == 'undefined')
		return;
	var talent = last_visited_element;
	var ranks = model.layout_model[model.get_row_for_level(talent.lvlreq)].columns[talent.column].items;
	var i;
	for (i = ranks.length; i > 0; i--) {
		if (player_model.talent_learned(ranks[i-1]))
			break;
	}
	if (i > 0) {
		if (player_model.can_unlearn_talent(ranks[i-1])) {
			player_model.unlearn_talent(ranks[i-1]);
			model.update_layout_options();
			model.set_rank(model.get_row_for_level(talent.lvlreq), talent.column, --i);
		}
	}
}

//Эта группа функций отвечает за то, чтобы событие правой кнопки мыши корректно вызывало соответствующую функцию для талантов
function talenthover(event) {
	last_visited_element = event.data;
	handled_recently = true;
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
		model.select_data("assault");
	});
	$("#juggernaut-link").click(function(){
		model.select_data("juggernaut");
	});
	$("#scout-link").click(function(){
		model.select_data("scout");
	});
	$("#support-link").click(function(){
		model.select_data("support");
	});
	model.select_data("assault");
});
var last_visited_element = {};
var handled_recently = false;

var model = {
	//load data
	maxrow: 0,
	maxcol: 0,
	layout_model: [],
	current_class_data: {},
	select_data: function(class_name){
		switch(class_name){
			case "juggernaut":
			this.current_class_data = patchdata.juggernaut_data;
			break;
			case "scout":
			this.current_class_data = patchdata.scout_data;
			break;
			case "support":
			this.current_class_data = patchdata.support_data;
			break;
			default: //"assault":
			this.current_class_data = patchdata.assault_data;
		}
		player_model.clear();
		this.prepare_grid();
		this.prepare_layout();
		this.fill_grid_rows();
		this.prepare_tooltips();
		this.draw_talent_forks();
		this.update_layout_options();
	},
	prepare_grid: function(){
		$("#" + this.current_class_data.prefix + "-layout").empty();
		this.layout_model = [];
		maxrow = this.current_class_data.grid_height;
		var i;
		maxcol = 0
		for(i = 0; i < this.current_class_data.talents.length;i++)
			if (this.current_class_data.talents[i].column > maxcol)
				maxcol = this.current_class_data.talents[i].column;
		maxcol++;
		var rowindex;
		var colindex;
		//Готовим сетку
		for (rowindex = 0; rowindex < maxrow; rowindex++) {
			this.layout_model[rowindex] = {};
			this.layout_model[rowindex].columns = new Array();
			for(colindex = 0; colindex < maxcol; colindex++) {
				this.layout_model[rowindex].columns[colindex] = {};
				this.layout_model[rowindex].columns[colindex].items = new Array();
			}
			if (rowindex >= this.current_class_data.rows.length){
				console.log("rowindex is out of bounds");
			}
			var div_content;
			div_content = "<div id=\"" + this.current_class_data.prefix + "-lvl" + rowindex + "\" class=\"level-content\">";
			div_content += "<div class=\"level-header\">Уровень " + this.current_class_data.rows[rowindex].level + "</div></div>";
			$("#" + this.current_class_data.prefix + "-layout").append(div_content);
		}
	},
	prepare_layout: function(){
		//Заполняем сетку строками с уровнями
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
		for (rowindex = 0; rowindex < maxrow; rowindex++) {
			for	(colindex = 0; colindex < maxcol; colindex++) {
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
					$("#" + this.current_class_data.prefix + "-talent-container" + current.id).click(current, talentclick);
					$("#" + this.current_class_data.prefix + "-talent-container" + current.id).mouseover(current, talenthover);
				} else {
					$("#" + this.current_class_data.prefix + "-lvl" + rowindex).append("<div class=\"talent-placeholder\"/>");
				}
			}
		}
	},
	build_tooltip_header:function(current){
		var tooltip_content = "<h3>" + current.name + "</h3>";
		if (typeof current.cost != 'undefined')
			tooltip_content += "<div><span>Cost:</span> " + current.cost + " skill point</div>";
		if (typeof current.lvlreq != 'undefined') {
			tooltip_content += "<div><span>Required:</span> Mercenary level " + current.lvlreq;
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
			tooltip_content += "<div><span>Number of uses:</span> " + current.number_of_uses + "</div>";";";
		if (typeof current.AP_cost != 'undefined')
			tooltip_content += "<div><span>AP cost:</span> " + current.AP_cost + "</div>";
		if (typeof current.description != 'undefined')
			tooltip_content += "<div><span>Description:</span> " + current.description + "</div>";
		return tooltip_content;
	},
	update_tooltip:function(current){
		var tooltip_content;
		var tooltip_header;
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
				tooltip_content += "<div><span>Current rank:" + max_learned_index + "/" + ranks.length + "<br/>Effect:</span>";
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
					tooltip_content += "<div><span>Next rank:1/" + ranks.length + "<br/>Effect:</span>";
					tooltip_content += ranks[0].effect;
					tooltip_content += "</div>";
				}
			} else {
				if (typeof min_unlearned.effect == 'undefined') {
					console.log("effect not found for " + min_unlearned.name);
				}
				tooltip_header = this.build_tooltip_header(min_unlearned);
				tooltip_content += "<div><span>Next rank:" + min_unlearned_index + "/" + ranks.length + "<br/>Effect:</span>";
				tooltip_content += min_unlearned.effect;
				tooltip_content += "</div>";
			}
		}
		$(function(){
			$("#" + model.current_class_data.prefix + "-talent-container" + model.get_base_for_rank(current).id).tooltip({
				track:true,
				content:(tooltip_header + tooltip_content)
			})
		});
// function talentclick(event){
	// var talent = event.data;
	// var ranks = model.layout_model[model.get_row_for_level(talent.lvlreq)].columns[talent.column].items;
	// var i;
	// for (i = 0; i < ranks.length; i++) {
		// if (!player_model.talent_learned(ranks[i]))
			// break;
	// }
	// if (i < ranks.length) {
		// if (player_model.can_learn_talent(ranks[i])){
			// player_model.learn_talent(ranks[i]);
			// model.set_rank(model.get_row_for_level(ranks[0].lvlreq), ranks[i].column, ++i);
			// model.update_layout_options();
		// }
	// }
// }
	},
	prepare_tooltips:function(){
		var i;
		for(i = 0; i < model.current_class_data.talents.length; i++) {
			this.update_tooltip(model.current_class_data.talents[i]);
		}
	},
	draw_talent_forks:function(){
		for (rowindex = 0; rowindex < maxrow; rowindex++) {
			for	(colindex = 0; colindex < maxcol; colindex++) {
				if (this.layout_model[rowindex].columns[colindex].items == 0)
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
		var _ret = new Array();
		var i;
		for(i = 0; i < this.current_class_data.talents.length;i++){
			if (this.current_class_data.talents[i].talentreq == talent.id)
				_ret.push(this.current_class_data.talents[i]);
		}
		return _ret;
	},
	update_layout_options: function (){
		var i;
		for (i = 0; i < this.current_class_data.talents.length; i++) {
			var current = this.current_class_data.talents[i];
			if (player_model.talent_learned(current)) {
				$("#" + this.current_class_data.prefix + "-lock-rect" + current.id).hide();
				$("#" + this.current_class_data.prefix + "-bright-img" + current.id).show();
			} else {
				$("#" + this.current_class_data.prefix + "-bright-img" + current.id).hide();
				if (player_model.can_learn_talent(current))
					$("#" + this.current_class_data.prefix + "-lock-rect" + current.id).hide();
				else
					$("#" + this.current_class_data.prefix + "-lock-rect" + current.id).show();
			}
		}
	},
	set_rank: function (rowindex, colindex, rank){
		if (typeof this.layout_model[rowindex] == 'undefined')
			return;
		if (typeof this.layout_model[rowindex].columns[colindex] == 'undefined')
			return;
		if (this.layout_model[rowindex].columns[colindex].items.length < rank)
			return;
		if (this.layout_model[rowindex].columns[colindex].items.length == 1)
			return;
		var basic = this.layout_model[rowindex].columns[colindex].items[0];
		var temp = $("#" + this.current_class_data.prefix + "-talent-container" + basic.id + " #talent-container-rank");
		$("#" + this.current_class_data.prefix + "-talent-container" + basic.id + " #talent-container-rank").html(rank + "/" + this.layout_model[rowindex].columns[colindex].items.length);
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
	clear:function(){
		this.talents = [];
		model.update_requiremens_layout(1,1);
	},
	get_spent_talents_points: function (){
		var i;
		var count = 0;
		for (i=0;i<this.talents.length;i++) {
			if (typeof this.talents[i].cost != 'undefined')
				count += this.talents[i].cost;
		}
		return count;
	},
	get_required_level: function (spent_points) {
		var max_level_to_invest;
		if (spent_points == 0)
			max_level_to_invest = 1;
		if (spent_points <=4) {
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
		console.log("learning " + talent.name);
		this.talents.push(talent);
		var spent_points = this.get_spent_talents_points();
		model.update_requiremens_layout(this.get_required_level(spent_points), this.get_available_talent_points(spent_points));
		model.update_tooltip(talent);
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
		console.log("unlearning " + talent.name);
		this.talents.splice(this.talents.indexOf(talent),1);
		var spent_points = this.get_spent_talents_points();
		model.update_requiremens_layout(this.get_required_level(spent_points), this.get_available_talent_points(spent_points));
		model.update_tooltip(talent);
	}
};
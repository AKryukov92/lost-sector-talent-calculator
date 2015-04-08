function talentclick(event){
	var talent = event.data;
	var ranks = layout_model[get_row_for_level(talent.lvlreq)].columns[talent.column].items;
	var i;
	for (i = 0; i < ranks.length; i++) {
		if (!player_model.talent_learned(ranks[i]))
			break;
	}
	if (i < ranks.length)
	{
		if (player_model.can_learn_talent(ranks[i])){
			player_model.learn_talent(ranks[i]);
			set_rank(get_row_for_level(ranks[0].lvlreq), ranks[i].column, ++i);
			update_layout_options();
		}
	}
}
function talentrightclick(event){
	if (typeof last_visited_element == 'undefined')
		return;
	var talent = last_visited_element;
	var ranks = layout_model[get_row_for_level(talent.lvlreq)].columns[talent.column].items;
	var i;
	for (i = ranks.length; i > 0; i--) {
		if (player_model.talent_learned(ranks[i-1]))
			break;
	}
	if (i > 0)
	{
		if (player_model.can_unlearn_talent(ranks[i-1])) {
			player_model.unlearn_talent(ranks[i-1]);
			update_layout_options();
			set_rank(get_row_for_level(talent.lvlreq), talent.column, --i);
		}
	}
}
function update_layout_options(){
	var i;
	for (i = 0; i < patchdata.assault_data.talents.length; i++) {
		var current = patchdata.assault_data.talents[i];
		if (player_model.talent_learned(current)) {
			$("#lock-rect" + current.id).hide();
			$("#bright-img" + current.id).show();
		} else {
			$("#bright-img" + current.id).hide();
			if (player_model.can_learn_talent(current))
				$("#lock-rect" + current.id).hide();
			else
				$("#lock-rect" + current.id).show();
		}
	}
}
function set_rank(rowindex, colindex, rank){
	if (typeof layout_model[rowindex] == 'undefined')
		return;
	if (typeof layout_model[rowindex].columns[colindex] == 'undefined')
		return;
	if (layout_model[rowindex].columns[colindex].items.length < rank)
		return;
	if (layout_model[rowindex].columns[colindex].items.length == 1)
		return;
	var basic = layout_model[rowindex].columns[colindex].items[0];
	var temp = $("#talent-container" + basic.id + " #talent-container-rank");
	$("#talent-container" + basic.id + " #talent-container-rank").html(rank + "/" + layout_model[rowindex].columns[colindex].items.length);
}

//Эта группа функций отвечает за то, чтобы событие правой кнопки мыши корректно вызывало соответствующую функцию для талантов
function talenthover(event)
{
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
});
//load data
var i = 0;
var maxrow = 0;
var maxcol = 0;
var rowindex;
var colindex;
var last_visited_element = {};
var handled_recently = false;
var layout_model = [];

//Количество доступных очков навыка вычисляется по формуле: (уровень - 4)*3+4
var player_model = {
	selected_class: "assault",
	required_level:0,
	talents: [],
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
		$("#merc-level").html(this.get_required_level(spent_points));
		$("#points-left").html(this.get_available_talent_points(spent_points));
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
		$("#merc-level").html(this.get_required_level(spent_points));
		$("#points-left").html(this.get_available_talent_points(spent_points));
	}
};

maxrow = patchdata.assault_data.grid_height;
maxcol = patchdata.assault_data.grid_width;

//Готовим сетку
for (rowindex = 0; rowindex < maxrow; rowindex++) {
	layout_model[rowindex] = {};
	layout_model[rowindex].columns = new Array();
	for(colindex = 0; colindex < maxcol; colindex++) {
		layout_model[rowindex].columns[colindex] = {};
		layout_model[rowindex].columns[colindex].items = new Array();
	}
	var div_content;
	div_content = "<div id=\"ass-lvl" + rowindex + "\" class=\"level-content\">";
	div_content += "<div class=\"level-header\">Уровень " + patchdata.assault_data.rows[rowindex].level + "</div></div>";
	$("#ass-layout").append(div_content);
}
function get_row_for_level(level){
	var i;
	for (i = 0; i < patchdata.assault_data.rows.length; i++){
		if (patchdata.assault_data.rows[i].level == level)
			return i;
	}
}
function get_base_for_rank(talent){
	var j;
	for (j = 0; j < patchdata.assault_data.talents.length; j++) {
		if (patchdata.assault_data.talents[j].id == talent.rankof) {
			return patchdata.assault_data.talents[j];
		}
	}
}
//Заполняем сетку строками с уровнями
for (i = 0; i < patchdata.assault_data.talents.length; i++) {
	var current = patchdata.assault_data.talents[i];
	var target_row;
	if (typeof current.rankof != 'undefined'){
		target_row = get_row_for_level(get_base_for_rank(current).lvlreq);
	} else {
		target_row = get_row_for_level(current.lvlreq);
	}
	layout_model[target_row].columns[current.column].items.push(current);
}
// Проецируем модель таблицы в html
for (rowindex = 0; rowindex < maxrow; rowindex++) {
	for	(colindex = 0; colindex < maxcol; colindex++) {
		if (layout_model[rowindex].columns[colindex].items.length > 0) {
			var current = layout_model[rowindex].columns[colindex].items[0];
			$("#ass-lvl" + rowindex).append("<div id=\"talent-container" + current.id + "\" class=\"talent-container\"></div>");
			$("#talent-container" + current.id).append("<img src=\"skillspng/" + current.imageid + "g00.png\"/>");
			$("#talent-container" + current.id).append("<img id=\"bright-img" + current.id + "\" class=\"bright-img\" src=\"skillspng/" + current.imageid + "00.png\"/>");
			$("#talent-container" + current.id).append("<div id=\"lock-rect" + current.id + "\" class=\"lock-rect\"></div>");
			if (typeof current.AP_cost != 'undefined'){
				$("#talent-container" + current.id).append("<div " + current.id + " class=\"talent-green\"></div>");
			}
			
			//$("#talent-container" + current.id).append("<div class=\"lock-rect\"></div>");
			if (layout_model[rowindex].columns[colindex].items.length > 1) {
				$("#talent-container" + current.id).append("<div id=\"talent-container-rank\" class=\"talent-rank\">0/" + layout_model[rowindex].columns[colindex].items.length + "</div>");
			}
			$("#talent-container" + current.id).click(current, talentclick);
			$("#talent-container" + current.id).mouseover(current, talenthover);
		} else {
			$("#ass-lvl" + rowindex).append("<div class=\"talent-placeholder\"/>");
		}
	}
}
// for (rowindex = 1; rowindex < maxrow; rowindex++) {
	// if (layout_model[rowindex].empty)
		// continue;
	// for(colindex = 1; colindex < maxcol; colindex++) {
		// if (layout_model[rowindex].columns[colindex].items.length > 0) {
			// var current = layout_model[rowindex].columns[colindex].items[0];
		// }
	// }
// }
// var i,j;
// for (i = 0; i < patchdata.assault_data.talents; i++){
	// rank = patchdata.assault_data.talents[i];
	// for(j = 0; j < patchdata.assault_data.talents; j++){
		// base = patchdata.assault_data.talents[j];
		// if (base.id == rank.rankof){
			// layout_model[base.row].columns[base.column].items.push(rank);
		// }
	// }
// }
function get_submissive_talents(talent){
	var _ret = new Array();
	var i;
	for(i = 0; i < patchdata.assault_data.talents.length;i++){
		if (patchdata.assault_data.talents[i].talentreq == talent.id)
			_ret.push(patchdata.assault_data.talents[i]);
	}
	return _ret;
}
for (rowindex = 0; rowindex < maxrow; rowindex++) {
	for	(colindex = 0; colindex < maxcol; colindex++) {
		if (layout_model[rowindex].columns[colindex].items == 0)
			continue;
		var current = layout_model[rowindex].columns[colindex].items[0];
		var subs = get_submissive_talents(current);
		if (subs.length > 0){
			console.log(current.name + " have " + subs.length + " submissive talents");
		}
		var i = 0;
		for(i = 0; i < subs.length; i++){//рисуем простые белые линии ко всем дочерним талантам
			var div_content;
			if (subs[i].column >= current.column){
				var coldiff = subs[i].column-current.column;
				var rowdiff = get_row_for_level(subs[i].lvlreq) - get_row_for_level(current.lvlreq);
				div_content = "<svg class=\"talent-fork\" style=\"left:0px\" width=\"" + (44+coldiff*40) + "\"";
				div_content+= " height=\"" + ((rowdiff-1)*49+9) + "\">";
				div_content+= "<path style=\"fill:none;stroke-width:1;stroke-opacity:1;stroke:white;\"";
				div_content+= " d=\"m 20,0 " + (coldiff*44) + ", " + ((rowdiff-1)*49+9)+ "\"></path>";
				div_content+= "</svg>";
			} else {
				var coldiff = current.column - subs[i].column;
				var rowdiff = get_row_for_level(subs[i].lvlreq) - get_row_for_level(current.lvlreq);
				div_content = "<svg class=\"talent-fork\" style=\"right:0px\" width=\"" + (42 + coldiff*42) + "\"";
				div_content+= " height=\""+((rowdiff-1)*49+9)+"\">";
				div_content+="<path style=\"fill:none;stroke-width:1;stroke-opacity:1;stroke:white;\"";
				div_content+=" d=\"m "+(coldiff*40+24)+",0 " + ((-coldiff)*44-4)+", " + ((rowdiff-1)*49+9) + "\"></path>";
				div_content+="</svg>";
			}
			$("#talent-container" + current.id).append(div_content);
		}
	}
}

update_layout_options();
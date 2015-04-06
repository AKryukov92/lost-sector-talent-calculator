function talentclick(event){
	var talent = event.data;
	if (player_model.can_learn_talent(talent))
	{
		player_model.learn_talent(talent);
		update_layout_options();
	}
}
function talentrightclick(event){
	if (typeof last_visited_element == 'undefined')
		return;
	var talent = last_visited_element;
	if (player_model.can_unlearn_talent(talent))
	{
		player_model.unlearn_talent(talent);
		update_layout_options();
	}
}
function update_layout_options(){
	var i;
	for (i = 0; i < patchdata.assault_talents.length; i++) {
		var current = patchdata.assault_talents[i];
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
	get_required_level: function (spent_points){
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
		for(i = 0; i < this.talents.length; i++)
		{
			if (this.talents[i].lvlreq > max_level_to_pick)
				max_level_to_pick = this.talents[i].lvlreq;
		}
		if (max_level_to_invest > max_level_to_pick)
			return max_level_to_invest;
		else
			return max_level_to_pick;
	},
	get_available_talent_points: function(spent_points){
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
			var i;
			for (i = 0; i<this.talents.length; i++) {
				if (this.talents[i].id == talent.talentreq) {
					return true;
				}
			}
			return false;
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

//Прикидываем размеры сетки
for (i = 0; i < patchdata.assault_talents.length; i++) {
	var current = patchdata.assault_talents[i];
	if (current.row > maxrow)
		maxrow = current.row;
	if (current.column > maxcol)
		maxcol = current.column;
}
maxrow++;
maxcol++;
//Готовим сетку
for (rowindex = 0; rowindex < maxrow; rowindex++) {
	layout_model[rowindex] = {};
	layout_model[rowindex].columns = new Array();
	for(colindex = 0; colindex < maxcol; colindex++) {
		layout_model[rowindex].columns[colindex] = {};
		layout_model[rowindex].columns[colindex].items = new Array();
	}
}
//Заполняем сетку строками с уровнями
for (i = 0; i < patchdata.assault_talents.length; i++) {
	var current = patchdata.assault_talents[i];
	layout_model[current.row].columns[current.column].items.push(current);
}
for (rowindex = 0; rowindex < maxrow; rowindex++) {
	var found = false;
	for(colindex = 1; colindex < maxcol; colindex++) {
		if (layout_model[rowindex].columns[colindex].items.length > 0) {
			found = true;
		}
	}
	if (found) {
		$("#ass-layout").append("<div id=\"ass-lvl" + rowindex + "\" class=\"level-content\"><div class=\"level-header\">Уровень " + rowindex + "</div></div>");
	} else {
		layout_model[rowindex].empty = true;
	}
}
// Заполняем строки сетки объектами
for (rowindex = 0; rowindex < maxrow; rowindex++) {
	if (layout_model[rowindex].empty)
		continue;
	else {
		for	(colindex = 1; colindex < maxcol; colindex++) {
			if (layout_model[rowindex].columns[colindex].items.length > 0) {
				var current = layout_model[rowindex].columns[colindex].items[0];
				
				$("#ass-lvl" + rowindex).append("<div id=\"talent-container" + current.id + "\" class=\"talent-container\"></div>");
				$("#talent-container" + current.id).append("<img src=\"skillspng/" + current.imageid + "g00.png\"/>");
				$("#talent-container" + current.id).append("<img id=\"bright-img" + current.id + "\" class=\"bright-img\" src=\"skillspng/" + current.imageid + "00.png\"/>");
				$("#talent-container" + current.id).append("<div id=\"lock-rect" + current.id + "\" class=\"lock-rect\"></div>");
				if (layout_model[rowindex].columns[colindex].items.length > 1)
				{
					$("#talent-container" + current.id).append("<div id=\"talent-container-rank\" class=\"talent-rank\">0/3</div>");
				}
				$("#talent-container" + current.id).click(current, talentclick);
				$("#talent-container" + current.id).mouseover(current, talenthover);
			} else {
				$("#ass-lvl" + rowindex).append("<div class=\"talent-placeholder\"/>");
			}
		}
	}
}
update_layout_options();
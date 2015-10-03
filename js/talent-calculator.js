

 function MainApp(inventoryApp, talentController) {
	this.inventory = intentoryApp;
	this.talents = talentController;
	this.patchdata = {};
	this.activeClass;
	this.classes = {};
	this.init = function () {
		talents.setActiveClass(activeClassPrefix);
	}
}
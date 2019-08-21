for (var i = 1; i <= app.project.items.length; i++) {
	if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Vertical 5sec") {
		var epl_5s_vert = app.project.items[i];
	}
}


var show_list = ["BBD", "PVE"];

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// The UI View constructs the UI and returns the application window.  It provides object references
// and methods to read and manipulate the UI elements.
//
////////////////////////////////////////////////////////////////////////////////////////////////////
var ui_view = (function(show_list) {
	var appWin = new Window("palette", "BeastKit v.2.0", undefined, {resizeable: false});

		appWin.orientation = "column";

	{ // Group 1
		var groupOne = appWin.add("group", undefined, "GroupOne");
		groupOne.orientation = "column";
		groupOne.minimumSize.height = 200;
		groupOne.alignChildren = "fill";

		var jobPanel = groupOne.add("panel", undefined, "Enter Job Number");
		jobPanel.alignment = ["", "top"];
		var job_num = jobPanel.add ("edittext", undefined);
		job_num.minimumSize.width = 200;
		job_num.active = true;

		var panelOne = groupOne.add("panel", undefined, "Select Show");
		var listShow = panelOne.add("dropdownlist", undefined, show_list);
		listShow.minimumSize.width = 200;
		listShow.selection = 0;
		listShow.active = true;

		var stylePanel = groupOne.add("panel", undefined, "Style");
		stylePanel.alignChildren = "left";
		var style_radio1 = stylePanel.add ("radiobutton", undefined, "Episodic");
		var style_radio2 = stylePanel.add ("radiobutton", undefined, "Image");
		style_radio1.value = true;
	}


    appWin.center();
    appWin.show();

    return {
			ui_win: appWin
		};

})(show_list)


function Machine(state) {
	this.state = state;
	//#this.transitions = {
		//#	'idle': {},
		//#	'fetching': {},
		//#	'error': {}
		//}
}

Machine.prototype.render = function(msg) {
	alert(msg);
}

Machine.prototype.dispatch = function(actionName, payload) {
	var actions = this.transitions[this.state];
	var action = this.transitions[this.state][actionName];

	if (action) {
		this.render("Action dispatched:  " + actionName);
		action(payload);
	}
};

Machine.prototype.changeStateTo = function(newState) {
	this.render("State changed:  " + newState);
	this.state = newState;
};

Machine.prototype.service = {
	getData: function() {
		alert("Fetching data.");
		return "Got data.";
	}
};


var title_machine = new Machine('idle');
title_machine.transitions['idle'] = {
	select: function(data) {
		title_machine.changeStateTo('fetching');
		var data = title_machine.service.getData();

		try {
			title_machine.dispatch('success', data);
		} catch(error) {
			title_machine.dispatch('failure', error);
		}
	}
};

title_machine.transitions['fetching'] = {
	success: function(data) {
		title_machine.render("And the answer is 42.  " + data);
		title_machine.changeStateTo('idle');
	},
	failure: function(error) {
		title_machine.render(error);
		title_machine.changeStateTo('error');
	}
};

title_machine.transitions['error'] = {
	retry: function() {
		title_machine.changeStateTo('idle');
		title_machine.dispatch('select');
	}
};

title_machine.dispatch('select');


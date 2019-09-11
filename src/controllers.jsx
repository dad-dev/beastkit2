////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Below are a number of controllers.  Controller kicks things off with its init() method setting up
// a default view.  Each controller is responsible for a particular functional area.  In general,
// it handles the business logic, managing state via the Library, and calling the DOM View to update
// the project.  The Time Controller is a little unique. It manages the Time Database, and updates
// the view directly.  The reason is admittedly a little flimsy.  The Time Database is self-
// contained in its own comp.  Its layout and styling are built into the comp.  By handling the
// business logic it's pretty much all the way handled (UPDATE:  Not quite anymore.  I need to
// review this.).
//
////////////////////////////////////////////////////////////////////////////////////////////////////

//+ include version_controller
//+ include title_controller
//+ include time_controller
//+ include days_controller
//+ include classifier_controller 
//+ include style_controller 
//+ include web_controller 
//+ include queue_controller 


var ux_controller = (function(ui, time_ctrl, show_model) {
  function ux_title(show) {
    var is_original = show_model.get_show_version(show).main_version["is_orig"];

    if (is_original && ui.ui_events.show_classifier.selection.index != 6) {
      ui.ui_events.show_classifier.selection = 6;
    } else if (!is_original && ui.ui_events.show_classifier.selection.index == 6) {
      ui.ui_events.show_classifier.selection = 0;
    }
  }

  function ux_time() {
    if (ui.ui_events.time_list.selection == 0) {
      [ui.ui_events.half_check, ui.ui_events.am_check, ui.ui_events.hideTime].map(function(o) { o.enabled = false; });
    } else if (ui.ui_events.hideTime.value) {
      [ui.ui_events.half_check, ui.ui_events.am_check, ui.ui_events.time_list].map(function(o) { o.enabled = false; });
    } else [ui.ui_events.time_list, ui.ui_events.half_check, ui.ui_events.am_check, ui.ui_events.hideTime].map(function(o) { o.enabled = true });
  } 

  function ux_days() {
    var days = ui.get_days();
    if (days[0].selection.index == 1) {
      ui.ui_events.hideTime.value = 1;
      ux_time();
      time_ctrl.set_time(true);
    } else if (days[0].selection.index != 1 && ui.ui_events.hideTime.value == 1) {
      ui.ui_events.hideTime.value = 0;
      ux_time();
      time_ctrl.set_time(false);
    }

    if ( (days[0].selection.index > 1 && days[0].selection.index < 11) || (days[0].selection.index == 12) || (days[0].selection.index == 13) ) {
      days[1].enabled = true;
    } else days[1].enabled = false;

    if ( days[1].selection.index > 0 && days[1].selection.index < 10 ) {
      days[2].enabled = true;
    } else days[2].enabled = false;

    if (days[0].selection.index > 1 && days[0].selection.index < 9) {
      ui.ui_events.addNext.enabled = true;
      ui.ui_events.pluralizer.enabled = true;
    } else {
      ui.ui_events.addNext.value = false;
      ui.ui_events.addNext.enabled = false;
      ui.ui_events.pluralizer.value = false;
      ui.ui_events.pluralizer.enabled = false;
    }
  }

  function ux_dates() {

  }

  function ux_web(is_web) {
    var days = ui.get_days();
    var components = [
      days[0],
      days[1],
      days[2],
      ui.ui_events.time_list,
      ui.ui_events.half_check,
      ui.ui_events.am_check,
      ui.ui_events.hideTime,
      ui.ui_events.addNext,
      ui.ui_events.pluralizer
    ];

    if (is_web) {
      components.map(function(o) { o.enabled = false; });
    } else {
      days[0].enabled = true;
      ux_days();
      ux_time();
      ux_modifiers();
    }
  }

  function ux_class() {
    (ui.ui_events.tunein_classifier.enabled) ? ui.ui_events.tunein_classifier.enabled = false : ui.ui_events.tunein_classifier.enabled = true;
  }

  function ux_season(type) {
    if (type === "text") {
      ui.set_season_text();
    } else if (type === "slider") {
      ui.set_season_slider();
      ui.set_season_text();
    }
  }

  function ux_modifiers() {
    if (ui.ui_events.addNext.value) {
      ui.ui_events.pluralizer.enabled = false;
    } else if (!ui.ui_events.addNext.value) {
      ui.ui_events.pluralizer.enabled = true;
    }
    if (ui.ui_events.pluralizer.value) {
      ui.ui_events.addNext.enabled = false;
    } else if (!ui.ui_events.pluralizer.value) {
      ui.ui_events.addNext.enabled = true;
    }
  }

  return {
    title: function(show) { ux_title(show); },
    days: function() { ux_days(); },
    dates: function() { ux.dates(); },
    time: function() { ux_time(); },
    web: function(is_web) { ux_web(is_web); },
    classifier: function() { ux_class(); },
    season: function(type) { ux_season(type); },
    modifiers: function() { ux_modifiers(); }
  };
})(ui_view, time_controller, show_model);


var modifier_controller = (function(dom, ui, days_ctrl) {
  var render = function(data) {
    days_ctrl.set_days([ui.get_days(), data]);
  };

  var service = {
    getData: function(payload) {
      var days = ui.get_days();
      if (ui.ui_events.addNext.value) return "next";
      if (ui.ui_events.pluralizer.value) {

        if (days[2].selection.index > 0 && days[2].selection.index < 8) {
          return "sss";
        } else if (days[1].selection.index > 0 && days[1].selection.index < 8) {
          return "ss";
        } else return "s";

      }

      return 0;
    }
  };

  var modifier_machine = new Machine("idle");

  modifier_machine.transitions['idle'] = {
    select: function(payload) {
      modifier_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        modifier_machine.dispatch('success', data);
      } catch(error) {
        modifier_machine.dispatch('failure', error);
      }
    }
  };

  modifier_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      modifier_machine.changeStateTo("idle");
    },
    failure: function(error) {
      alert("Modifier Machine:  " + error.toString());
      modifier_machine.changeStateTo('error');
    }
  };

  return {
    set_modifier: function(payload) {
      modifier_machine.dispatch('select', payload);
    }
  };
})(dom_view, ui_view, days_controller);


var cot_controller = (function(dom, ui) {
  var render = function(data) { dom.update_cot(data); };

  var service = {
    getData: function(payload) { 
      function getText(obj) {
        if (obj.text != "") {
          return obj.text.toUpperCase();
        } else return "";
      }

      var data = ["", ""];
      data[0] = getText(payload[0]);
      data[1] = getText(payload[1]);
      return data;
    } 
  };

  var cot_machine = new Machine("idle");

  cot_machine.transitions['idle'] = {
    select: function(payload) {
      cot_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        cot_machine.dispatch('success', data);
      } catch(error) {
        cot_machine.dispatch('failure', error);
      }
    }
  };

  cot_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      cot_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Callout Machine:  " + error.toString());
      cot_machine.changeStateTo('error');
    }
  };

  return {
    set_cot: function(payload) {
      cot_machine.dispatch('select', payload);
    }
  };
})(dom_view, ui_view);

var transition_custom_controller = (function(dom, ui) {
  var render = function(data) { dom.update_trans_cust(data); };

  var service = {
    getData: function(payload) {
      var data = payload.text.split(' ');

      switch(data.length) {
        case 3 :
          data = data[0] + " " + data[1] + "\n" + data[2];
          break;

        case 2 :
          data = data[0] + " " + data[1];
          break;

        case 1 :
          data = data[0];
          break;

        default :
          var regex = /(\w+\W*\s\w+\W*)\s(.+)/;
          data = payload.text.replace(regex, "$1\n$2");
      }

      if (data == "") {
        data = [data, true];
      } else data = [data.toUpperCase(), false];
      return data;
    }
  };

  var transition_custom_machine = new Machine("idle");

  transition_custom_machine.transitions['idle'] = {
    select: function(payload) {
      transition_custom_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        transition_custom_machine.dispatch('success', data);
      } catch(error) {
        transition_custom_machine.dispatch('failure', error);
      }
    }
  };

  transition_custom_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      transition_custom_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Transition Custom Machine:  " + error.toString());
      transition_custom_machine.changeStateTo('error');
    }
  };

  return {
    set_trans_custom: function(payload) {
      transition_custom_machine.dispatch('select', payload);
    }
  };
})(dom_view, ui_view);

var event_controller = (function(ui, title_ctrl, version_ctrl, time_ctrl, days_ctrl, class_ctrl, style_ctrl, web, dom, queue, ux, mod, cot_ctrl, trans_cust_ctrl) {
  Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value;
  };

  function get_time_payload() {
    return [ui.get_time(), ui.get_half(), ui.get_day_part()];
  }

  ScriptUI.events.createEvent("MouseEvent");
  ui.ui_events.job.onChange = function() { // I'll make an exception and handle this one right here.
    //var job_num = ui.ui_events.job.text;
    //if (Number.isInteger(parseInt(job_num))) {
    // library.set_job(job_num);
    //} else {
    // alert("Warning:\n" + job_num + " is not a valid job number.");
    // ui.ui_events.job.text = "";
    // library.set_job("");
    //}
  };
  ui.ui_events.show_list.addEventListener("change", function(e) { 
    var show = ui.get_show().toString();
    title_ctrl.set_title([show, ui.get_version()]);
    style_ctrl.set_style(0);
    ux.title(show);
  });
  ui.ui_events.epi_ver.onClick = function() { version_ctrl.set_version([ui.get_show().toString(), ui.get_version()]); };
  ui.ui_events.img_ver.onClick = function() { version_ctrl.set_version([ui.get_show().toString(), ui.get_version()]); };
  ui.ui_events.time_list.addEventListener("change", function(e) {
    time_ctrl.set_time(get_time_payload());
    ux.time();
  });
  ui.ui_events.half_check.onClick = function() {
    time_ctrl.set_time(get_time_payload());
    ux.time();
  };
  ui.ui_events.am_check.onClick = function() { time_ctrl.set_time(get_time_payload()); };
  ui.ui_events.hideTime.onClick = function() {
    ux.time();
    time_ctrl.set_time(ui.is_hide_time());
  };
  ui.ui_events.days.addEventListener("change", function(e) {
    ux.days();
    days_ctrl.set_days([ui.get_days(), 0]);
    style_ctrl.set_style(0);
  });
  ui.ui_events.addNext.onClick = function() {
    ux.modifiers();
    mod.set_modifier("next");
    style_ctrl.set_style(0);
  };
  ui.ui_events.pluralizer.onClick = function() {
    ux.modifiers();
    mod.set_modifier("pluralize");
    style_ctrl.set_style(0);
  };
  ui.ui_events.web_mode.onClick = function() {
    var is_web = ui.ui_events.web_mode.value;
    ux.web(is_web);
    web.set_webMode(is_web);
  };
  //ui.ui_events.month1.addEventListener("change", function(e) { dates_ctrl.set_dates(ui.ui_events.month1, ui.ui_events.days_of_month1); });
  //ui.ui_events.month2.addEventListener("change", function(e) { dates_ctrl.set_dates(ui.ui_events.month2, ui.ui_events.days_of_month2); });
  //ui.ui_events.days_of_month1.addEventListener("change", function(e) { dates_ctrl.set_dates(ui.ui_events.month1, ui.ui_events.days_of_month1); });
  //ui.ui_events.days_of_month2.addEventListener("change", function(e) { dates_ctrl.set_dates(ui.ui_events.month2, ui.ui_events.days_of_month2); });
  ui.ui_events.show_classifier.addEventListener("change", function(e) {
    class_ctrl.set_classifiers(ui.get_classifiers());
    style_ctrl.set_style(0);
  });
  ui.ui_events.tunein_classifier.addEventListener("change", function(e) {
    class_ctrl.set_classifiers(ui.get_classifiers());
    style_ctrl.set_style(0);
  });
  ui.ui_events.custom_classifier.addEventListener("change", function(e) {
    ux.classifier();
    class_ctrl.set_classifiers(ui.get_classifiers());
  });
  ui.ui_events.bump_msg.addEventListener("change", function(e) { class_ctrl.set_classifiers(ui.get_classifiers()); });
  ui.ui_events.season_txt.addEventListener("change", function(e) { 
    ux.season("text");
    class_ctrl.set_classifiers(ui.get_classifiers());
  });
  ui.ui_events.season_slider.addEventListener("changing", function(e) {
    ux.season("slider"); 
    class_ctrl.set_classifiers(ui.get_classifiers());
  });
  ui.get_calloutName.addEventListener("change", function(evt) { cot_ctrl.set_cot( [ui.get_calloutName, ui.get_calloutMsg] ); });
  ui.get_calloutMsg.addEventListener("change", function(evt) { cot_ctrl.set_cot( [ui.get_calloutName, ui.get_calloutMsg] ); });
  ui.get_tranCust.addEventListener("change", function(evt) { trans_cust_ctrl.set_trans_custom(ui.get_tranCust); });
  ui.ui_events.send_to_queue.onClick = function() {
    var jobNum = ui.ui_events.job.text;
    if ( Number.isInteger(parseInt(jobNum)) ) {
      queue.send_to_queue(jobNum);
    } else {
      alert("No job number entered.\nJob will be saved in the root folder.");
      queue.send_to_queue("");
    } 
  };
})(ui_view, title_controller, version_controller, time_controller, days_controller, classifier_controller, style_controller, web_controller, dom_view, queue_controller, ux_controller, modifier_controller, cot_controller, transition_custom_controller);




var controller = (function(ui, show_model, style_model, dom, title_ctrl, class_ctrl, style_ctrl, time_ctrl, web) {
  function default_state(default_show, day, defaultTime) {
    var days = ui.get_days();
    days[0].selection = day;
    days[1].selection = 0;
    days[2].selection = 0;
    title_ctrl.set_title([default_show, 'epi']);
    class_ctrl.set_classifiers(ui.get_classifiers());
    time_ctrl.set_time(false);
    ui.ui_events.time_list.selection = defaultTime;
    web.set_webMode(false);
    style_ctrl.set_style(0);
    dom.update_cot(["{Actor Name}", "{Message}"]);
    dom.update_trans_cust(["", true]);
  }

  return {
    init: function() {
      var dataReady = false;
      while (!dataReady) {
        if (style_model.isDataLoaded) {
            dataReady = true;
        }
      }
      default_state("BBD", 6, 8);
    }
  };
})(ui_view, show_model, style_model, dom_view, title_controller, classifier_controller, style_controller, time_controller, web_controller);

controller.init();

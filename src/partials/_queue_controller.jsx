
var queue_controller = (function(ui, class_model, tunein_model, dom) {
  var queue = app.project.renderQueue;
  var queueItem = 1;
  var job_name = "";
  var show = ui.get_show().toString();
  var talent_parent = "";

  var format_classifier = function(value) {
    var season = ui.ui_events.season_txt.text;
    if ((value == "S" || value == "SPR") && season > 0) {
      return value.replace(/S/, "S" + season);
    } else if (value == "S" && season == 0) {
      return "";
    } else return value;
  };

  function get_class_code(list, obj) {
    if (obj.selection > 0) {
      var data = class_model.get_data()[list];
      for ( var key in data ) {
        if ( data[key] == obj.selection.toString() ) return format_classifier(key);
      }
    }
    return "";
  }

  var get_classifiers = function(product) {
    var show = get_class_code("show", ui.ui_events.show_classifier);
    var tunein = (function() {
      if (ui.ui_events.custom_classifier.text != "") return "CUST";
      else return get_class_code("tune-in", ui.ui_events.tunein_classifier);
    })();
    var bump = get_class_code("bump", ui.ui_events.bump_msg);
    if (product === "epl" || product === "l3d") {
      return [show, tunein];
    } else {
      return ""; 
    } 
  };



  function validateComp(c) {
    for (var i = 0; i < dom.valid_comps.length; i++) {
      if (dom.valid_comps[i] == c) return true;
    }
    return false;
  }

  function set_queueItem() {
    queueItem = (queue.numItems == 0) ? 1 : queue.numItems + 1;
  }

  var get_comp = function (build) {
    var shotA = build[1] + " A";
    var shotB = build[1] + " B";
    var comps = [];

    for (var i = 1; i <= app.project.items.length; i++) {
      if (app.project.items[i].name == shotA && app.project.items[i].parentFolder.name == build[0]) {
        comps.push(app.project.items[i]);
      }
      if (app.project.items[i].name == shotB && app.project.items[i].parentFolder.name == build[0]) {
        comps.push(app.project.items[i]);
      }
    }
    return comps;
  }

  var get_layer = function (comps) {
    function loop_through_comp(comp) {
      for (var i = 1; i <= comp.numLayers; i++) {
        if (comp != "" && comp.layer(i).hasVideo && comp.layer(i).active &&
          !comp.layer(i).adjustmentLayer && !(comp.layer(i).source.mainSource instanceof SolidSource)) {
          return comp.layer(i).name.replace(/\s+/g, "_").toUpperCase() + "_";
        }
      }
    }
    var shotA_name = loop_through_comp(comps[0]);
    var shotB_name = loop_through_comp(comps[1]);
    return [shotA_name, shotB_name];
  } 

  function build_talent_name() {
    var talent_comps = get_comp([talent_parent, show]);
    var talent_names = get_layer(talent_comps);
    return talent_names[0] + talent_names[1];
  }

  function build_classifiers(product) {
    var class_list = get_classifiers(product).filter(function(e) { return e != ""; });
    if (class_list.length === 0) return "";
    return class_list.join("_") + "_";
  }


  function get_days(lists) {
    var get_abbrev = function(d) {
      var day_list = tunein_model.get_day_obj();
      for (var key in day_list) {
        if (d === day_list[key]) return key;
      }
      return "Key not found.";
    };

    var getDay = function (obj, idx) {
      var d = "";
      if (obj.selection > 0) {
        d = get_abbrev(obj.selection.toString());
      }
      return d;
    };
    var result = lists.map(getDay).filter(function(d) { return d !== ""; });
    return result.join("_");
  }


  function get_months() {
    // TODO
  }


  function build_days() {
    var days_objs = ui.get_days();
    var days = get_days(days_objs);
    // TODO if (days === "") days = get_months();
    return days;
  }

  function build_time() {
    var theTime = ui.get_time().toString();
    if (ui.get_half()) theTime += "30";

    if (ui.get_day_part()) {
      theTime += "am";
    } else theTime += "pm";

    return theTime;
  }

  var remove_ending_underscore = function(name) {
    return name.replace(/_$/, "");
  };


  function build_epl_name(comp_name) {
    job_name = "EPL_";
    if (/vert/i.test(comp_name)) {
      job_name += "V";
      talent_parent = "Talent Container vert";
    } else {
      job_name += "H";
      talent_parent = "Talent Container horiz";
    } 

    job_name += (/\d{1,}/g).exec(comp_name)[0] + "_";
  }

  function build_trn_talent(compName) {
    if (/Talent/i.test(compName)) {
      return "TAL_";
    } else return "";
  }

  function build_trn_name(compName) {
    var trnVer = build_trn_talent(compName);
    if (/H/.test(compName)) {
      trnVer += "H_";
    } else trnVer += "V_";
    trnVer += ui.get_show().toString();
    return trnVer;
  }
  
  function capitalize(name) {
    name = name.toLowerCase().split(" ");
    var properName = "";
    for (var i = 0; i < name.length; i++) {
      if (typeof name[i] !== 'string') return;
      properName += name[i].charAt(0).toUpperCase() + name[i].slice(1) + "_";
    }
    return remove_ending_underscore(properName);
  }

  function build_cot_name() {
    var cotName = ui.get_show().toString() + "_";
    cotName += capitalize(ui.get_calloutName.text);
    return cotName;
  }

  function build_job_name(theComp) {
    var product = "";
    var webMode = ui.ui_events.web_mode.value;
    var hideTime = ui.is_hide_time();

    if (/^epl/i.test(theComp.name)) {
      product = "epl";
      build_epl_name(theComp.name);
    } else if (/^l3d/i.test(theComp.name)) {
      product = "l3d";
      job_name = "L3D_";
    } else if (/^bug/i.test(theComp.name)) {
      product = "bug";
      job_name = "BUG_" + ui.get_show().toString();
      return;
    } else if (/^trn/i.test(theComp.name)) {
      product = "trn";
      job_name = "TRN_" + build_trn_name(theComp.name);
      return;
    } else if (/^cot/i.test(theComp.name)) {
      job_name = "COT_" + build_cot_name();
      return;
    }

    show = ui.get_show().toString();
    job_name += show + "_";

    if (product === "epl") {
      job_name += build_talent_name();
    } 

    job_name += build_classifiers(product);
    if (webMode) {
      job_name += "WEB";
      return;
    }
    job_name += build_days() + "_";
    if (!hideTime) {
      job_name += build_time();
    }
    job_name = remove_ending_underscore(job_name);
  }

  function create_file(jobNum) {
    var job_path = "/dev/null/" + jobNum;
    var job_folder = Folder (job_path);
    var job_file = File (job_path + "/" + job_name);
    job_folder.create();
    return job_file;
  }

  function create_job(payload, theComp) {
    set_queueItem();
    build_job_name(theComp);

    queue.items.add(theComp);
    queue.item(queueItem).outputModule(1).applyTemplate("Lossless Straight");
    queue.item(queueItem).outputModule(1).file = create_file(payload);
  }
  
  var render = function(data) { 
  };

  var service = {
    getData: function(payload) {
      var theComp = app.project.activeItem;
      if (!validateComp(theComp)) {
        throw "You are not in a valid comp to render.";
      }
      create_job(payload, theComp);
      var data = "";
      return data;
    } 
  };

  var queue_machine = new Machine('idle');

  queue_machine.transitions['idle'] = {
    select: function(payload) {
      queue_machine.changeStateTo('fetching');
      try {
        var data = service.getData(payload);
        queue_machine.dispatch('success', data);
      } catch(error) {
        queue_machine.dispatch('failure', error);
      }
    }    
  };
  
  queue_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      queue_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Queue Machine:  " + error.toString());
      queue_machine.changeStateTo('error');
    }
  };

  queue_machine.transitions['error'] = {
    retry: function() {
      queue_machine.changeStateTo('idle');
      queue_machine.dispatch('select');
    }
  };

  return {
    send_to_queue: function(payload) {
      queue_machine.dispatch('select', payload); // payload == job number
    }
  };
})(ui_view, classifier_model, tunein_model, dom_view);

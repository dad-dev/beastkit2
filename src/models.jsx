  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Models:
  //
  // The Show Model reads in data from a JSON file containing titles, abbreviations, and subtitles
  // of all the shows currently in inventory.  It also provides all the colors since they are so
  // closely associated with each individual show.  The color data is read from the project, however,
  // not the JSON file.
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // Define Model Class
  function Model(data) {
    this.data = data;
    this.isDataLoaded = false;
  }

  Model.prototype.read_data = function(path) {
    var f = File(path);
    if (f.open("r")) {
      f.encoding = "UTF-8";
      this.data = JSON.parse(f.read());
      this.isDataLoaded = f.close();
    }
  };

  Model.prototype.loop_over_keys = function(obj) {
    var key_list = new Array();
    for (var key in obj) {
      key_list.push(key);
    }
    return key_list;
  };

  Model.prototype.loop_over_elements = function(obj) {
    var element_list = new Array();
    for (var key in obj) {
      element_list.push(obj[key]);
    }
    return element_list;
  };

  Model.prototype.get_index = function(element, arr) {
    var idx = parseInt(arr.map(function(value, index) { if (value === element) return index; })
                  .filter(function(value) { return value != undefined; }));
    return idx;
  };

  Model.prototype.get_key = function(element) {
    for (var key in this.data) {
			// What are we doing here?
    }
  }



  // Show Model
  var show_model = (function(dom) {
    var shows = new Model();
    // shows.read_data("~/Documents/Adobe Scripts/Development/show-titles.json");
    shows.read_data("data/show-titles.json");
    shows.colors = {};

    shows.loop_over_keys = function(obj) {
      var key_list = new Array();
      for (var key in obj) {
        shows.colors[key] = [dom.master_ctrl.layer(key).property("Effects").property("Light").property("Color").value,
                            dom.master_ctrl.layer(key).property("Effects").property("Mid").property("Color").value,
                            dom.master_ctrl.layer(key).property("Effects").property("Dark").property("Color").value];
        key_list.push(key);
      }
      return key_list;
    };

    shows.list = shows.loop_over_keys(shows.data);

    return {
      get_show_title: function(key) { return shows.data[key]["title"]; },
      get_show_subtitle: function(key) { return shows.data[key]["subtitle"]; },
      get_ui_show_list: function() { return shows.list; },
      get_show_colors: function(show) { return shows.colors[show]; },
      get_show_version: function(key) {
        return {
          main_version: shows.data[key]["style"],
					//intro_style: shows.data[key]["intro_style"],
					//l3d_style: shows.data[key]["l3d_style"],
					//opn_style: shows.data[key]["opn_style"]               //  This isn't necessary.
        }
      }
    };
  })(dom_view);



  // Classifier Model
  var classifier_model = (function() {
    var classifiers = new Model();
    classifiers.read_data("data/classifiers.json");
    classifiers.list_type = classifiers.loop_over_keys(classifiers.data);
    classifiers.show_clas_list = classifiers.loop_over_elements(classifiers.data[classifiers.list_type[0]]);
    classifiers.tune_clas_list = classifiers.loop_over_elements(classifiers.data[classifiers.list_type[1]]);
    classifiers.bump_msg_list = classifiers.loop_over_elements(classifiers.data[classifiers.list_type[2]]);

    return {
      get_show_clas_list: function() { return classifiers.show_clas_list; },
      get_tune_clas_list: function() { return classifiers.tune_clas_list; },
      get_bump_msg_list: function() { return classifiers.bump_msg_list; },
      get_class_index: function (element, arr) { return classifiers.get_index(element, arr); },
      get_data: function() { return classifiers.data; }
    };
  })();



  // Tune-in Model
  var tunein_model = (function() {
    var tunein = new Model();
    tunein.read_data("data/tune-in.json");
    tunein.list_type = tunein.loop_over_keys(tunein.data);
    tunein.days_list = new Array();
    tunein.month_list = new Array();
    tunein.time_list = tunein.data[tunein.list_type[4]];
    tunein.populate_lists = function(type) {
      for (var i = 0; i < type.length; i++) {
        if (i < 3) {
          tunein.days_list.push( tunein.loop_over_elements(tunein.data[type[i]]) );
        } else if (i === 3) {
          tunein.month_list = tunein.loop_over_elements(tunein.data[type[i]]);
        }
      }
    };

    tunein.populate_lists(tunein.list_type);

    return {
      get_days: function(day) { return tunein.days_list[day]; },
      get_months: function() { return tunein.month_list; },
      get_days_of_month: function() { return  Array.apply(null, {length: 31}).map(function(e, i, arr) { return i + 1; }); },
      get_times: function() { return tunein.time_list; },
      get_day_obj: function() { return tunein.data["day1"]; }
    };
  })();



  // Style Model
  var style_model = (function() {
    var styles = new Model();
    styles.read_data("../build/data/epl-style.json");

    return {
      get_epl_styles: function() { return styles.data; },
      isDataLoaded: styles.isDataLoaded
    };
  })();


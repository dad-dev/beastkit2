////////////////////////////////////////////////////////////////////////////////////////////////////
//
// The DOM View provides references to objects throughout the project such as compositions.  It
// will also arrange to have layers and comps updated to reflected changes in state.  Layout and
// styling may happen outside of the DOM View.  I haven't decided yet.
//
////////////////////////////////////////////////////////////////////////////////////////////////////
var dom_view = (function(utils) {
  var valid_comps_to_render = [];
  for (var i = 1; i <= app.project.items.length; i++) {
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Master Control") {
      var masterCtrl = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Time Database right") {
      var timeDB = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Time Database") {
      var timeDB_vert = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Time Database left") {
      var timeDBleft = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Time DB L3D") {
      var timeDBl3d = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "EPL Vertical 5sec") {
      var epl_5s_vert = app.project.items[i];
      valid_comps_to_render.push(epl_5s_vert);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "EPL Horizontal 5sec") {
      var epl_5s_horiz = app.project.items[i];
      valid_comps_to_render.push(epl_5s_horiz);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "EPL Vertical 8sec") {
      var epl_8s_vert = app.project.items[i];
      valid_comps_to_render.push(epl_8s_vert);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "EPL Horizontal 8sec") {
      var epl_8s_horiz = app.project.items[i];
      valid_comps_to_render.push(epl_8s_horiz);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Vertical 5sec submaster") {
      var epl_5s_vert_sub = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Horizontal 5sec submaster") {
      var epl_5s_horiz_sub = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "epl text vert") {
      var epl_text_vert = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "epl text vert move block") {
      var epl_text_vert_a = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "epl text vert move day") {
      var epl_text_vert_b = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "epl text horiz move block") {
      var epl_text_horiz_a = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "epl text horiz move day") {
      var epl_text_horiz_b = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Pos Ent vert element 5sec") {
      var pos_ent_vert_element_5s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Pos Ent vert element 8sec") {
      var pos_ent_vert_element_8s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Pos Ent horiz element 8sec") {
      var pos_ent_horiz_element_8s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Ion logo vert element 5sec") {
      var ion_logo_vert_element_5s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Ion logo vert element 8sec") {
      var ion_logo_vert_element_8s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Ion logo horiz element 8sec") {
      var ion_logo_horiz_element_8s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Ion logo horiz element 5sec") {
      var ion_logo_horiz_element_5s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Pos Ent horiz element 5sec") {
      var pos_ent_horiz_element_5s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent A vert") {
      var talent_a_vert = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent B vert") {
      var talent_b_vert = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent C vert") {
      var talent_c_vert = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent A horiz") {
      var talent_a_horiz = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent B horiz") {
      var talent_b_horiz = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent C horiz") {
      var talent_c_horiz = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "l3d master") {
      var l3d = app.project.items[i];
      valid_comps_to_render.push(l3d);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "l3d title") {
      var l3d_title = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "l3d tunein") {
      var l3d_tunein = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Bug master") {
      var bug = app.project.items[i];
      valid_comps_to_render.push(bug);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TRN Talent Horiz master") {
      var trnH_tal_master = app.project.items[i];
      valid_comps_to_render.push(trnH_tal_master);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TRN Talent Horiz submaster") {
      var trnH_tal_sub = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TRN Talent Vert master") {
      var trnV_tal_master = app.project.items[i];
      valid_comps_to_render.push(trnV_tal_master);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TRN Talent Vert submaster") {
      var trnV_tal_sub = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TRN Horiz master") {
      var trnH_master = app.project.items[i];
      valid_comps_to_render.push(trnH_master);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TRN Vert master") {
      var trnV_master = app.project.items[i];
      valid_comps_to_render.push(trnV_master);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TRN Logo element") {
      var trn_logo = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "COT master") {
      var cot_master = app.project.items[i];
      valid_comps_to_render.push(cot_master);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "COT submaster") {
      var cot_sub = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "COT Text element") {
      var cot_text = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "LOG 5sec") {
      var logo5 = app.project.items[i];
      valid_comps_to_render.push(logo5);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Logo generic") {
      var logo_generic = app.project.items[i];
    }
  }



  //+ include set-title
  //+ include set-colors
  //+ include set-talent
  //+ include set-time

  function set_text(comp, lay, value) {
    if (comp == l3d_tunein && (/,/g).test(value)) {
      value.replace(',', '');
    } else comp.layer(lay).property("Source Text").setValue(value);
  }
  
  var set_show = function(data) {
    set_title(data);
    set_colors(data.colors, data.epl_version);
    set_talent(data.short_title);
  };

  function set_animation_l3d_tunein(count) {
    var prop = l3d_title.layer("l3d tunein").property("Position");
    utils.rem_keyfrm(prop);
    var animation = {
      1: {
        times: [0, 0],
        values: [ [960, 540], [960, 540] ] 
      },
      2: {
        times: [3.2333, 4.3333],
        values: [ [960, 540], [960, 493] ]
      },
      3: {
        times: [2.6666, 3.5, 4.6666, 5.5],
        values: [ [960, 540], [960, 493], [960, 493], [960, 446] ]
      }
    };
    prop.setValuesAtTimes(animation[count]['times'], animation[count]['values']);
  }

  function set_days(data, modifier) {
    var count = 0;
    for (var key in data) {
      if (key === "Day1" && data[key] === "") {
        return;
      } else {
        set_text(epl_text_vert_b, key, data[key]);
        set_text(epl_text_horiz_b, key, data[key]);
        set_text(l3d_tunein, key, data[key]);
      }
      if (data[key] !== "") count++;
    }
    set_animation_l3d_tunein(count);
  }

  function set_classifiers(data) {
    for (var key in data) {
      set_text(epl_text_vert_a, key, data[key]);  
      set_text(epl_text_horiz_a, key, data[key]);  
      set_text(l3d_title, key, data[key]);
    }
  }


  function set_style_l3d() {
    var day_x = Math.max(utils.measure_x(l3d_title.layer("Classifier1"), 32)[0], utils.measure_x(l3d_title.layer("Show"), 32)[0]);
    l3d_title.layer("Classifier2").position.setValue([day_x, 941]);
    l3d_tunein.layer("Day1").position.setValue([day_x, 983]);
    l3d_tunein.layer("Day2").position.setValue([day_x, 1030]);
    l3d_tunein.layer("Day3").position.setValue([day_x, 1077]);

    var time1_x = 960 + ( utils.measure_x(l3d_tunein.layer("Day1"), 24)[0] - 1136 );
    var time2_x = 960 + ( utils.measure_x(l3d_tunein.layer("Day2"), 24)[0] - 1136 );
    var time3_x = 960 + ( utils.measure_x(l3d_tunein.layer("Day3"), 24)[0] - 1136 );
    l3d_tunein.layer("Time1").position.setValue([time1_x, 540]);
    l3d_tunein.layer("Time2").position.setValue([time2_x, 587]);
    l3d_tunein.layer("Time3").position.setValue([time3_x, 634]);
  }

  function style_adjustment() {
    var class1_width = Math.round(epl_text_vert_a.layer("Classifier1").sourceRectAtTime(0, true).width);
    var title_width = Math.round(epl_text_vert_a.layer("Title").sourceRectAtTime(0, true).width);
    var subtitle_width = Math.round(epl_text_vert_a.layer("Subtitle").sourceRectAtTime(0, true).width);
    var class2_width = Math.round(epl_text_vert_a.layer("Classifier2").sourceRectAtTime(0, true).width);
    var day1_width = Math.round(epl_text_vert_b.layer("Day1").sourceRectAtTime(0, true).width +
      epl_text_vert_b.layer("Ordinal1").sourceRectAtTime(0, true).width);
    var day2_width = Math.round(epl_text_vert_b.layer("Day2").sourceRectAtTime(0, true).width +
      epl_text_vert_b.layer("Ordinal2").sourceRectAtTime(0, true).width);
    var day3_width = Math.round(epl_text_vert_b.layer("Day3").sourceRectAtTime(0, true).width);
    var max_width = Math.max(class1_width, title_width, subtitle_width, class2_width, day1_width, day2_width, day3_width);
    // Extent of HD safe (1728) minus the width of text.
    epl_text_vert.layer("Horizontal Adjustment").position.setValue([1728 - max_width, 250]);
  }

  function set_style(data) {
    var layersGrp1 = ["Classifier1", "Title", "Subtitle", "Classifier2", "Time"];
    layersGrp1.map(function(l) {
      epl_text_vert_a.layer(l).position.setValue(data[0][l]["position"]);
      epl_text_vert_a.layer(l).scale.setValue(data[0][l]["scale"]);
      epl_text_horiz_a.layer(l).position.setValue(data[1][l]["position"]);
      epl_text_horiz_a.layer(l).scale.setValue(data[1][l]["scale"]);
    });

    var layersGrp2 = ["Day1", "Day2", "Day3", "Ordinal1", "Ordinal2"];
    layersGrp2.map(function(l) {
      epl_text_vert_b.layer(l).position.setValue(data[0][l]["position"]);
      epl_text_vert_b.layer(l).scale.setValue(data[0][l]["scale"]);
      epl_text_horiz_b.layer(l).position.setValue(data[1][l]["position"]);
      epl_text_horiz_b.layer(l).scale.setValue(data[1][l]["scale"]);
    });

    style_adjustment();
    set_style_l3d();
  }

  function set_web(data) {
    [epl_text_vert_a, epl_text_horiz_a].map(function(c) {
      if (data) {
        c.layer("Classifier2").enabled = false;
        c.layer("Days").enabled = false;
        c.layer("Time").enabled = false;
      } else {
        c.layer("Classifier2").enabled = true;
        c.layer("Days").enabled = true;
        c.layer("Time").enabled = true;
      }
    }); 

    if (data) {
      l3d_title.layer("Classifier2").enabled = false;
      l3d_title.layer("l3d tunein").enabled = false;
    } else {
      l3d_title.layer("Classifier2").enabled = true;
      l3d_title.layer("l3d tunein").enabled = true;
    }
  }

  function set_cot(data) {
    set_text(cot_text, "Name", data[0]);
    set_text(cot_text, "Message", data[1]);
  }

  return {
    master_ctrl: masterCtrl,
    update_show: function(data) { set_show(data); },
    update_colors: function(data) {
      set_colors(data.colors, data.epl_version);
    },
    update_time: function(data) {
      if (typeof(data) === "object") {
        change_time(data);
      } else hideTime(data);
    },
    update_days: function(data, modifier) { set_days(data, modifier); },
    update_classifiers: function(data) { set_classifiers(data); },
    update_style: function(data) { set_style(data); },
    update_web: function(data) { set_web(data); },
    update_cot: function(data) { set_cot(data); },
    valid_comps: valid_comps_to_render
  };
})(utils);


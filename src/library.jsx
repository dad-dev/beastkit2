  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // The Library holds state and is the application's single source of truth.
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  var library = (function() {
    var job = "";
    var show_title = ""; //"BLUE\nBLOODS";
    var title_abbrev = "";
    var show_subtitle = "";
    var version = "epi";
    // Alt light color is a fix for NCIS
    var show_colors = { light: [0.1882, 0.4706, 0.6588, 1], mid: [0.149, 0.3765, 0.5255, 1], dark: [0.13, 0.13, 0.13, 1], alt_light: [0.223, 0.3256, 0.702, 1] };  // default colors
    var days = ["FRIDAY", "", ""];
    var ordinals = ["", ""];
    var add_next = false;
    var pluralize = false;
    var web_mode = false;
    var air_time = "5:00";
    var day_part = "PM";
    var time_hidden = false;
    var show_classifier = "";
    var tunein_classifier = "";
    var custom_classifier = "";
    var bump_msg = "";
    var classifiers_arr = Array.apply(null, {length: 4}).map(function() { return ""; });
    var prev_classifier_show = "";
    // Default starting styles.
    var title_block_style = {
                              main_style: {
                                            "pos": [0, 0],
                                            "scale": [100, 100, 0],
                                            "sub_pos": false,
                                            "sub_scale": [100, 100, 0],
                                            "clas_pos": [0, 0],
                                            "clas_scale": [100, 100, 0],
                                            "is_orig": false
                                          },
                              intro_style: {
                                            "pos": [0, 0],
                                            "scale": [100, 100, 0],
                                            "sub_pos": false,
                                            "sub_scale": [100, 100, 0],
                                            "clas_pos": [0, 0],
                                            "clas_scale": [100, 100, 0],
                                            "is_orig": false
                                          },
                              l3d_style: {
                                "title_animation": {
                                  "out": {
                                    "start": {
                                      "time": 4,
                                      "pos": [580, 540]
                                    },
                                    "end": {
                                      "time": 4.5,
                                      "pos": [960, 540]
                                    }
                                  },

                                  "in": {
                                    "start": {
                                      "time": 14.5,
                                      "pos": [960, 540]
                                    },
                                    "end": {
                                      "time": 15,
                                      "pos": [580, 540]
                                    }
                                  },

                                  "up": {
                                    "start": {
                                      "time": 5.5,
                                      "pos": [960, 540]
                                    },
                                    "end": {
                                      "time": 5.76667,
                                      "pos": [960, 514]
                                    }
                                  },

                                  "down": {
                                    "start": {
                                      "time": 13.23334,
                                      "pos": [960, 514]
                                    },
                                    "end": {
                                      "time": 13.5,
                                      "pos": [960, 540]
                                    }
                                  }
                                }
                              },
                              opn_style: {"pos": [960, 840], "scale": [100, 100, 0], "sub_pos": [960, 760], "sub_scale": [100, 100, 0], "clas_pos": [960, 364], "clas_scale": [100, 100, 0]}
                            };
    var tunein_block_style = [];
    var valid_comps = [];

    return {
      get_log: function() {
        return {
          job_num: job,
          title: show_title,
          abbrev: title_abbrev,
          subtitle: show_subtitle,
          ver: version,
          colors: show_colors,
          days: days,
          ords: ordinals,
          addNext: add_next,
          plural: pluralize,
          web: web_mode,
          airtime: air_time,
          daypart: day_part,
          hideTime: time_hidden,
          classifiers: classifiers_arr,
          prev_show_class: prev_classifier_show,
          epl_title_block_style: title_block_style,
          epl_tunein_block_style: tunein_block_style,
          render_comps: valid_comps
        }
      },
      set_job: function(j) { job = j; },
      set_title: function(key, title, subtitle) {
        title_abbrev = key;
        show_title = title;
        show_subtitle = subtitle;
      },
      set_version: function(ver) {
        version = ver;
      },
      set_colors: function(l, m, d) {
        show_colors.light = l;
        show_colors.mid = m;
        show_colors.dark = d;
      },
      set_days: function(d) {
        if (d[0] != "" && d[0] != undefined) {
          days[0] = d[0];
        } else {
          if (/,$|s$/ig.test(days[0])) days[0] = days[0].replace(/,$|s$/gi, ""); // Undo punctuation and pluralization when days reset.
        }
        if (d[1] != "" && d[1] != undefined) {
          days[1] = d[1];
        } else days[1] = "";
        if (d[2] != "" && d[2] != undefined) {
          days[2] = d[2];
        } else days[2] = "";
      },
      set_ordinals: function(ord) { ordinals = ord; },
      set_modifiers: function(mods) {
        add_next = mods.addNext;
        pluralize = mods.pluralize;
      },
      set_web_mode: function(state) { web_mode = state; },
      set_airtime: function(t) {
        air_time = t;
      },
      set_day_part: function(dp) {
        day_part = dp;
      },
      set_time_hidden: function(state) { time_hidden = state; },
      set_classifiers: function(c) {
        classifiers_arr = c.map(function(e) { return e || ""; });
      },
      set_prev_show_class: function(prev) { prev_classifier_show = prev; },
      set_title_block_style: function(s) { title_block_style = s; },
      set_tunein_block_style: function(s) { tunein_block_style = s; },
      set_valid_comps: function(c) { valid_comps = c; }
    }
  })();


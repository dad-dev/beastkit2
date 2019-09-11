  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // The UI View constructs the UI and returns the application window.  It provides object references
  // and methods to read and manipulate the UI elements.
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  var ui_view = (function(show_model, classifiers, tunein_model) {
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
      var listShow = panelOne.add("dropdownlist", undefined, show_model.get_ui_show_list());
      listShow.minimumSize.width = 200;
      listShow.selection = 0;
      listShow.active = true;

      var stylePanel = groupOne.add("panel", undefined, "Style");
      stylePanel.alignChildren = "left";
      var style_radio1 = stylePanel.add ("radiobutton", undefined, "Episodic");
      var style_radio2 = stylePanel.add ("radiobutton", undefined, "Image");
      style_radio1.value = true;
    }

    { // Group 2
      var groupTwo = appWin.add("group", undefined, "GroupTwo");
      groupTwo.orientation = "column";
      var tuneTabs = groupTwo.add("tabbedpanel", undefined);
      tuneTabs.minimumSize.height = 130;
      tuneTabs.minimumSize.width = 234;
      tuneTabs.alignment = ["", "top"];

        // Days
        var daysTab = tuneTabs.add("tab", undefined, "Days");
        daysTab.alignChildren = "fill";


        var daySubGrp1 = daysTab.add("group", undefined, "DaySubGroup1");
        daySubGrp1.orientation = "row";
        var listDay1 = daySubGrp1.add("dropdownlist", undefined, tunein_model.get_days(0));
        listDay1.minimumSize.width = 110;
        listDay1.selection = 0;

        var add_next = daySubGrp1.add("checkbox", undefined, "Add Next");
        add_next.enabled = true;


        var daySubGrp2 = daysTab.add("group", undefined, "DaySubGroup2");
        daySubGrp2.orientation = "row";
        var listDay2 = daySubGrp2.add("dropdownlist", undefined, tunein_model.get_days(1));
        listDay2.minimumSize.width = 110;
        listDay2.selection = 0;
        listDay2.enabled = false;

        var pluralize = daySubGrp2.add("checkbox", undefined, "Pluralize");
        pluralize.enabled = true;


        var daySubGrp3 = daysTab.add("group", undefined, "DaySubGroup3");
        daySubGrp3.orientation = "row";
        var listDay3 = daySubGrp3.add("dropdownlist", undefined, tunein_model.get_days(2));
        listDay3.minimumSize.width = 110;
        listDay3.selection = 0;
        listDay3.enabled = false;

        var webChk = daySubGrp3.add("checkbox", undefined, "Web Mode");


        // Dates
        var datesTab = tuneTabs.add("tab", undefined, "Dates");
        datesTab.alignChildren = "fill";

        var firstMonthGrp = datesTab.add("group", undefined, "FirstMonthGrp");
        firstMonthGrp.orientation = "row";
        var listMonth1 = firstMonthGrp.add("dropdownlist", undefined, (function() {
                  return ["Month One"].concat( tunein_model.get_months() );
                })());
        listMonth1.selection = 0;
        var listDayOfMonth1 = firstMonthGrp.add("dropdownlist", undefined, tunein_model.get_days_of_month());
        listDayOfMonth1.selection = 0;
        listDayOfMonth1.enabled = false;

        var secondMonthGrp = datesTab.add("group", undefined, "SecondMonthGrp");
        secondMonthGrp.orientation = "row";
        var listMonth2 = secondMonthGrp.add("dropdownlist", undefined, (function() {
                  return ["Month Two"].concat( tunein_model.get_months() );
                })());
        listMonth2.selection = 0;
        var listDayOfMonth2 = secondMonthGrp.add("dropdownlist", undefined, tunein_model.get_days_of_month());
        listDayOfMonth2.selection = 0;
        listDayOfMonth2.enabled = false;


      // Time
      var timePanel = groupTwo.add("panel", undefined, "Select Time");
      timePanel.orientation = "row";
      timePanel.alignChildren = "fill";
      timePanel.minimumSize.width = 234;

      var timeSubPanelLeft = timePanel.add("group", undefined, "SubPanelLeft");
      timeSubPanelLeft.minimumSize.width = 98;
      timeSubPanelLeft.orientation = "column";
      timeSubPanelLeft.alignChildren = "left";
      var timeSubPanelRight = timePanel.add("group", undefined, "SubPanelRight");

      var timeSubPanelLeftTop = timeSubPanelLeft.add("group", undefined, "SubPanelLeftTop");
      var timeSubPanelLeftBottom = timeSubPanelLeft.add("group", undefined, "SubPanelLeftBottom");
      timeSubPanelLeftBottom.orientation = "row";

      var listTime = timeSubPanelLeftTop.add("dropdownlist", undefined, tunein_model.get_times());
      listTime.selection = 0;
      // listTime.alignment = "left";
      var half_hour = timeSubPanelLeftBottom.add("checkbox", undefined, ":30");
      var am = timeSubPanelLeftBottom.add("checkbox", undefined, "AM");
      var hide_time = timeSubPanelRight.add("checkbox", undefined, "Hide Time");
      hide_time.alignment = "left";
    }


    { // Group 3
      var groupThree = appWin.add("group", undefined, "GroupThree");
      groupThree.orientation = "column";
      //groupThree.alignChildren = "fill";
      var infoTabs = groupThree.add("tabbedpanel", undefined);
      infoTabs.minimumSize.height = 200; 
      infoTabs.maximumSize.width = 234;
      infoTabs.alignment = ["", "top"];

        // Classifier tab
        var classifierTab = infoTabs.add("tab", undefined, "Classifiers");
        classifierTab.alignChildren = "fill";

        var show_clas_list = classifiers.get_show_clas_list();
        var listShowClass = classifierTab.add("dropdownlist", undefined, show_clas_list);
        listShowClass.selection = 0;
        listShowClass.minimumSize.width = 200;

        var listTuneClass = classifierTab.add("dropdownlist", undefined, classifiers.get_tune_clas_list());
        listTuneClass.selection = 0;
        listTuneClass.minimumSize.width = 200;


        var spacer_grp = classifierTab.add("group", undefined, "SpacerGRP");
        spacer_grp.orientation = "column";
        spacer_grp.minimumSize.height = 5;

        var custom_label = classifierTab.add("statictext", undefined, "Custom Tune-in Classifier", "StaticText");
        custom_label.alignment = "left";
        var customTuneClass = classifierTab.add("edittext", undefined);
        customTuneClass.minimumSize.width = 200;

        var spacer_grp2 = classifierTab.add("group", undefined, "SpacerGRP");
        spacer_grp2.orientation = "column";
        spacer_grp2.minimumSize.height = 5;


        var seasonLabel = classifierTab.add("statictext", undefined, "Season No.", "StaticText");
        seasonLabel.alignment = "center";
        var seasonGrpOne = classifierTab.add("group", undefined, "SeasonGrpOne");
        seasonGrpOne.orientation = "row";
        seasonGrpOne.alignment = "center";
        var season = seasonGrpOne.add ("edittext", undefined, 0);
        season.minimumSize.width = 28;
        var slider = seasonGrpOne.add ("slider", undefined, 0, 0, 20);
        
        var spacer_grp3 = classifierTab.add("group", undefined, "SpacerGRP");
        spacer_grp3.orientation = "column";
        spacer_grp3.minimumSize.height = 5;

        var bumpLabel = classifierTab.add("statictext", undefined, "Bump Message", "StaticText");
        var listBumpMsg = classifierTab.add("dropdownlist", undefined, classifiers.get_bump_msg_list());
        listBumpMsg.selection = 0;
        listBumpMsg.minimumSize.width = 200;

        // Callout tab
        var cotTab = infoTabs.add("tab", undefined, "Callout");
        cotTab.alignChildren = "fill";
        cotTab.add("statictext", undefined, "Name", "StaticText");
        var cot_name = cotTab.add("edittext", undefined);
        cot_name.minimumSize.width = 210;
        cotTab.add("statictext", undefined, "Message", "StaticText");
        var cot_message = cotTab.add("edittext", undefined);

        // Transitions custom tab
        var transTab = infoTabs.add("tab", undefined, "Transitions");
        transTab.alignChildren = "fill";
        transTab.add("statictext", undefined, "Custom Text", "StaticText");
        var tranCustom = transTab.add("edittext", undefined);
    }



    { // Group 4
      var groupFour = appWin.add("group", undefined, "GroupFour");
      groupFour.orientation = "column";
      groupFour.alignChildren = "fill";

      var queue_grp = groupFour.add("group", undefined, "QueueGrp");
      queue_grp.minimumSize.height = 60;
      queue_grp.minimumSize.width = 234;

      var queue_btn = queue_grp.add("button", undefined, "\uD83C\uDF7A Send to Queue");
      queue_btn.alignment = ["center", "top"];
      queue_btn.enabled = true;

      // include artwork

      function getBinaryFile() {
      	var uiImgFile = new File("data/uiLogo.png");
      	if (!uiImgFile.exists) {
      	    createFile(uiImgFile);
      	}
      	return uiImgFile;
      }

    	function createFile(file) {
        makeSureFolderExists(file.parent);
        try {
    	    file.encoding = "BINARY";
    	    file.open( "w" );
      		file.write( rawData );
      		file.close();
        }
        catch(err) {
    		// Could not write file.  Moving on.
        }
    	}

    	function makeSureFolderExists(folder) {
        if(!folder.exists) {
      		folder.create();
        }
    	}

      try {
        var icon = groupFour.add("image", undefined, getBinaryFile(), "Image");
        icon.alignment = "right";
      }
      catch(err) {
        // Can't reach image file.
      }
    }

    appWin.center();
    appWin.show();

    return {
      ui_win: appWin,
	    get_show: function() {
        return listShow.selection;
      },
      get_version: function() {
        if (style_radio1.value) {
          return 'epi';
        } else {
          return 'img';
        }
      },
			get_time: function() {
        return listTime.selection.index;
      },
      get_half: function() {
        return half_hour.value;
      },
      get_day_part: function() {
        return am.value;
      },
      is_hide_time: function() {
        return hide_time.value;
      },
      
      get_days: function() {
        // Reset months if we're selecting days.
        function getDay(obj) {
          if (obj.selection.index > 0) {
            return obj.selection.toString().toUpperCase();
          } else return "";
        }

        if (listDay1.selection > 0) {
          listMonth1.selection = 0;
        }
        if (listDay2.selection > 0) {
          listMonth2.selection = 0;
        }
        return [listDay1, listDay2, listDay3]; 
      },
      
      set_max_days_of_month: function(month, days_list) {
        var max = 31;

        switch (true) {
          case (month == 2) :
            (new Date(Date(0)).getFullYear() == 2020) ? max = 29 : max = 28;
            break;
          case (month % 2 == 0 && month <= 7) :
            max = 30;
            break;
          case (month % 2 == 1 && month > 7 && month < 13) :
            max = 30;
            break;
          default : max = 31;
        }

        // Move selection if out of bounds.
        if ((parseInt(days_list.selection) + 1) > max) {
          days_list.selection = max - 1;
        }

        var delta = days_list.items.length - max;
        if (delta != 0) {
          if (delta > 0) {
            for (var i = days_list.items.length - 1; i >= max; i--) {
              days_list.remove(days_list.items[i]);
            }
          } else if (delta < 0) {
            for (var j = days_list.items.length; j < max; j++) {
              days_list.add("item", j + 1);
            }
          }
        }
      },

      get_classifiers: function() {
        return [listShowClass, listTuneClass, customTuneClass, listBumpMsg];
      },

      get_calloutName: cot_name,
      get_calloutMsg: cot_message,
      get_tranCust: tranCustom,

      set_auto_classifier: function(is_original) {
        var current_state = library.get_log().classifiers[0];
        var current_index = 0;
        (current_state == "") ? current_index = 0 : current_index = listShowClass.find(current_state).index;
        var orig_ser_idx = classifiers.get_class_index("Original Series", show_clas_list);
        var prev = library.get_log().prev_show_class;

        // Set classifier to "Original Series" if true, or whatever classifier was previously if false.
        if (is_original) {
          listShowClass.selection = orig_ser_idx;
        } else if (prev == "") {
          listShowClass.selection = 0;
        } else listShowClass.selection = listShowClass.find(prev).index;
      },

      enable_xtra_days: function(day, state) {
        if (state) {
          day.enabled = true;
        } else {
          day.selection = 0;
          day.enabled = false;
        }
      },

      enable_day_modifiers: function(state) {
        if (state) {
          if (add_next.value) {
            add_next.enabled = true;
            pluralize.enabled = false;
          } else if (pluralize.value) {
            add_next.enabled = false;
            pluralize.enabled = true;
          } else {
            add_next.enabled = true;
            pluralize.enabled = true;
          }
        } else {
          add_next.enabled = false;
          add_next.value = false;
          pluralize.enabled = false;
          pluralize.value = false;
        }
      },
      toggle_enabled: function(state, other_obj) {
        (state) ? other_obj.enabled = false : other_obj.enabled = true;
      },
      set_season_text: function() {
        slider.value = parseInt(season.text);
        if (isNaN(season.text)) season.text = 0;
        var s_num = season.text;
        return s_num;
      },
      set_season_slider: function() {
        season.text = Math.floor(slider.value);
      },
      zero_out_objects: function(objs) {
        objs.map(function(element) { element.selection = 0; });
			},

      ui_events: {
        job: job_num,
        show_list: listShow,
				epi_ver: style_radio1,
        img_ver: style_radio2,
        time_list: listTime,
        half_check: half_hour,
        am_check: am,
        hideTime: hide_time,
        days: daysTab,
        addNext: add_next,
        pluralizer: pluralize,
        web_mode: webChk,
        month1: listMonth1,
        days_of_month1: listDayOfMonth1,
        month2: listMonth2,
        days_of_month2: listDayOfMonth2,
        show_classifier: listShowClass,
        tunein_classifier: listTuneClass,
        custom_classifier: customTuneClass,
        bump_msg: listBumpMsg,
        season_txt: season,
        season_slider: slider,
				send_to_queue: queue_btn
      }
    };

  })(show_model, classifier_model, tunein_model);


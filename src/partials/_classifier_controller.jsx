
var classifier_controller = (function(ui, dom) {
  var render = function(data) { dom.update_classifiers(data); };

  var service = {
    getData: function(payload) {
      function add_season(c) {
        var season = ui.ui_events.season_txt.text;

        if (season == "0" && c.selection.index == 1) {
          return "";
        } else if ( season == "0" && c.selection.index == 4) {
          return c.selection.toString().toUpperCase();
        }

        if (c.selection.index == 1) {
          return c.selection.toString().toUpperCase() + " " + season;
        } else {
          return c.selection.toString().toUpperCase().replace(" ", " " + season + " ");
        }
      }

      function set_classifier(c) {
        if (c.selection.index == 0) return "";

        if (c.selection.index == 1 || c.selection.index == 4) {
          return add_season(c);
        }
        return c.selection.toString().toUpperCase();
      }

      var class1 = set_classifier(payload[0]); 
      var class2 = "";

      if (payload[2].text == "" && payload[1].selection.index > 0) {
        class2 = set_classifier(payload[1]);
      } else if (payload[2].text != "") class2 = payload[2].text.toUpperCase();

      return {
        "Classifier1": class1,
        "Classifier2": class2
      }
    }
  };


  var classifier_machine = new Machine("idle");

  
  classifier_machine.transitions['idle'] = {
    select: function(payload) {
      classifier_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        classifier_machine.dispatch('success', data);
      } catch(error) {
        classifier_machine.dispatch('failure', error);
      }
    }
  };

  classifier_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      classifier_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert(error);
      classifier_machine.changeStateTo('error');
    }
  };

  classifier_machine.transitions['error'] = {
    retry: function() {
      classifier_machine.changeStateTo('idle');
      classifier_machine.dispatch('select');
    }
  };

  return {
    set_classifiers: function(payload) {
      classifier_machine.dispatch('select', payload);
    }
  };
})(ui_view, dom_view);


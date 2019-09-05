
var style_controller = (function(ui, show_model, styles, dom) {
  // Bit mask constants
  var HAS_1LINE = 1;        // 000001
  var HAS_2LINE = 1 << 1;   // 000010
  var HAS_1DAY = 1 << 2;    // 000100
  var HAS_2DAY = 1 << 3;    // 001000
  var HAS_3DAY = 1 << 4;    // 010000
  var HAS_NEXT = 1 << 5;    // 100000


  function compare_with_bitmask(state) {
    var stateNumber = 0;

    if (state.one_line == true) stateNumber = stateNumber | HAS_1LINE;
    if (state.two_line == true) stateNumber = stateNumber | HAS_2LINE;
    
    if (state.three_day == true) stateNumber = stateNumber | HAS_3DAY;
    else if (state.two_day == true) stateNumber = stateNumber | HAS_2DAY;
    else if (state.one_day == true) stateNumber = stateNumber | HAS_1DAY;

    if (state.next == true) stateNumber = stateNumber | HAS_NEXT;
    return stateNumber;
  }

  function get_vert_line_style(state) {
    if (state & HAS_1LINE) {
      return ["Vertical One", "Horizontal One"];
    } else return ["Vertical Two", "Horizontal Two"];
  }

  function get_vert_day_style(state) {
    if (state & HAS_1DAY)
      return "One Day";
    if (state & HAS_2DAY)
      return "Two Day";
    if (state & HAS_3DAY) 
      return "Three Day";
    if (state & HAS_NEXT) 
      return "Next";
  }

  function show_line_num() {
    if (/\n/.test(show_model.get_show_title(ui.get_show().toString()))) {
      return [false, true];
    } else {
      return [true, false];
    }
  }

  function how_many_days() {
    var days = ui.get_days();
    var selection = [true, false, false, false];

    if (days[0].selection.index == 1) {
      return [false, false, false, true];
    } else {
      days.map(function(element, index) {
        if (index > 0 && element.selection.index > 0) {
          selection[index] = true;
        } 
      });
    }
    return selection;
  }

  function get_state() {
    var oneLine, twoLine, oneDay, twoDay, threeDay, next;
    var num_lines = show_line_num();
    var days_selection = how_many_days();

    return {
      one_line: num_lines[0],
      two_line: num_lines[1],
      one_day: days_selection[0],
      two_day: days_selection[1],
      three_day: days_selection[2],
      next: days_selection[3]
    };
  }

  function get_layout() {
    var state = compare_with_bitmask( get_state() );
    var style;
    var line = get_vert_line_style(state);
    var day = get_vert_day_style(state);
    return [styles.get_epl_styles()[line[0]][day],
            styles.get_epl_styles()[line[1]][day]];
  }


  var render = function(data) { dom.update_style(data); };

  var service = {
    getData: function(payload) {
      var style = get_layout();
      return style; 
    }
  };


  var style_machine = new Machine("idle");

  
  style_machine.transitions['idle'] = {
    select: function(payload) {
      style_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        style_machine.dispatch('success', data);
      } catch(error) {
        style_machine.dispatch('failure', error);
      }
    }
  };

  style_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      style_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Style Machine:  " + error.toString());
      style_machine.changeStateTo('error');
    }
  };

  style_machine.transitions['error'] = {
    retry: function() {
      style_machine.changeStateTo('idle');
      style_machine.dispatch('select');
    }
  };

  return {
    set_style: function(payload) {
      style_machine.dispatch('select', payload);
    }
  };
})(ui_view, show_model, style_model, dom_view);


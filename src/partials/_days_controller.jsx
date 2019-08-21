
var days_controller = (function(ui, dom) {
  var render = function(data) { dom.update_days(data); };

  function set_modifiers(day) {

  }

  var service = {
    getData: function(payload) {
      var dayList = payload.map(function(day) {
        if (day.selection.index > 0) return day.selection.toString().toUpperCase();
        else return "";
      });

      if (dayList[2] !== "" && dayList[1] !== "") {
        dayList[0] += ",";
        dayList[2] = "& " + dayList[2];
      } else if (dayList[1] !== "" && dayList[2] === "") {
        dayList[1] = "& " + dayList[1]      }

      return {
        "Day1": dayList[0],
        "Day2": dayList[1],
        "Day3": dayList[2]
      };
    }
  };
  var days_machine = new Machine("idle");

  
  days_machine.transitions['idle'] = {
    select: function(payload) {
      days_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        days_machine.dispatch('success', data);
      } catch(error) {
        days_machine.dispatch('failure', error);
      }
    }
  };

  days_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      days_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Days Machine:  " + error.toString());
      days_machine.changeStateTo('error');
    }
  };

  days_machine.transitions['error'] = {
    retry: function() {
      days_machine.changeStateTo('idle');
      days_machine.dispatch('select');
    }
  };

  return {
    set_days: function(payload) {
      days_machine.dispatch('select', payload);
    }
  };
})(ui_view, dom_view);


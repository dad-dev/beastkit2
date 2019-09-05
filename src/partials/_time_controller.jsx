
var time_controller = (function(ui, dom) {
  var render = function(data) { dom.update_time(data); };

  var time_machine = new Machine("idle");

  
  time_machine.transitions['idle'] = {
    select: function(payload) {
      time_machine.changeStateTo('fetching');
      try {
        time_machine.dispatch('success', payload);
      } catch(error) {
        time_machine.dispatch('failure', error);
      }
    }
  };

  time_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      time_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Time Machine:  " + error.toString());
      time_machine.changeStateTo('error');
    }
  };

  time_machine.transitions['error'] = {
    retry: function() {
      time_machine.changeStateTo('idle');
      time_machine.dispatch('select');
    }
  };

  return {
    set_time: function(payload) {
      time_machine.dispatch('select', payload);
    }
  };
})(ui_view, dom_view);


var version_controller = (function(ui, dom) {
  var render = function(data) { 
    dom.update_colors(data);
  };

  var service = {
    getData: function(payload) {
      return {
        colors: show_model.get_show_colors(payload[0]),
        epl_version: payload[1]
      }
    } 
  };

  var version_machine = new Machine('idle');

  version_machine.transitions['idle'] = {
    select: function(payload) {
      version_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        version_machine.dispatch('success', data);
      } catch(error) {
        version_machine.dispatch('failure', error);
      }
    }    
  };
  
  version_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      version_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Version Machine:  " + error.toString());
      version_machine.changeStateTo('error');
    }
  };

  version_machine.transitions['error'] = {
    retry: function() {
      version_machine.changeStateTo('idle');
      version_machine.dispatch('select');
    }
  };

  return {
    set_version: function(payload) {
      version_machine.dispatch('select', payload);
    }
  };

})(ui_view, dom_view);

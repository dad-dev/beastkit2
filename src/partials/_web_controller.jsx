
var web_controller = (function(dom) {
  var render = function(data) { dom.update_web(data); };

  //var service = {
  //  getData: function(payload) {
  //    var style = get_layout();
  //    return style; 
  //  }
  //};


  var web_machine = new Machine("idle");

  
  web_machine.transitions['idle'] = {
    select: function(payload) {
      web_machine.changeStateTo('fetching');
      try {
        web_machine.dispatch('success', payload);
      } catch(error) {
        web_machine.dispatch('failure', error);
      }
    }
  };

  web_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      web_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Web Machine:  " + error.toString());
      web_machine.changeStateTo('error');
    }
  };

  web_machine.transitions['error'] = {
    retry: function() {
      web_machine.changeStateTo('idle');
      web_machine.dispatch('select');
    }
  };

  return {
    set_webMode: function(payload) {
      web_machine.dispatch('select', payload);
    }
  };
})(dom_view);

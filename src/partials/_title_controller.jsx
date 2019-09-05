
var title_controller = (function(ui, show_model, dom) {
  var render = function(data) {
    dom.update_show(data);
  };

  var service = {
    getData: function(payload) {
      return {
        short_title: payload[0],
        title: show_model.get_show_title(payload[0]),
        sub: show_model.get_show_subtitle(payload[0]),
        colors: show_model.get_show_colors(payload[0]),
        epl_version: payload[1]
      };
    }
  };

  var title_machine = new Machine('idle');

  title_machine.transitions['idle'] = {
    select: function(payload) {
      title_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        title_machine.dispatch('success', data);
      } catch(error) {
        title_machine.dispatch('failure', error);
      }
    }
  };

  title_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      title_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Title Machine:  " + error.toString());
      title_machine.changeStateTo('error');
    }
  };

  title_machine.transitions['error'] = {
    retry: function() {
      title_machine.changeStateTo('idle');
      title_machine.dispatch('select');
    }
  };

  return {
    set_title: function(payload) {
      title_machine.dispatch('select', payload);
    }
  };
})(ui_view, show_model, dom_view);

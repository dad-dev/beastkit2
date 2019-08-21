
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////// Set talent layers 

  function set_talent(show) {
    [talent_a_vert, talent_b_vert, talent_c_vert, talent_a_horiz, talent_b_horiz, talent_c_horiz].map(function(c) {
      for (var i = 1; i <= c.layers.length; i++) {
        if (c.layers[i].name === show || c.layers[i].name === "BG") {
          c.layers[i].opacity.setValue(100);
        } else {
          c.layers[i].opacity.setValue(0);
        }
      }
    });
  }


  
  //////////// End talent layers
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////// Set time 

  // timeDBleft
  function change_time(data) {
    var offset = 0;
    if (data[1]) offset = 12;

    if (data[0] !== 0) {
      for (var i = 1; i < timeDB.numLayers; i++) {
        timeDB.layer(i).opacity.setValue(0);
        timeDBleft.layer(i).opacity.setValue(0);
        timeDBl3d.layer(i).opacity.setValue(0);
      }
      timeDB.layer(data[0] + offset).opacity.setValue(100);
      timeDBleft.layer(data[0] + offset).opacity.setValue(100);
      timeDBl3d.layer(data[0] + offset).opacity.setValue(100);
      timeDBleft.layer(25).position.setValue( utils.measure_x(timeDBleft.layer(data[0] + offset), 20) );
      timeDBl3d.layer(25).position.setValue( utils.measure_x(timeDBl3d.layer(data[0] + offset), 20) );
      if (data[2]) {
        timeDB.layer(25).property("Source Text").setValue("AM"); 
        timeDBleft.layer(25).property("Source Text").setValue("AM");
        timeDBl3d.layer(25).property("Source Text").setValue("AM");
      } else {
        timeDB.layer(25).property("Source Text").setValue("PM");
        timeDBleft.layer(25).property("Source Text").setValue("PM");
        timeDBl3d.layer(25).property("Source Text").setValue("PM");
      } 
    }

  }

  //////////// End set time
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

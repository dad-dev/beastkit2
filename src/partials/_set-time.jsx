
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
      timeDB_vert.layer(i).opacity.setValue(0);
      timeDBl3d.layer(i).opacity.setValue(0);
    }
    timeDB.layer(data[0] + offset).opacity.setValue(100);
    timeDBleft.layer(data[0] + offset).opacity.setValue(100);
    timeDB_vert.layer(data[0] + offset).opacity.setValue(100);
    timeDBl3d.layer(data[0] + offset).opacity.setValue(100);
    timeDBleft.layer(25).position.setValue( utils.measure_x(timeDBleft.layer(data[0] + offset), 20) );
    timeDB_vert.layer(25).position.setValue( utils.measure_x(timeDB_vert.layer(data[0] + offset), 20) );
    timeDBl3d.layer(25).position.setValue( utils.measure_x(timeDBl3d.layer(data[0] + offset), 14) );
    if (data[2]) {
      timeDB.layer(25).property("Source Text").setValue("AM"); 
      timeDBleft.layer(25).property("Source Text").setValue("AM");
      timeDB_vert.layer(25).property("Source Text").setValue("AM");
      timeDBl3d.layer(25).property("Source Text").setValue("AM");
    } else {
      timeDB.layer(25).property("Source Text").setValue("PM");
      timeDBleft.layer(25).property("Source Text").setValue("PM");
      timeDB_vert.layer(25).property("Source Text").setValue("PM");
      timeDBl3d.layer(25).property("Source Text").setValue("PM");
    } 
  }
}

function hideTime(data) {
  if (data) {
    epl_text_vert_a.layer("Time").opacity.setValue(0);
    epl_text_horiz_a.layer("Time").opacity.setValue(0);
    l3d_tunein.layer("Time1").opacity.setValue(0);
    l3d_tunein.layer("Time2").opacity.setValue(0);
    l3d_tunein.layer("Time3").opacity.setValue(0);
  } else {
    epl_text_vert_a.layer("Time").opacity.setValue(100);
    epl_text_horiz_a.layer("Time").opacity.setValue(100);
    l3d_tunein.layer("Time1").opacity.setValue(100);
    l3d_tunein.layer("Time2").opacity.setValue(100);
    l3d_tunein.layer("Time3").opacity.setValue(100);
  } 
}

//////////// End set time
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

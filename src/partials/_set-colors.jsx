
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////// Change colors

  var GRAY = [0.6737,0.6737,0.6737];
  var WHITE = [0.9083, 0.9041, 0.9041];
  var FULL_WHITE = [1.0, 1.0, 1.0];

  function set_color_on_fill(obj, layer, color) {
    obj.layer(layer).property("Effects").property("Fill").property("Color").setValue(color);
  }

  function set_color_on_gradient(obj, layer, start, end) {
    obj.layer(layer).property("Effects").property("Gradient Ramp").property("Start Color").setValue(start);
    obj.layer(layer).property("Effects").property("Gradient Ramp").property("End Color").setValue(end);
  }

  function set_colors_epls(colors) {
    set_color_on_fill(epl_text_vert_a, "Title", colors.text1);
    set_color_on_fill(epl_text_vert_a, "Subtitle", colors.text1);
    set_color_on_fill(epl_text_horiz_a, "Title", colors.text1);
    set_color_on_fill(epl_text_horiz_a, "Subtitle", colors.text1);
    set_color_on_gradient(epl_5s_vert_sub, "Wipe", colors.fg1, colors.fg2);
    set_color_on_gradient(epl_5s_horiz_sub, "Wipe", colors.fg1, colors.fg2);
    [talent_a_vert, talent_b_vert, talent_c_vert, talent_a_horiz, talent_b_horiz, talent_c_horiz].map( function(c) {
      set_color_on_gradient(c, "BG", colors.bg1, colors.bg2);
    } );
  }

  function set_colors_hero_logo(colors, colorversion) {
    set_color_on_gradient(ion_logo_vert_element_5s, "Logo", colors[0], colors[1]);
    set_color_on_gradient(ion_logo_horiz_element_5s, "Logo", colors[0], colors[1]);
    set_color_on_gradient(pos_ent_vert_element_5s, "Text", colorversion.bg1, colorversion.bg2);
    set_color_on_gradient(pos_ent_vert_element_5s, "BG", colorversion.fg1, colorversion.fg2);
    set_color_on_gradient(pos_ent_horiz_element_5s, "Text", colorversion.bg1, colorversion.bg2);
    set_color_on_gradient(pos_ent_horiz_element_5s, "BG", colorversion.fg1, colorversion.fg2);

    set_color_on_gradient(pos_ent_vert_element_8s, "Text", colors[0], colors[1]);
    set_color_on_gradient(ion_logo_vert_element_8s, "Logo", colorversion.bg1, colorversion.bg2);
    set_color_on_gradient(ion_logo_vert_element_8s, "BG", colorversion.fg1, colorversion.fg2);
    set_color_on_gradient(pos_ent_horiz_element_8s, "Text", colors[0], colors[1]);
    set_color_on_gradient(ion_logo_horiz_element_8s, "Logo", colorversion.bg1, colorversion.bg2);
    set_color_on_gradient(ion_logo_horiz_element_8s, "BG", colorversion.fg1, colorversion.fg2);
  }

  function set_color_version(col, version) {
    var colors = {};
    
    if (version == 'epi') {
      colors.fg1 = col[0]; 
      colors.fg2 = col[1];
      colors.bg1 = GRAY;
      colors.bg2 = WHITE;
      colors.text1 = col[1]
    } else {
      colors.fg1 = GRAY; 
      colors.fg2 = WHITE;
      colors.bg1 = col[0];
      colors.bg2 = col[1];
      colors.text1 = FULL_WHITE;
    }
    return colors;
  }

  function set_gradient_position(version) {
    var setUp = function(obj) {
      if (version == "epi") {
        obj.layer('BG').property("Effects").property("Gradient Ramp").property("Start of Ramp").setValue([960, 0]);
        obj.layer('BG').property("Effects").property("Gradient Ramp").property("End of Ramp").setValue([960, 1080]);
        obj.layer('BG').property("Effects").property("Brightness & Contrast").property("Brightness").setValue(0);
      } else {
        obj.layer('BG').property("Effects").property("Gradient Ramp").property("Start of Ramp").setValue([960, 164]);
        obj.layer('BG').property("Effects").property("Gradient Ramp").property("End of Ramp").setValue([960, 688]);
        obj.layer('BG').property("Effects").property("Brightness & Contrast").property("Brightness").setValue(-61);
      }
    };

    [pos_ent_vert_element_5s, pos_ent_horiz_element_5s, ion_logo_vert_element_8s, ion_logo_horiz_element_8s].map(setUp);
  }

  function set_colors_l3d(colors) {
    l3d.layer("wedge").property("Effects").property("Fill").property("Color").setValue(colors[1]);
    l3d_title.layer("Show").property("Effects").property("Fill").property("Color").setValue(colors[0]);
  }

  function set_colors(colors, version) {
    var colorversion = set_color_version(colors, version);
    // Endplates
    set_colors_epls(colorversion);

    // Hero Logo
    set_colors_hero_logo(colors, colorversion);
    set_gradient_position(version);

    // Lower Third
    set_colors_l3d(colors);
  }

  //////////// End change colors
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

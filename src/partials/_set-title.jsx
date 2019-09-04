
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// Change title

function set_title_epl(data) {
  [epl_text_vert_a, epl_text_horiz_a].map(function(obj) {
    obj.layer("Title").property("Source Text").setValue(data.title);
    obj.layer("Subtitle").property("Source Text").setValue(data.sub);
  });
}

function set_title_l3d(data) {
  var strip_linefeeds = function(text) {
    return text.replace(/\n/, " ");
  };

  l3d_title.layer("Show").property("Source Text").setValue(strip_linefeeds(data.title) + " " + strip_linefeeds(data.sub));
}

function set_title(data) {
  set_title_epl(data);
  set_title_l3d(data);
  //[epl_text_vert_a, epl_text_horiz_a].map(function(obj) {
  //  obj.layer("Title").property("Source Text").setValue(data.title);
  //  obj.layer("Subtitle").property("Source Text").setValue(data.sub);
  //});
};


//////////// End change title
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

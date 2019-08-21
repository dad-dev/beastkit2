
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// Change title

function set_title_epl(data) {
  [epl_text_vert_a, epl_text_horiz_a].map(function(obj) {
    obj.layer("Title").property("Source Text").setValue(data.title);
    obj.layer("Subtitle").property("Source Text").setValue(data.sub);
  });
}

function set_title_l3d(data) {
  l3d_title.layer("Show").property("Source Text").setValue(data.title.replace(/\n/, " ") + " " + data.sub);
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

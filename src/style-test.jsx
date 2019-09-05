
function Model(data) {
  this.data = data;
}

Model.prototype.read_data = function(path) {
  var f = File(path);
  if (f.open("r")) {
    f.encoding = "UTF-8";
    this.data = JSON.parse(f.read());
    f.close();
  }
};

Model.prototype.loop_over_keys = function(obj) {
  var key_list = new Array();
  for (var key in obj) {
    key_list.push(key);
  }
  return key_list;
};

Model.prototype.loop_over_elements = function(obj) {
  var element_list = new Array();
  for (var key in obj) {
    element_list.push(obj[key]);
  }
  return element_list;
};

Model.prototype.get_index = function(element, arr) {
  var idx = parseInt(arr.map(function(value, index) { if (value === element) return index; })
                .filter(function(value) { return value != undefined; }));
  return idx;
};

Model.prototype.get_key = function(element) {
  for (var key in this.data) {
    // What are we doing here?
  }
}


var style = new Model();

style.read_data("../build/data/epl-style.json");
alert(style.loop_over_keys(style.data));
alert(style.loop_over_keys(style.data["Vertical One"]["One Day"]));
alert(style.loop_over_keys(style.data["Vertical One"]["One Day"]["Title"]));
alert(style.data["Vertical One"]["One Day"]["Title"]["Position"]);


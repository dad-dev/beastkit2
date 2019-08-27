///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// BeastKit.jsx
/// v. 2.0 
/// Author:  Jeffery W. Hall
/// Last Updated:  June 28, 2019
///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


main();
function main() {

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Polyfills
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  if(!Array.prototype.map){Array.prototype.map=function(callback){var T,A,k;if(this==null){throw new TypeError('this is null or not defined')}
var O=Object(this);var len=O.length>>>0;if(typeof callback!=='function'){throw new TypeError(callback+' is not a function')}
if(arguments.length>1){T=arguments[1]}
A=new Array(len);k=0;while(k<len){var kValue,mappedValue;if(k in O){kValue=O[k];mappedValue=callback.call(T,kValue,k,O);A[k]=mappedValue}
k++}
return A}}

if(!Array.prototype.filter){Array.prototype.filter=function(func,thisArg){'use strict';if(!((typeof func==='Function'||typeof func==='function')&&this))
throw new TypeError();var len=this.length>>>0,res=new Array(len),t=this,c=0,i=-1;if(thisArg===undefined){while(++i!==len){if(i in this){if(func(t[i],i,t)){res[c++]=t[i]}}}}
else{while(++i!==len){if(i in this){if(func.call(thisArg,t[i],i,t)){res[c++]=t[i]}}}}
res.length=c;return res}}
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Bring in JSON
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  "object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return a<10?"0"+a:a}function this_value(){return this.valueOf()}function quote(a){return rx_escapable.lastIndex=0,rx_escapable.test(a)?'"'+a.replace(rx_escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,h,g=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,h=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=0===h.length?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;c<f;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=0===h.length?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;d<c;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();
  ////////////////////////////////////////////////////////////////////////////////////////////////////


  var utils = (function() {
    var hold = KeyframeInterpolationType.HOLD;
    var bez = KeyframeInterpolationType.BEZIER;

    var compute_x_pos_vector = function(measure_layer, offset) {
      var scal = measure_layer.scale.value.map(function(value) { return value / 100; });
      var new_vec = Math.round(measure_layer.sourceRectAtTime(0, true).width * scal[0]) + measure_layer.position.value[0] + offset;
      return [new_vec, measure_layer.position.value[1], 0];
    };

    var remove_keyframes = function(param) {
      for (var i = param.numKeys; i != 0; i--) {
        param.removeKey(i);
      }
    };

    var set_interpolation = function(obj, is_single) {
      if (is_single) {
        obj.setInterpolationTypeAtKey(1, hold, hold);
      } else {
        for (var i = obj.numKeys; i != 0; i--) {
          if (i % 2 == 0) {
            obj.setInterpolationTypeAtKey(i, bez, hold);
          } else obj.setInterpolationTypeAtKey(i, hold, bez);
        }
      }
    };

    return {
      measure_x: function(measure_layer, offset) { return compute_x_pos_vector(measure_layer, offset); },
      hold: this.hold,
      bez: this.bez,
      rem_keyfrm: function(param) { remove_keyframes(param); },
      setInterpType: function(obj, bool) { set_interpolation(obj, bool); }
    }
  })();

	
// Finite state machine constructor	
	function Machine(state) {
		this.state = state;
    this.data;
		this.transitions = {
      'idle': {},
			'fetching': {},
			'error': {}
		}
	}

	Machine.prototype.dispatch = function(actionName, payload) {
		var actions = this.transitions[this.state];
		var action = this.transitions[this.state][actionName];

		if (action) {
      //$.writeln("Action dispatched:  " + actionName);
			action(payload);
		}
	};

	Machine.prototype.changeStateTo = function(newState) {
    //$.writeln("State changed:  " + newState);
		this.state = newState;
	};

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// The DOM View provides references to objects throughout the project such as compositions.  It
// will also arrange to have layers and comps updated to reflected changes in state.  Layout and
// styling may happen outside of the DOM View.  I haven't decided yet.
//
////////////////////////////////////////////////////////////////////////////////////////////////////
var dom_view = (function(utils) {
  var valid_comps_to_render = [];
  for (var i = 1; i <= app.project.items.length; i++) {
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Master Control") {
      var masterCtrl = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Time Database right") {
      var timeDB = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Time Database left") {
      var timeDBleft = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Time DB L3D") {
      var timeDBl3d = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "EPL Vertical 5sec") {
      var epl_5s_vert = app.project.items[i];
      valid_comps_to_render.push(epl_5s_vert);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "EPL Horizontal 5sec") {
      var epl_5s_horiz = app.project.items[i];
      valid_comps_to_render.push(epl_5s_horiz);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "EPL Vertical 8sec") {
      var epl_8s_vert = app.project.items[i];
      valid_comps_to_render.push(epl_8s_vert);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "EPL Horizontal 8sec") {
      var epl_8s_horiz = app.project.items[i];
      valid_comps_to_render.push(epl_8s_horiz);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Vertical 5sec submaster") {
      var epl_5s_vert_sub = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Horizontal 5sec submaster") {
      var epl_5s_horiz_sub = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "epl text vert move block") {
      var epl_text_vert_a = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "epl text vert move day") {
      var epl_text_vert_b = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "epl text horiz move block") {
      var epl_text_horiz_a = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "epl text horiz move day") {
      var epl_text_horiz_b = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Pos Ent vert element 5sec") {
      var pos_ent_vert_element_5s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Pos Ent vert element 8sec") {
      var pos_ent_vert_element_8s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Pos Ent horiz element 8sec") {
      var pos_ent_horiz_element_8s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Ion logo vert element 5sec") {
      var ion_logo_vert_element_5s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Ion logo vert element 8sec") {
      var ion_logo_vert_element_8s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Ion logo horiz element 8sec") {
      var ion_logo_horiz_element_8s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Ion logo horiz element 5sec") {
      var ion_logo_horiz_element_5s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Pos Ent horiz element 5sec") {
      var pos_ent_horiz_element_5s = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent A vert") {
      var talent_a_vert = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent B vert") {
      var talent_b_vert = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent C vert") {
      var talent_c_vert = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent A horiz") {
      var talent_a_horiz = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent B horiz") {
      var talent_b_horiz = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Talent C horiz") {
      var talent_c_horiz = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "l3d master") {
      var l3d = app.project.items[i];
      valid_comps_to_render.push(l3d);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "l3d title") {
      var l3d_title = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "l3d tunein") {
      var l3d_tunein = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Bug master") {
      var bug = app.project.items[i];
      valid_comps_to_render.push(bug);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TRN Horiz master") {
      var trnH_master = app.project.items[i];
      valid_comps_to_render.push(trnH_master);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TRN Horiz submaster") {
      var trnH_sub = app.project.items[i];
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TRN Vert master") {
      var trnV_master = app.project.items[i];
      valid_comps_to_render.push(trnV_master);
    }
    if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TRN Vert submaster") {
      var trnV_sub = app.project.items[i];
    }
  }




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

  function set_colors_trn(colors) {
    set_color_on_fill(trnH_sub, "Wipe", colors[0]);
    set_color_on_fill(trnV_sub, "Wipe", colors[0]);
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

    // Transitions
    set_colors_trn(colors);
  }

  //////////// End change colors
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  function set_text(comp, lay, value) {
    if (comp == l3d_tunein && (/,/g).test(value)) {
      value.replace(',', '');
    } else comp.layer(lay).property("Source Text").setValue(value);
  }
  
  var set_show = function(data) {
    set_title(data);
    set_colors(data.colors, data.epl_version);
    set_talent(data.short_title);
  };

  function set_animation_l3d_tunein(count) {
    var prop = l3d_title.layer("l3d tunein").property("Position");
    utils.rem_keyfrm(prop);
    var animation = {
      1: {
        times: [0, 0],
        values: [ [960, 540], [960, 540] ] 
      },
      2: {
        times: [3.2333, 4.3333],
        values: [ [960, 540], [960, 461] ]
      },
      3: {
        times: [2.6666, 3.5, 4.6666, 5.5],
        values: [ [960, 540], [960, 461], [960, 461], [960, 382] ]
      }
    };
    prop.setValuesAtTimes(animation[count]['times'], animation[count]['values']);
  }

  function set_days(data, modifier) {
    var count = 0;
    for (var key in data) {
      if (key === "Day1" && data[key] === "") {
        return;
      } else {
        set_text(epl_text_vert_b, key, data[key]);
        set_text(epl_text_horiz_b, key, data[key]);
        set_text(l3d_tunein, key, data[key]);
      }
      if (data[key] !== "") count++;
    }
    set_animation_l3d_tunein(count);
  }

  function set_classifiers(data) {
    for (var key in data) {
      set_text(epl_text_vert_a, key, data[key]);  
      set_text(epl_text_horiz_a, key, data[key]);  
      set_text(l3d_title, key, data[key]);
    }
  }


  function set_style_l3d() {
    var day_x = Math.max(utils.measure_x(l3d_title.layer("Classifier1"), 51)[0], utils.measure_x(l3d_title.layer("Show"), 51)[0]);
    l3d_title.layer("Classifier2").position.setValue([day_x, 407]);
    l3d_tunein.layer("Day1").position.setValue([day_x, 478]);
    l3d_tunein.layer("Day2").position.setValue([day_x, 557]);
    l3d_tunein.layer("Day3").position.setValue([day_x, 636]);

    var time1_x = 960 + ( utils.measure_x(l3d_tunein.layer("Day1"), 32)[0] - 1136 );
    var time2_x = 960 + ( utils.measure_x(l3d_tunein.layer("Day2"), 32)[0] - 1136 );
    var time3_x = 960 + ( utils.measure_x(l3d_tunein.layer("Day3"), 32)[0] - 1136 );
    l3d_tunein.layer("Time1").position.setValue([time1_x, 540]);
    l3d_tunein.layer("Time2").position.setValue([time2_x, 619]);
    l3d_tunein.layer("Time3").position.setValue([time3_x, 698]);
  }

  function set_style(data) {
    var layersGrp1 = ["Classifier1", "Title", "Subtitle", "Classifier2", "Time"];
    layersGrp1.map(function(l) {
      epl_text_vert_a.layer(l).position.setValue(data[0][l]["position"]);
      epl_text_vert_a.layer(l).scale.setValue(data[0][l]["scale"]);
      epl_text_horiz_a.layer(l).position.setValue(data[1][l]["position"]);
      epl_text_horiz_a.layer(l).scale.setValue(data[1][l]["scale"]);
    });

    var layersGrp2 = ["Day1", "Day2", "Day3", "Ordinal1", "Ordinal2"];
    layersGrp2.map(function(l) {
      epl_text_vert_b.layer(l).position.setValue(data[0][l]["position"]);
      epl_text_vert_b.layer(l).scale.setValue(data[0][l]["scale"]);
      epl_text_horiz_b.layer(l).position.setValue(data[1][l]["position"]);
      epl_text_horiz_b.layer(l).scale.setValue(data[1][l]["scale"]);
    });

    set_style_l3d();
  }

  function set_web(data) {
    [epl_text_vert_a, epl_text_horiz_a].map(function(c) {
      if (data) {
        c.layer("Classifier2").enabled = false;
        c.layer("Days").enabled = false;
        c.layer("Time").enabled = false;
      } else {
        c.layer("Classifier2").enabled = true;
        c.layer("Days").enabled = true;
        c.layer("Time").enabled = true;
      }
    }); 

    if (data) {
      l3d_title.layer("Classifier2").enabled = false;
      l3d_title.layer("l3d tunein").enabled = false;
    } else {
      l3d_title.layer("Classifier2").enabled = true;
      l3d_title.layer("l3d tunein").enabled = true;
    }
  }


  return {
    master_ctrl: masterCtrl,
    update_show: function(data) { set_show(data); },
    update_colors: function(data) {
      set_colors(data.colors, data.epl_version);
    },
    update_time: function(data) {
      if (typeof(data) === "object") {
        change_time(data);
      } else hideTime(data);
    },
    update_days: function(data, modifier) { set_days(data, modifier); },
    update_classifiers: function(data) { set_classifiers(data); },
    update_style: function(data) { set_style(data); },
    update_web: function(data) { set_web(data); },
    valid_comps: valid_comps_to_render
  };
})(utils);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Models:
  //
  // The Show Model reads in data from a JSON file containing titles, abbreviations, and subtitles
  // of all the shows currently in inventory.  It also provides all the colors since they are so
  // closely associated with each individual show.  The color data is read from the project, however,
  // not the JSON file.
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // Define Model Class
  function Model(data) {
    this.data = data;
    this.isDataLoaded = false;
  }

  Model.prototype.read_data = function(path) {
    var f = File(path);
    if (f.open("r")) {
      f.encoding = "UTF-8";
      this.data = JSON.parse(f.read());
      this.isDataLoaded = f.close();
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



  // Show Model
  var show_model = (function(dom) {
    var shows = new Model();
    // shows.read_data("~/Documents/Adobe Scripts/Development/show-titles.json");
    shows.read_data("data/show-titles.json");
    shows.colors = {};

    shows.loop_over_keys = function(obj) {
      var key_list = new Array();
      for (var key in obj) {
        shows.colors[key] = [dom.master_ctrl.layer(key).property("Effects").property("Light").property("Color").value,
                            dom.master_ctrl.layer(key).property("Effects").property("Mid").property("Color").value,
                            dom.master_ctrl.layer(key).property("Effects").property("Dark").property("Color").value];
        key_list.push(key);
      }
      return key_list;
    };

    shows.list = shows.loop_over_keys(shows.data);

    return {
      get_show_title: function(key) { return shows.data[key]["title"]; },
      get_show_subtitle: function(key) { return shows.data[key]["subtitle"]; },
      get_ui_show_list: function() { return shows.list; },
      get_show_colors: function(show) { return shows.colors[show]; },
      get_show_version: function(key) {
        return {
          main_version: shows.data[key]["style"],
					//intro_style: shows.data[key]["intro_style"],
					//l3d_style: shows.data[key]["l3d_style"],
					//opn_style: shows.data[key]["opn_style"]               //  This isn't necessary.
        }
      }
    };
  })(dom_view);



  // Classifier Model
  var classifier_model = (function() {
    var classifiers = new Model();
    classifiers.read_data("data/classifiers.json");
    classifiers.list_type = classifiers.loop_over_keys(classifiers.data);
    classifiers.show_clas_list = classifiers.loop_over_elements(classifiers.data[classifiers.list_type[0]]);
    classifiers.tune_clas_list = classifiers.loop_over_elements(classifiers.data[classifiers.list_type[1]]);
    classifiers.bump_msg_list = classifiers.loop_over_elements(classifiers.data[classifiers.list_type[2]]);

    return {
      get_show_clas_list: function() { return classifiers.show_clas_list; },
      get_tune_clas_list: function() { return classifiers.tune_clas_list; },
      get_bump_msg_list: function() { return classifiers.bump_msg_list; },
      get_class_index: function (element, arr) { return classifiers.get_index(element, arr); },
      get_data: function() { return classifiers.data; }
    };
  })();



  // Tune-in Model
  var tunein_model = (function() {
    var tunein = new Model();
    tunein.read_data("data/tune-in.json");
    tunein.list_type = tunein.loop_over_keys(tunein.data);
    tunein.days_list = new Array();
    tunein.month_list = new Array();
    tunein.time_list = tunein.data[tunein.list_type[4]];
    tunein.populate_lists = function(type) {
      for (var i = 0; i < type.length; i++) {
        if (i < 3) {
          tunein.days_list.push( tunein.loop_over_elements(tunein.data[type[i]]) );
        } else if (i === 3) {
          tunein.month_list = tunein.loop_over_elements(tunein.data[type[i]]);
        }
      }
    };

    tunein.populate_lists(tunein.list_type);

    return {
      get_days: function(day) { return tunein.days_list[day]; },
      get_months: function() { return tunein.month_list; },
      get_days_of_month: function() { return  Array.apply(null, {length: 31}).map(function(e, i, arr) { return i + 1; }); },
      get_times: function() { return tunein.time_list; },
      get_day_obj: function() { return tunein.data["day1"]; }
    };
  })();



  // Style Model
  var style_model = (function() {
    var styles = new Model();
    styles.read_data("../build/data/epl-style.json");

    return {
      get_epl_styles: function() { return styles.data; },
      isDataLoaded: styles.isDataLoaded
    };
  })();

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // The UI View constructs the UI and returns the application window.  It provides object references
  // and methods to read and manipulate the UI elements.
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  var ui_view = (function(show_model, classifiers, tunein_model) {
    var appWin = new Window("palette", "BeastKit v.2.0", undefined, {resizeable: false});

      appWin.orientation = "column";

    { // Group 1
      var groupOne = appWin.add("group", undefined, "GroupOne");
      groupOne.orientation = "column";
      groupOne.minimumSize.height = 200;
      groupOne.alignChildren = "fill";

      var jobPanel = groupOne.add("panel", undefined, "Enter Job Number");
      jobPanel.alignment = ["", "top"];
      var job_num = jobPanel.add ("edittext", undefined);
      job_num.minimumSize.width = 200;
      job_num.active = true;

      var panelOne = groupOne.add("panel", undefined, "Select Show");
      var listShow = panelOne.add("dropdownlist", undefined, show_model.get_ui_show_list());
      listShow.minimumSize.width = 200;
      listShow.selection = 0;
      listShow.active = true;

      var stylePanel = groupOne.add("panel", undefined, "Style");
      stylePanel.alignChildren = "left";
      var style_radio1 = stylePanel.add ("radiobutton", undefined, "Episodic");
      var style_radio2 = stylePanel.add ("radiobutton", undefined, "Image");
      style_radio1.value = true;
    }

    { // Group 2
      var groupTwo = appWin.add("group", undefined, "GroupTwo");
      groupTwo.orientation = "column";
      var tuneTabs = groupTwo.add("tabbedpanel", undefined);
      tuneTabs.minimumSize.height = 130;
      tuneTabs.minimumSize.width = 234;
      tuneTabs.alignment = ["", "top"];

        // Days
        var daysTab = tuneTabs.add("tab", undefined, "Days");
        daysTab.alignChildren = "fill";


        var daySubGrp1 = daysTab.add("group", undefined, "DaySubGroup1");
        daySubGrp1.orientation = "row";
        var listDay1 = daySubGrp1.add("dropdownlist", undefined, tunein_model.get_days(0));
        listDay1.minimumSize.width = 110;
        listDay1.selection = 0;

        var add_next = daySubGrp1.add("checkbox", undefined, "Add Next");
        add_next.enabled = true;


        var daySubGrp2 = daysTab.add("group", undefined, "DaySubGroup2");
        daySubGrp2.orientation = "row";
        var listDay2 = daySubGrp2.add("dropdownlist", undefined, tunein_model.get_days(1));
        listDay2.minimumSize.width = 110;
        listDay2.selection = 0;
        listDay2.enabled = false;

        var pluralize = daySubGrp2.add("checkbox", undefined, "Pluralize");
        pluralize.enabled = true;


        var daySubGrp3 = daysTab.add("group", undefined, "DaySubGroup3");
        daySubGrp3.orientation = "row";
        var listDay3 = daySubGrp3.add("dropdownlist", undefined, tunein_model.get_days(2));
        listDay3.minimumSize.width = 110;
        listDay3.selection = 0;
        listDay3.enabled = false;

        var webChk = daySubGrp3.add("checkbox", undefined, "Web Mode");


        // Dates
        var datesTab = tuneTabs.add("tab", undefined, "Dates");
        datesTab.alignChildren = "fill";

        var firstMonthGrp = datesTab.add("group", undefined, "FirstMonthGrp");
        firstMonthGrp.orientation = "row";
        var listMonth1 = firstMonthGrp.add("dropdownlist", undefined, (function() {
                  return ["Month One"].concat( tunein_model.get_months() );
                })());
        listMonth1.selection = 0;
        var listDayOfMonth1 = firstMonthGrp.add("dropdownlist", undefined, tunein_model.get_days_of_month());
        listDayOfMonth1.selection = 0;
        listDayOfMonth1.enabled = false;

        var secondMonthGrp = datesTab.add("group", undefined, "SecondMonthGrp");
        secondMonthGrp.orientation = "row";
        var listMonth2 = secondMonthGrp.add("dropdownlist", undefined, (function() {
                  return ["Month Two"].concat( tunein_model.get_months() );
                })());
        listMonth2.selection = 0;
        var listDayOfMonth2 = secondMonthGrp.add("dropdownlist", undefined, tunein_model.get_days_of_month());
        listDayOfMonth2.selection = 0;
        listDayOfMonth2.enabled = false;


      // Time
      var timePanel = groupTwo.add("panel", undefined, "Select Time");
      timePanel.orientation = "row";
      timePanel.alignChildren = "fill";
      timePanel.minimumSize.width = 234;

      var timeSubPanelLeft = timePanel.add("group", undefined, "SubPanelLeft");
      timeSubPanelLeft.minimumSize.width = 98;
      timeSubPanelLeft.orientation = "column";
      timeSubPanelLeft.alignChildren = "left";
      var timeSubPanelRight = timePanel.add("group", undefined, "SubPanelRight");

      var timeSubPanelLeftTop = timeSubPanelLeft.add("group", undefined, "SubPanelLeftTop");
      var timeSubPanelLeftBottom = timeSubPanelLeft.add("group", undefined, "SubPanelLeftBottom");
      timeSubPanelLeftBottom.orientation = "row";

      var listTime = timeSubPanelLeftTop.add("dropdownlist", undefined, tunein_model.get_times());
      listTime.selection = 0;
      // listTime.alignment = "left";
      var half_hour = timeSubPanelLeftBottom.add("checkbox", undefined, ":30");
      var am = timeSubPanelLeftBottom.add("checkbox", undefined, "AM");
      var hide_time = timeSubPanelRight.add("checkbox", undefined, "Hide Time");
      hide_time.alignment = "left";
    }


    { // Group 3
      var groupThree = appWin.add("group", undefined, "GroupThree");
      groupThree.orientation = "column";
      groupThree.alignChildren = "fill";

      var classifierPanel = groupThree.add("panel", undefined, "Classifiers");
      classifierPanel.alignment = ["", "top"];
      classifierPanel.minimumSize.width = 234;

      var show_clas_list = classifiers.get_show_clas_list();
      var listShowClass = classifierPanel.add("dropdownlist", undefined, show_clas_list);
      listShowClass.selection = 0;
      listShowClass.minimumSize.width = 200;

      var listTuneClass = classifierPanel.add("dropdownlist", undefined, classifiers.get_tune_clas_list());
      listTuneClass.selection = 0;
      listTuneClass.minimumSize.width = 200;


      var spacer_grp = classifierPanel.add("group", undefined, "SpacerGRP");
      spacer_grp.orientation = "column";
      spacer_grp.minimumSize.height = 5;

      var custom_label = classifierPanel.add("statictext", undefined, "Custom Tune-in Classifier", "StaticText");
      custom_label.alignment = "left";
      var customTuneClass = classifierPanel.add("edittext", undefined);
      customTuneClass.minimumSize.width = 200;

      var spacer_grp2 = classifierPanel.add("group", undefined, "SpacerGRP");
      spacer_grp2.orientation = "column";
      spacer_grp2.minimumSize.height = 5;


      classifierPanel.add("statictext", undefined, "Season No.", "StaticText");
      var seasonGrpOne = classifierPanel.add("group", undefined, "SeasonGrpOne");
      seasonGrpOne.orientation = "row";
      var season = seasonGrpOne.add ("edittext", undefined, 0);
      season.minimumSize.width = 28;
      var slider = seasonGrpOne.add ("slider", undefined, 0, 0, 20);

      var bumpPanel = groupThree.add("panel", undefined, "Bump Callout");
      bumpPanel.minimumSize.width = 234;
      var listBumpMsg = bumpPanel.add("dropdownlist", undefined, classifiers.get_bump_msg_list());
      listBumpMsg.selection = 0;
      listBumpMsg.minimumSize.width = 200;
    }



    { // Group 4
      var groupFour = appWin.add("group", undefined, "GroupFour");
      groupFour.orientation = "column";
      groupFour.alignChildren = "fill";

      var queue_grp = groupFour.add("group", undefined, "QueueGrp");
      queue_grp.minimumSize.height = 60;
      queue_grp.minimumSize.width = 234;

      var queue_btn = queue_grp.add("button", undefined, "\uD83C\uDF7A Send to Queue");
      queue_btn.alignment = ["center", "top"];
      queue_btn.enabled = true;

      // include artwork

      function getBinaryFile() {
      	var uiImgFile = new File("data/uiLogo.png");
      	if (!uiImgFile.exists) {
      	    createFile(uiImgFile);
      	}
      	return uiImgFile;
      }

    	function createFile(file) {
        makeSureFolderExists(file.parent);
        try {
    	    file.encoding = "BINARY";
    	    file.open( "w" );
      		file.write( rawData );
      		file.close();
        }
        catch(err) {
    		// Could not write file.  Moving on.
        }
    	}

    	function makeSureFolderExists(folder) {
        if(!folder.exists) {
      		folder.create();
        }
    	}

      try {
        var icon = groupFour.add("image", undefined, getBinaryFile(), "Image");
        icon.alignment = "right";
      }
      catch(err) {
        // Can't reach image file.
      }
    }

    appWin.center();
    appWin.show();

    return {
      ui_win: appWin,
	    get_show: function() {
        return listShow.selection;
      },
      get_version: function() {
        if (style_radio1.value) {
          return 'epi';
        } else {
          return 'img';
        }
      },
			get_time: function() {
        return listTime.selection.index;
      },
      get_half: function() {
        return half_hour.value;
      },
      get_day_part: function() {
        return am.value;
      },
      is_hide_time: function() {
        return hide_time.value;
      },
      
      get_days: function() {
        // Reset months if we're selecting days.
        function getDay(obj) {
          if (obj.selection.index > 0) {
            return obj.selection.toString().toUpperCase();
          } else return "";
        }

        if (listDay1.selection > 0) {
          listMonth1.selection = 0;
        }
        if (listDay2.selection > 0) {
          listMonth2.selection = 0;
        }
        return [listDay1, listDay2, listDay3]; 
      },
      
      set_max_days_of_month: function(month, days_list) {
        var max = 31;

        switch (true) {
          case (month == 2) :
            (new Date(Date(0)).getFullYear() == 2020) ? max = 29 : max = 28;
            break;
          case (month % 2 == 0 && month <= 7) :
            max = 30;
            break;
          case (month % 2 == 1 && month > 7 && month < 13) :
            max = 30;
            break;
          default : max = 31;
        }

        // Move selection if out of bounds.
        if ((parseInt(days_list.selection) + 1) > max) {
          days_list.selection = max - 1;
        }

        var delta = days_list.items.length - max;
        if (delta != 0) {
          if (delta > 0) {
            for (var i = days_list.items.length - 1; i >= max; i--) {
              days_list.remove(days_list.items[i]);
            }
          } else if (delta < 0) {
            for (var j = days_list.items.length; j < max; j++) {
              days_list.add("item", j + 1);
            }
          }
        }
      },

      get_classifiers: function() {
        return [listShowClass, listTuneClass, customTuneClass, listBumpMsg];
      },

      set_auto_classifier: function(is_original) {
        var current_state = library.get_log().classifiers[0];
        var current_index = 0;
        (current_state == "") ? current_index = 0 : current_index = listShowClass.find(current_state).index;
        var orig_ser_idx = classifiers.get_class_index("Original Series", show_clas_list);
        var prev = library.get_log().prev_show_class;

        // Set classifier to "Original Series" if true, or whatever classifier was previously if false.
        if (is_original) {
          listShowClass.selection = orig_ser_idx;
        } else if (prev == "") {
          listShowClass.selection = 0;
        } else listShowClass.selection = listShowClass.find(prev).index;
      },

      enable_xtra_days: function(day, state) {
        if (state) {
          day.enabled = true;
        } else {
          day.selection = 0;
          day.enabled = false;
        }
      },

      enable_day_modifiers: function(state) {
        if (state) {
          if (add_next.value) {
            add_next.enabled = true;
            pluralize.enabled = false;
          } else if (pluralize.value) {
            add_next.enabled = false;
            pluralize.enabled = true;
          } else {
            add_next.enabled = true;
            pluralize.enabled = true;
          }
        } else {
          add_next.enabled = false;
          add_next.value = false;
          pluralize.enabled = false;
          pluralize.value = false;
        }
      },
      toggle_enabled: function(state, other_obj) {
        (state) ? other_obj.enabled = false : other_obj.enabled = true;
      },
      set_season_text: function() {
        slider.value = parseInt(season.text);
        if (isNaN(season.text)) season.text = 0;
        var s_num = season.text;
        return s_num;
      },
      set_season_slider: function() {
        season.text = Math.floor(slider.value);
      },
      zero_out_objects: function(objs) {
        objs.map(function(element) { element.selection = 0; });
			},

      ui_events: {
        job: job_num,
        show_list: listShow,
				epi_ver: style_radio1,
        img_ver: style_radio2,
        time_list: listTime,
        half_check: half_hour,
        am_check: am,
        hideTime: hide_time,
        days: daysTab,
        addNext: add_next,
        pluralizer: pluralize,
        web_mode: webChk,
        month1: listMonth1,
        days_of_month1: listDayOfMonth1,
        month2: listMonth2,
        days_of_month2: listDayOfMonth2,
        show_classifier: listShowClass,
        tunein_classifier: listTuneClass,
        custom_classifier: customTuneClass,
        bump_msg: listBumpMsg,
        season_txt: season,
        season_slider: slider,
				send_to_queue: queue_btn
      }
    };

  })(show_model, classifier_model, tunein_model);

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Below are a number of controllers.  Controller kicks things off with its init() method setting up
// a default view.  Each controller is responsible for a particular functional area.  In general,
// it handles the business logic, managing state via the Library, and calling the DOM View to update
// the project.  The Time Controller is a little unique. It manages the Time Database, and updates
// the view directly.  The reason is admittedly a little flimsy.  The Time Database is self-
// contained in its own comp.  Its layout and styling are built into the comp.  By handling the
// business logic it's pretty much all the way handled (UPDATE:  Not quite anymore.  I need to
// review this.).
//
////////////////////////////////////////////////////////////////////////////////////////////////////


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

var time_controller = (function(ui, dom) {
  var render = function(data) { dom.update_time(data); };

  var time_machine = new Machine("idle");

  
  time_machine.transitions['idle'] = {
    select: function(payload) {
      time_machine.changeStateTo('fetching');
      try {
        time_machine.dispatch('success', payload);
      } catch(error) {
        time_machine.dispatch('failure', error);
      }
    }
  };

  time_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      time_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Time Machine:  " + error.toString());
      time_machine.changeStateTo('error');
    }
  };

  time_machine.transitions['error'] = {
    retry: function() {
      time_machine.changeStateTo('idle');
      time_machine.dispatch('select');
    }
  };

  return {
    set_time: function(payload) {
      time_machine.dispatch('select', payload);
    }
  };
})(ui_view, dom_view);

var days_controller = (function(ui, dom) {
  var render = function(data) { 
    dom.update_days(data, 0);
  };

  function set_modifiers(days, mod) {
    if (mod == "next") {
      days[0] = "NEXT " + days[0];
      return days;
    } else if (mod == "s") {
      days[0] += "S";
      return days;
    } else if (mod == "ss") {
      days[0] +="S";
      days[1] +="S";
      return days;
    } else if (mod == "sss") {
      days[0] +="S";
      days[1] +="S";
      days[2] +="S";
      return days;
    } else return days;
  }

  var service = {
    getData: function(payload) {
      var dayList = payload[0].map(function(day) {
        if (day.selection.index > 0) return day.selection.toString().toUpperCase();
        else return "";
      });

      dayList = set_modifiers(dayList, payload[1]);

      if (dayList[2] !== "" && dayList[1] !== "") {
        dayList[0] += ",";
        dayList[2] = "& " + dayList[2];
      } else if (dayList[1] !== "" && dayList[2] === "") {
        dayList[1] = "& " + dayList[1];
      }

      return {
        "Day1": dayList[0],
        "Day2": dayList[1],
        "Day3": dayList[2]
      };
    }
  };
  var days_machine = new Machine("idle");

  
  days_machine.transitions['idle'] = {
    select: function(payload) {
      days_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        days_machine.dispatch('success', data);
      } catch(error) {
        days_machine.dispatch('failure', error);
      }
    }
  };

  days_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      days_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Days Machine:  " + error.toString());
      days_machine.changeStateTo('error');
    }
  };

  days_machine.transitions['error'] = {
    retry: function() {
      days_machine.changeStateTo('idle');
      days_machine.dispatch('select');
    }
  };

  return {
    set_days: function(payload) {
      days_machine.dispatch('select', payload);
    }
  };
})(ui_view, dom_view);


var classifier_controller = (function(ui, dom) {
  var render = function(data) { dom.update_classifiers(data); };

  var service = {
    getData: function(payload) {
      function add_season(c) {
        var season = ui.ui_events.season_txt.text;

        if (season == "0" && c.selection.index == 1) {
          return "";
        } else if ( season == "0" && c.selection.index == 4) {
          return c.selection.toString().toUpperCase();
        }

        if (c.selection.index == 1) {
          return c.selection.toString().toUpperCase() + " " + season;
        } else {
          return c.selection.toString().toUpperCase().replace(" ", " " + season + " ");
        }
      }

      function set_classifier(c) {
        if (c.selection.index == 0) return "";

        if (c.selection.index == 1 || c.selection.index == 4) {
          return add_season(c);
        }
        return c.selection.toString().toUpperCase();
      }

      var class1 = set_classifier(payload[0]); 
      var class2 = "";

      if (payload[2].text == "" && payload[1].selection.index > 0) {
        class2 = set_classifier(payload[1]);
      } else if (payload[2].text != "") class2 = payload[2].text.toUpperCase();

      return {
        "Classifier1": class1,
        "Classifier2": class2
      }
    }
  };


  var classifier_machine = new Machine("idle");

  
  classifier_machine.transitions['idle'] = {
    select: function(payload) {
      classifier_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        classifier_machine.dispatch('success', data);
      } catch(error) {
        classifier_machine.dispatch('failure', error);
      }
    }
  };

  classifier_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      classifier_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert(error);
      classifier_machine.changeStateTo('error');
    }
  };

  classifier_machine.transitions['error'] = {
    retry: function() {
      classifier_machine.changeStateTo('idle');
      classifier_machine.dispatch('select');
    }
  };

  return {
    set_classifiers: function(payload) {
      classifier_machine.dispatch('select', payload);
    }
  };
})(ui_view, dom_view);


var style_controller = (function(ui, show_model, styles, dom) {
  // Bit mask constants
  var HAS_1LINE = 1;        // 000001
  var HAS_2LINE = 1 << 1;   // 000010
  var HAS_1DAY = 1 << 2;    // 000100
  var HAS_2DAY = 1 << 3;    // 001000
  var HAS_3DAY = 1 << 4;    // 010000
  var HAS_NEXT = 1 << 5;    // 100000


  function compare_with_bitmask(state) {
    var stateNumber = 0;

    if (state.one_line == true) stateNumber = stateNumber | HAS_1LINE;
    if (state.two_line == true) stateNumber = stateNumber | HAS_2LINE;
    
    if (state.three_day == true) stateNumber = stateNumber | HAS_3DAY;
    else if (state.two_day == true) stateNumber = stateNumber | HAS_2DAY;
    else if (state.one_day == true) stateNumber = stateNumber | HAS_1DAY;

    if (state.next == true) stateNumber = stateNumber | HAS_NEXT;
    return stateNumber;
  }

  function get_vert_line_style(state) {
    if (state & HAS_1LINE) {
      return ["Vertical One", "Horizontal One"];
    } else return ["Vertical Two", "Horizontal Two"];
  }

  function get_vert_day_style(state) {
    if (state & HAS_1DAY)
      return "One Day";
    if (state & HAS_2DAY)
      return "Two Day";
    if (state & HAS_3DAY) 
      return "Three Day";
    if (state & HAS_NEXT) 
      return "Next";
  }

  function show_line_num() {
    if (/\n/.test(show_model.get_show_title(ui.get_show().toString()))) {
      return [false, true];
    } else {
      return [true, false];
    }
  }

  function how_many_days() {
    var days = ui.get_days();
    var selection = [true, false, false, false];

    if (days[0].selection.index == 1) {
      return [false, false, false, true];
    } else {
      days.map(function(element, index) {
        if (index > 0 && element.selection.index > 0) {
          selection[index] = true;
        } 
      });
    }
    return selection;
  }

  function get_state() {
    var oneLine, twoLine, oneDay, twoDay, threeDay, next;
    var num_lines = show_line_num();
    var days_selection = how_many_days();

    return {
      one_line: num_lines[0],
      two_line: num_lines[1],
      one_day: days_selection[0],
      two_day: days_selection[1],
      three_day: days_selection[2],
      next: days_selection[3]
    };
  }

  function get_layout() {
    var state = compare_with_bitmask( get_state() );
    var style;
    var line = get_vert_line_style(state);
    var day = get_vert_day_style(state);
    return [styles.get_epl_styles()[line[0]][day],
            styles.get_epl_styles()[line[1]][day]];
  }


  var render = function(data) { dom.update_style(data); };

  var service = {
    getData: function(payload) {
      var style = get_layout();
      return style; 
    }
  };


  var style_machine = new Machine("idle");

  
  style_machine.transitions['idle'] = {
    select: function(payload) {
      style_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        style_machine.dispatch('success', data);
      } catch(error) {
        style_machine.dispatch('failure', error);
      }
    }
  };

  style_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      style_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Style Machine:  " + error.toString());
      style_machine.changeStateTo('error');
    }
  };

  style_machine.transitions['error'] = {
    retry: function() {
      style_machine.changeStateTo('idle');
      style_machine.dispatch('select');
    }
  };

  return {
    set_style: function(payload) {
      style_machine.dispatch('select', payload);
    }
  };
})(ui_view, show_model, style_model, dom_view);


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

var queue_controller = (function(ui, class_model, tunein_model, dom) {
  var queue = app.project.renderQueue;
  var queueItem = 1;
  var job_name = "";
  var show = ui.get_show().toString();
  var talent_parent = "";

  var format_classifier = function(value) {
    var season = ui.ui_events.season_txt.text;
    if ((value == "S" || value == "SPR") && season > 0) {
      return value.replace(/S/, "S" + season);
    } else if (value == "S" && season == 0) {
      return "";
    } else return value;
  };

  function get_class_code(list, obj) {
    if (obj.selection > 0) {
      var data = class_model.get_data()[list];
      for ( var key in data ) {
        if ( data[key] == obj.selection.toString() ) return format_classifier(key);
      }
    }
    return "";
  }

  var get_classifiers = function(product) {
    var show = get_class_code("show", ui.ui_events.show_classifier);
    var tunein = (function() {
      if (ui.ui_events.custom_classifier.text != "") return "CUST";
      else return get_class_code("tune-in", ui.ui_events.tunein_classifier);
    })();
    var bump = get_class_code("bump", ui.ui_events.bump_msg);
    if (product === "epl" || product === "l3d") {
      return [show, tunein];
    } else {
      return ""; 
    } 
  };



  function validateComp(c) {
    for (var i = 0; i < dom.valid_comps.length; i++) {
      if (dom.valid_comps[i] == c) return true;
    }
    return false;
  }

  function set_queueItem() {
    queueItem = (queue.numItems == 0) ? 1 : queue.numItems + 1;
  }

  var get_comp = function (build) {
    var shotA = build[1] + " A";
    var shotB = build[1] + " B";
    var comps = [];

    for (var i = 1; i <= app.project.items.length; i++) {
      if (app.project.items[i].name == shotA && app.project.items[i].parentFolder.name == build[0]) {
        comps.push(app.project.items[i]);
      }
      if (app.project.items[i].name == shotB && app.project.items[i].parentFolder.name == build[0]) {
        comps.push(app.project.items[i]);
      }
    }
    return comps;
  }

  var get_layer = function (comps) {
    function loop_through_comp(comp) {
      for (var i = 1; i <= comp.numLayers; i++) {
        if (comp != "" && comp.layer(i).hasVideo && comp.layer(i).active &&
          !comp.layer(i).adjustmentLayer && !(comp.layer(i).source.mainSource instanceof SolidSource)) {
          return comp.layer(i).name.replace(/\s+/g, "_").toUpperCase() + "_";
        }
      }
    }
    var shotA_name = loop_through_comp(comps[0]);
    var shotB_name = loop_through_comp(comps[1]);
    return [shotA_name, shotB_name];
  } 

  function build_talent_name() {
    var talent_comps = get_comp([talent_parent, show]);
    var talent_names = get_layer(talent_comps);
    return talent_names[0] + talent_names[1];
  }

  function build_classifiers(product) {
    var class_list = get_classifiers(product).filter(function(e) { return e != ""; });
    if (class_list.length === 0) return "";
    return class_list.join("_") + "_";
  }


  function get_days(lists) {
    var get_abbrev = function(d) {
      var day_list = tunein_model.get_day_obj();
      for (var key in day_list) {
        if (d === day_list[key]) return key;
      }
      return "Key not found.";
    };

    var getDay = function (obj, idx) {
      var d = "";
      if (obj.selection > 0) {
        d = get_abbrev(obj.selection.toString());
      }
      return d;
    };
    var result = lists.map(getDay).filter(function(d) { return d !== ""; });
    return result.join("_");
  }


  function get_months() {
    // TODO
  }


  function build_days() {
    var days_objs = ui.get_days();
    var days = get_days(days_objs);
    // TODO if (days === "") days = get_months();
    return days;
  }

  function build_time() {
    var theTime = ui.get_time().toString();
    if (ui.get_half()) theTime += "30";

    if (ui.get_day_part()) {
      theTime += "am";
    } else theTime += "pm";

    return theTime;
  }

  var remove_ending_underscore = function(name) {
    return name.replace(/_$/, "");
  };


  function build_epl_name(comp_name) {
    job_name = "EPL_";
    if (/vert/i.test(comp_name)) {
      job_name += "V";
      talent_parent = "Talent Container vert";
    } else {
      job_name += "H";
      talent_parent = "Talent Container horiz";
    } 

    job_name += (/\d{1,}/g).exec(comp_name)[0] + "_";
  }

  function build_trn_name(compName) {
    var trnVer = '';
    if (/H/.test(compName)) {
      trnVer = "H_";
    } else trnVer = "V_";
    trnVer += ui.get_show().toString();
    return trnVer;
  }

  function build_job_name(theComp) {
    var product = "";
    var webMode = ui.ui_events.web_mode.value;
    var hideTime = ui.is_hide_time();

    if (/^epl/i.test(theComp.name)) {
      product = "epl";
      build_epl_name(theComp.name);
    } else if (/^l3d/i.test(theComp.name)) {
      product = "l3d";
      job_name = "L3D_";
    } else if (/^bug/i.test(theComp.name)) {
      product = "bug";
      job_name = "BUG_" + ui.get_show().toString();
      return;
    } else if (/^trn/i.test(theComp.name)) {
      product = "trn";
      job_name = "TRN_" + build_trn_name(theComp.name);
      return;
    }

    show = ui.get_show().toString();
    job_name += show + "_";

    if (product === "epl") {
      job_name += build_talent_name();
    } 

    job_name += build_classifiers(product);
    if (webMode) {
      job_name += "WEB";
      return;
    }
    job_name += build_days() + "_";
    if (!hideTime) {
      job_name += build_time();
    }
    job_name = remove_ending_underscore(job_name);
  }

  function create_file(jobNum) {
    var job_path = "/dev/null/" + jobNum;
    var job_folder = Folder (job_path);
    var job_file = File (job_path + "/" + job_name);
    job_folder.create();
    return job_file;
  }

  function create_job(payload, theComp) {
    set_queueItem();
    build_job_name(theComp);

    queue.items.add(theComp);
    queue.item(queueItem).outputModule(1).applyTemplate("Lossless Straight");
    queue.item(queueItem).outputModule(1).file = create_file(payload);
  }
  
  var render = function(data) { 
  };

  var service = {
    getData: function(payload) {
      var theComp = app.project.activeItem;
      if (!validateComp(theComp)) {
        throw "You are not in a valid comp to render.";
      }
      create_job(payload, theComp);
      var data = "";
      return data;
    } 
  };

  var queue_machine = new Machine('idle');

  queue_machine.transitions['idle'] = {
    select: function(payload) {
      queue_machine.changeStateTo('fetching');
      try {
        var data = service.getData(payload);
        queue_machine.dispatch('success', data);
      } catch(error) {
        queue_machine.dispatch('failure', error);
      }
    }    
  };
  
  queue_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      queue_machine.changeStateTo('idle');
    },
    failure: function(error) {
      alert("Queue Machine:  " + error.toString());
      queue_machine.changeStateTo('error');
    }
  };

  queue_machine.transitions['error'] = {
    retry: function() {
      queue_machine.changeStateTo('idle');
      queue_machine.dispatch('select');
    }
  };

  return {
    send_to_queue: function(payload) {
      queue_machine.dispatch('select', payload); // payload == job number
    }
  };
})(ui_view, classifier_model, tunein_model, dom_view);


var ux_controller = (function(ui, time_ctrl, show_model) {
  function ux_title(show) {
    var is_original = show_model.get_show_version(show).main_version["is_orig"];

    if (is_original && ui.ui_events.show_classifier.selection.index != 6) {
      ui.ui_events.show_classifier.selection = 6;
    } else if (!is_original && ui.ui_events.show_classifier.selection.index == 6) {
      ui.ui_events.show_classifier.selection = 0;
    }
  }

  function ux_time() {
    if (ui.ui_events.time_list.selection == 0) {
      [ui.ui_events.half_check, ui.ui_events.am_check, ui.ui_events.hideTime].map(function(o) { o.enabled = false; });
    } else if (ui.ui_events.hideTime.value) {
      [ui.ui_events.half_check, ui.ui_events.am_check, ui.ui_events.time_list].map(function(o) { o.enabled = false; });
    } else [ui.ui_events.time_list, ui.ui_events.half_check, ui.ui_events.am_check, ui.ui_events.hideTime].map(function(o) { o.enabled = true });
  } 

  function ux_days() {
    var days = ui.get_days();
    if (days[0].selection.index == 1) {
      ui.ui_events.hideTime.value = 1;
      ux_time();
      time_ctrl.set_time(true);
    } else if (days[0].selection.index != 1 && ui.ui_events.hideTime.value == 1) {
      ui.ui_events.hideTime.value = 0;
      ux_time();
      time_ctrl.set_time(false);
    }

    if ( (days[0].selection.index > 1 && days[0].selection.index < 11) || (days[0].selection.index == 12) || (days[0].selection.index == 13) ) {
      days[1].enabled = true;
    } else days[1].enabled = false;

    if ( days[1].selection.index > 0 && days[1].selection.index < 10 ) {
      days[2].enabled = true;
    } else days[2].enabled = false;

    if (days[0].selection.index > 1 && days[0].selection.index < 9) {
      ui.ui_events.addNext.enabled = true;
      ui.ui_events.pluralizer.enabled = true;
    } else {
      ui.ui_events.addNext.value = false;
      ui.ui_events.addNext.enabled = false;
      ui.ui_events.pluralizer.value = false;
      ui.ui_events.pluralizer.enabled = false;
    }
  }

  function ux_dates() {

  }

  function ux_web(is_web) {
    var days = ui.get_days();
    var components = [
      days[0],
      days[1],
      days[2],
      ui.ui_events.time_list,
      ui.ui_events.half_check,
      ui.ui_events.am_check,
      ui.ui_events.hideTime,
      ui.ui_events.addNext,
      ui.ui_events.pluralizer
    ];

    if (is_web) {
      components.map(function(o) { o.enabled = false; });
    } else {
      days[0].enabled = true;
      ux_days();
      ux_time();
      ux_modifiers();
    }
  }

  function ux_class() {
    (ui.ui_events.tunein_classifier.enabled) ? ui.ui_events.tunein_classifier.enabled = false : ui.ui_events.tunein_classifier.enabled = true;
  }

  function ux_season(type) {
    if (type === "text") {
      ui.set_season_text();
    } else if (type === "slider") {
      ui.set_season_slider();
      ui.set_season_text();
    }
  }

  function ux_modifiers() {
    if (ui.ui_events.addNext.value) {
      ui.ui_events.pluralizer.enabled = false;
    } else if (!ui.ui_events.addNext.value) {
      ui.ui_events.pluralizer.enabled = true;
    }
    if (ui.ui_events.pluralizer.value) {
      ui.ui_events.addNext.enabled = false;
    } else if (!ui.ui_events.pluralizer.value) {
      ui.ui_events.addNext.enabled = true;
    }
  }

  return {
    title: function(show) { ux_title(show); },
    days: function() { ux_days(); },
    dates: function() { ux.dates(); },
    time: function() { ux_time(); },
    web: function(is_web) { ux_web(is_web); },
    classifier: function() { ux_class(); },
    season: function(type) { ux_season(type); },
    modifiers: function() { ux_modifiers(); }
  };
})(ui_view, time_controller, show_model);


var modifier_controller = (function(dom, ui, days_ctrl) {
  var render = function(data) {
    days_ctrl.set_days([ui.get_days(), data]);
  };

  var service = {
    getData: function(payload) {
      var days = ui.get_days();
      if (ui.ui_events.addNext.value) return "next";
      if (ui.ui_events.pluralizer.value) {

        if (days[2].selection.index > 0 && days[2].selection.index < 8) {
          return "sss";
        } else if (days[1].selection.index > 0 && days[1].selection.index < 8) {
          return "ss";
        } else return "s";

      }

      return 0;
    }
  };

  var modifier_machine = new Machine("idle");

  modifier_machine.transitions['idle'] = {
    select: function(payload) {
      modifier_machine.changeStateTo('fetching');
      var data = service.getData(payload);
      try {
        modifier_machine.dispatch('success', data);
      } catch(error) {
        modifier_machine.dispatch('failure', error);
      }
    }
  };

  modifier_machine.transitions['fetching'] = {
    success: function(data) {
      render(data);
      modifier_machine.changeStateTo("idle");
    },
    failure: function(error) {
      alert("Modifier Machine:  " + error.toString());
      modifier_machine.changeStateTo('error');
    }
  };

  return {
    set_modifier: function(payload) {
      modifier_machine.dispatch('select', payload);
    }
  };
})(dom_view, ui_view, days_controller);


var event_controller = (function(ui, title_ctrl, version_ctrl, time_ctrl, days_ctrl, class_ctrl, style_ctrl, web, dom, queue, ux, mod) {
  Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value;
  };

  function get_time_payload() {
    return [ui.get_time(), ui.get_half(), ui.get_day_part()];
  }

  ScriptUI.events.createEvent("MouseEvent");
  ui.ui_events.job.onChange = function() { // I'll make an exception and handle this one right here.
    //var job_num = ui.ui_events.job.text;
    //if (Number.isInteger(parseInt(job_num))) {
    // library.set_job(job_num);
    //} else {
    // alert("Warning:\n" + job_num + " is not a valid job number.");
    // ui.ui_events.job.text = "";
    // library.set_job("");
    //}
  };
  ui.ui_events.show_list.addEventListener("change", function(e) { 
    var show = ui.get_show().toString();
    title_ctrl.set_title([show, ui.get_version()]);
    style_ctrl.set_style(0);
    ux.title(show);
  });
  ui.ui_events.epi_ver.onClick = function() { version_ctrl.set_version([ui.get_show().toString(), ui.get_version()]); };
  ui.ui_events.img_ver.onClick = function() { version_ctrl.set_version([ui.get_show().toString(), ui.get_version()]); };
  ui.ui_events.time_list.addEventListener("change", function(e) {
    time_ctrl.set_time(get_time_payload());
    ux.time();
  });
  ui.ui_events.half_check.onClick = function() {
    time_ctrl.set_time(get_time_payload());
    ux.time();
  };
  ui.ui_events.am_check.onClick = function() { time_ctrl.set_time(get_time_payload()); };
  ui.ui_events.hideTime.onClick = function() {
    ux.time();
    time_ctrl.set_time(ui.is_hide_time());
  };
  ui.ui_events.days.addEventListener("change", function(e) {
    ux.days();
    days_ctrl.set_days([ui.get_days(), 0]);
    style_ctrl.set_style(0);
  });
  ui.ui_events.addNext.onClick = function() {
    ux.modifiers();
    mod.set_modifier("next");
    style_ctrl.set_style(0);
  };
  ui.ui_events.pluralizer.onClick = function() {
    ux.modifiers();
    mod.set_modifier("pluralize");
    style_ctrl.set_style(0);
  };
  ui.ui_events.web_mode.onClick = function() {
    var is_web = ui.ui_events.web_mode.value;
    ux.web(is_web);
    web.set_webMode(is_web);
  };
  //ui.ui_events.month1.addEventListener("change", function(e) { dates_ctrl.set_dates(ui.ui_events.month1, ui.ui_events.days_of_month1); });
  //ui.ui_events.month2.addEventListener("change", function(e) { dates_ctrl.set_dates(ui.ui_events.month2, ui.ui_events.days_of_month2); });
  //ui.ui_events.days_of_month1.addEventListener("change", function(e) { dates_ctrl.set_dates(ui.ui_events.month1, ui.ui_events.days_of_month1); });
  //ui.ui_events.days_of_month2.addEventListener("change", function(e) { dates_ctrl.set_dates(ui.ui_events.month2, ui.ui_events.days_of_month2); });
  ui.ui_events.show_classifier.addEventListener("change", function(e) { class_ctrl.set_classifiers(ui.get_classifiers()); });
  ui.ui_events.tunein_classifier.addEventListener("change", function(e) { class_ctrl.set_classifiers(ui.get_classifiers()); });
  ui.ui_events.custom_classifier.addEventListener("change", function(e) {
    ux.classifier();
    class_ctrl.set_classifiers(ui.get_classifiers());
  });
  ui.ui_events.bump_msg.addEventListener("change", function(e) { class_ctrl.set_classifiers(ui.get_classifiers()); });
  ui.ui_events.season_txt.addEventListener("change", function(e) { 
    ux.season("text");
    class_ctrl.set_classifiers(ui.get_classifiers());
  });
  ui.ui_events.season_slider.addEventListener("changing", function(e) {
    ux.season("slider"); 
    class_ctrl.set_classifiers(ui.get_classifiers());
  });
  ui.ui_events.send_to_queue.onClick = function() {
    var jobNum = ui.ui_events.job.text;
    if ( Number.isInteger(parseInt(jobNum)) ) {
      queue.send_to_queue(jobNum);
    } else {
      alert("No job number entered.\nJob will be saved in the root folder.");
      queue.send_to_queue("");
    } 
  };
})(ui_view, title_controller, version_controller, time_controller, days_controller, classifier_controller, style_controller, web_controller, dom_view, queue_controller, ux_controller, modifier_controller);




var controller = (function(ui, show_model, style_model, dom, title_ctrl, class_ctrl, style_ctrl, time_ctrl, web) {
  function default_state(default_show, day, defaultTime) {
    var days = ui.get_days();
    days[0].selection = day;
    days[1].selection = 0;
    days[2].selection = 0;
    title_ctrl.set_title([default_show, 'epi']);
    class_ctrl.set_classifiers(ui.get_classifiers());
    time_ctrl.set_time(false);
    ui.ui_events.time_list.selection = defaultTime;
    web.set_webMode(false);
    style_ctrl.set_style(0);
  }

  return {
    init: function() {
      var dataReady = false;
      while (!dataReady) {
        if (style_model.isDataLoaded) {
            dataReady = true;
        }
      }
      default_state("BBD", 6, 8);
    }
  };
})(ui_view, show_model, style_model, dom_view, title_controller, classifier_controller, style_controller, time_controller, web_controller);

controller.init();
} // End Main

// TODO
//

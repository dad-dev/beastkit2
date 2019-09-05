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

//+ include polyfills
//+ include json


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


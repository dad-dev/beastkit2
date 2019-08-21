var text_obj = {
  one_line: true,
  two_line: false,
  one_day: true,
  two_day: false,
  three_day: false,
  next: false
};


// Bit mask constants
var HAS_1LINE = 1;        // 000001
var HAS_2LINE = 1 << 1;   // 000010
var HAS_1DAY = 1 << 2;    // 000100
var HAS_2DAY = 1 << 3;    // 001000
var HAS_3DAY = 1 << 4;    // 010000
var HAS_NEXT = 1 << 5;    // 100000


var stateNumber = 0;

if (text_obj.one_line == true) stateNumber = stateNumber | HAS_1LINE;
if (text_obj.two_line == true) stateNumber = stateNumber | HAS_2LINE;
if (text_obj.one_day == true) stateNumber = stateNumber | HAS_1DAY;
if (text_obj.two_day == true) stateNumber = stateNumber | HAS_2DAY;
if (text_obj.three_day == true) stateNumber = stateNumber | HAS_3DAY;
if (text_obj.next == true) stateNumber = stateNumber | HAS_NEXT;


alert(stateNumber.toString(2));     // 00101


var text_block_vert = {
  "Classifier1":  {"content": "", "position": [], "scale": [], "opacity": 100},
  "Title":        {"content": "", "position": [], "scale": [], "opacity": 100},
  "Subtitle":     {"content": "", "position": [], "scale": [], "opacity": 100},
  "Classifier2":  {"content": "", "position": [], "scale": [], "opacity": 100},
  "Day1":         {"content": "", "position": [], "scale": [], "opacity": 100},
  "Time":         {"position": [], "scale": [], "opacity": 100}
};


if (stateNumber & HAS_1LINE) {
  alert("This is a one line title.");
}

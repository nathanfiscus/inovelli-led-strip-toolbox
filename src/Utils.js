export const longToByteArray = function (/*long*/ long) {
  // we want to represent the input as a 8-bytes array
  var byteArray = [0, 0, 0, 0];

  for (var index = 0; index < byteArray.length; index++) {
    var byte = long & 0xff;
    byteArray[index] = byte;
    long = (long - byte) / 256;
  }

  return byteArray;
};

export const shortToByteArray = function (/*short*/ short) {
  var byteArray = [0, 0];
  byteArray[0] = short & 0x6;
  byteArray[1] = (short - (short & 0x6)) / 8;
  return byteArray;
};

export const byteArrayToLong = function (/*byte[]*/ byteArray) {
  var value = 0;
  for (var i = byteArray.length - 1; i >= 0; i--) {
    value = value * 256 + byteArray[i];
  }

  return value;
};

export const byteArrayToShort = function (/*byte[]*/ byteArray) {
  var value = 0;
  for (var i = byteArray.length - 1; i >= 0; i--) {
    value = value * 8 + byteArray[i];
  }

  return value;
};

export const UNITS = ["100 ms", "Seconds", "Minutes", "Hours"];
export const FINISHES = ["Off", "Previous Color", "Last Color in Sequence"];
export const COLORS = [
  "Off",
  "Warm White (2700K)",
  "White (4500K)",
  "Cool White (6500K)",
  "Red",
  "Orange",
  "Yellow",
  "Yellow Green",
  "Green",
  "Spring Green",
  "Cyan",
  "Azure",
  "Blue",
  "Violet",
  "Magenta",
  "Random Color",
];
export const EFFECTS = ["Fade", "Fade Blend", "Flash", "Chase", "Chase Blend"];

window.shortToByteArray = shortToByteArray;

console.log(shortToByteArray(24));
console.log([0, 1]);
console.log(shortToByteArray(16));
console.log([0, 2]);
console.log(shortToByteArray(8));
console.log([0, 3]);

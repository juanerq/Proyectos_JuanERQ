function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[`pawn${i+1}`] = arr[i];
    return rv;
  }
  
module.exports = toObject;
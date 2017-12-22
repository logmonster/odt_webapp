<script>

/**
 *  util to handle array, map related utility methods
 */
module.exports={
  /**
   *  helper method to remove the given _e within the given _arr
   *  (only remove the first occurence of the element though)
   */
  removeElementFromArray: function(_e, _arr) {
    let _idx=-1;
    let _found=false;
    // check if found or not, and splice when necessary
    if (_e && _arr) {
      let _size = _arr.length;

      for (_idx=0; _idx<_size; _idx++) {
        let _current=_arr[_idx];

        if (_e == _current) {
          _found=true;
          break;
        }
      } // end -- for(_arr)

      if (_found) {
        _arr.splice(_idx, 1);
      }
    }
    return _idx;
  }

};
</script>

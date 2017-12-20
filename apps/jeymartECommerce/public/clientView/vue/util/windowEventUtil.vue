<script>
/**
 *  util to handle windows related event; such as "resize"
 *
 *  ref: https://jsfiddle.net/hr77p7qb/3/
 */
let WindowEventUtil = function() {
  // core data structure for storing the "event-key" and its assoicated eventHandler(s)
  let _eventMap = {};
  // map of registered event for this util instance
  let _registeredEvent = {};

  /*
   *  helper method to register callback based on componentName
   */
  let _registerCallbackByComponentName = function(
    _eventType, _componentName, _callback) {

    if (!_eventMap.hasOwnProperty(_eventType)) {
      _eventMap[_eventType] = {};
    }
    let _eventMembers = _eventMap[_eventType];
    // need to do anything to the to-be-disposed _callback???
    _eventMembers[_componentName] = _callback;
  };

  /*
   *  resize event Hook method
   */
  let _resizeEventHook = function() {
    let _eventMembers = _eventMap['resize'];

    if (_eventMembers) {
      let _keys=Object.keys(_eventMembers);

      for (let _idx=0; _idx<_keys.length; _idx++) {
        let _cb = _eventMembers[_keys[_idx]];
        if (_cb) {
          _cb();
        }
      } // end -- for (keys loop)
    }
  };


  /*
   *  return the minimal features to the caller
   */
  return {
    /*
     *  register an event based on type and componentName;
     *  invoke the callback when the event is
     *  triggered
     */
    registerEvent: function(_eventType, _componentName, _callback) {
      if (_eventType) {
        if ('resize' == _eventType && _componentName && _callback) {
          // resize event
          // unregistered previous _callback if any (based on componentName)
          _registerCallbackByComponentName(
            _eventType, _componentName, _callback);

          if (!_registeredEvent.hasOwnProperty(_eventType)) {
            _registeredEvent[_eventType]=true;
            window.addEventListener(_eventType, _resizeEventHook);
          }
        }
      } // end -- if (_eventType is valid)
    }

  };
};

/*
 *  new an instance of "WindowEventUtil" instead of treating it as a "singleton"
 */
module.exports=WindowEventUtil;
</script>

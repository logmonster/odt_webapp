<script>
/*
 *  how to use?
 *  a) create a new instance
 *  b) call "start" method with a given timestamp (should be current for most cases)
 *  c) call "isTimeout" method to check if timeout has been elapsed; the startTS would be updated to the given TS for evaluation
 *  d) call "pause" method if you want to stop throttling (always return false during "isTimeout" calls)
 */
let UIThrottleUtil = function() {
  let _elapseConfig={
    'previousValue': '',
    'isInitial': true,
    'initialBackOff': 500,
    'previousBackOff': 0,
    'backOffFactor': 500,
    'maxBackOff': 2000,
    'hasStart': false,
    'previousValueCallback': null,
    'timeoutCallback': null,
    'isTimeoutCallbackInProgress': false
  };
  /*
   *  initialBackOff 2000,
   *  maxBackOff 3000
   */

  let _isTimeout = function() {
    if (_elapseConfig.previousValueCallback) {
      let _currentValue = _elapseConfig.previousValueCallback();
      if (_currentValue != _elapseConfig.previousValue) {
        //console.log('** not the same '+_currentValue +' v '+_elapseConfig.previousValue);
        _elapseConfig.previousValue = _currentValue;
        // check if backOffFactor should be applied or not
        let _timeout = _elapseConfig.initialBackOff;
        if (_elapseConfig.isInitial == true) {
          _elapseConfig.isInitial = false;
          _elapseConfig.previousBackOff = _timeout;
        } else {
          _timeout = _elapseConfig.previousValue + _elapseConfig.backOffFactor;
          if (_timeout > _elapseConfig.maxBackOff) {
            _timeout = _elapseConfig.maxBackOff;
          }
          _elapseConfig.previousBackOff = _timeout;
        }
        setTimeout(function() {
          _isTimeout();
        }, _timeout);

      } else {
        //console.log(_elapseConfig.isTimeoutCallbackInProgress);
        if (_elapseConfig.timeoutCallback && !_elapseConfig.isTimeoutCallbackInProgress) {
          _elapseConfig.timeoutCallback();
        }
      } // end -- if (timeout criteria matched)
    }
  };

  let _reset = function() {
    //_elapseConfig.previousValue = '';
    _elapseConfig.isInitial = true;
    _elapseConfig.initialBackOff = 2000;
    _elapseConfig.previousBackOff = 0;
    _elapseConfig.maxBackOff = 3000;
  };

  // return minimal functions and members to the caller
  return {
    start: function(_previousValueCallback, _timeoutCallback) {
      _elapseConfig.previousValueCallback = _previousValueCallback;
      _elapseConfig.timeoutCallback = _timeoutCallback;
      _elapseConfig.hasStart=true;
    },
    pause: function() {
      _elapseConfig.hasStart=false;
    },
    isTimeout: function() {
      _isTimeout();
    },
    // hasStart is ignored
    reset: function() {
      _reset();
    },
    setTimeoutCallbackInProgress: function(_bool) {
      _elapseConfig.isTimeoutCallbackInProgress = _bool;
    },
    getTimeoutCallbackInProgress: function() {
      return _elapseConfig.isTimeoutCallbackInProgress;
    }

  };
};

/*
 *  "new" an instance instead of singleton fashion
 */
module.exports = UIThrottleUtil;
</script>

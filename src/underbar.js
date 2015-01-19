(function() {
  'use strict';

  window._ = {};

  _.identity = function(val) {
    return val;
  };

  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1]
    } else {
      return array.length < n ? array : array.slice(array.length-n);
    }
  };

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  _.indexOf = function(array, target){
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(element) {
      if (test(element)) {
        result.push(element);
      }
    });
    return result;
  };

  _.reject = function(collection, test) {
    return _.filter(collection, function (element) {
      return test(element) === false;
     });
  };

  _.uniq = function(arr) {
    var output = [];
    _.each(arr, function(item){
      if (_.indexOf(output, item) === -1) {
          output.push(item);
        }
      });
    return output;
  };

  _.map = function(collection, iterator) {
    var output = [];
    _.each(collection, function(item){
      output.push(iterator(item));
    })
    return output;
  };

  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  _.reduce = function(collection, iterator, accumulator) {
    var accumulator = accumulator === undefined? collection.shift() : accumulator;
    _.each(collection, function(item) {
      accumulator = iterator(accumulator, item)
    });
    return accumulator;
  };

  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  _.every = function(collection, iterator) {
    var iterator = iterator || _.identity;
    return !!_.reduce(collection, function(allTrue, item) {
      return allTrue && iterator(item);
    }, true);
  };

  _.some = function(collection, iterator) {
    var iterator = iterator || _.identity;
    return !!_.reduce(collection, function(anyTrue, item) {
      return anyTrue || iterator(item);
    }, false);
  };

  _.extend = function(obj) {
    _.each(arguments, function(properties) {
      _.each(properties, function(value, key) {
          obj[key] = value;
      });
    });
    return obj;
  };

  _.defaults = function(obj) {
    _.each(arguments, function(properties) {
      _.each(properties, function(value, key) {
        if (obj[key] === undefined)
          obj[key] = value;
      });
    });
    return obj;
  };

  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  _.memoize = function(func) {
    var memo = {};  
    return function() {
        var args = [].slice.call(arguments)
        if (!(args in memo)) {
            memo[args] = func.apply(this, args)
        }
        return memo[args]      
    };
  };

  _.delay = function(func, wait) {
    // arguments for func are all arguments after the 2nd argument for delay
    var args = [].slice.call(arguments, 2);
    setTimeout(function() {
      return func.apply(this, args);
    }, wait);
  };

  _.shuffle = function(array) {
    var copy = array.slice();
    var result = [];
    while (copy.length > 0) {
      var index = Math.random() * copy.length;
      result.push(copy.splice(index, 1)[0]);
    }
      return result;
  };

  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(value){
      if (typeof functionOrKey === 'function') {
        return functionOrKey.apply(value, args);
      } else {
        return value[functionOrKey].apply(value, args);
      }
    });
  };


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
 _.zip = function() {
      
      var zipped = []
      var args = [].slice.call(arguments);
      
      var max = _.reduce(args.slice(), function(curr, prev) {
          return curr.length > prev.length ? curr : prev
        })

      var index = _.map(max, function(element){
          return max.indexOf(element)
        })
      
      _.each(index, function(indexValue) {
          var zip =[]
          _.each(args, function(array) {
              zip.push(array[indexValue]);
          })
          zipped.push(zip);
      });
      return zipped;
  };

  _.flatten = function(nestedArray, result) {
    var result = [];
    _.each(nestedArray, function (element) {
      if (Array.isArray(element)) {
        result = result.concat(_.flatten(element))
      } else {
        result.push(element);
      }
    });
    return result;
  };

  _.intersection = function() {
    var args = [].slice.call(arguments);
    var allValues = _.uniq(_.flatten(args));
    var allSharedValues = _.filter(allValues, function (value) {
      return !!_.every(args, function (argument) {
        return !!_.contains(argument, value);
      });
    });
    return allSharedValues;
  };

  _.difference = function(array) {
    var args = [].slice.call(arguments);
    var firstArray = args[0];
    var remainingArrays = args.slice(1);
    return _.filter(firstArray, function (value) {
      return !!_.every(remainingArrays, function (array) {
        return !!_.contains(array, value) === false;
      });
    });
  };


  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());

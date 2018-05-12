var Quicksort = (function () {

	var _numberArray = [],
		_outputArray = [],
		_swapcount = 0;

	// Quiksort algorithm using the Hoare partition scheme
	// Reference: https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
	var _quicksort = function (arr, lo, hi) {
		var pi;
		if (lo < hi) {
			pi = _partition(arr, lo, hi);
			_quicksort(arr, lo, pi);
			_quicksort(arr, pi+1, hi);
		}
	}
	
	var _partition = function (arr, lo, hi) {
		var pivot = arr[lo],
			i = lo - 1,
			j = hi + 1,
			temp;
	
		while (true) {
			do {
				i++;
			} while (arr[i] < pivot);
			
			do {
				j--;
			} while (arr[j] > pivot);
			
			if (i >= j) {
				return j;
			}
			
			// swap the elements
			temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
			_swapcount++;		
			_outputArray.push(_getArrayAsString(j, i)); // store the array state as a string after each swap
		}
	}

	var _displayOutput = function (i, delay) {
		setTimeout(function () {
			var str = _outputArray[i];
			document.getElementById('array').innerHTML = str;
		}, delay * i);
	}
	
	var _getArrayAsString = function (swap1, swap2) {
		var i, str = "", separator = ""; // separator is initially blank
		
		for (i=0; i<_numberArray.length; i++) {
			str += separator;
			if (i === swap1 || i === swap2) {
				// highlight the elements that are being swapped
				str += "<span style=\"background-color: #FF0000\">";
				str += _numberArray[i];
				str += "</span>"
			} else {
				str += _numberArray[i];	
			}
			separator = ", "; // change separator to a comma+space after first iteration
		}
		
		return str;
	}

	var _showArray = function () {
		// show the new array to the user
		document.getElementById('array').innerHTML = _getArrayAsString(undefined, undefined);

		// clear the count
		document.getElementById('swapcount').innerHTML = "";
	}
	
	//
	// public methods
	//

	var createRandomArray = function (size) {
		var i;
		_numberArray = []; // clear the array
		// fill it with random values
		for (i=0; i<size; i++) {
			_numberArray[i] = Math.floor(Math.random() * size);
		}

		_showArray();
	};

	var createRandomUniqueArray = function (size) {
		var i, n, count = 0, sequentialArray = [];
		_numberArray = []; // clear the array
	
		// generate an array of sequential values to pull from
		for (i=0; i<size; i++) {
			sequentialArray[i] = i;
		}
	
		while (count < size) {
			n = Math.floor(Math.random() * size);
			if (sequentialArray[n] !== undefined) {
				_numberArray[count] = sequentialArray[n];
				sequentialArray[n] = undefined;
				count++;
			}
		}
	
		_showArray();
	}
	
	var createSortedArrayAsc = function (size) {
		var i;
		_numberArray = []; // clear the array
		// fill it with sequential values
		for (i=0; i<size; i++) {
			_numberArray[i] = i;
		}
		
		_showArray();
	}
	
	var createSortedArrayDesc = function (size) {
		var i;
		_numberArray = []; // clear the array
		// fill it with random values
		for (i=0; i<size; i++) {
			_numberArray[i] = size-1-i;
		}
		
		_showArray();
	}
	
	var createEqualArray = function (size) {
		var i;
		_numberArray = []; // clear the array
		// fill it with random values
		for (i=0; i<size; i++) {
			_numberArray[i] = 0;
		}
		
		_showArray();
	}
	
	var sortArray = function (delay) {
		var i;
		_outputArray = []; // clear the output array
		_swapcount = 0; // reset the swap count
		
		// clear the count
		document.getElementById('swapcount').innerHTML = "";
		
		// sort the array
		_quicksort(_numberArray, 0, _numberArray.length-1);

		// store the final array state
		_outputArray.push(_getArrayAsString(undefined, undefined));

		// display the total swap count
		document.getElementById('swapcount').innerHTML += ("Number of swaps: " + _swapcount + "<br>");
		
		// play back the output
		for (i = 0; i < _outputArray.length; i++) {
			_displayOutput(i, delay);
		}
	}
	
	return {
		createRandomArray: createRandomArray,
		createRandomUniqueArray: createRandomUniqueArray,
		createSortedArrayAsc: createSortedArrayAsc,
		createSortedArrayDesc: createSortedArrayDesc,
		createEqualArray: createEqualArray,
		sortArray: sortArray
	};
  
})();

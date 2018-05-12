var Quicksort = (function () {

	var numberArray = [],
		outputArray = [],
		swapcount = 0;

	// private methods

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
			j = hi + 1;
	
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
			
			_swap(arr, i, j);
		}
	}
	
	var _swap = function (arr, i, j) {
		var temp;
		swapcount++;
		temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		outputArray.push(_getArrayAsString(j,i)); // store the array state after each swap
	}

	var _displayOutput = function (i) {
		setTimeout(function () {
			var str = outputArray[i];
			document.getElementById('array').innerHTML = str;
		}, 2 * i);
	}
	
	var _getArrayAsString = function (swap1,swap2) {
		var i, str = "", separator = ""; // separator is initially blank
		
		for (i=0; i<numberArray.length; i++) {
			str += separator;
			if (i === swap1 || i === swap2) {
				str += "<span style=\"background-color: #FF0000\">";
				str += numberArray[i];
				str += "</span>"
			} else {
				str += numberArray[i];	
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
	
	// public methods

	var createRandomArray = function (size) {
		var i;
		numberArray = []; // clear the array
		// fill it with random values
		for (i=0; i<size; i++) {
			numberArray[i] = Math.floor(Math.random() * size);
		}

		_showArray();
	};

	var createRandomUniqueArray = function (size) {
		var i, n, count = 0, sequentialArray = [];
		numberArray = []; // clear the array
	
		// generate an array of sequential values to pull from
		for (i=0; i<size; i++) {
			sequentialArray[i] = i;
		}
	
		while (count < size) {
			n = Math.floor(Math.random() * size);
			if (sequentialArray[n] !== undefined) {
				numberArray[count] = sequentialArray[n];
				sequentialArray[n] = undefined;
				count++;
			}
		}
	
		_showArray();
	}
	
	var createSortedArrayAsc = function (size) {
		var i;
		numberArray = []; // clear the array
		// fill it with sequential values
		for (i=0; i<size; i++) {
			numberArray[i] = i;
		}
		
		_showArray();
	}
	
	var createSortedArrayDesc = function (size) {
		var i;
		numberArray = []; // clear the array
		// fill it with random values
		for (i=0; i<size; i++) {
			numberArray[i] = size-1-i;
		}
		
		_showArray();
	}
	
	var createEqualArray = function (size) {
		var i;
		numberArray = []; // clear the array
		// fill it with random values
		for (i=0; i<size; i++) {
			numberArray[i] = 0;
		}
		
		_showArray();
	}
	
	var sortArray = function () {
		var i;
		outputArray = []; // clear the output array
		swapcount = 0; // reset the swap count
		
		// clear the count
		document.getElementById('swapcount').innerHTML = "";
		
		// sort the array
		_quicksort(numberArray, 0, numberArray.length-1);
		
		outputArray.push(_getArrayAsString(undefined, undefined)); // store the final sorted array state
		
		// play back the output	
		for (i = 0; i < outputArray.length; i++) {
			_displayOutput(i);
		}
	
		// display the swap count
		document.getElementById('swapcount').innerHTML += ("Number of swaps: " + swapcount + "<br>");
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

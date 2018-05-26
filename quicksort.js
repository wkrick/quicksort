var Quicksort = (function () {

	var _numberArray = [],
		_outputArray = [],
		_listId,
		_countId,
		_outputDelay = 0;

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

			// store the pair of item indexes that were swapped after each swap
			_outputArray.push([j, i]);
		}
	}

	var _generateArray = function (size, type) {
		var i, sequentialArray = [];

		// clear the array
		_numberArray = [];

		// generate a local array of sequential values to pull from for case 2
		for (i=0; i<size; i++) {
			sequentialArray[i] = i;
		}

		i = 0;
		while (i < size) {
			switch (+type) {

				// random
				case 1:
					_numberArray[i] = Math.floor(Math.random() * size);
					i++;
				break;

				// random no duplicates
				case 2:
					n = Math.floor(Math.random() * size);
					if (sequentialArray[n] !== undefined) {
						_numberArray[i] = sequentialArray[n];
						sequentialArray[n] = undefined;
						i++;
					}
				break;

				// sorted ascending
				case 3:
					_numberArray[i] = i;
					i++;
				break;

				// sorted descending
				case 4:
					_numberArray[i] = size-1-i;
					i++;
				break;

				// single value
				case 5:
					_numberArray[i] = 0;
					i++;
				break;

				default:
					// should never get here
					i++;
				break;
			}
		}
	};

	var _showSorting = function () {
		var i;
		for (i = 0; i < _outputArray.length; i++) {
			_swapElements(i);
		}
	}

	var _swapElements = function (i) {
		setTimeout(function () {
			var list = document.getElementById(_listId).childNodes, pair = _outputArray[i];
			_exchangeElements(list.item(pair[0]), list.item(pair[1]));
			// update the swap count in the UI
			document.getElementById(_countId).innerHTML = ("Number of swaps: " + (i+1));
		}, i * _outputDelay);
	}

	var _exchangeElements = function (element1, element2) {
		var clonedElement1 = element1.cloneNode(true);
		var clonedElement2 = element2.cloneNode(true);
		clonedElement1.style.animationDuration = (30 + _outputDelay*10) + "ms";
		clonedElement2.style.animationDuration = (30 + _outputDelay*10) + "ms";
		element2.parentNode.replaceChild(clonedElement1, element2);
		element1.parentNode.replaceChild(clonedElement2, element1);
	}

	var _showArray = function () {
		var i, li, list = document.getElementById(_listId);
		// clear the list
		list.innerHTML = "";

		for (i=0; i<_numberArray.length; i++) {
			_addElement(list, i);
		}

		// clear the count in the UI
		document.getElementById(_countId).innerHTML = ("Number of swaps: 0");
	}

	var _addElement = function (list, i) {
		setTimeout(function () {
			var li = document.createElement('li');
			li.classList.add('throb');
			li.style.animationDuration = "30ms";
			li.style.width = ((_numberArray.length-1).toString().length) + "em";
			li.innerHTML = _numberArray[i];
			list.appendChild(li);
		}, i * 5);
	}


	//
	// public methods
	//

	var generateArray = function (listId, countId, size, type) {
		_listId = listId;
		_countId = countId;

		_generateArray(size, type);

		// create the list of elements in the UI
		_showArray();
	};

	var sortArray = function (outputDelay) {
		if (! _numberArray.length > 0) {
			return;
		}
		_outputDelay = outputDelay;

		 // clear the output array
		_outputArray = [];

		// clear the swap count in the UI
		document.getElementById(_countId).innerHTML = ("Number of swaps: 0");

		// sort the array
		_quicksort(_numberArray, 0, _numberArray.length-1);

		// use the list of swap pairs during the sort to manipulate the UI
		_showSorting();
	}

	var test = function () {
		var i, loops = 1000, size = 10000, totalSwaps = 0;
		for (i = 0; i<loops; i++) {
			_generateArray(size, 2);
			_outputArray = [];
			_quicksort(_numberArray, 0, _numberArray.length-1);
			totalSwaps += _outputArray.length;
		}
		console.log("totalSwaps: " + totalSwaps + "   loops:" + loops)
		document.getElementById('swapcount').innerHTML = ("Average Number of swaps: " + (totalSwaps/loops));
	}

	return {
		generateArray: generateArray,
		sortArray: sortArray,
		test: test
	};

})();

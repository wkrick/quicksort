var Quicksort = (function () {

	var _numberArray = [],
		_outputArray = [];

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

	var _playBackOutput = function (listId, countId, outputDelay) {
		var i;
		for (i = 0; i < _outputArray.length; i++) {
			_swapElements(listId, countId, i, outputDelay);
		}
	}

	var _swapElements = function (listId, countId, i, outputDelay) {
		setTimeout(function () {
			var list = document.getElementById(listId).childNodes, pair = _outputArray[i];
			_exchangeElements(list.item(pair[0]), list.item(pair[1]));
			// display the total swap count
			document.getElementById(countId).innerHTML = ("Number of swaps: " + (i+1));
		}, i * outputDelay);
	}

	function _exchangeElements(element1, element2) {
		var clonedElement1 = element1.cloneNode(true);
		var clonedElement2 = element2.cloneNode(true);
		element2.parentNode.replaceChild(clonedElement1, element2);
		element1.parentNode.replaceChild(clonedElement2, element1);
		clonedElement1.classList.add('throb');
		clonedElement2.classList.add('throb');
	}

	var _showArray = function (listId, countId) {
		var i, li, list = document.getElementById(listId);
		// clear the list
		list.innerHTML = "";

		for (i=0; i<_numberArray.length; i++) {
			li = document.createElement('li');
			li.style.width = ((_numberArray.length-1).toString().length) + "em";
			li.innerHTML = _numberArray[i];
			list.appendChild(li);
		}

		// clear the count in the UI
		document.getElementById(countId).innerHTML = ("Number of swaps: 0");
	}

	//
	// public methods
	//

	var generateArray = function (listId, countId, size, type) {
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

		// create the list of elements in the UI
		_showArray(listId, countId);
	};

	var sortArray = function (listId, countId, outputDelay) {
		_outputArray = []; // clear the output array

		// clear the swap count in the UI
		document.getElementById('swapcount').innerHTML = ("Number of swaps: 0");

		// sort the array
		_quicksort(_numberArray, 0, _numberArray.length-1);

		// use the list of swap pairs during the sort to manipulate the UI
		_playBackOutput(listId, countId, outputDelay);
	}

	return {
		generateArray: generateArray,
		sortArray: sortArray
	};

})();

var numberArray = [];
var outputArray = [];
var swapcount = 0;

function createRandomArray(size) {
	numberArray = []; // clear the array
	// fill it with random values
	for (var i=0; i<size; i++) {
		numberArray[i] = Math.floor(Math.random() * size);
	}
	
	// show the new array to the user
	document.getElementById('array').innerHTML = getArrayAsString(undefined, undefined);

	// clear the count
	document.getElementById('swapcount').innerHTML = "";
}

function createRandomUniqueArray(size) {
	numberArray = []; // clear the array

	// generate an array of sequential values to pull from
	var sequentialArray = [];
	for (var i=0; i<size; i++) {
		sequentialArray[i] = i;
	}

	var n;
	var count = 0;
	while (count < size) {
		n = Math.floor(Math.random() * size);
		if (sequentialArray[n] !== undefined) {
			numberArray[count] = sequentialArray[n];
			sequentialArray[n] = undefined;
			count++;
		}
	}

	// show the new array to the user
	document.getElementById('array').innerHTML = getArrayAsString(undefined, undefined);

	// clear the count
	document.getElementById('swapcount').innerHTML = "";
}

function createSortedArrayAsc(size) {
	numberArray = []; // clear the array
	// fill it with sequential values
	for (var i=0; i<size; i++) {
		numberArray[i] = i;
	}
	
	// show the new array to the user
	document.getElementById('array').innerHTML = getArrayAsString(undefined, undefined);

	// clear the count
	document.getElementById('swapcount').innerHTML = "";
}

function createSortedArrayDesc(size) {
	numberArray = []; // clear the array
	// fill it with random values
	for (var i=0; i<size; i++) {
		numberArray[i] = size-1-i;
	}
	
	// show the new array to the user
	document.getElementById('array').innerHTML = getArrayAsString(undefined, undefined);

	// clear the count
	document.getElementById('swapcount').innerHTML = "";
}

function createEqualArray(size) {
	numberArray = []; // clear the array
	// fill it with random values
	for (var i=0; i<size; i++) {
		numberArray[i] = 0;
	}
	
	// show the new array to the user
	document.getElementById('array').innerHTML = getArrayAsString(undefined, undefined);

	// clear the count
	document.getElementById('swapcount').innerHTML = "";
}

function sortArray() {
	outputArray = []; // clear the output array
	swapcount = 0; // reset the swap count
	
	// clear the count
	document.getElementById('swapcount').innerHTML = "";
	
	// sort the array
	quicksort(numberArray, 0, numberArray.length-1);
	
	outputArray.push(getArrayAsString(undefined, undefined)); // store the final sorted array state
	
	// play back the output	
	for (var i = 0; i < outputArray.length; i++) {
		displayOutput(i);
	}

	// display the swap count
	document.getElementById('swapcount').innerHTML += ("Number of swaps: " + swapcount + "<br>");
}

function displayOutput(i) {
    setTimeout(function () {
        var str = outputArray[i];
        document.getElementById('array').innerHTML = str;
    }, 2 * i);
}

function getArrayAsString(swap1,swap2) {
	var str = "";
	var separator = ""; // separator is initially blank
	
	for (var i=0; i<numberArray.length; i++) {
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

// Quiksort algorithm using the Hoare partition scheme
// Reference: https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
function quicksort(arr, lo, hi) {
	var pi;
	if (lo < hi) {
		pi = partition(arr, lo, hi);
		quicksort(arr, lo, pi);
		quicksort(arr, pi+1, hi);
	}
}

function partition(arr, lo, hi) {
	var pivot = arr[lo];
	var i = lo - 1;
	var j = hi + 1;

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
		
		swap(arr, i, j);
	}
}

function swap(arr, i, j) {
	swapcount++;
	var temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
	outputArray.push(getArrayAsString(j,i)); // store the array state after each swap
}

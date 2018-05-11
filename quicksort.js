var numberArray = [];
var outputArray = [];

function createArray(size) {
	numberArray = []; // clear the array
	for (i=0; i<size; i++) {
		numberArray[i] = Math.floor(Math.random() * size);
	}
	
	// show the new array to the user
	document.getElementById('array').innerHTML = getArrayAsString();
}

function getArrayAsString(swap1,swap2) {
	swap1 = swap1 || -1; // optional parameter for hilighting first swapped element
	swap2 = swap2 || -1; // optional parameter for hilighting second swapped element
	var str = "";
	var separator = ""; // separator is initially blank
	
	for (var i=0; i<numberArray.length; i++) {
		str += separator;
		if (i === swap1) {
			str += "<span style=\"background-color: #FF9999\">";
			str += numberArray[i];
			str += "</span>"
		} else if (i === swap2) {
			str += "<span style=\"background-color: #99FF99\">";
			str += numberArray[i];
			str += "</span>"

		} else {
			str += numberArray[i];	
		}
		separator = ", "; // change separator to a comma+space after first iteration
	}
	
	return str;
}

function displayOutput(i) {
    setTimeout(function () {
        var str = outputArray[i];
        document.getElementById('array').innerHTML = str;
    }, 100 * i);
}

function sortArray() {
	outputArray = []; // clear the output array
	outputArray.push(getArrayAsString()); // store the initial array state
	
	// sort the array
	quicksort(numberArray, 0, numberArray.length-1);
	
	outputArray.push(getArrayAsString()); // store the final sorted array state
	
	// play back the output	
	for (var i = 0; i < outputArray.length; i++) {
		displayOutput(i);
	}

}

function quicksort(arr, lo, hi) {
	var pi;
	if (lo < hi) {
		pi = partition(arr, lo, hi);
		quicksort(arr, lo, pi-1);
		quicksort(arr, pi+1, hi);
	}
}

function partition(arr, lo, hi) {
	var pivot = arr[hi];
	var i = lo-1;
	for (var j = lo; j <= hi-1; j++) {
		if (arr[j] <= pivot) {
			i++;
			swap(arr, i, j);
		}
	}
	swap(arr, i+1, hi);
	return (i+1);
}

function swap(arr, i, j) {
	outputArray.push(getArrayAsString(i,j)); // store the array state before each swap
	var temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
	outputArray.push(getArrayAsString(j,i)); // store the array state after each swap
}

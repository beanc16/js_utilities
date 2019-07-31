/*******************
 * ADDING ELEMENTS *
 *******************/
 
/**
 * addElementToEndOfArray
 * @param {Array} array
 * @param         element
 * @returns {Array}
 */
function addElementToEndOfArray(array, element)
{
    // Add the element to the end of the array
    array.push(element);
	
    return array;
}

/**
 * addElementsToEndOfArray
 * @param {Array} array
 * @param {Array} arrayOfElements
 * @returns {Array}
 */
function addElementsToEndOfArray(array, arrayOfElements)
{
    for (let i = 0; i < arrayOfElements.length; i++)
    {
        // Add the current element to the end of the array
        array = addElementToEndOfArray(array, arrayOfElements[i]);
    }

    return array;
}

/**
 * addElementToBeginningOfArray
 * @param {Array} array
 * @param         element
 * @returns {Array}
 */
function addElementToBeginningOfArray(array, element)
{
    // Add the element to the beginning of the array
    array.unshift(element);

    return array;
}

/**
 * addElementsToBeginningOfArray
 * @param {Array} array
 * @param {Array} arrayOfElements
 * @returns {Array}
 */
function addElementsToBeginningOfArray(array, arrayOfElements)
{
    for (let i = 0; i < arrayOfElements.length; i++)
    {
        // Add the current element to the array
        array = addElementToBeginningOfArray(array, arrayOfElements[i]);
    }

    return array;
}

/**
 * addElementAtGivenPositionOfArray
 * @param {Array}  array
 * @param {Number} indexToAddAt
 * @param 		   element
 * @returns {Array}
 */
function addElementAtGivenPositionOfArray(array, indexToAddAt, element)
{
	array.splice(indexToAddAt, 0, element);
	return array;
}

/**
 * addElementAtGivenPositionOfArray
 * @param {Array}  array
 * @param {Number} indexToAddAt
 * @param {Array}  arrayOfElements
 * @returns {Array}
 */
function addElementsAtGivenPositionOfArray(array, indexToAddAt, arrayOfElements)
{
	// Add each given element to the array in reverse order at the given index
	for (let i = arrayOfElements.length - 1; i >= 0; i--)
	{
		array = addElementAtGivenPositionOfArray(array, indexToAddAt, arrayOfElements[i]);
	}
	
	return array;
}

/**
 * combineArrays
 * @param {Array} array
 * @param {Array} otherArrays
 * @returns {Array}
 */
function combineArrays(array, ...otherArrays)
{
	for (let i = 0; i < otherArrays.length; i++)
	{
		array = array.concat(otherArrays[i]);
	}
	
	return array;
}





/*********************
 * REMOVING ELEMENTS *
 *********************/

/**
 * removeLastElementFromArray
 * @param {Array} array
 * @returns {Array}
 */
function removeLastElementFromArray(array)
{
    // Remove the last element from the array
    array.pop();
	
    return array;
}

/**
 * removeFirstElementFromArray
 * @param {Array} array
 * @returns {Array}
 */
function removeFirstElementFromArray(array)
{
    // Remove the first element from the array
    array.shift();

    return array;
}

/**
 * removeMultipleElementsFromArray
 * @param {Array} array
 * @param {number} startingIndex
 * @param {number} endingIndexInclusive
 * @returns {Array}
 */
function removeMultipleElementsFromArray(array, startingIndex, endingIndexInclusive)
{
    // array.splice() is max element non-inclusive, so increase the inclusive element by 1
    endingIndexInclusive++;

    // Remove the selected elements from the array
    array.splice(startingIndex, endingIndexInclusive);

    return array;
}

/**
 * removeGivenElementFromArray
 * @param {Array} array
 * @param {Array} element
 * @returns {Array}
 */
function removeGivenElementFromArray(array, element)
{
    // The given element is in the array
    if (arrayHasGivenElement(array, element))
    {
        // Remove the element from the array
        let index = array.indexOf(element);
        array.splice(index, index + 1);
    }

    return array;
}

/**
 * removeGivenElementsFromArray
 * @param {Array} array
 * @param {Array} arrayOfElements
 * @returns {Array}
 */
function removeGivenElementsFromArray(array, arrayOfElements)
{
    for (let i = 0; i < arrayOfElements.length; i++)
    {
        // Remove the given element from the array if it exists
        array = removeGivenElementFromArray(array, element);
    }

    return array;
}

/**
 * removeAllElementsFromArray
 * @param {Array} array
 * @returns {Array}
 */
function removeAllElementsFromArray(array)
{
    // Set to empty array
    array = [];

    return array;
}

/**
 * emptyArray
 * Summary. Does the same as removeAllElementsFromArray.
 * @param {Array} array
 * @returns {Array}
 */ 
function emptyArray(array)
{
	return removeAllElementsFromArray(array);
}

/**
 * clearArray
 * Summary. Does the same as removeAllElementsFromArray.
 * @param {Array} array
 * @returns {Array}
 */ 
function clearArray(array)
{
	return removeAllElementsFromArray(array);
}





/************
 * BOOLEANS *
 ************/

/**
 * arrayHasGivenElement
 * @param {Array} array
 * @param         element
 * @returns {boolean}
 */
function arrayHasGivenElement(array, element)
{
    // The given element IS in the array
    if (array.includes(element))
    {
        return true;
    }

    // The given element IS NOT in the array
    return false;
}





/***********
 * SORTING *
 ***********/
 
 /**
 * sortArrayAlphabetic
 * @param {Array} array
 * @param {boolean} shouldBeAscending
 * @returns {Array}
 */
function sortArrayAlphabetic(array, shouldBeAscending)
{
	// Sort the array in ascending order
	array.sort();
	
	// Sort the array in descending order if it SHOULD NOT be ascending
	if (shouldBeAscending != null)
	{
		if (!shouldBeAscending)
		{
			array = reverseArray(array);
		}
	}
	
	return array;
}

/**
 * sortArrayNumeric
 * @param {Array} array
 * @param {boolean} shouldBeAscending
 * @returns {Array}
 */
function sortArrayNumeric(array, shouldBeAscending)
{
	// Sort the array in ascending order
	if (shouldBeAscending == null || shouldBeAscending)
	{
		array.sort(function(a, b){return a - b});
	}
	
	// Sort the array in descending order
	if (shouldBeAscending != null)
	{
		if (!shouldBeAscending)
		{
			array.sort(function(a, b){return b - a});
		}
	}
	
	return array;
}

/**
 * randomizeArray
 * @param {Array} array
 * @returns {Array}
 */
function randomizeArray(array)
{
	array.sort(function(a, b){return 0.5 - Math.random()});
	
	return array;
}

/**
 * reverseArray
 * @param {Array} array
 * @returns {Array}
 */
function reverseArray(array)
{
	array.reverse();
	
	return array;
}





/*****************
 * MISCELLANEOUS *
 *****************/

/**
 * getArrayMinNumber
 * @param {Array} array
 * @returns {number}
 */
function getArrayMinNumber(array) 
{
	return Math.min.apply(null, array);
}

/**
 * getArrayMaxNumber
 * @param {Array} array
 * @returns {number}
 */
function getArrayMaxNumber(array) 
{
	return Math.max.apply(null, array);
}

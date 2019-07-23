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
 * @param {Array} elements
 * @returns {Array}
 */
function addElementsToEndOfArray(array, elements)
{
    for (let i = 0; i < elements.length; i++)
    {
        // Add the current element to the end of the array
        array = addElementToEndOfArray(array, elements[i]);
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
 * @param {Array} elements
 * @returns {Array}
 */
function addElementsToBeginningOfArray(array, elements)
{
    for (let i = 0; i < elements.length; i++)
    {
        // Add the current element to the array
        array = addElementToBeginningOfArray(array, elements[i]);
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
        // Get the index of the element
        let index = array.indexOf(element);

        // Remove the element from the array
        array.splice(index, index + 1);
    }

    return array;
}

/**
 * removeGivenElementsFromArray
 * @param {Array} array
 * @param {Array} elements
 * @returns {Array}
 */
function removeGivenElementsFromArray(array, elements)
{
    for (let element of elements)
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





/*****************
 * MISCELLANEOUS *
 *****************/

/**
 * randomizeArray
 * @param {Array} originalArray
 * @returns {Array}
 */
function randomizeArray(originalArray)
{
    // Create clone of array
    let newArray = originalArray;

    // Initialize current index
    let currentIndex = originalArray.length;

    // Declare helper variables
    let temporaryValue, randomIndex;

    // There are still elements to shuffle
    while (0 !== currentIndex)
    {
        // Pick a random remaining element's index
        randomIndex = Math.floor(Math.random() * currentIndex);

        // Lower the current index
        currentIndex--;

        // Swap current array index with random index
        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = originalArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }

    // Return the newly randomized array
    return newArray;
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

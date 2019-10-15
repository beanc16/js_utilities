/***********
 * STRINGS *
 ***********/

/**
 * indexOfEnd
 * Description. Edit the default String class to get the index of the 
 * 				character at the end of a given substring, at the first
 * 				occurrence of that substring.
 * @param {string} string
 * @returns {Number}
 */
String.prototype.indexOfEnd = function(string)
{
	let io = this.indexOf(string);
	return io == -1 ? -1 : io + string.length;
};

/**
 * lastIndexOfEnd
 * Description. Edit the default String class to get the index of the 
 * 				character at the end of a given substring, at the last
 * 				occurrence of that substring.
 * @param {string} string
 * @returns {Number}
 */
String.prototype.lastIndexOfEnd = function(string)
{
	let io = this.lastIndexOf(string);
	return io == -1 ? -1 : io + string.length;
};





/*********
 * FORMS *
 *********/

/**
 * getFormDataById
 * @param {string} elementId
 * @returns {FormData}
 */
function getFormDataById(elementId)
{
    // Get the form as a DOM element
    let form = document.getElementById(elementId);

    // Convert the DOM element to a FormData object
    let data = new FormData(form);

    return data;
}





/******************
 * RANDOM NUMBERS *
 ******************/

/**
 * getRandomInteger
 * @param {number} minValue
 * @param {number} maxValue
 * @returns {number}
 */
function getRandomInteger(minValue, maxValue)
{
    // Get a random number
    let random = Math.floor(Math.random() * maxValue) + minValue;

    return random;
}

/**
 * getRandomDecimal
 * @param {number} minValue
 * @param {number} maxValue
 * @returns {number}
 */
function getRandomDecimal(minValue, maxValue)
{
    // Get a random number
    let random = (Math.random() * maxValue) + minValue;

    return random;
}





/*********
 * DELAY *
 *********/

/**
 * waitTimeToRunFunction
 * Summary. Wait the given amount of time to run the given function.
 * @param {number} milliseconds (1000ms = 1sec)
 * @param {function} func
 */
function waitTimeToRunFunction(milliseconds, func)
{
    // Wait the given amount of milliseconds to run the given function
    setTimeout(func, milliseconds);
}

/**
 * waitBetweenTimesToRunFunction
 * Description. Get a random number between the min and max value.
 *          	Wait that much time before running the given function.
 * @param {number} minMilliseconds (1000 = 1 second)
 * @param {number} maxMilliseconds (1000 = 1 second)
 * @param {function} func
 */
function waitBetweenTimesToRunFunction(minMilliseconds, maxMilliseconds, func)
{
    // Get a random integer between the given times
    let randomMs = getRandomInteger(minMilliseconds, maxMilliseconds);

    // Wait the random amount of time to run the function
    waitTimeToRunFunction(randomMs, func);
}

/**************
 * SANITIZING *
 **************/

/**
 * sanitizeStringFromHtml
 * Summary. Remove all HTML tags from the given string.
 * @param {String} htmlStr
 * @return {String}
 */
function sanitizeStringFromHtml(htmlStr) 
{
	/*
	// Initialize tags to test for
	let tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

	let tagOrComment = new RegExp(
		'<(?:'
		// Comment body
		+ '!--(?:(?:-*[^->])*--+|-?)'
		// Special "raw text" elements whose content should be elided
		+ '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
		+ '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
		// Regular name
		+ '|/?[a-z]'
		+ tagBody
		+ ')>',
		'gi');
	
	let oldHtml;	// Helper variable
	
	// Remove all html tags
	do 
	{
		oldHtml = htmlStr;
		htmlStr = htmlStr.replace(tagOrComment, '');
	} 
	while (htmlStr !== oldHtml);
	
	// Remove any unfinished tags
	htmlStr = htmlStr.replace(/</g, '&lt;');
	*/
	// Create a temporary element and set the string to be text
	let temp = document.createElement('div');
	temp.textContent = htmlStr;
	
	htmlStr = temp.innerHTML;
	return htmlStr;
}





/*****************
 * HTML BOOLEANS *
 *****************/

/**
 * isHtmlString
 * Description. Determine if the given string contains any HTML 
 * 				elements. (This detects anything within carrot brackets
 * 				such as "<a>", "<br />", or "<thisIsNotARealHtmlTag>").
 * @param {String} str
 * @return {Boolean}
 */
function isHtmlString(str)
{
	return /<[a-z][\s\S]*>/i.test(str);
}





/************************
 * SINGLE-TYPE BOOLEANS *
 ************************/

/**
 * isWhitespace
 * Summary. 	Test if the given string is just whitespace.
 * Description. This also tests for "\n" and "\t" and other similar characters.
 * @param {String} str
 * @return {Boolean}
 */
function isWhitespace(str)
{
	return /^\s*$/.test(str);
}

/**
 * isAlphabetic
 * Summary. 	Test if the given string is just alphabetic characters.
 * @param {String} str
 * @return {Boolean}
 */
function isAlphabetic(str)
{
	return /^[a-zA-Z]+$/.test(str);
}

/**
 * isNumeric
 * Summary. 	Test if the given string is just numeric characters.
 * @param {String} str
 * @return {Boolean}
 */
function isNumeric(str)
{
	return /^[0-9]+$/.test(str);
}

/**
 * isEmail
 * Summary. 	Test if the given string is a valid email.
 * @param {String} str
 * @return {Boolean}
 */
function isEmail(str) 
{
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}





/***********************
 * MULTI-TYPE BOOLEANS *
 ***********************/

/**
 * isAlphabeticWhitespace
 * Summary. 	Test if the given string is just alphabetic & whitespace characters.
 * @param {String} str
 * @return {Boolean}
 */
function isAlphabeticWhitespace(str)
{
	if (isAlphabetic(str) && isWhitespace(str))
	{
		return true;
	}
	
	return false;
}

/**
 * isAlphaNumeric
 * Summary. 	Test if the given string is just alphanumeric characters.
 * @param {String} str
 * @return {Boolean}
 */
function isAlphaNumeric(str)
{
	return /^[0-9a-zA-Z]+$/.test(str);
}

/**
 * isNumericWhitespace
 * Summary. 	Test if the given string is just numeric & whitespace characters.
 * @param {String} str
 * @return {Boolean}
 */
function isNumericWhitespace(str)
{
	if (isNumeric(str) && isWhitespace(str))
	{
		return true;
	}
	
	return false;
}

/**
 * isAlphaNumericWhitespace
 * Summary. 	Test if the given string is just alphanumeric & whitespace characters.
 * @param {String} str
 * @return {Boolean}
 */
function isAlphaNumericWhitespace(str)
{
	if (isAlphaNumeric(str) && isWhitespace(str))
	{
		return true;
	}
	
	return false;
}

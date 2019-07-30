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
	// Get a boolean value that states if the given string has any HTML
	let result = /<[a-z][\s\S]*>/i.test(str);
	
	return result;
}

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

/**
 * isWhitespace
 * Summary. 	Test if the given string is just whitespace or not
 * Description. This also tests for "\n" and "\t" and other similar characters.
 * @param {String} str
 * @return {String}
 */
function isWhitespace(str)
{
	let result = /^\s*$/.test(str);
	
	return result;
}

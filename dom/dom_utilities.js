/***********
 * GENERAL *
 ***********/

/**
 * runOnReady
 * Summary. 	Run each given function when the page is loaded.
 * Description. PASS ALL PARAMETERS TO THIS FUNCTION AS:
 *          	() => functionName(parameters)
 *
 * @param {function} functions
 */
function runOnReady(...functions)
{
    // Run when the document is loaded
	window.onload = function()
    {
        // Loop over each given function
        for (let num = 0; num < functions.length; num++)
        {
            // Run the current given function
            functions[num]();
        }
    };
}





/************
 * BOOLEANS *
 ************/

/**
 * isHtmlElementOrNode
 * Summary. Test if the given htmlObject is a node or HTML element.
 * @param htmlObject
 * @return {boolean}
 */
 function isHtmlElementOrNode(htmlObject)
 {
	 if (isNode(htmlObject) || isElement(htmlObject))
	 {
		 return true;
	 }
	 
	 return false;
 }
 
/**
 * isNode
 * Summary. Test if the given object is a node.
 * @param o
 * @return {boolean}
 */
function isNode(o)
{
	// Returns true if the given object is a DOM node   
	return 
	(
		typeof Node === "object" ? o instanceof Node : 
		o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
	);
}

/**
 * isHtmlElement
 * Summary. Test if the given object is an HTML element.
 * @param o
 * @return {boolean}
 */ 
function isHtmlElement(o)
{
	// Returns true if the given object is a DOM element   
	return 
	(
		typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
		o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
	);
}





/****************
 * DOM ELEMENTS *
 ****************/

/**
 * enableDomElement
 * Summary. Enable or disable the given DOM element.
 * @param {string}  element
 * @param {boolean} shouldEnable
 */
function enableDomElement(element, shouldEnable)
{
    // Enable element if true; Disable element if false
    disableDomElement(tag, !shouldEnable);
}

/**
 * disableDomElement
 * Summary. Enable or disable the given DOM element.
 * @param {string}  element
 * @param {boolean} shouldDisable
 */
function disableDomElement(element, shouldDisable)
{
    // Enable element if false || Disable element if true
	element.disabled = shouldDisable;
}

/** 
 * removeGivenElement
 * Summary. Remove the given element from the HTML page.
 * @param elementToRemove
 */
function removeGivenElement(elementToRemove)
{
	// Get the parent of the given element
	let parent = elementToRemove.parentNode;
	
	// Remove the given element from the parent
	parent.removeChild(elementToRemove);
}





/***********************
 * CLICK FUNCTIONALITY *
 ***********************/

/**
 * runOnClickDom
 * Summary. Run the given function when the given element is clicked.
 * @param            element
 * @param {function} func
 */
function runOnClickDom(element, func)
{
	element.onclick = () => func();
}

/**
 * disableClickFunctionality
 * Summary. Disable the given element from being clicked.
 * @param element
 */
function removeOnClickDom(element)
{
	element.onclick = null;
}

/**
 * disableClickFunctionality
 * Summary. Disable the given element from being clicked.
 * @param element
 */
function disableClickFunctionalityDom(element)
{
	removeOnClickDom(element);
}

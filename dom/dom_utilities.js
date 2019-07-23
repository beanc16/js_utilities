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
 
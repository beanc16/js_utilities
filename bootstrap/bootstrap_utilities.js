/*********************
 * BOOTSTRAP BUTTONS *
 *********************/

/**
 * getBootstrapCloseButtonTemplate
 * Summary. Create a bootstrap button based on the close template.
 * @returns {*}
 */
function getBootstrapCloseButtonTemplate(innerHTML, func)
{
	/* 
		Bootstrap Button in HTML:
		<button type="button" class="close" aria-label="Close">
		  <span aria-hidden="true">&times;</span>
		</button>
	*/
	
	let button = document.createElement("button");
	button.className = "close";
	
	let span = document.createElement("span");
	span.innerHTML = innerHTML;
	
	button.appendChild(span);
	
	// onclick functionality
	if (func != null)
	{
		button.onclick = () => func();
	}
	
	return button;
}

/**
 * getBootstrapCloseButton
 * Summary. Create a bootstrap close/"x" button.
 * @returns {*}
 */
function getBootstrapCloseButton(func)
{
	return getBootstrapCloseButtonTemplate("&times;", func);
}

/**
 * getBootstrapAddButton
 * Summary. Create a bootstrap "+" button.
 * @returns {*}
 */
function getBootstrapAddButton(func)
{
	return getBootstrapCloseButtonTemplate("+", func);
}

/**
 * getBootstrapPlusButton
 * Summary. Call getBootstrapAddButton().
 * @returns {*}
 */
function getBootstrapPlusButton(func)
{
	return getBootstrapAddButton(func);
}

/**
 * getBootstrapRemoveButton
 * Summary. Create a bootstrap "-" button.
 * @returns {*}
 */
function getBootstrapRemoveButton(func)
{
	return getBootstrapCloseButtonTemplate("-", func);
}

/**
 * getBootstrapSubtractButton
 * Summary. Call getBootstrapRemoveButton().
 * @returns {*}
 */
function getBootstrapSubtractButton(func)
{
	return getBootstrapRemoveButton(func);
}

/**
 * getBootstrapMinusButton
 * Summary. Call getBootstrapRemoveButton().
 * @returns {*}
 */
function getBootstrapMinusButton(func)
{
	return getBootstrapRemoveButton(func);
}





/*********************
 * BOOTSTRAP TOGGLES *
 *********************/

/**
 * isToggleOn
 * Summary. Test if a bootstrap toggle was turned on or off.
 * Description. WARNING: If you are running this function when the 
 *				toggle is clicked, call wasToggleTurnedOn() instead.
 *				Documentation on the bootstrap toggle add-on can be
 * 				found here:
 * 					Bootstrap 4:
 * 					https://gitbrent.github.io/bootstrap4-toggle
 * 					Bootstrap <=3:
 * 					http://www.bootstraptoggle.com
 * @param toggleElement
 * @returns {*}
 */
function isToggleOn(toggleElement)
{
    // Has "off" if it's turned off
    return !toggleElement.className.includes("off");
}

/**
 * isToggleOff
 * Summary. Test if a bootstrap toggle was turned on or off.
 * Description. WARNING: If you are running this function when the 
 *				toggle is clicked, call wasToggleTurnedOn() instead.
 *				Documentation on the bootstrap toggle add-on can be
 * 				found here:
 * 					Bootstrap 4:
 * 					https://gitbrent.github.io/bootstrap4-toggle
 * 					Bootstrap <=3:
 * 					http://www.bootstraptoggle.com
 * @param toggleElement
 * @returns {*}
 */
function isToggleOff(toggleElement)
{
    return !isToggleOn(toggleElement);
}


/**
 * wasToggleTurnedOn
 * Summary. Test if a bootstrap toggle was turned on or off.
 * Description. WARNING: This function is intended to be ran 
 *				when a toggle is clicked. If this function 
 * 				isn't being ran when the toggle is clicked, 
 * 				just call isToggleOn() instead.
 * 				
 *				Documentation on the bootstrap toggle add-on can be
 * 				found here:
 * 					Bootstrap 4:
 * 					https://gitbrent.github.io/bootstrap4-toggle
 * 					Bootstrap <=3:
 * 					http://www.bootstraptoggle.com
 * @param toggleElement
 * @returns {*}
 */
function wasToggleTurnedOn(toggleElement)
{
	setTimeout(function()
	{
		return isToggleOn(toggleElement);
	}, 1);
}


/**
 * wasToggleTurnedOff
 * Summary. Test if a bootstrap toggle was turned on or off.
 * Description. WARNING: This function is intended to be ran 
 *				when a toggle is clicked. If this function 
 * 				isn't being ran when the toggle is clicked, 
 * 				just call isToggleOn() instead.
 * 				
 *				Documentation on the bootstrap toggle add-on can be
 * 				found here:
 * 					Bootstrap 4:
 * 					https://gitbrent.github.io/bootstrap4-toggle
 * 					Bootstrap <=3:
 * 					http://www.bootstraptoggle.com
 * @param toggleElement
 * @returns {*}
 */
function wasToggleTurnedOff(toggleElement)
{
	return !wasToggleTurnedOn(toggleElement);
}

/**
 * initializeToggleFunctionality
 * Summary. Set the given toggle's click functionality.
 * @param            toggle
 * @param {function} func
 */
function initializeToggleFunctionality(toggle, func)
{
	toggle.onclick = () => setTimeout(func, 1);			// Needs short delay in order for toggle to activate correctly
}

/**
 * initializeAllTogglesFunctionality
 * Summary. Set the click functionality of all toggle elements.
 * @param {function} func
 */
function initializeAllTogglesFunctionality(func)
{
	// Get all toggles
	let toggles = document.getElementsByClassName("toggle");
	
	// Set each toggle's click functionality
	for (let i = 0; i < toggles.length; i++)
	{
		initializeToggleFunctionality(toggles[i], func);
	}
}

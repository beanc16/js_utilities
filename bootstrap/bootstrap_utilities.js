/*************
 * BOOTSTRAP *
 *************/

/**
 * getBootstrapCloseButton
 * Summary. Create a bootstrap close/"x" button.
 * @returns {*}
 */
function getBootstrapCloseButton()
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
	span.innerHTML = "&times;";
	
	button.appendChild(span);
	
	return button;
}

/**
 * wasToggleTurnedOn
 * Summary. Test if a bootstrap toggle was turned on or off.
 * Description. WARNING: If you are running this function when the 
 *				toggle is clicked, you need to put it in a setTimeout 
 *				with a delay of 1. Otherwise, this will return the 
 *				incorrect value. 
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
	// The toggle was turned on
	if (toggleElement.className.includes("btn-success"))
	{
		return true;
	}
	
	// The toggle was turned off
	else if (toggleElement.className.includes("btn-danger off"))
	{
		return false;
	}
	
	return null;
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
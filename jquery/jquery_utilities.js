/* 
 * In order for this code to work, you must have jQuery on the same 
 * page that is using this library. You can find an up-to-date 
 * version of jQuery here:
 * https://code.jquery.com
 */



/***********
 * GENERAL *
 ***********/

/**
 * runOnDocumentReady
 * Summary. 	Run each given function when the page is loaded.
 * Description. PASS ALL PARAMETERS TO THIS FUNCTION AS:
 *          	() => functionName(parameters)
 *
 * @param {function} functions
 */
function runOnDocumentReady(...functions)
{
    // Run when the document is loaded
    $(document).ready(function()
    {
        // Loop over each given function
        for (let num = 0; num < functions.length; num++)
        {
            // Run the current given function
            functions[num]();
        }
    })
}

/**
 * preventPageRefresh
 * Summary. 	Prevent the page from refreshing on an element submit.
 * Description. Place this in a $(document).ready function to 
 * 				prevent the page from refreshing when the 
 * 				element(s) with the given tag are submitted.
 * 				If no tag is given, it prevents forms from 
 * 				refreshing by default.
 * @param {string} formTag
 */
function preventPageRefresh(formTag)
{
	// A tag WAS given
	if (formTag != null)
	{
		// Activated when the given element(s) are submitted
		$(formTag).on("submit", function(e)
		{
			// Prevent page from refreshing on submit
			e.preventDefault();
		});
	}
	
	// A tag WAS NOT given
	else
	{
		// Activated when any form is submitted
		$("form").on("submit", function(e)
		{
			// Prevent page from refreshing on submit
			e.preventDefault();
		});
	}
}





/*****************
 * HTML ELEMENTS *
 *****************/

/**
 * setHtml
 * Summary. Set the display of the HTML element with the given tag.
 * @param {string} tag
 * @param          display
 */
function setHtml(tag, display)
{
    // Update the html with the given display (usually a string)
    $(tag).html(display);
}

/**
 * clearHtml
 * Summary. Clear the display of the HTML element with the given tag.
 * @param {string} tag
 */
function clearHtml(tag)
{
    // Clear the display of the given html tag
    setHtml(tag, "");
}

/**
 * enableHtmlElement
 * Summary. Enable or disable the HTML element with the given tag.
 * @param {string}  tag
 * @param {boolean} shouldEnable
 */
function enableHtmlElement(tag, shouldEnable)
{
    // Enable element if true; Disable element if false
    disableHtmlElement(tag, !shouldEnable);
}

/**
 * disableHtmlElement
 * Summary. Enable or disable the HTML element with the given tag.
 * @param {string}  tag
 * @param {boolean} shouldDisable
 */
function disableHtmlElement(tag, shouldDisable)
{
    // Enable element if false || Disable element if true
    $(tag).prop('disabled', shouldDisable);
}

/**
 * removeHtmlElement
 * Summary. Remove the HTML element with the given tag.
 * @param {string}  tag
 */
function removeHtmlElement(tag)
{
	// Remove the element with the given tag
	$(tag).remove();
}





/***********************
 * CLICK FUNCTIONALITY *
 ***********************/

/**
 * runOnClick
 * Description. Run the given function when the element with the given 
 * 				tag is clicked.
 * @param {string}   tag
 * @param {function} func
 */
function runOnClick(tag, func)
{
    // When the html element of the given tag is clicked
    $(tag).click(function()
    {
        // Run the given function
        func();
    });
}

/**
 * runOnClickMany
 * Description. Run the given function when the elements with the given 
 * 				tags are clicked.
 * @param {Array}    arrayOfTags
 * @param {function} func
 */
function runOnClickMany(arrayOfTags, func)
{
	for (let i = 0; i < arrayOfTags.length; i++)
	{
		runOnClick(arrayOfTags[i], func);
	}
}

/**
 * runOnClickWithEvent
 * Description. Run the given function (with the event passed as a 
 * 				parameter) when the element with the given tag is 
 * 				clicked.
 * @param {string}   tag
 * @param {function} func (recommend using an anonymous function)
 */
function runOnClickWithEvent(tag, func)
{
    // When the html element of the given tag is clicked
    $(tag).click(function(e)
    {
        // Run the given function with the event as a parameter (recommend using an anonymous function)
        func(e);
    });
}

/**
 * removeOnClick
 * Description. Disable the element with the given tag from doing 
 * 				anything when clicked.
 * @param {string} tag
 */
function removeOnClick(tag)
{
	// Remove click functionality for elements with the given name
    $(tag).off("click").click(null);
                           // ^ null = no function on click
}

/**
 * disableClickFunctionality
 * Description. Disable the element with the given tag from doing 
 * 				anything when clicked.
 * @param {string} tag
 */
function disableClickFunctionality(tag)
{
    removeOnClick(tag);
}

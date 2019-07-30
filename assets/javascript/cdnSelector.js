/******************
 * INITIALIZATION *
 ******************/

/*
 * $(document).ready
 */
runOnDocumentReady(
	// Prevent the page from refreshing when the form is submitted
	() => preventPageRefresh(),
	
	// Add submit button click functionality
	() => runOnClick("#submitButton", () => onSubmitButtonClick()),
	
	// Add version dropdown functionality
	() => initializeVersionDropdown(),
	
	// Add select/deselect all functionality
	() => initializeQuickSelectOptions()
);





/********************
 * GLOBAL VARIABLES *
 ********************/

/*
	CDN Template:
	https://cdn.jsdelivr.net/gh/beanc16/js_utilities@version/folder/file.js
*/

// Declare CDN variables
let baseCdn = "https://cdn.jsdelivr.net/gh/beanc16/js_utilities@"/* version/path */;
let version = "latest";
let path = "";

// Track all options
let optionsDictionary = {

	// idOnHtmlPage
	"toggleGetCdn": {
		true: displayCdnCombinedOrNotCombined,
		false: displaySrcCombinedOrNotCombined
	},
	"toggleCombineCdns": {
		true: "true", 		// Dummy value
		false: "false" 		// Dummy value
	}
};

// Track all CDN files
let cdnObj = {
	
	// idOnHtmlPage: path
	
	// DOM
	checkBootstrapUtilities: "bootstrap/bootstrap_utilities.js",
	
	// DOM
	checkDomUtilities: "dom/dom_utilities.js",
	
	// jQuery
	checkJqueryUtilities: "jquery/jquery_utilities.js",
	
	// Node
	checkNodeAjax: "node/node_ajax.js",
	
	// Vanilla
	checkVanillaArrays: "vanilla/arrays.js",
	checkVanillaValidation: "vanilla/validation.js",
	checkVanillaAjax: "vanilla/vanilla_ajax.js",
	checkVanillaUtilities: "vanilla/vanilla_utilities.js"
};





/******************
 * INITIAL SUBMIT *
 ******************/

function onSubmitButtonClick()
{
	// Get & clear the displays
	let displayArea = document.getElementById("displayArea");
	let codeArea = document.getElementById("codeArea");
	displayArea.innerHTML = "";
	codeArea.innerHTML = "";
	
	// Get the IDs of the selected options & CDNs
	let selectedIds = getSelectedCheckboxesId();
	
	// If options were selected, run them based on the selected options
	if (selectedIds != null)
	{
		let allOptions = getAllOptions(selectedIds);
		runFunctionsFromOptions(allOptions, selectedIds);
	}
}

function getSelectedCheckboxesId()
{
	// Get all checkboxes
	let checkboxes = document.getElementsByTagName("input");
	
	// Initialize array to track all selected checkboxes
	let selectedCheckboxes = [];
	
	for (let i = 0; i < checkboxes.length; i++)
	{
		// If a checkbox is checked, add it to selectedCheckboxes
		if (checkboxes[i].checked)
		{
			selectedCheckboxes.push(checkboxes[i].id);
		}
	}
	
	// Return selectedCheckboxes only if it has checkboxes in it
	if (selectedCheckboxes.length != 0)
	{
		return selectedCheckboxes;
	}
	else
	{
		return null;
	}
}

function getAllOptions(selectedIds)
{
	// Helper variables
	let allOptions = {};
	
	// Loop over each selectedId
	for (let i = 0; i < selectedIds.length; i++)
	{
		// The selectedId is an option
		if (selectedIds[i].includes("toggle"))
		{			
			// Test which option goes with the selectedId
			for (let key in optionsDictionary)
			{				
				// The current option (id) WAS selected
				if (key == selectedIds[i])
				{
					allOptions[key] = true;
					continue;					
				}
				
				// The current option (id) WAS NOT selected
				else
				{
					if (allOptions[key] == null)	// Don't override a "true" value
					{
						allOptions[key] = false;
					}
				}
			}	
		}
	}
	
	// All options were turned off
	if (Object.entries(allOptions).length === 0)
	{
		// Set all options to false
		for (let key in optionsDictionary)
		{
			allOptions[key] = false;
		}
	}
	
	return allOptions;
}

function runFunctionsFromOptions(allOptions, selectedIds)
{
	// Loop over each final option
	for (let option in allOptions)
	{
		// Loop over each option in the dictionary
		for (let key in optionsDictionary)
		{
			if (option == key)
			{
				let optionsDictionaryValue = optionsDictionary[key];
				
				for (let boolValue in optionsDictionaryValue)
				{
					if (boolValue == allOptions[option].toString())
					{
						if (typeof optionsDictionaryValue[boolValue] == "function")
						{
							optionsDictionaryValue[boolValue](selectedIds, allOptions);
						}
					}
				}
			}
		}
	}	
}

function initializeVersionDropdown()
{
	// Get all options in the dropdown menu
	let dropdownVersions = document.getElementsByClassName("dropdown-item");
	
	for (let i = 0; i < dropdownVersions.length; i++)
	{
		// Set each option's click functionality
		dropdownVersions[i].onclick = function() 
		{
			// Get the new version to display
			let newVersion = this.innerHTML;
			
			// Remove extra text in the "latest" option
			if (newVersion.includes("latest"))
			{
				newVersion = "latest";
			}
			
			// Set the version variable
			version = newVersion;
			
			// Update the dropdown to display the new selected version
			let dropdownVersionButton = document.getElementById("dropdownVersionButton");
			dropdownVersionButton.innerHTML = newVersion;
			
			// Reload the link
			onSubmitButtonClick();
		}
	}
}

function initializeQuickSelectOptions()
{
	let pathCheckboxes = document.getElementsByClassName("checkboxPath");
	
	let selectAllCheckbox = document.getElementById("btnSelectAll");
	let deselectAllCheckbox = document.getElementById("btnDeselectAll");
	
	selectAllCheckbox.onclick = function()
	{
		for (let i = 0; i < pathCheckboxes.length; i++)
		{
			pathCheckboxes[i].checked = true;
		}
	}
	
	deselectAllCheckbox.onclick = function()
	{
		for (let i = 0; i < pathCheckboxes.length; i++)
		{
			pathCheckboxes[i].checked = false;
		}
	}
}





/****************
 * OPTIONS TEST *
 ****************/

function displaySrcCombinedOrNotCombined(selectedIds, allOptions)
{
	for (let key in allOptions)
	{
		// DO combine the SRC links
		if (key == "toggleCombineCdns" && allOptions[key] == true)
		{
			displayCombinedSrcLink(selectedIds, allOptions);
		}
		
		// DO NOT combine the SRC links
		else if (key == "toggleCombineCdns" && allOptions[key] == false)
		{
			displaySrcLinks(selectedIds, allOptions)
		}
	}
}

function displayCdnCombinedOrNotCombined(selectedIds, allOptions)
{
	for (let key in allOptions)
	{
		// DO combine the CDNs
		if (key == "toggleCombineCdns" && allOptions[key] == true)
		{
			displayCombinedCdn(selectedIds, allOptions);
			return;	// End the function after displaying the combined SRC link
		}
		
		// DO NOT combine the CDNs
		else if (key == "toggleCombineCdns" && allOptions[key] == false)
		{
			displayCdns(selectedIds, allOptions);
		}
	}
}





/******************
 * UNCOMBINED SRC *
 ******************/

function displaySrcLinks(selectedIds, allOptions)
{
	let displayArea = document.getElementById("displayArea");
	
	// Get what should be displayed
	allSrcLinks = getAllSrcLinks(selectedIds);
	
	// Add each element that should be displayed to the 
	for (let i = 0; i < allSrcLinks.length; i++)
	{
		let a = getAnchorElement(allSrcLinks[i]);
		displayArea.appendChild(a);
		
		if (allSrcLinks.length - 1 != i)
		{
			let br = getBrElement();
			displayArea.appendChild(br);
		}
	}
}

function getAllSrcLinks(selectedIds)
{
	// Helper variables
	let allCdns = [];
	let currentPath, currentCdn;
	
	// Loop over each selectedId
	for (let i = 0; i < selectedIds.length; i++)
	{
		// Test which path goes with the selectedId
		for (let key in cdnObj)
		{
			if (key == selectedIds[i])
			{
				// Set the currentPath
				currentPath = cdnObj[key];
				
				// Convert to full CDN
				currentCdn = getFullSrcLink(currentPath);
				
				// Add the CDN to the list of all CDNs
				allCdns.push(currentCdn);
				break;
			}
		}
	}
	
	return allCdns;
}

function getFullSrcLink(currentPath)
{
	let cdn = baseCdn + version + "/" + currentPath;
	
	return cdn;
}





/****************
 * COMBINED SRC *
 ****************/

function displayCombinedSrcLink(selectedIds, allOptions)
{
	let displayArea = document.getElementById("displayArea");
	
	// Get all paths
	let allPaths = getAllPathsForCombinedLink(selectedIds);
	
	if (allPaths.length != 0)
	{
		// If there's only one path selected, don't make it a combined SRC
		if (allPaths.length == 1)
		{
			displaySrcLinks(selectedIds, allOptions);
			return;
		}
		
		let combinedLink = getCombinedSrcLink(allPaths);
	
		// Set the combined link as an element to display
		let a = getAnchorElement(combinedLink);
		displayArea.appendChild(a);
	}
}

function getAllPathsForCombinedLink(selectedIds)
{
	let allPaths = [];
	
	// Add each selected path to the array of allPaths
	for (let i = 0; i < selectedIds.length; i++)
	{
		for (let key in cdnObj)
		{
			// Test which path goes with the current selectedId
			if (key == selectedIds[i])
			{
				currentPath = cdnObj[key];
				
				allPaths.push(currentPath);
				break;
			}
		}
	}
	
	return allPaths;
}

function getCombinedSrcLink(allPaths)
{
	/*
	 * Sample combined file:
	 * https://cdn.jsdelivr.net/combine/
	 * gh/beanc16/js_utilities@0.0.1/vanilla/validation.js,
	 * 													  ^ comma here; start next file at "gh"
	 * gh/beanc16/js_utilities@0.0.1/vanilla/vanilla_ajax.js
	 */
	
	let baseCombinedCdn = "https://cdn.jsdelivr.net/combine/";
	let combinedCdnAddon = "gh/beanc16/js_utilities@";
	
	let cdn = baseCombinedCdn;
	
	for (let i = 0; i < allPaths.length; i++)
	{
		// There's one file in the combination already
		if (i != 0)
		{
			// Add a comma to separate the files
			cdn += ",";
		}
		
		cdn += combinedCdnAddon + version + "/" + allPaths[i];
	}
	
	return cdn;
}





/******************
 * UNCOMBINED CDN *
 ******************/

function displayCdns(selectedIds, allOptions)
{
	let allSrcLinks;
	
	// Get what should be displayed
	allSrcLinks = getAllSrcLinks(selectedIds);	
	
	let codeArea = document.getElementById("codeArea");
	
	// Add each element that should be displayed to the 
	for (let i = 0; i < allSrcLinks.length; i++)
	{
		let script = getScriptElement(allSrcLinks[i]);
		let cdn = getCodeElement(script.outerHTML);
		codeArea.appendChild(cdn);
		
		if (allSrcLinks.length - 1 != i)
		{
			let br = getBrElement();
			codeArea.appendChild(br);
		}
	}
}





/****************
 * COMBINED CDN *
 ****************/

function displayCombinedCdn(selectedIds, allOptions)
{
	let codeArea = document.getElementById("codeArea");
	
	// Get all paths
	let allPaths = getAllPathsForCombinedLink(selectedIds);
	
	if (allPaths.length != 0)
	{
		// If there's only one path selected, don't make it a combined CDN
		if (allPaths.length == 1)
		{
			displayCdns(selectedIds, allOptions);
			return;
		}
		
		// Get what should be displayed
		let combinedLink = getCombinedSrcLink(allPaths);
		
		let script = getScriptElement(combinedLink);
		let cdn = getCodeElement(script.outerHTML);
		codeArea.appendChild(cdn);
	}
}





/***************
 * CDN HELPERS *
 ***************/

function getCodeElement(displayText)
{
	let code = document.createElement("code");
	code.className = "txt-white";	// For CSS styling
	
	displayText = convertToCodeText(displayText);
	code.innerHTML = displayText;
	
	return code;
}

function convertToCodeText(str)
{
	while (str.includes("<"))
	{
		str = str.replace("<", "&lt;");
	}
	
	while (str.includes(">"))
	{
		str = str.replace(">", "&gt;");
	}
	
	return str;
}

function getScriptElement(src)
{
	let script = document.createElement("script");
	script.src = src;
	
	return script;
}

function getAnchorElement(href)
{
	let a = document.createElement("a");
	a.href = href;
	a.className = "text-info";	// For bootstrap color
	a.innerHTML = href;
	
	return a;
}

function getBrElement()
{
	return document.createElement("BR");
}

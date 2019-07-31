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

// Track all CDN paths based on the version
let cdnObj = null;





/******************
 * INITIAL SUBMIT *
 ******************/

function onSubmitButtonClick()
{
	// Set the global cdnObj to be the latest version if none is set
	if (cdnObj == null)
	{
		setCdnObjBasedOnVersion("latest");
	}
	
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
			
			// Set the correct global CDN obj
			setCdnObjBasedOnVersion(newVersion);
			
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
		// Select all enabled checkboxes
		for (let i = 0; i < pathCheckboxes.length; i++)
		{
			if (pathCheckboxes[i].disabled == false)
			{
				pathCheckboxes[i].checked = true;
			}
		}
	}
	
	deselectAllCheckbox.onclick = function()
	{
		// Deselect all enabled checkboxes
		for (let i = 0; i < pathCheckboxes.length; i++)
		{
			if (pathCheckboxes[i].disabled == false)
			{
				pathCheckboxes[i].checked = false;
			}
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

function setCdnObjBasedOnVersion(versionNum)
{	
	// Get the local CDN object based 
	let localCdnObj = getLocalCdnObj();
	
	// Set the version to latest if it wasn't set
	if (versionNum == null)
	{
		versionNum = "latest";
	}
	
	// If the version is "latest", set the version number to the latest actual version
	if (versionNum == "latest")
	{
		for (let key in localCdnObj)
		{
			versionNum = key;
			break;
		}
	}
	
	// Set the global CDN object
	cdnObj = localCdnObj[versionNum];
	
	// Enable/Disable checkboxes based on the selected version
	enableDisableAvailableCdnSelections();
}

function getLocalCdnObj()
{
	// Create an empty CDN object
	let localCdnObj = new Object();
	
	// Version 0.1.1
	localCdnObj["0.1.1"] = {
			// idOnHtmlPage: path
		
			// Bootstrap
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
	
	// Version 0.0.1	
	localCdnObj["0.0.1"] = {
			// idOnHtmlPage: path
			
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
	
	return localCdnObj;
}

function enableDisableAvailableCdnSelections()
{
	// Set all CDNs and their IDs in an object
	let allCdnCheckboxes = document.getElementsByClassName("checkboxPath");
	let allCdns = {};
	for (let i = 0; i < allCdnCheckboxes.length; i++)
	{
		allCdns[allCdnCheckboxes[i].id] = allCdnCheckboxes[i];
	}
	
	// Enable all checkboxes that are available in the selected version
	for (let key in cdnObj)
	{
		// The selected version has the given key
		if (allCdns.hasOwnProperty(key))
		{
			// Enable the given checkbox
			allCdns[key].disabled = false;
			
			// Change the text color of the label (CSS)
			let label = allCdns[key].parentNode.getElementsByClassName("custom-control-label")[0];
			label.classList.remove("text-muted");
			label.classList.add("text-info");
			
			// Delete the given key:value pair (disable remaining key:value pairs later)
			delete allCdns[key];
		}
	}
	
	// Disable all remaining checkboxes that aren't available in the selected version
	for (let key in allCdns)
	{
		// Disable the given checkbox and uncheck it
		allCdns[key].disabled = true;
		allCdns[key].checked = false;
		
		// Change the text color of the label (CSS)
		let label = allCdns[key].parentNode.getElementsByClassName("custom-control-label")[0];
		label.classList.remove("text-info");
		label.classList.add("text-muted");
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

/*
 * $(document).ready
 */
runOnDocumentReady(
	// Prevent the page from refreshing when the form is submitted
	() => preventPageRefresh(),
	
	// Add submit button click functionality
	() => runOnClick("#submitButton", () => onSubmitButtonClick())
);


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
		true: displayCdns,
		false: displaySrcLinks
	},
	"toggleCombineCdns": {
		true: "true",
		false: "false"
	}
};

// Track all CDN files
let cdnObj = {
	
	// idOnHtmlPage: path
	
	// DOM
	checkDomUtilities: "dom/dom_utilities.js",
	
	// jQuery
	checkJqueryUtilities: "jquery/jquery_utilities.js",
	
	// Node
	checkNodeAjax: "node/node_ajax.js",
	
	// Vanilla
	checkVanillaArrays: "vanilla/arrays.js ",
	checkVanillaValidation: "vanilla/validation.js ",
	checkVanillaAjax: "vanilla/vanilla_ajax.js ",
	checkVanillaUtilities: "vanilla/vanilla_utilities.js"
};



function onSubmitButtonClick()
{
	// Get & clear the display areas
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
	//console.log(allOptions);	
	
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
							optionsDictionaryValue[boolValue](selectedIds);
						}
					}
				}
			}
		}
	}	
}



function displaySrcLinks(selectedIds)
{
	let displayArea = document.getElementById("displayArea");
	
	// Run the given function to get what should be displayed
	let allSrcLinks = getAllSrcLinks(selectedIds);
	
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
	//console.log(allCdns);
	
	return allCdns;
}

function getFullSrcLink(currentPath)
{
	let cdn = baseCdn + version + "/" + currentPath;
	
	return cdn;
}

function displayCdns(selectedIds)
{
	let codeArea = document.getElementById("codeArea");
	
	// Run the given function to get what should be displayed
	let allSrcLinks = getAllSrcLinks(selectedIds);
	//console.log(allSrcLinks);
	
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



function getCodeElement(displayText)
{
	let code = document.createElement("code");
	code.className = "txt-white";
	
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

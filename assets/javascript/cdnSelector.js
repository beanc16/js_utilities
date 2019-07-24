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
let optionsArray = [

	// idOnHtmlPage
	"toggleGetCdn",
	"toggleCombineCdns"
];

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
	let selectedIds = getSelectedCheckboxesId();;
		
	let displayArea = document.getElementById("displayArea");
	displayArea.innerHTML = "";
	
	if (selectedIds != null)
	{
		let allOptions = getAllOptions(selectedIds);
		let allCdns = getAllCdns(selectedIds);
		//console.log(allCdns)
		
		for (let i = 0; i < allCdns.length; i++)
		{
			let a = getAnchorElement(allCdns[i]);
			displayArea.appendChild(a);
			
			if (allCdns.length - 1 != i)
			{
				let br = getBrElement();
				displayArea.appendChild(br);
			}
		}
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

function getAllCdns(selectedIds)
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
				currentCdn = getFullCdn(currentPath);
				
				// Add the CDN to the list of all CDNs
				allCdns.push(currentCdn);
				break;
			}
		}
	}
	
	return allCdns;
}

function getFullCdn(currentPath)
{
	let cdn = baseCdn + version + "/" + currentPath;
	
	return cdn;
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
			for (let j = 0; j < optionsArray.length; j++)
			{
				// The current option (id) WAS selected
				if (optionsArray[j] == selectedIds[i])
				{
					allOptions[ optionsArray[j] ] = true;
					continue;					
				}
				
				// The current option (id) WAS NOT selected
				else
				{
					if (allOptions[ optionsArray[j] ] == null)	// Don't override a "true" value
					{
						allOptions[ optionsArray[j] ] = false;
					}
				}
			}	
		}
	}
	
	// All options were turned off
	if (Object.entries(allOptions).length === 0)
	{
		// Set all options to false
		for (let j = 0; j < optionsArray.length; j++)
		{
			allOptions[ optionsArray[j] ] = false;
		}
	}
	
	return allOptions;
}



function getAnchorElement(href)
{
	let a = document.createElement("a");
	a.href = href;
	a.className = "text-info";
	a.innerHTML = href;
	
	return a;
}

function getBrElement()
{
	return document.createElement("BR");
}
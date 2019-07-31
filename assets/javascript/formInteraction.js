/***********
 * OPTIONS *
 ***********/
 
function initializeAllElementClicks()
{
	// Make all checkboxes update the CDN/SRC when clicked
	let checkboxes = document.getElementsByTagName("input");
	runOnClickDoms(checkboxes, onFormUpdate);

	// Make all toggles update the CDN/SRC when clicked
	initializeAllTogglesFunctionality(onFormUpdate);

	// Make "Select All" and "Deselect All" buttons update the CDN/SRC when clicked
	runOnClick("#btnSelectAll", () => setTimeout(onFormUpdate, 1));		// Needs short delay to wait for checkboxes to be marked
	runOnClick("#btnDeselectAll", () => setTimeout(onFormUpdate, 1));	// Needs short delay to wait for checkboxes to be unmarked
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
			onFormUpdate();
		}
	}
}





/*******************************
 * SELECT/DESELECT ALL BUTTONS *
 *******************************/

function initializeQuickSelectOptions()
{
	let pathCheckboxes = document.getElementsByClassName("checkboxPath");
	
	let selectAllCheckbox = document.getElementById("btnSelectAll");
	let deselectAllCheckbox = document.getElementById("btnDeselectAll");
	
	selectAllCheckbox.onclick = function()
	{
		// Check all enabled checkboxes
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
		// Uncheck all enabled checkboxes
		for (let i = 0; i < pathCheckboxes.length; i++)
		{
			if (pathCheckboxes[i].disabled == false)
			{
				pathCheckboxes[i].checked = false;
			}
		}
	}
}





/**************
 * CHECKBOXES *
 **************/

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
	allCdns = enableAvailableCheckboxes(allCdns);
	
	// Disable all remaining checkboxes that aren't available in the selected version
	disableAvailableCheckboxes(allCdns);
}

function enableAvailableCheckboxes(allCdns)
{
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
	
	return allCdns;
}

function disableAvailableCheckboxes(allCdns)
{
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

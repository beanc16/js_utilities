function getCdnObjVersions()
{
	// Create an empty CDN object
	let cdnObj = new Object();
	
	cdnObj = getCdnVersionsV0(cdnObj);
	
	return cdnObj;
}

function getCdnVersionsV0(cdnObj)
{
	// Version 0.2.2
	cdnObj["0.2.2"] = {
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
	
	// Version 0.1.1
	cdnObj["0.1.1"] = {
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
	cdnObj["0.0.1"] = {
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
	
	return cdnObj;
}

function getDropdownVersions()
{
	let cdnObj = getCdnVersionsV0(new Object());
	
	let versionsArray = Object.keys(cdnObj);
	
	return versionsArray;
}

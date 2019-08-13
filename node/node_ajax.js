/*************
 * NODE AJAX *
 *************/

/**
 * nodeGetRequest
 * Summary. Send an ajax request in Node.js.
 * @param {string}   url
 * @param {function} successFunction
 */
function nodeGetRequest(url, successFunction)
{
	// End the function if there's no url
	if (url == null)
	{
		//throw "Invalid URL parameter in nodePostRequest";
		return;
	}
	
	
	// Send the ajax request
	$.ajax({
		type: "GET",
		url: url,
		success: (result) => successFunction(result)
	});
}

/**
 * nodePostRequest
 * Summary. Send an ajax request in Node.js.
 * @param {string}   url
 * @param {function} successFunction
 */
function nodePostRequest(url, dataKey, data, successFunction) 
{
	// End the function if there's no url
	if (url == null)
	{
		//throw "Invalid URL parameter in nodePostRequest";
		return;
	}
	
	
	// Convert the data to JSON
	let data = JSON.stringify({ data });
	
	// Set the data key if it's empty
	if (dataKey == null)
	{
		dataKey = "data";
	}
	
	
	// Send the ajax request
    $.ajax({
		type: "POST",
		url: url,
		data: { dataKey: data },
		success: (returnData) => successFunction(returnData),
		dataType: "json"
	});
}

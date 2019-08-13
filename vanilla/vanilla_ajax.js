/********
 * AJAX *
 ********/

/**
 * sendAjaxRequest
 * Summary. Send an ajax get or post request with the given parameters.
 * @param {string}   data
 * @param {string}   requestType
 * @param {string}   url
 * @param {function} successCallback
 */
function sendAjaxRequest(data, requestType, url, successCallback)
{
    // Declare xhttp object
    let xhttp = new XMLHttpRequest();

    // When xhttp ready state changes
    xhttp.onreadystatechange = function ()
    {
        // Page is ready to load and status is okay
        if (this.readyState === 4 && this.status === 200)
        {
            // Run successCallback w/ the xhttp passed as a parameter
            successCallback(this);
        }
    };


    // requestType is GET
    if (requestType.toLowerCase() === "get")
    {
        _sendGetRequest(xhttp, data, requestType, url);
    }

    // requestType is POST
    else if (requestType.toLowerCase() === "post")
    {
        _sendPostRequest(xhttp, data, requestType, url);
    }
}

/**
 * _sendGetRequest
 * Description. A helper function for sendAjaxRequest(). It's highly 
 * 				recommended that you don't call this function in your 
 * 				code.
 * @param xhttp
 * @param {string} data
 * @param {string} requestType
 * @param {string} url
 */
function _sendGetRequest(xhttp, data, requestType, url)
{
	// There IS data
	if (data)
	{
		// Get the query string from the data
		let query = new URLSearchParams(data).toString();

		// Open the xhttp object with GET
		xhttp.open(requestType, url + "?" + query, true);

		// Send the xhttp object
		xhttp.send();
	}

	// There IS NO data
	else
	{
		// Open the xhttp object with GET
		xhttp.open(requestType, url, true);

		// Send the xhttp object
		xhttp.send();
	}
}

/**
 * _sendPostRequest
 * Description. A helper function for sendAjaxRequest(). It's highly 
 * 				recommended that you don't call this function in your 
 * 				code.
 * @param xhttp
 * @param {string} data
 * @param {string} requestType
 * @param {string} url
 */
function _sendPostRequest(xhttp, data, requestType, url)
{
	// Open the xhttp object with POST
	xhttp.open(requestType, url, true);

	// Send the xhttp object w/ the data
	xhttp.send(data);
}

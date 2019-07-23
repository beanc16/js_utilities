/**
 * sendAjaxRequest
 * @param {String} data
 * @param {String} requestType
 * @param {String} url
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
        sendGetRequest(xhttp, data, requestType, url);
    }

    // requestType is POST
    else if (requestType.toLowerCase() === "post")
    {
        sendPostRequest(xhttp, data, requestType, url);
    }
}

/**
 * sendGetRequest
 * @param xhttp
 * @param {String} data
 * @param {String} requestType
 * @param {String} url
 */
function sendGetRequest(xhttp, data, requestType, url)
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
 * sendPostRequest
 * @param xhttp
 * @param {String} data
 * @param {String} requestType
 * @param {String} url
 */
function sendPostRequest(xhttp, data, requestType, url)
{
	// Open the xhttp object with POST
	xhttp.open(requestType, url, true);

	// Send the xhttp object w/ the data
	xhttp.send(data);
}

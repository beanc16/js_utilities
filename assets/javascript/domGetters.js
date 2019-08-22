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

function getAnchorElement(href, className, innerHTML)
{	
	let a = document.createElement("a");
	
	if (href != null)
	{
		a.href = href;
	}
	
	a.className = className;
	a.innerHTML = innerHTML;
	
	return a;
}

function getBrElement()
{
	return document.createElement("BR");
}
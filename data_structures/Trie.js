/*
 * What is a Trie?
 * A type of search tree used to store strings of words.
 */

class Trie
{	
	// Private
	#root;
	ALPHABET_SIZE = 26;
	
	constructor()
	{
		this.#root = new _TrieNode();
	}
	
	
	
	/*
	 * GETTERS
	 */
	
	getData(strToSearch)
	{
		let curLetter;
		let curNode = this.#root;
		
		// Loop over strToSearch one letter at a time
		for (let i = 0; i < strToSearch.length; i++)
        {
            curLetter = strToSearch[i];
			
			// There IS NOT a child with that letter
            if (curNode.children[curLetter] == null)
			{
                return null;
			}
			
			// There IS a child with that letter
            curNode = curNode.children[curLetter];
        }
		
		// The final word was a leaf node
		if (curNode != null && curNode.isEndOfWord)
		{
			return curNode.data;
		}
	}
	
	getAllMatchingWords(wordsArray)
	{
		let matchingWords = [];
		
		for (let i = 0; i < wordsArray.length; i++)
		{
			if (this.hasWord(wordsArray[i]))
			{
				matchingWords.push(wordsArray[i]);
			}
		}
		
		return matchingWords;
	}
	
	getAllUnmatchingWords(wordsArray)
	{
		let unmatchingWords = [];
		
		for (let i = 0; i < wordsArray.length; i++)
		{
			if (this.hasWord(wordsArray[i]))
			{
				unmatchingWords.push(wordsArray[i]);
			}
		}
		
		return unmatchingWords;
	}
	
	
	
	/*
	 * INSERTING
	 */
	
	insert(str, data)
	{
		let curLetter;
		let curNode = this.#root;
		
		for (let i = 0; i < str.length; i++)
		{
            curLetter = str[i].toLowerCase();
			
			// Create a node if there are currently no children with that letter
            if (curNode.children[curLetter] == null)
			{
				curNode.children[curLetter] = new _TrieNode();
			}
			
			// Crawl to the next letter in the tree
            curNode = curNode.children[curLetter]; 
		}
		
		// Mark last node as a leaf with data
		curNode.isEndOfWord = true;
		curNode.data = data;
	}
	
	appendPropertyToData(str, propertyKey, propertyValue)
	{
		let curLetter;
		let curNode = this.#root;
		
		for (let i = 0; i < str.length; i++)
		{
            curLetter = str[i].toLowerCase();
			
			// Create a node if there are currently no children with that letter
            if (curNode.children[curLetter] == null)
			{
				curNode.children[curLetter] = new _TrieNode();
			}
			
			// Crawl to the next letter in the tree
            curNode = pCrawl.children[curLetter]; 
		}
		
		// Mark last node as a leaf with data
		curNode.isEndOfWord = true;
		
		// Append data
		if (curNode.data == null)
		{
			curNode.data = {};
		}
		
		// Make the data an array if it already exists (so it doesn't overwrite existing data)
		if (curNode.data[propertyKey] != null)
		{
			curNode.data[propertyKey] = this._mergeArrays([curNode.data[propertyKey], propertyValue]);
		}
		
		else
		{
			curNode.data[propertyKey] = propertyValue;
		}
	}
	
	_mergeArrays(arrayOfArrays)
	{
		return [].concat.apply([], arrayOfArrays);
	}
	
	
	
	/*
	 * BOOLEAN
	 */
	
	hasWord(str)
	{
		let curLetter;
		let curNode = this.#root;
		
		for (let i = 0; i < str.length; i++)
        {
            curLetter = str[i];
			
			// There are currently no children with that letter
            if (curNode.children[curLetter] == null)
			{
                return false;
			}
			
            curNode = curNode.children[curLetter];
        }
		
		// The final word was a leaf node
        return (curNode != null && curNode.isEndOfWord);
	}
}

class _TrieNode
{
	constructor()
	{
		this.children = [];
		this.isEndOfWord = false;
		this.data = null;				// Can store data about a word/letter
		
		/*
		 * Initialize this.children such that:
		 * Key = Letter (A, B, C, ..., Z)
		 * Value = null
		 */
		for (let i = 0; i < this.ALPHABET_SIZE; i++)
		{
			// Get i as a letter and set that as the key
			let currentLetter = (i + 10).toString(36);
			this.children[currentLetter] = null;
		}
	}
}

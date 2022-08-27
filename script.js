
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newquoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show New Quote

function newQuote() {

    loading();
    //Pick a randow quotes from vector of strings
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // console.log(quote);

    //check if Author field is NULL then replace it with 'UnKnown'

    if (!quote.author)
        authorText.textContent = 'Unknown';
    else
        authorText.textContent = quote.author;

    //check Quote length to determine styling
    if (quote.text.length > 120)
        quoteText.classList.add('long-quote');
    else
        quoteText.classList.remove('long-quote');
    //Set Quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}

//Get Quotes from API

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // alert(random error /UI) -> on websites
        //Catch Error Here
    }
}

//Tweet a Quote
function tweetQuote() {
    // template string uses `` not ''.
    // why this ? : it allows us to pass a variable and convert them into string
    const twitterUrl = `https://twitter.com/intent/tweet?text = ${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newquoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
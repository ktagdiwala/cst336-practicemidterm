// event listeners
document.addEventListener("DOMContentLoaded", () => loadInfo());
document.querySelector("#displayInfo").addEventListener("click", displayAuthorInfo);
document.querySelector("#translate").addEventListener("click", translate);
document.querySelector("#getQuotes").addEventListener("click", getQuotes);

languagesChoices();

// global variables
let data;

// functions

function languagesChoices(){
    let languageArray = ["Esperanto", "English", "Spanish", "French"];

    // Randomizes the option order
    languageArray = _.shuffle(languageArray);
    for (let i = 0; i < languageArray.length; i++){
        document.querySelector("#languages").innerHTML += `<input type="radio" name="language" id= "${languageArray[i]}" 
        value="${languageArray[i].slice(0,2)}"> <label for="${languageArray[i]}"> ${languageArray[i]} </label>`
    }
}//languageChoices

// Displaying the list of all country names from Web API
async function loadInfo(){
    let url = `https://webspace.csumb.edu/~lara4594/ajax/quotes/getRandomQuote.php`;
    let response = await fetch(url);
    data = await response.json();
    console.log(data);
    let quote = document.querySelector("#quote");
    let author = document.querySelector("#author");

    quote.innerHTML = data.quoteText;
    author.innerHTML = `- ${data.firstName} ${data.lastName}`;

    let picURL = `https://api.unsplash.com/photos/random/?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e&featured=true&query=flowers`;
    response = await fetch(picURL);
    picData= await response.json();
    let piclink = picData.urls.raw;
    console.log(piclink);
    document.querySelector("body").style.backgroundImage = `url(${piclink})`;
}

async function displayAuthorInfo() {
    let authorInfo = document.querySelector("#authorInfo");
    let authorPic = document.querySelector("#authorPic");
    authorInfo.innerHTML = data.bio;
    authorPic.src = data.picture;
    authorPic.alt = data.lastName;
}

async function translate(){
    let language = document.querySelector("input[name=language]:checked") ? document.querySelector("input[name=language]:checked").value : "";
    if(language!=""){
        document.querySelector("#languagesfb").innerHTML = "";
        let flag = document.querySelector("#flag");
        flag.src = `img/${language}.png`;
        // flag.alt = language;
        let url = `https://webspace.csumb.edu/~lara4594/ajax/quotes/translateQuote.php?lang=${language}&quoteId=${data.quoteId}`;
        let response = await fetch(url);
        let translation = await response.json();
        let quote = document.querySelector("#quote");
        quote.innerHTML = translation.translation;
    }else{
        document.querySelector("#languagesfb").innerHTML = "You must select a language to translate.";
        document.querySelector("#languagesfb").style.color = "red";
    }
}

async function getQuotes(){
    let numQuotes = document.querySelector("#numQuotes").value;
    if(numQuotes=="" || numQuotes<1 || numQuotes >5){
        document.querySelector("#quotesfb").innerHTML = "Please enter a valid number between 1 and 5.";
        document.querySelector("#quotesfb").style.color = "red";
    }else{
        let quoteList = document.querySelector("#quoteList");
        quoteList.innerHTML = "";
        document.querySelector("#quotesfb").innerHTML = "";
        let url = `https://csumb.space/api/famousQuotes/getQuotes.php?n=${numQuotes}`;
        let response = await fetch(url);
        let quotes = await response.json();

        for(let i = 0; i<quotes.length; i++){
            quoteList.innerHTML += `<div><p>${quotes[i].quoteText}</p><h3>- ${quotes[i].firstName} ${quotes[i].lastName}</h3></div>`;
        }
    }
}
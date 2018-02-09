const searchBtn = document.querySelector("#search");
const randBtn = document.querySelector("#random");
const searchField = document.querySelector(".searchField");
const results = document.querySelector(".results");


// If Search Button is clicked, search for items based on user input.
searchBtn.addEventListener("click", () => {
    let query = searchField.value;
    let url = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=" + query + "&format=json";
    // Check if results is empty, if not, reset form to avoid appending different search results onto eachother.
    if (results.innerHTML != '') {
        results.innerHTML = '';
    }
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updatePage)
    .catch(printError)
})
// if Enter is pressed, submit search.
window.onkeypress = (event) => {
    if (event.keyCode == 13) {
        searchBtn.click();
    };
};


function handleErrors(res) {
    if (!res.ok) {
        console.log(res);
        throw Error(res.status);
    }
    return res;
}

function parseJSON(res) {
    return res.json().then((parsedData) => {
        return parsedData;
    });
};

function updatePage(data) {
    for (let i = 0; i < data[1].length; i++) {
        results.innerHTML += "<div class='container'><a href='"+ data[3][i] +"'><h3 class='title'>" + data[1][i] + "</h3></a><p class='description'>" + data[2][i] + "</p></div>";
    }
}

function printError(error) {
    console.log(error);
}


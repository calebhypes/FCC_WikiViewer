const searchBtn = document.querySelector("#search");
const randBtn = document.querySelector("#random");
const searchField = document.querySelector(".searchField");
const results = document.querySelector(".results");

searchBtn.addEventListener("click", () => {
    console.log('clicked');
    let query = searchField.value;
    let url = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=" + query + "&format=json";
    console.log('URL: ' + url);
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updatePage)
    .catch(printError)
    // log results
})

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

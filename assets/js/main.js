const searchBtn = document.querySelector("#search");
const randBtn = document.querySelector("#random");
const searchField = document.querySelector(".searchField");

searchBtn.addEventListener("click", () => {
    console.log('clicked');
    let query = searchField.value;
    let url = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=" + query + "&format=json";
    console.log('URL: ' + url);
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
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
    console.log('parseJSON Response: ' + res)
    return res.json().then((parsedData) => {
        // return parsedData;
        console.log(parsedData);
    });
};

// function parseData(res) {
//     console.log(res);
// }

function printError(error) {
    console.log(error);
}

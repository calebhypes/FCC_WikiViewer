const searchBtn = document.querySelector("#search");
const randBtn = document.querySelector("#random");
const searchField = document.querySelector(".searchField");

searchBtn.addEventListener("click", () => {
    let query = searchField.value;
    let url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + query + "&format=json&callback=?";
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .catch((error) => {
        console.log(error)
    })
    // log results
})

function handleErrors(res) {
    if (!res.ok) {
        throw Error(res.status);
    }
    return res;
}

function parseJSON(res) {
    return res.json().then((parsedData) => {
        // return parsedData;
        console.log(parsedData);
    });
};

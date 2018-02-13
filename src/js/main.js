const searchBtn = document.querySelector("#search");
const randBtn = document.querySelector("#random");
const searchField = document.querySelector(".searchField");
const results = document.querySelector(".results");
const pageCtrl  = document.querySelector(".pagination")
const pageCount = document.querySelector(".pageCount");
const backBtn = document.querySelector('.back');
const nextBtn = document.querySelector('.next');
const logo = document.querySelector('h1');
let currentPage = 1;
const resPerPage = 10;
let dataObj = [];



backBtn.addEventListener("click", prevPage);

nextBtn.addEventListener("click", nextPage);

// If Search Button is clicked, search for items based on user input.
searchBtn.addEventListener("click", () => {
    logo.classList.remove("logo");
    let query = searchField.value;
    let url = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=" + query + "&limit=100&format=json";
    // Check if results is empty, if not, reset form to avoid appending different search results onto eachother.
    if (results.innerHTML != '' || dataObj != []) {
        results.innerHTML = '';
        dataObj = [];
    }
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(gatherResults)
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

// function updatePage(data) {
//     for (let i = 0; i < data[1].length; i++) {
//         results.innerHTML += "<div class='container'><a href='"+ data[3][i] +"'><h3 class='title'>" + data[1][i] + "</h3></a><p class='hyperlink'>" + data[3][i] + "</p><p class='description'>" + data[2][i] + "</p></div>";
//     }
// }

// This function gathers all results and organizes it within a JSON object.
function gatherResults(data) {
    for (let i = 0; i < data[1].length; i++) {
        dataObj.push({
            "title": data[1][i],
            "link": data[3][i],
            "description": data[2][i]
        });
    }
    console.log(dataObj);
    pageCtrl.style.display = "flex";
    turnPage(1);
}

function printError(error) {
    console.log(error);
}

// Pagination setup
function prevPage() {
    if (currentPage > 1) {
        console.log("Current Page: " + currentPage);
        currentPage--;
        console.log("New Page: " + currentPage);
        turnPage(currentPage, "back");
        window.scrollTo(0,0);
    }
}

function nextPage() {
    if (currentPage < 10) {
        console.log("Current Page: " + currentPage);
        currentPage++;
        console.log("New Page: " + currentPage);
        turnPage(currentPage, "next");
        window.scrollTo(0,0);
    }
}

function turnPage(page, func) {
    console.log("Turn to page: " + page + "as requested by " + func)
    if (page < 1) {
        page = 1;
    }
    if (page > 10) {
        page = 10;
    }

    results.innerHTML = "";

    for (let i = (page - 1) * resPerPage; i < (page * resPerPage) && i < dataObj.length; i++) {
        results.innerHTML += "<div class='container'><a href='"+ dataObj[i].link +"'><h3 class='title'>" + dataObj[i].title + "</h3></a><p class='hyperlink'>" + dataObj[i].link  + "</p><p class='description'>" + dataObj[i].description + "</p></div>"
    }

    pageCount.innerText = "Page " + page + " of 10";

    if (page == 1) {
        // back is hidden
        backBtn.disabled = true;
    } else {
        backBtn.disabled = false;
    }

    if (page == 10) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}
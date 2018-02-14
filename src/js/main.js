const searchBtn     = document.querySelector("#search");
const randBtn       = document.querySelector("#random");
const searchField   = document.querySelector(".searchField");
const results       = document.querySelector(".results");
const pageCtrl      = document.querySelector(".pagination")
const pageCount     = document.querySelector(".pageCount");
const backBtn       = document.querySelector('.back');
const nextBtn       = document.querySelector('.next');
const logo          = document.querySelector('h1');
let currentPage     = 1;
const resPerPage    = 10;
let dataObj         = [];


// If Back paginate button is clicked, get previous page.
backBtn.addEventListener("click", prevPage);

// If Next paginate button is clicked, get next page.
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
    // AJAX call to wikipedia API
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

// if response is not OK, throw error status.
function handleErrors(res) {
    if (!res.ok) {
        console.log(res);
        throw Error(res.status);
    }
    return res;
}

// Parse response data as JSON
function parseJSON(res) {
    return res.json().then((parsedData) => {
        return parsedData;
    });
};

// This function gathers all results and organizes it within a JSON object.
function gatherResults(data) {
    for (let i = 0; i < data[1].length; i++) {
        dataObj.push({
            "title": data[1][i],
            "link": data[3][i],
            "description": data[2][i]
        });
    }
    // unhide the pagination controls and ensure page is set to 1.
    pageCtrl.style.display = "flex";
    turnPage(1);
}

// if error, log error to console.
function printError(error) {
    console.log(error);
}

// Pagination setup

// get previous page
function prevPage() {
    // if current page is greater than one, then remove 1 from current page count and get that page. Also, ensure the browser window is back at the top of the page for the new results.
    if (currentPage > 1) {
        currentPage--;
        turnPage(currentPage);
        window.scrollTo(0,0);
    }
}

// get next page
function nextPage() {
    // if current page is less than 10, then add 1 to current page count and get that page. Also, ensure the browser window is back at the top of the page for the new results.
    if (currentPage < 10) {
        currentPage++;
        turnPage(currentPage);
        window.scrollTo(0,0);
    }
}

// get selected page data
function turnPage(page) {
    // if page is less than one, force page to 1.
    if (page < 1) {
        page = 1;
    }
    // if page is greater than 10, force page to 10.
    if (page > 10) {
        page = 10;
    }

    // ensure that results aren't appended to other page data by clearing the results div.
    results.innerHTML = "";

    // iterate through the data based on current page and items per page. Display the proper items based on current page.
    for (let i = (page - 1) * resPerPage; i < (page * resPerPage) && i < dataObj.length; i++) {
        results.innerHTML += "<div class='container'><a href='"+ dataObj[i].link +"'><h3 class='title'>" + dataObj[i].title + "</h3></a><p class='hyperlink'>" + dataObj[i].link  + "</p><p class='description'>" + dataObj[i].description + "</p></div>"
    }
    // update the page count within the pagination controls
    pageCount.innerText = "Page " + page + " of 10";

    // if page is 1, ensure the back button is disabled, otherwise enable the back button.
    if (page == 1) {
        backBtn.disabled = true;
    } else {
        backBtn.disabled = false;
    }

    // if page is 10, ensure the next button is disabled, otherwise enable the next button.
    if (page == 10) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}
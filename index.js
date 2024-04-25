const APIKey = "87dc281b";
const movieInfo = document.getElementById("movie__info");

const getMovie = () => {
    const movieName = document.getElementById("movie-name");
    const movieNameVal = movieName.value;

    if (!movieNameVal) {
        alert('Xais olunur film giresiniz yoxsa mesuliyyete celb olunacaqsiniz');
        return;
    }

    fetch(`https://www.omdbapi.com/?t=${movieNameVal}&apikey=${APIKey}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                handleError();
            }
        })
        .then(data => {
            if (data.Response === "True") {
                renderMovieInfo(data);
            } else {
                movieInfo.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ala errorrrr');
        });
};

const renderMovieInfo = (data) => {
    movieInfo.innerHTML = `
        <div class="info d-flex gap-4 mt-5">
            <img  height='400px' src="${data.Poster}" class="poster">
            <div class='d-flex gap-2 flex-column'>
                <h2>${data.Title}</h2>
                <div class="rating d-flex align-items-center justify-content-center mb-4 gap-2">
                    <i style="color: #ffb02a" class="fa-solid fa-star mb-2"></i>
                    <h4>${data.imdbRating}</h4>
                </div>
                <div class="info__time d-flex gap-4">
                    <span>${data.Rated}</span>
                    <span>${data.Year}</span>
                    <span>${data.Runtime}</span>
                </div>
                <div class="genre justify-content-center d-flex gap-2  px-1">
                    <div class=" d-flex gap-2  px-1">${data.Genre.split(",").join("</div><div>")}</div>
                </div>
            </div>
        </div>
        <h3>Plot:</h3>
        <p>${data.Plot}</p>
        <h3>Cast:</h3>
        <p>${data.Actors}</p>
    `;
};

const handleError = () => {
    console.error('Errrorrrrr');
    alert('Erroorrrrrr');
};


const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", getMovie);


const movieName = document.getElementById("movie-name");
movieName.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        getMovie();
    }
});


getMovie();






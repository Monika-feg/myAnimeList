const base_url = "https://api.jikan.moe/v4/anime";
let animeInfo = document.getElementById("animeInfo")


function searchAnime(event){


    event.preventDefault();

    const form = new FormData(this);
    const query = form.get('search');

    console.log(query);

    const searchUrl = `${base_url}?q=${query}`;
    

    fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        showDetails(data);
    })


   
}


function pageLoded(){
   const form = document.getElementById('search_from');
   form.addEventListener('submit', searchAnime);


}

function showDetails(data) {
    const animeInfo = document.getElementById('animeInfo');
    animeInfo.innerHTML = ''; // Rensa tidigare innehåll

    // Skapa HTML-struktur för varje anime
    animeInfo.innerHTML = data.data
        .sort((a,b)=> a.popularity- b.popularity)
        .map(anime => {
            return `
            <div class="card">
                <div class="card-image">
                    <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                </div>
                <span class="card-title">${anime.title}</span>
                <div class="card-content">
                
                    <label>Episodes:</label><h4>${anime.episodes}</h4>
                    <label>Description:</label>
                    <p>${anime.synopsis}</p>
                    <label>Popularity:</label>
                    <h4>${anime.popularity}</h4>
                </div>
                <div class="card-action">
                    <iframe width="100%" height="200" src="${anime.trailer.embed_url}" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="card-action">
                    <a href="${anime.url}" target="_blank">Find More</a>
                </div>
            </div>
            `;
        }).join(''); // Slå samman alla kort till en sträng och lägg till i animeInfo
}


document.addEventListener('DOMContentLoaded', pageLoded);




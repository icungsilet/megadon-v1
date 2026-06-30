const API_KEY = "ISI_API_TMDB_KAMU";
const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";

/* MENU */
function toggleMenu(){
    document.getElementById("menu").classList.toggle("active");
}

/* HOME */
function goHome(){
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* FETCH DATA */
async function fetchData(url){
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
}

/* RENDER */
function render(data){
    const app = document.getElementById("app");
    app.innerHTML = "";

    data.forEach(item => {
        app.innerHTML += `
            <div class="card">
                <img src="${IMG + item.poster_path}">
                <h3>${item.title || item.name}</h3>
            </div>
        `;
    });
}

/* LOADERS */
async function loadPopular(){
    const data = await fetchData(`${BASE}/movie/popular?api_key=${API_KEY}`);
    render(data);
}

async function loadTopRated(){
    const data = await fetchData(`${BASE}/movie/top_rated?api_key=${API_KEY}`);
    render(data);
}

async function loadTrending(){
    const data = await fetchData(`${BASE}/trending/all/day?api_key=${API_KEY}`);
    render(data);
}

/* SEARCH */
async function searchMovie(){
    const q = document.getElementById("searchInput").value;

    if(!q) return alert("Isi dulu!");

    const data = await fetchData(`${BASE}/search/multi?api_key=${API_KEY}&query=${q}`);
    render(data);
}

/* ENTER SEARCH */
document.getElementById("searchInput").addEventListener("keypress", function(e){
    if(e.key === "Enter") searchMovie();
});

/* AUTO LOAD */
loadPopular();

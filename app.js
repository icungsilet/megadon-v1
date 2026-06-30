const BASE = "https://vxz.megadon8787.workers.dev";
const IMG = "https://image.tmdb.org/t/p/w500";

/* MENU */
function toggleMenu(){
    document.getElementById("menu").classList.toggle("active");
}

/* HOME */
function goHome(){
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* FETCH DATA (LEWAT WORKER) */
async function fetchData(endpoint){
    try{
        const res = await fetch(`${BASE}${endpoint}`);
        const data = await res.json();
        return data.results || [];
    }catch(e){
        console.error("API ERROR:", e);
        return [];
    }
}

/* RENDER */
function render(data){
    const app = document.getElementById("app");
    app.innerHTML = "";

    if(!data.length){
        app.innerHTML = "<p>No data found</p>";
        return;
    }

    data.forEach(item => {
        app.innerHTML += `
            <div class="card">
                <img src="${IMG + item.poster_path}" loading="lazy">
                <h3>${item.title || item.name}</h3>
            </div>
        `;
    });
}

/* LOADERS */
async function loadPopular(){
    const data = await fetchData("/movie/popular");
    render(data);
}

async function loadTopRated(){
    const data = await fetchData("/movie/top_rated");
    render(data);
}

async function loadTrending(){
    const data = await fetchData("/trending/all/day");
    render(data);
}

/* SEARCH */
async function searchMovie(){
    const q = document.getElementById("searchInput").value;

    if(!q) return alert("Isi dulu!");

    const data = await fetchData(`/search/multi?query=${encodeURIComponent(q)}`);
    render(data);
}

/* ENTER SEARCH */
document.getElementById("searchInput").addEventListener("keypress", function(e){
    if(e.key === "Enter") searchMovie();
});

/* AUTO LOAD */
loadPopular();

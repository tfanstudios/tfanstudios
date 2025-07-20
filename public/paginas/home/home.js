import TelaObject from "../../../componentes/objetos/tela.object.js";

const Home = new TelaObject("Tfan Studios | Jogos Online e Quadrinhos", "home", true);

let pagina = document.createElement("div");
pagina.id = "home-pagina";
pagina.className = "container-fluid text-dark py-3 my-2 flex-wrap d-flex align-items-center justify-content-center";

let url = window.location.href + "public/paginas/jogos/jogos.json";
fetch(url).then(data => { return data.json(); })
.then(jogos => {
    jogos.forEach(jogo => {
        let item = document.createElement("img");
        item.classList.add("img-fluid");
        if(!jogo.anuncio) item.classList.add("item-home");
        else item.classList.add("item-home-ad");
        item.src = jogo.img;
        item.alt = jogo.nome;
        item.addEventListener("click", () => {
            // console.log(jogo.page)
            Home.Redirecionar(jogo.page);
        });
        pagina.appendChild(item);
    });
})
.catch(error => {
    console.error("Erro ao carregar os jogos:", error);
});

Home.CriarConteudo(pagina, true);


let script = document.createElement("script");
script.id = "home-script";
Home.SetScript(script);

export default Home;
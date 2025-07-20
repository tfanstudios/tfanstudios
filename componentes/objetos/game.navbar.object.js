export default class GameNavbar{
    constructor(nome){
        this.nome = nome;
        // this.script = document.createElement("script");
    }

    Render(appHtml){
        let pagina = document.createElement("div");
        pagina.id = "home-pagina";
        pagina.className = "container-fluid text-dark py-3 my-2 flex-wrap d-flex align-items-center justify-content-center";

        let btnVoltar = document.createElement("div");
        btnVoltar.id = "btn-voltar";
        btnVoltar.className = "btn-game-item";
        btnVoltar.addEventListener("click", () => {
            window.location.href = "/";
        });

        pagina.appendChild(btnVoltar);

        appHtml.appendChild(pagina);
        // console.log(this.script);
    }
}
import GameNavbar from "./game.navbar.object.js";
import TelaQuiz from "./tela.quiz.js";

let menu = new TelaQuiz("Menu", true);
let perguntas = new TelaQuiz("Perguntas");

export default class Quiz{
    constructor(nome="Quiz", {canvas, context}){
        this.nome = nome;
        this.grafic = {
            canvas,
            ctx: context
        }
        this.telas = [menu, perguntas];
    }

    Start(){
        this.Update();   
    }

    Update(){
        console.log(this)
        this.grafic.ctx.clearRect(0, 0, this.grafic.canvas.width, this.grafic.canvas.height);
        this.telas.forEach(tela => {
            if(tela.ativa){
                console.log(tela)
                tela.Render();
            }
        });

        requestAnimationFrame(this.Update);
    }
}
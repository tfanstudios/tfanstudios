import TelaObject from "../../../componentes/objetos/tela.object.js";
import Quiz from "../../../componentes/objetos/quiz.object.js";

const QuizRisadas = new TelaObject("Tfan Studios | Quiz de Risadas", "jogo_interno", true);
QuizRisadas.SetTela(document.getElementById("app-tfan"));

const canvas = document.createElement("canvas");
canvas.id = "canvas-quiz";
canvas.className = "quiz-canvas";
canvas.width = 700;
canvas.height = 500;

const page = document.createElement("div");
page.id = "quiz-risadas-page";

page.innerHTML = `
  <div class="container d-flex align-items-center justify-content-between flex-column">
    <div class="w-100 box-game-info bg bg-dark text d-flex justify-content-center">
      <div id="btn-voltar" class="btn-game-item">
        <i class="bi bi-arrow-left"></i>
      </div>
      <h1 class="w-50 text-center text-light">Quiz de Risadas</h1>
      <div id="game-page-btns" class="btns d-flex justify-content-center">
        <div class="btn-game-item">
          <i class="bi bi-card-text"></i>
        </div>
        <div id="unity-fullscreen-button">
          <i class="bi bi-arrows-fullscreen"></i>
        </div>
        <div id="btn-sound" class="btn-game-item">
          <i class="bi bi-music-note-beamed"></i>
        </div>
      </div>
    </div>
  </div>
`;

let box = document.createElement("div");
box.className = "container d-flex align-items-center justify-content-between flex-column";
box.appendChild(canvas);
page.appendChild(box);

QuizRisadas.CriarConteudo(page);

const quiz = new Quiz("Quiz de Risadas", {
  canvas: canvas,
  context: canvas.getContext("2d"),
});

// Configurar a tela de menu
let menu = quiz.telas[0];
menu.Configurar = () => {
  // Aqui você pode adicionar lógica específica para configurar o menu, como botões, eventos, etc.
  menu.config = {
    backgroundColor: "#1E90FF",
    boxTitle: {
      cor: "#0000CD",
      x: 10,
      y: 10,
      width: quiz.grafic.canvas.width - 20,
      height: 80,
      title: "Quiz de Risadas de One Piece!",
      font: "25px Arial",
      fx: quiz.grafic.canvas.width / 2 - 150,
      fy: 60,
    },
    botoes: [
      {
        id: "btn-iniciar",
        text: "Começar",
        x: quiz.grafic.canvas.width / 2 - 100,
        y: quiz.grafic.canvas.height - 170,
        width: 200,
        height: 50,
        fx: 60,
        fy: 30,
        font: "20px Arial",
        color: "#FFFFFF",
        backgroundColor: "#0000CD",
        onClick: () => {
          quiz.telas[1].ativa = true;
          menu.ativa = false;
        }
      },
      {
        id: "btn-sair",
        text: "Sair",
        x: quiz.grafic.canvas.width / 2 - 100,
        y: quiz.grafic.canvas.height - 100,
        width: 200,
        height: 50,
        font: "20px Arial",
        color: "#FFFFFF",
        fx: 80,
        fy: 30,
        backgroundColor: "#0000CD",
        onClick: () => {
          window.location.href = "/";
        }
      }
    ]
  }
}

menu.Configurar();

menu.Render = () => {
  quiz.grafic.ctx.fillStyle = menu.config.backgroundColor;
  quiz.grafic.ctx.fillRect(0, 0, quiz.grafic.canvas.width, quiz.grafic.canvas.height);
  let boxTitle = menu.config.boxTitle;
  quiz.grafic.ctx.fillStyle = boxTitle.cor;
  quiz.grafic.ctx.fillRect(boxTitle.x, boxTitle.y, boxTitle.width, boxTitle.height);
  quiz.grafic.ctx.fillStyle = "white";
  quiz.grafic.ctx.font = boxTitle.font;
  quiz.grafic.ctx.fillText(boxTitle.title, boxTitle.fx, boxTitle.fy);
  menu.config.botoes.forEach(btn => {
    quiz.grafic.ctx.fillStyle = btn.backgroundColor;
    quiz.grafic.ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
    quiz.grafic.ctx.fillStyle = btn.color;
    quiz.grafic.ctx.font = btn.font;
    quiz.grafic.ctx.fillText(btn.text, btn.x + btn.fx, btn.y + btn.fy);

    // Adiciona evento de clique
    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x >= btn.x && x <= btn.x + btn.width && y >= btn.y && y <= btn.y + btn.height) {
        if (btn.onClick) {
          btn.onClick();
        }
      }
    });
  });
}

// Configurar a tela de perguntas
let perguntas = quiz.telas[1];
perguntas.Configurar = () => {
  // Aqui você pode adicionar lógica específica para configurar as perguntas, como carregar dados, etc.
  perguntas.config = {
    backgroundColor: "#1E90FF",
    boxTitle: {
      cor: "#0000CD",
      x: 10,
      y: 10,
      width: quiz.grafic.canvas.width - 20,
      height: 80,
      title: "Perguntas do Quiz de Risadas",
      font: "25px Arial",
      fx: quiz.grafic.canvas.width / 2 - 150,
      fy: 60,
    },
    perguntas: [
      {
        pergunta: "Qual é a risada mais famosa do Luffy?",
        opcoes: ["Haha", "Hehe", "Hahaha", "Hihihi"],
        respostaCorreta: 2
      },
      // Adicione mais perguntas conforme necessário
    ]
  }
}

perguntas.Configurar();

perguntas.Render = () => {
  quiz.grafic.ctx.fillStyle = perguntas.config.backgroundColor;
  quiz.grafic.ctx.fillRect(0, 0, quiz.grafic.canvas.width, quiz.grafic.canvas.height);
  let boxTitle = perguntas.config.boxTitle;
  quiz.grafic.ctx.fillStyle = boxTitle.cor;
  quiz.grafic.ctx.fillRect(boxTitle.x, boxTitle.y, boxTitle.width, boxTitle.height);
  quiz.grafic.ctx.fillStyle = "white";
  quiz.grafic.ctx.font = boxTitle.font;
  quiz.grafic.ctx.fillText(boxTitle.title, boxTitle.fx, boxTitle.fy);
  perguntas.config.perguntas.forEach((pergunta, index) => {
    quiz.grafic.ctx.fillStyle = "black";
    quiz.grafic.ctx.font = "20px Arial";
    quiz.grafic.ctx.fillText(pergunta.pergunta, 20, 120 + index * 60);
    
    pergunta.opcoes.forEach((opcao, i) => {
      quiz.grafic.ctx.fillStyle = "#0000CD";
      quiz.grafic.ctx.fillRect(20, 150 + index * 60 + i * 30, 200, 25);
      quiz.grafic.ctx.fillStyle = "white";
      quiz.grafic.ctx.fillText(opcao, 30, 170 + index * 60 + i * 30);
      
      // Adiciona evento de clique
      canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x >= 20 && x <= 220 && y >= (150 + index * 60 + i * 30) && y <= (175 + index * 60 + i * 30)) {
          if (i === pergunta.respostaCorreta) {
            alert("Resposta correta!");
          } else {
            alert("Resposta errada!");
          }
        }
      });
    });
  });
}

quiz.Update = () => {
  quiz.grafic.ctx.clearRect(0, 0, quiz.grafic.canvas.width, quiz.grafic.canvas.height);
  quiz.telas.forEach(tela => {
    if (tela.ativa) {
      tela.Render();
    }
  });

  requestAnimationFrame(quiz.Update);
}

QuizRisadas.quiz = quiz;
QuizRisadas.isQuiz = true;


//Script para o Quiz de Risadas

let script = document.createElement("script");
script.id = "quiz-risadas-script";
script.text = `
const btnVoltar = document.getElementById("btn-voltar");
btnVoltar.addEventListener("click", () => {
  window.location.href = "/";
});
`;

QuizRisadas.SetScript(script);

export default QuizRisadas;
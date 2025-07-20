import TelaObject from "../../objetos/tela.object.js";

const LBSC = new TelaObject("Tfan Studios | Zombie Atack", "zombie-atack", false);

LBSC.CriarConteudo(
    `
    <div class="container d-flex align-items-center justify-content-between flex-column">
      <div class="w-100 box-game-info bg bg-dark tex d-flex justify-content-center">
        <div id="btn-voltar" class="btn-game-item">
          <i class="bi bi-arrow-left"></i>
        </div>
        <h1 class="w-50 text-center text-light">Little Ball Saves Christmas</h1>
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
      <div id="unity-container" class="unity-desktop">
        <canvas id="unity-canvas" width=350 height=200 tabindex="0"></canvas>
        <div id="unity-loading-bar">
          <div id="unity-logo"></div>
          <div id="unity-progress-bar-empty">
            <div id="unity-progress-bar-full"></div>
          </div>
        </div>
      </div>
    </div>
    `
);

let script = document.createElement("script");
script.id = "zombie-atack-script";
script.innerHTML = `
    var container = document.querySelector("#unity-container");
    var canvas = document.querySelector("#unity-canvas");
    var loadingBar = document.querySelector("#unity-loading-bar");
    var progressBarFull = document.querySelector("#unity-progress-bar-full");
    var fullscreenButton = document.querySelector("#unity-fullscreen-button");
    var warningBanner = document.querySelector("#unity-warning");
    var btnSound = document.querySelector("#btn-sound");
    var isMuted = true;
    var btnVoltar = document.querySelector("#btn-voltar");

    btnVoltar.addEventListener("click", () => {
      window.location.href = "/";
    })

    // Shows a temporary message banner/ribbon for a few seconds, or
    // a permanent error message on top of the canvas if type=='error'.
    // If type=='warning', a yellow highlight color is used.
    // Modify or remove this function to customize the visually presented
    // way that non-critical warnings and error messages are presented to the
    // user.
    function unityShowBanner(msg, type) {
      function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
      }
      var div = document.createElement('div');
      div.innerHTML = msg;
      warningBanner.appendChild(div);
      if (type == 'error') div.style = 'background: red; padding: 10px;';
      else {
        if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
        setTimeout(function() {
          warningBanner.removeChild(div);
          updateBannerVisibility();
        }, 5000);
      }
      updateBannerVisibility();
    }

    var buildUrl = "../../componentes/jogos/LBSC/Build";
    var loaderUrl = buildUrl + "/v-tfan-studios.loader.js";
    var config = {
      dataUrl: buildUrl + "/v-tfan-studios.data",
      frameworkUrl: buildUrl + "/v-tfan-studios.framework.js",
      codeUrl: buildUrl + "/v-tfan-studios.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "StefanLucas",
      productName: "Little ball saves Christmas",
      productVersion: "1.0",
      showBanner: unityShowBanner,
    };

    // By default, Unity keeps WebGL canvas render target size matched with
    // the DOM size of the canvas element (scaled by window.devicePixelRatio)
    // Set this to false if you want to decouple this synchronization from
    // happening inside the engine, and you would instead like to size up
    // the canvas DOM size and WebGL render target sizes yourself.
    // config.matchWebGLToCanvasSize = false;

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Mobile device style: fill the whole browser client area with the game canvas:

      var meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
      document.getElementsByTagName('head')[0].appendChild(meta);
      container.className = "unity-mobile";
      canvas.className = "unity-mobile";

      // To lower canvas resolution on mobile devices to gain some
      // performance, uncomment the following line:
      // config.devicePixelRatio = 1;

      // let btnFechar = document.createElement("div");
      // btnFechar.className = "btn-fechar";
      // btnFechar.textContent = "X";
      // btnFechar.addEventListener("click", () => {
      //   btnVoltar.click();
      // });
      // document.body.appendChild(btnFechar);

      fullscreenButton.click();

    } else {
      // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:

      canvas.style.width = "700px";
      canvas.style.height = "500px";
    }

    loadingBar.style.display = "block";

    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
            }).then((unityInstance) => {
              loadingBar.style.display = "none";
              fullscreenButton.onclick = () => {
                unityInstance.SetFullscreen(1);
              };
              btnSound.onclick = () => {
                isMuted = !isMuted;
                unityInstance.SendMessage("GameController", "SomControle");
                btnSound.classList.toggle("muted");
              };
            }).catch((message) => {
              alert(message);
            });
          };

    document.body.appendChild(script);
`;

LBSC.SetScript(script);

export default LBSC;


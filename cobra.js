// Jogo da Cobra (Snake Game)
// Autor: Jan Bodnar
// Adaptado por: Gilson Pereira
// Código fonte original: http://zetcode.com/javascript/snake/

// Declaração de variáveis e constantes

var tela;
var ctx;

var cabeca;
var maca;
var bola;

var pontos;
var score = 0;
var maca_x;
var maca_y;
var nivel = 1;

var paraEsquerda = false;
var paraDireita = true;
var paraCima = false;
var paraBaixo = false;
var noJogo = false;

const TAMANHO_PONTO = 10;
const ALEATORIO_MAXIMO = 29;
var ATRASO = 240;
//Definição da tela
const C_ALTURA = 550;
const C_LARGURA = 550;

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;
const TECLA_ABAIXO = 40;

//Teclas adicionais para movimento
const TECLA_W = 87;
const TECLA_A = 65;
const TECLA_S = 83;
const TECLA_D = 68;

var x = [];
var y = [];

onkeydown = verificarTecla; // Define função chamada ao se pressionar uma tecla

//iniciar(); // Chama função inicial do jogo


// Definição da velocidade da cobra/jogo.
function snake_speed() {
  speed = pontos * 10;
  if (speed < 200) {
    return ATRASO - speed;
  } else {
    return 40;
  }
}

//Registra os prontos do jogador. Chamada ao pontuar.
function player_score() {
  score = score + snake_speed();
  screenscore.innerText = `Score:${score}            Nivel:${nivel}`
  console.log(score);
}

function iniciar() {
  noJogo = true
  score = 0 
  nivel = 1 
  screenscore.innerText = `Score:${score}            Nivel:${nivel}`
  tela = document.getElementById("tela");
  //Tamanho da tela do jogo
  tela.width = C_LARGURA;
  tela.height = C_ALTURA;
  ctx = tela.getContext("2d");
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);
  carregarImagens();
  criarCobra();
  localizarMaca();
  setTimeout("cicloDeJogo()", ATRASO);
}

function carregarImagens() {
  cabeca = new Image();
  cabeca.src = "cabeca.png";

  bola = new Image();
  bola.src = "ponto.png";

  maca = new Image();
  maca.src = "maca.png";
}

function criarCobra() {
  pontos = 3;

  for (var z = 0; z < pontos; z++) {
    x[z] = 50 - z * TAMANHO_PONTO;
    y[z] = 50;
  }
}

function localizarMaca() {
  var r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
  maca_x = r * TAMANHO_PONTO;

  r = Math.floor(Math.random() * ALEATORIO_MAXIMO);
  maca_y = r * TAMANHO_PONTO;
}

function cicloDeJogo() {
  if (noJogo) {
    verificarMaca();
    verificarColisao();
    mover();
    fazerDesenho();
    setTimeout("cicloDeJogo()", snake_speed());
  }
}

function verificarMaca() {
  if (x[0] == maca_x && y[0] == maca_y) {
    pontos++;
    if(pontos%5==0)  {
      nivel++;
    }
    localizarMaca();
    player_score();
  }
}

function verificarColisao() {
  for (var z = pontos; z > 0; z--) {
    if (z > 4 && x[0] == x[z] && y[0] == y[z]) {
      noJogo = false;
    }
  }

  if (y[0] >= C_ALTURA) {
    noJogo = false;
  }

  if (y[0] < 0) {
    noJogo = false;
  }

  if (x[0] >= C_LARGURA) {
    noJogo = false;
  }

  if (x[0] < 0) {
    noJogo = false;
  }
}

function mover() {
  for (var z = pontos; z > 0; z--) {
    x[z] = x[z - 1];
    y[z] = y[z - 1];
  }

  if (paraEsquerda) {
    x[0] -= TAMANHO_PONTO;
  }

  if (paraDireita) {
    x[0] += TAMANHO_PONTO;
  }

  if (paraCima) {
    y[0] -= TAMANHO_PONTO;
  }

  if (paraBaixo) {
    y[0] += TAMANHO_PONTO;
  }
}

function fazerDesenho() {
  ctx.clearRect(0, 0, C_LARGURA, C_ALTURA);
  ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);

  if (noJogo) {
    ctx.drawImage(maca, maca_x, maca_y);

    for (var z = 0; z < pontos; z++) {
      if (z == 0) {
        ctx.drawImage(cabeca, x[z], y[z]);
      } else {
        ctx.drawImage(bola, x[z], y[z]);
      }
    }
  } else {
    fimDeJogo();
  }
}

function fimDeJogo() {
  tela.width = 150;
  tela.height = 150;
  ctx = tela.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 150, 150)
  ctx.fillStyle = "white";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = "normal bold 18px serif";
  ctx.fillText("Fim de Jogo", 150 / 2, 150 / 2);
  startbtn.style.display = "";  
  show_save.style.display ='';
}

function verificarTecla(e) {
  var tecla = e.keyCode;

  if ((tecla == TECLA_ESQUERDA || tecla == TECLA_A) && !paraDireita) {
    paraEsquerda = true;
    paraCima = false;
    paraBaixo = false;
  }

  if ((tecla == TECLA_DIREITA || tecla == TECLA_D) && !paraEsquerda) {
    paraDireita = true;
    paraCima = false;
    paraBaixo = false;
  }

  if ((tecla == TECLA_ACIMA || tecla == TECLA_W) && !paraBaixo) {
    paraCima = true;
    paraDireita = false;
    paraEsquerda = false;
  }

  if ((tecla == TECLA_ABAIXO || tecla == TECLA_S) && !paraCima) {
    paraBaixo = true;
    paraDireita = false;
    paraEsquerda = false;
  }
}


//Extras
const startbtn = document.getElementById("startbtn");
const music = document.getElementById("music");
const screencanvas = document.getElementById('tela');
const screenscore = document.getElementById('score');
const clickscore = document.getElementById('savescore')
const player_name = document.getElementById('name');
const rank = document.getElementById('rank')
const show_save = document.getElementById('fim')

//Save Score
clickscore.addEventListener("click",() => {
  show_save.style.display ='none';
  node=document.createElement('li')
  node.appendChild(document.createTextNode('Player:  '+player_name.value+'    Score: '+score))
  rank.appendChild(node)
  
})

//Evento da musica
startbtn.addEventListener("click", () => {
    //esconde o botão de play    
    iniciar()
    startbtn.style.display = "none";
    screencanvas.style.display = "";
    
    music.play().then(() => {});
  });


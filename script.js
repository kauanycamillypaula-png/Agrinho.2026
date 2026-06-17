
let player;
let sementes = [];
let poluicoes = [];
let pontuacao = 0;
let estado = "jogando";

function setup() {
  createCanvas(800, 500);

  player = {
    x: width / 2,
    y: height - 60,
    tamanho: 40
  };

  for (let i = 0; i < 8; i++) {
    sementes.push(criarSemente());
  }

  for (let i = 0; i < 5; i++) {
    poluicoes.push(criarPoluicao());
  }
}

function draw() {
  desenharCenario();

  if (estado === "jogando") {
    jogar();
  } else {
    telaVitoria();
  }
}

function jogar() {
  fill(50, 120, 255);
  rect(player.x, player.y, player.tamanho, player.tamanho, 8);

  moverJogador();

  fill(0);
  textSize(24);
  text("Sustentabilidade: " + pontuacao, 20, 35);

  // Sementes
  for (let i = sementes.length - 1; i >= 0; i--) {
    let s = sementes[i];

    fill(0, 200, 0);
    ellipse(s.x, s.y, 20);

    s.y += 3;

    if (colidiu(player, s, 10)) {
      pontuacao += 10;
      sementes[i] = criarSemente();
    }

    if (s.y > height) {
      sementes[i] = criarSemente();
    }
  }

  // Poluição
  for (let i = poluicoes.length - 1; i >= 0; i--) {
    let p = poluicoes[i];

    fill(120);
    rect(p.x, p.y, 25, 25);

    p.y += 4;

    if (colidiu(player, p, 15)) {
      pontuacao -= 5;
      poluicoes[i] = criarPoluicao();
    }

    if (p.y > height) {
      poluicoes[i] = criarPoluicao();
    }
  }

  if (pontuacao >= 100) {
    estado = "vitoria";
  }
}

function moverJogador() {
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= 6;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.x += 6;
  }

  player.x = constrain(player.x, 0, width - player.tamanho);
}

function criarSemente() {
  return {
    x: random(20, width - 20),
    y: random(-500, -20)
  };
}

function criarPoluicao() {
  return {
    x: random(20, width - 20),
    y: random(-500, -20)
  };
}

function colidiu(jogador, objeto, raio) {
  let d = dist(
    jogador.x + jogador.tamanho / 2,
    jogador.y + jogador.tamanho / 2,
    objeto.x,
    objeto.y
  );

  return d < jogador.tamanho / 2 + raio;
}

function desenharCenario() {
  background(135, 206, 235);

  // Sol
  fill(255, 220, 0);
  ellipse(700, 80, 80);

  // Campo
  fill(80, 180, 80);
  rect(0, height - 120, width, 120);

  // Árvores
  for (let x = 80; x < width; x += 150) {
    fill(120, 70, 20);
    rect(x, height - 180, 20, 60);

    fill(30, 150, 50);
    ellipse(x + 10, height - 190, 60);
  }

  fill(0);
  textSize(28);
  textAlign(CENTER);
  text("AGRO FORTE, FUTURO SUSTENTÁVEL", width / 2, 40);
  textAlign(LEFT);
}

function telaVitoria() {
  background(50, 180, 80);

  fill(255);
  textAlign(CENTER);
  textSize(40);
  text("🌱 Fazenda Sustentável!", width / 2, height / 2 - 40);

  textSize(24);
  text("Você alcançou 100 pontos!", width / 2, height / 2 + 10);

  text("O agro forte constrói um futuro melhor!", width / 2, height / 2 + 60);
}

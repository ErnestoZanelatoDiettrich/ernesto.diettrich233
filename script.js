const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const gameover = document.getElementById("gameover");
const pontuacaocontador = document.getElementById("pontuacaocontador");
let pontuacao = 0;
pontuacaocontador.innerText = pontuacao;
const peixe1 = {
  x: 800,
  y: Math.random() * 460,
  size: 20,
  speed: 2,
};
// Jogador
const player = {
  x: 50,
  y: 200,
  size: 40,
  speed: 5,
  dy: 0,
};

// Movimento
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") player.dy = -player.speed;
  if (e.key === "ArrowDown") player.dy = player.speed;
});
document.addEventListener("keyup", e => { player.dy = 0; });

// Obstáculo
const enemy = {
  x: 800,
  y: Math.random() * 460,
  size: 40,
  speed: 4,
};

// Loop do jogo
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameover.style.display = "none";
  // Movimentação jogador
  player.y += player.dy;
  if (player.y < 0) player.y = 0;
  if (player.y > canvas.height - player.size) player.y = canvas.height - player.size;

  // Inimigo
  enemy.x -= enemy.speed;
  if (enemy.x < -enemy.size) {
    enemy.x = 800;
    enemy.y = Math.random() * 460;
  }
   // peixe1
  peixe1.x -= peixe1.speed;
  if (peixe1.x < -peixe1.size) {
    peixe1.x = 600;
    peixe1.y = Math.random() * 460;
  }
  // Colisão
  if (
    player.x < enemy.x + enemy.size &&
    player.x + player.size > enemy.x &&
    player.y < enemy.y + enemy.size &&
    player.y + player.size > enemy.y
  ) {
    alert("Game Over!");
    gameover.style.display = "display";
    document.location.reload();
  }

  draw();
  requestAnimationFrame(update);
}
// peixe1
  if (
    player.x < peixe1.x + peixe1.size &&
    player.x + player.size > peixe1.x &&
    player.y < peixe1.y + enemy.size &&
    player.y + player.size > peixe1.y
  ) {
    pontuacao += 10;
    peixe1.clear();
  }
  draw();
}


// Desenho
function draw() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  ctx.fillStyle = "red";
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

  ctx.fillStyle = "white";
  ctx.fillRect(peixe1.x, peixe1.y, peixe1.size, peixe1.size);
}
function drawpeixe1() {
  ctx.fillStyle = "white";
  ctx.fillRect(peixe1.x, peixe1.y, peixe1.size, peixe1.size);
}

update();


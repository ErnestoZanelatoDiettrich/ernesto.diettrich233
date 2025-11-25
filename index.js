const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

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

  // Colisão
  if (
    player.x < enemy.x + enemy.size &&
    player.x + player.size > enemy.x &&
    player.y < enemy.y + enemy.size &&
    player.y + player.size > enemy.y
  ) {
    alert("Game Over!");
    document.location.reload();
  }

  draw();
  requestAnimationFrame(update);
}

// Desenho
function draw() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  ctx.fillStyle = "red";
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
}

update();


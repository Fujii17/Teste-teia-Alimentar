const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let player = { x: 400, y: 300, size: 20, color: 'green' };
let prey = [];
let predators = [];

// Função para desenhar o jogador
function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.closePath();
}

// Função para mover o jogador
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      player.y -= 10;
      break;
    case 'ArrowDown':
      player.y += 10;
      break;
    case 'ArrowLeft':
      player.x -= 10;
      break;
    case 'ArrowRight':
      player.x += 10;
      break;
  }
});

// Função principal
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

// Iniciar o jogo
gameLoop();

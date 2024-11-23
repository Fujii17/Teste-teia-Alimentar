const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Jogador
let player = { x: 400, y: 300, size: 20, color: 'green', level: 1 };

// Presas e predadores
let prey = [];
let predators = [];

// Pontuação e estado do jogo
let score = 0;
let isGameOver = false;

// Função para criar presas
function createPrey() {
  const preySize = Math.random() * 22 + 5; // Tamanho aleatório
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: preySize,
    color: 'blue',
    level: 1,
  };
}

// Função para criar predadores
function createPredator() {
  const predatorSize = Math.random() * 35 + 12; // Tamanho aleatório
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: predatorSize,
    color: 'red',
    level: 3,
  };
}

// Função para desenhar um círculo (jogador, presa ou predador)
function drawCircle(entity) {
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.size, 0, Math.PI * 2);
  ctx.fillStyle = entity.color;
  ctx.fill();
  ctx.closePath();
}

// Configurar movimento do jogador
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'w') {
    player.y -= 10; // Mover para cima
  } else if (e.key === 'ArrowDown' || e.key === 's') {
    player.y += 10; // Mover para baixo
  } else if (e.key === 'ArrowLeft' || e.key === 'a') {
    player.x -= 10; // Mover para a esquerda
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    player.x += 10; // Mover para a direita
  }
});


// Detectar colisão
function isColliding(entity1, entity2) {
  const dist = Math.hypot(entity1.x - entity2.x, entity1.y - entity2.y);
  return dist < entity1.size + entity2.size;
}

// Atualizar lógica do jogo
function updateGame() {
  if (isGameOver) return;

  // Verificar colisão com presas
  prey = prey.filter((p) => {
    if (isColliding(player, p) && player.level >= p.level) {
      score += 10; // Incrementa pontuação
      player.size += 1; // Jogador cresce ao comer
      return false; // Remove a presa da lista
    }
    return true;
  });

  // Verificar colisão com predadores
  predators.forEach((pred) => {
    if (isColliding(player, pred) && player.level < pred.level) {
      isGameOver = true; // Fim de jogo
    }
  });

  // Reabastecer presas e predadores
  if (prey.length < 5) prey.push(createPrey());
  if (predators.length < 3) predators.push(createPredator());
}

// Renderizar elementos
function renderGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Exibir pontuação
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${score}`, 10, 30);

  // Exibir jogador, presas e predadores
  drawCircle(player);
  prey.forEach(drawCircle);
  predators.forEach(drawCircle);

  // Exibir mensagem de Game Over
  if (isGameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, canvas.height / 2 - 50, canvas.width, 100);

    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
  }
}

// Função principal
function gameLoop() {
  updateGame();
  renderGame();
  if (!isGameOver) requestAnimationFrame(gameLoop);
}

// Inicializar presas e predadores
for (let i = 0; i < 5; i++) prey.push(createPrey());
for (let i = 0; i < 3; i++) predators.push(createPredator());

// Iniciar o jogo
gameLoop();

// Selecionar o botão
const restartButton = document.getElementById('restartButton');

// Função de Game Over
function gameOver() {
  alert('Game Over!');
  restartButton.style.display = 'block'; // Exibe o botão de reinício
}

// Função para reiniciar o jogo
function restartGame() {
  player.x = 0; // Reinicia a posição do jogador
  player.y = 0; // Reinicia a posição do jogador
  score = 0;    // Zera a pontuação
  restartButton.style.display = 'none'; // Esconde o botão
  startGame();  // Reinicia a lógica do jogo
}

// Adiciona um evento de clique no botão de reinício
restartButton.addEventListener('click', restartGame);

// Função para iniciar o jogo
function startGame() {
  console.log("Jogo iniciado!"); // Substitua pela lógica de inicialização do jogo
}

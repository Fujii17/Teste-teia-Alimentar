import pygame
import random

# Inicializando o Pygame
pygame.init()

# Configurações da tela e cores
largura, altura = 600, 400
tela = pygame.display.set_mode((largura, altura))
pygame.display.set_caption('Jogo da Cobrinha')
branco = (255, 255, 255)
verde = (0, 255, 0)
vermelho = (255, 0, 0)

# Configurações do jogo
tamanho_bloco = 20
velocidade = 15
relogio = pygame.time.Clock()

# Função para gerar a posição aleatória da maçã
def posicao_maca():
    return (random.randint(0, (largura - tamanho_bloco) // tamanho_bloco) * tamanho_bloco,
            random.randint(0, (altura - tamanho_bloco) // tamanho_bloco) * tamanho_bloco)

# Função principal do jogo
def jogo():
    fim_jogo = False
    cobra_pos = [[300, 200]]
    direcao = 'PARADO'
    maca_pos = posicao_maca()
    while not fim_jogo:
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                fim_jogo = True
            elif evento.type == pygame.KEYDOWN:
                if evento.key == pygame.K_UP:
                    direcao = 'CIMA'
                elif evento.key == pygame.K_DOWN:
                    direcao = 'BAIXO'
                elif evento.key == pygame.K_LEFT:
                    direcao = 'ESQUERDA'
                elif evento.key == pygame.K_RIGHT:
                    direcao = 'DIREITA'

        # Atualiza a posição da cobrinha
        if direcao == 'CIMA':
            nova_cabeca = [cobra_pos[0][0], cobra_pos[0][1] - tamanho_bloco]
        elif direcao == 'BAIXO':
            nova_cabeca = [cobra_pos[0][0], cobra_pos[0][1] + tamanho_bloco]
        elif direcao == 'ESQUERDA':
            nova_cabeca = [cobra_pos[0][0] - tamanho_bloco, cobra_pos[0][1]]
        elif direcao == 'DIREITA':
            nova_cabeca = [cobra_pos[0][0] + tamanho_bloco, cobra_pos[0][1]]
        else:
            nova_cabeca = cobra_pos[0]

        cobra_pos.insert(0, nova_cabeca)

        # Verifica se a maçã foi comida
        if cobra_pos[0] == list(maca_pos):
            maca_pos = posicao_maca()
        else:
            cobra_pos.pop()

        # Verifica colisões com bordas e com o próprio corpo
        if (cobra_pos[0][0] < 0 or cobra_pos[0][0] >= largura or
                cobra_pos[0][1] < 0 or cobra_pos[0][1] >= altura or
                cobra_pos[0] in cobra_pos[1:]):
            fim_jogo = True

        # Atualiza a tela
        tela.fill(branco)
        pygame.draw.rect(tela, vermelho, (*maca_pos, tamanho_bloco, tamanho_bloco))
        for bloco in cobra_pos:
            pygame.draw.rect(tela, verde, (*bloco, tamanho_bloco, tamanho_bloco))
        pygame.display.update()
        relogio.tick(velocidade)

    pygame.quit()

# Inicia o jogo
jogo()

// Variáveis de controle do estado do jogo
let moedas = 0;
let saudeAmbiente = 100;

// Mapeamento dos elementos do HTML
const txtMoedas = document.getElementById('moedas');
const txtAmbiente = document.getElementById('ambiente');
const txtMensagem = document.getElementById('mensagem');

// Função para atualizar os dados visíveis na tela
function atualizarTela() {
    txtMoedas.innerText = moedas;
    txtAmbiente.innerText = saudeAmbiente;

    // Feedback visual por cores baseado na saúde do ambiente
    if (saudeAmbiente > 60) {
        txtAmbiente.style.color = "#2e7d32"; // Verde (Saudável)
    } else if (saudeAmbiente > 30) {
        txtAmbiente.style.color = "#ff9800"; // Laranja (Alerta)
    } else {
        txtAmbiente.style.color = "#d32f2f"; // Vermelho (Crítico)
    }

    verificarFimDeJogo();
}

// --- AÇÕES DE PRODUÇÃO (AGRO) ---
function produzirIntensivo() {
    moedas += 20;
    saudeAmbiente -= 10;
    txtMensagem.innerText = "🚜 Colheita realizada! Lucro alto, mas o solo perdeu nutrientes.";
    atualizarTela();
}

function comprarTrator() {
    moedas += 50;
    saudeAmbiente -= 20;
    txtMensagem.innerText = "🏭 Maquinário pesado ativado! Produção recorde, com emissão de carbono.";
    atualizarTela();
}

// --- AÇÕES SUSTENTÁVEIS (MEIO AMBIENTE) ---
function reflorestar() {
    if (moedas >= 15) {
        moedas -= 15;
        saudeAmbiente = Math.min(saudeAmbiente + 20, 100); // Limita o máximo em 100%
        txtMensagem.innerText = "🌱 Área reflorestada! A biodiversidade local aumentou.";
    } else {
        txtMensagem.innerText = "❌ Moedas insuficientes para iniciar o reflorestamento (Custo: 15).";
    }
    atualizarTela();
}

function organico() {
    moedas += 8;
    saudeAmbiente = Math.min(saudeAmbiente + 5, 100);
    txtMensagem.innerText = "🍎 Produtos orgânicos colhidos. Lucro justo e solo protegido.";
    atualizarTela();
}

// --- SISTEMA DE EVENTOS ALEATÓRIOS (Dinamismo para o Concurso) ---
function rodarEventoAleatorio() {
    const chance = Math.random();
    
    if (chance < 0.3) {
        // Evento Ruim
        saudeAmbiente -= 15;
        txtMensagem.innerText = "⚠️ Clima: Uma seca severa atingiu a região! O ambiente sofreu -15%.";
    } else if (chance > 0.7) {
        // Evento Bom
        moedas += 30;
        txtMensagem.innerText = "💰 Mercado: Investidores verdes valorizaram sua fazenda! Ganhou +30 moedas.";
    }
    atualizarTela();
}

// Inicia os eventos climáticos automáticos a cada 12 segundos
setInterval(rodarEventoAleatorio, 12000);

// --- CONDIÇÕES DE VITÓRIA OU DERROTA ---
function verificarFimDeJogo() {
    if (saudeAmbiente <= 0) {
        saudeAmbiente = 0;
        txtAmbiente.innerText = 0;
        alert("Fim de Jogo! O ecossistema entrou em colapso por excesso de exploração. 🛑");
        reiniciarJogo();
    } else if (moedas >= 400 && saudeAmbiente >= 75) {
        alert("🏆 Vitória Sustentável! Você provou que é possível ter um Agro Forte e proteger o Planeta ao mesmo tempo!");
        reiniciarJogo();
    }
}

function reiniciarJogo() {
    moedas = 0;
    saudeAmbiente = 100;
    txtMensagem.innerText = "Novo ciclo iniciado. Busque o equilíbrio perfeito!";
    atualizarTela();
}

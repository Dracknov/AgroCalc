// Todo o JS da sua página, sem as tags <script>...</script>
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.calculator-button');
    const calculatorSections = document.querySelectorAll('.calculator-section');
    const welcomeMessage = document.getElementById('welcome-message');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Botão de voltar ao topo
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function hideAllSections() {
        calculatorSections.forEach(section => section.classList.add('hidden'));
    }

    // Alterna entre as calculadoras
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const calc = button.getAttribute('data-calculator');
            hideAllSections();
            const section = document.getElementById(`${calc}_calculator`);
            if (section) {
                section.classList.remove('hidden');
            }
            if (welcomeMessage) welcomeMessage.classList.add('hidden');
        });
    });

    // Exibe mensagem de boas-vindas ao carregar
    if (welcomeMessage) {
        hideAllSections();
        welcomeMessage.classList.remove('hidden');
    }

    // Exemplo de funcionalidade para a calculadora de pulverizador
    const sprayerForm = document.getElementById('sprayerForm');
    if (sprayerForm) {
        sprayerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const targetRate = parseFloat(document.getElementById('targetRate')?.value);
            const speed = parseFloat(document.getElementById('speed')?.value);
            const nozzleSpacing = parseFloat(document.getElementById('nozzleSpacing')?.value);
            const resultDiv = document.getElementById('sprayerResult');
            const errorDiv = document.getElementById('sprayerError');
            if (isNaN(targetRate) || isNaN(speed) || isNaN(nozzleSpacing) || targetRate <= 0 || speed <= 0 || nozzleSpacing <= 0) {
                if (resultDiv) resultDiv.classList.add('hidden');
                if (errorDiv) errorDiv.classList.remove('hidden');
                return;
            }
            // Fórmula: Vazão (L/min) = (Taxa x Velocidade x Espaçamento) / 600
            const flowRate = (targetRate * speed * nozzleSpacing) / 600;
            if (resultDiv) {
                resultDiv.classList.remove('hidden');
                resultDiv.innerHTML = `<h3 class="text-lg font-semibold">Resultado:</h3><p id="flowRateResult">Vazão por bico: <strong>${flowRate.toFixed(2)} L/min</strong></p>`;
            }
            if (errorDiv) errorDiv.classList.add('hidden');
        });
        const clearBtn = document.getElementById('clearSprayerForm');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                sprayerForm.reset();
                const resultDiv = document.getElementById('sprayerResult');
                const errorDiv = document.getElementById('sprayerError');
                if (resultDiv) resultDiv.classList.add('hidden');
                if (errorDiv) errorDiv.classList.add('hidden');
            });
        }
    }
    // Adicione aqui as demais integrações JS das outras calculadoras conforme necessário
});

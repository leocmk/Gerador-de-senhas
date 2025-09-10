// Gerador de Senhas Seguras - JavaScript
class PasswordGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.updateLengthDisplay();
    }

    initializeElements() {
        this.lengthSlider = document.getElementById('password-length');
        this.lengthDisplay = document.getElementById('length-display');
        this.countInput = document.getElementById('password-count');
        this.generateBtn = document.getElementById('generate-btn');
        this.resultsSection = document.getElementById('results-section');
        this.passwordsContainer = document.getElementById('passwords-container');
        this.copyAllBtn = document.getElementById('copy-all-btn');
        this.notification = document.getElementById('notification');
        this.notificationText = document.getElementById('notification-text');

        // Checkboxes de opções
        this.includeLowercase = document.getElementById('include-lowercase');
        this.includeUppercase = document.getElementById('include-uppercase');
        this.includeNumbers = document.getElementById('include-numbers');
        this.includeSymbols = document.getElementById('include-symbols');
    }

    bindEvents() {
        this.lengthSlider.addEventListener('input', () => this.updateLengthDisplay());
        this.generateBtn.addEventListener('click', () => this.generatePasswords());
        this.copyAllBtn.addEventListener('click', () => this.copyAllPasswords());
        
        // Validação em tempo real para quantidade
        this.countInput.addEventListener('input', () => this.validateCountInput());
    }

    updateLengthDisplay() {
        this.lengthDisplay.textContent = this.lengthSlider.value;
    }

    validateCountInput() {
        const value = parseInt(this.countInput.value);
        if (value < 1) this.countInput.value = 1;
        if (value > 20) this.countInput.value = 20;
    }

    generatePassword(length) {
        if (length < 4) {
            throw new Error('O comprimento da senha deve ser de pelo menos 4 caracteres.');
        }

        // Verificar se pelo menos uma opção está selecionada
        if (!this.includeLowercase.checked && 
            !this.includeUppercase.checked && 
            !this.includeNumbers.checked && 
            !this.includeSymbols.checked) {
            throw new Error('Selecione pelo menos um tipo de caractere.');
        }

        // Definir os conjuntos de caracteres
        const charSets = {
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };

        let availableChars = '';
        let requiredChars = [];

        // Adicionar caracteres disponíveis baseado nas opções selecionadas
        if (this.includeLowercase.checked) {
            availableChars += charSets.lowercase;
            requiredChars.push(this.getRandomChar(charSets.lowercase));
        }
        if (this.includeUppercase.checked) {
            availableChars += charSets.uppercase;
            requiredChars.push(this.getRandomChar(charSets.uppercase));
        }
        if (this.includeNumbers.checked) {
            availableChars += charSets.numbers;
            requiredChars.push(this.getRandomChar(charSets.numbers));
        }
        if (this.includeSymbols.checked) {
            availableChars += charSets.symbols;
            requiredChars.push(this.getRandomChar(charSets.symbols));
        }

        // Garantir que a senha contenha pelo menos um caractere de cada tipo selecionado
        const password = [...requiredChars];

        // Preencher o restante da senha com caracteres aleatórios
        for (let i = requiredChars.length; i < length; i++) {
            password.push(this.getRandomChar(availableChars));
        }

        // Embaralhar a senha para garantir aleatoriedade
        return this.shuffleArray(password).join('');
    }

    getRandomChar(charSet) {
        return charSet[Math.floor(Math.random() * charSet.length)];
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    generatePasswords() {
        try {
            const length = parseInt(this.lengthSlider.value);
            const count = parseInt(this.countInput.value);
            
            // Limpar resultados anteriores
            this.passwordsContainer.innerHTML = '';
            
            // Gerar senhas
            const passwords = [];
            for (let i = 0; i < count; i++) {
                const password = this.generatePassword(length);
                passwords.push(password);
            }

            // Exibir senhas na interface
            this.displayPasswords(passwords);
            this.resultsSection.style.display = 'block';
            
            // Scroll para a seção de resultados
            this.resultsSection.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }

    displayPasswords(passwords) {
        passwords.forEach((password, index) => {
            const passwordItem = document.createElement('div');
            passwordItem.className = 'password-item';
            passwordItem.innerHTML = `
                <span class="password-text">${password}</span>
                <button class="copy-btn" onclick="passwordGenerator.copyPassword('${password}', this)">
                    <span class="btn-icon">📋</span>
                    Copiar
                </button>
            `;
            this.passwordsContainer.appendChild(passwordItem);
        });
    }

    copyPassword(password, button) {
        navigator.clipboard.writeText(password).then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="btn-icon">✓</span>Copiado!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 2000);
            
            this.showNotification('Senha copiada para a área de transferência!');
        }).catch(err => {
            console.error('[PasswordGenerator:copyPassword] Erro ao copiar senha:', err);
            this.showNotification('Erro ao copiar senha. Tente novamente.', 'error');
        });
    }

    copyAllPasswords() {
        const passwordElements = this.passwordsContainer.querySelectorAll('.password-text');
        const passwords = Array.from(passwordElements).map(el => el.textContent);
        const allPasswordsText = passwords.join('\n');
        
        navigator.clipboard.writeText(allPasswordsText).then(() => {
            this.showNotification(`${passwords.length} senhas copiadas para a área de transferência!`);
        }).catch(err => {
            console.error('[PasswordGenerator:copyAllPasswords] Erro ao copiar senhas:', err);
            this.showNotification('Erro ao copiar senhas. Tente novamente.', 'error');
        });
    }

    showNotification(message, type = 'success') {
        this.notificationText.textContent = message;
        this.notification.className = `notification ${type}`;
        this.notification.classList.add('show');
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }
}

// Inicializar o gerador quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('[PasswordGenerator] Inicializando gerador de senhas...');
    window.passwordGenerator = new PasswordGenerator();
    console.log('[PasswordGenerator] Gerador de senhas inicializado com sucesso!');
});

// Adicionar funcionalidade de atalhos de teclado
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter para gerar senhas
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (window.passwordGenerator) {
            window.passwordGenerator.generatePasswords();
        }
    }
    
    // Escape para fechar notificações
    if (e.key === 'Escape') {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.classList.remove('show');
        }
    }
});

// Adicionar animação de loading no botão
function addLoadingAnimation(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="btn-text">Gerando...</span><span class="btn-icon">⏳</span>';
    button.disabled = true;
    
    return () => {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Melhorar a experiência do usuário com validações em tempo real
document.addEventListener('DOMContentLoaded', () => {
    const lengthSlider = document.getElementById('password-length');
    const countInput = document.getElementById('password-count');
    
    // Validação do slider de comprimento
    lengthSlider.addEventListener('input', () => {
        const value = parseInt(lengthSlider.value);
        if (value < 4) {
            lengthSlider.value = 4;
        }
    });
    
    // Validação do input de quantidade
    countInput.addEventListener('input', () => {
        const value = parseInt(countInput.value);
        if (value < 1) {
            countInput.value = 1;
        } else if (value > 20) {
            countInput.value = 20;
        }
    });
    
    // Adicionar feedback visual para opções de caracteres
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
            if (checkedCount === 0) {
                checkbox.parentElement.style.color = '#dc3545';
                setTimeout(() => {
                    checkbox.parentElement.style.color = '';
                }, 1000);
            }
        });
    });
});

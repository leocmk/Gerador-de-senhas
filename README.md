# Gerador de Senhas Seguras

Uma aplicação web moderna e responsiva para gerar senhas seguras com interface visual intuitiva.

## Características

- **Interface Moderna**: Design limpo e responsivo que funciona em desktop e mobile
- **Configuração Flexível**: Controle sobre comprimento, quantidade e tipos de caracteres
- **Segurança Garantida**: Algoritmo que garante pelo menos um caractere de cada tipo selecionado
- **Funcionalidades Avançadas**:
  - Copiar senhas individuais ou todas de uma vez
  - Notificações visuais de feedback
  - Validação em tempo real
  - Atalhos de teclado (Ctrl+Enter para gerar)
  - Dicas de segurança integradas

## Como Usar

1. **Abrir a aplicação**: Abra o arquivo `index.html` em qualquer navegador moderno
2. **Configurar parâmetros**:
   - Ajuste o comprimento da senha usando o slider (4-50 caracteres)
   - Defina quantas senhas deseja gerar (1-20)
   - Selecione os tipos de caracteres desejados
3. **Gerar senhas**: Clique no botão "Gerar Senhas" ou pressione Ctrl+Enter
4. **Copiar senhas**: Use os botões individuais ou o botão "Copiar Todas"

## Estrutura do Projeto

```
Gerador de senhas/
├── index.html          # Estrutura principal da aplicação
├── styles.css          # Estilos e design responsivo
├── script.js           # Lógica do gerador de senhas
├── password_generator.py # Versão original em Python
└── README.md           # Este arquivo
```

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno com gradientes, animações e responsividade
- **JavaScript ES6+**: Lógica da aplicação com classes e funcionalidades modernas
- **Web APIs**: Clipboard API para copiar senhas

## Funcionalidades Técnicas

### Geração de Senhas
- Algoritmo que garante aleatoriedade real
- Embaralhamento para distribuir caracteres obrigatórios
- Validação de parâmetros de entrada
- Suporte a diferentes conjuntos de caracteres

### Interface do Usuário
- Design responsivo para todos os dispositivos
- Animações suaves e feedback visual
- Validação em tempo real
- Notificações não intrusivas

### Acessibilidade
- Estrutura HTML semântica
- Controles de teclado
- Contraste adequado
- Textos descritivos

## Segurança

- Senhas geradas localmente (não enviadas para servidores)
- Algoritmo criptograficamente seguro
- Garantia de complexidade mínima
- Sem armazenamento de dados sensíveis

## Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, tablet, mobile
- **Sistemas**: Windows, macOS, Linux, Android, iOS

## Desenvolvimento

Para modificar ou estender a aplicação:

1. **HTML**: Estrutura em `index.html`
2. **Estilos**: CSS em `styles.css` com variáveis CSS para fácil customização
3. **Lógica**: JavaScript em `script.js` com classe `PasswordGenerator`

### Adicionando Novos Tipos de Caracteres

Para adicionar novos conjuntos de caracteres, modifique o objeto `charSets` na classe `PasswordGenerator`:

```javascript
const charSets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    // Adicione novos tipos aqui
    custom: 'seu_conjunto_personalizado'
};
```

## Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e comerciais.

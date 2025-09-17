export const generatePassword = (
  length: number,
  options: {
    includeLowercase: boolean;
    includeUppercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
  }
): string => {
  if (length < 4) {
    throw new Error('O comprimento da senha deve ser de pelo menos 4 caracteres.');
  }

  if (!options.includeLowercase && !options.includeUppercase && !options.includeNumbers && !options.includeSymbols) {
    throw new Error('Selecione pelo menos um tipo de caractere.');
  }

  const charSets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  };

  let availableChars = '';
  let requiredChars: string[] = [];

  if (options.includeLowercase) {
    availableChars += charSets.lowercase;
    requiredChars.push(getRandomChar(charSets.lowercase));
  }
  if (options.includeUppercase) {
    availableChars += charSets.uppercase;
    requiredChars.push(getRandomChar(charSets.uppercase));
  }
  if (options.includeNumbers) {
    availableChars += charSets.numbers;
    requiredChars.push(getRandomChar(charSets.numbers));
  }
  if (options.includeSymbols) {
    availableChars += charSets.symbols;
    requiredChars.push(getRandomChar(charSets.symbols));
  }

  const password = [...requiredChars];

  for (let i = requiredChars.length; i < length; i++) {
    password.push(getRandomChar(availableChars));
  }

  return shuffleArray(password).join('');
};

const getRandomChar = (charSet: string): string => {
  return charSet[Math.floor(Math.random() * charSet.length)];
};

const shuffleArray = (array: string[]): string[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

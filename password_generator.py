import random
import string

def generate_password(length=12):
    if length < 4:
        raise ValueError("O comprimento da senha deve ser de pelo menos 4 caracteres.")

    # Definir os conjuntos de caracteres
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    digits = string.digits
    symbols = string.punctuation

    all_characters = lower + upper + digits + symbols

    password = []

    # Garantir que a senha contenha pelo menos um caractere de cada tipo
    password.append(random.choice(lower))
    password.append(random.choice(upper))
    password.append(random.choice(digits))
    password.append(random.choice(symbols))

    # Preencher o restante da senha com caracteres aleatórios
    for _ in range(length - 4):
        password.append(random.choice(all_characters))

    # Embaralhar a senha para garantir aleatoriedade
    random.shuffle(password)

    return "".join(password)

if __name__ == "__main__":
    try:
        num_passwords = int(input("Quantas senhas você deseja gerar? "))
        password_length = int(input("Qual o comprimento da senha (padrão 12)? ") or 12)

        for _ in range(num_passwords):
            password = generate_password()
            print(f"Senha gerada: {password}")
    except ValueError as e:
        print(f"Erro: {e}")
    except KeyboardInterrupt:
        print("\nOperação cancelada pelo usuário.")



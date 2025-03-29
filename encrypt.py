import json

key = "secret key"


def vigenere_cipher(text, key):
    result = []
    key = key.lower()
    key_index = 0
    key_length = len(key)

    for char in text:
        if char.isalpha():
            shift_base = ord("A") if char.isupper() else ord("a")
            shift = ord(key[key_index % key_length]) - ord("a")
            result.append(chr((ord(char) - shift_base + shift) % 26 + shift_base))
            key_index += 1
        else:
            result.append(char)
    return "".join(result)


def encrypt_nested(data):
    if isinstance(data, dict):
        if "problems" in data:
            return {
                key: encrypt_nested(value) if key == "problems" else value
                for key, value in data.items()
            }
        return {key: encrypt_nested(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [encrypt_nested(item) for item in data]
    elif isinstance(data, str):
        return vigenere_cipher(data, key)
    else:
        return data


def decrypt_nested(data):
    if isinstance(data, dict):
        if "problems" in data:
            return {
                key: decrypt_nested(value) if key == "problems" else value
                for key, value in data.items()
            }
        return {key: decrypt_nested(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [decrypt_nested(item) for item in data]
    elif isinstance(data, str):
        return vigenere_cipher(
            data,
            "".join(
                chr((26 - (ord(c) - ord("a"))) % 26 + ord("a")) for c in key.lower()
            ),
        )
    else:
        return data


def encrypt_json(file_path, output_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        encrypted_data = encrypt_nested(data)
        encrypted_data["decrypted"] = vigenere_cipher(
            "yes the problem statement is decrypted by the user", key
        )

        with open(output_path, "w", encoding="utf-8") as file:
            json.dump(encrypted_data, file, indent=4)

        print("Encryption completed successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")


def decrypt_json(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        decrypted_data = decrypt_nested(data)

        print(json.dumps(decrypted_data, indent=4))
        print("Decryption completed successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")


file_path = "./problemStatements.json"
output_path = "./output.json"

encrypt_json(file_path, output_path)
decrypt_json(output_path)

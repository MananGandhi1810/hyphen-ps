export function vigenereDecipher(text, key) {
    const result = [];
    const lowerKey = key.toLowerCase();
    let keyIndex = 0;
    const keyLength = key.length;

    for (const char of text) {
        if (/[a-zA-Z]/.test(char)) {
            const shiftBase = char === char.toUpperCase() ? 65 : 97;
            const shift = lowerKey.charCodeAt(keyIndex % keyLength) - 97;
            const newChar = String.fromCharCode(
                ((char.charCodeAt(0) - shiftBase - shift + 26) % 26) +
                    shiftBase,
            );
            result.push(newChar);
            keyIndex++;
        } else {
            result.push(char);
        }
    }
    return result.join("");
}

export function decryptProblemStatements(data, key) {
    if (!key) return data;

    const decryptString = (str) => vigenereDecipher(str, key);

    const decryptProblems = (problems) => {
        return problems.map((problem) => ({
            ...problem,
            title: decryptString(problem.title),
            description: decryptString(problem.description),
        }));
    };

    return {
        ...data,
        decrypted: decryptString(data.decrypted),
        tracks: Object.fromEntries(
            Object.entries(data.tracks).map(([key, track]) => [
                key,
                { ...track, problems: decryptProblems(track.problems) },
            ]),
        ),
    };
}

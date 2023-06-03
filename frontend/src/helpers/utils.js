export const only_numbers = (value) => {
    return value.replace(/\D/g, "");
}


export const validate_cpf = (cpf) => {
    let clearedCpf = only_numbers(cpf); // Remove all non-numeric characters

    if (clearedCpf.length !== 11) {
        return false;
    }

    // Digitos iguais
    if (/^(\d)\1{10}$/.test(clearedCpf)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(clearedCpf.charAt(i)) * (10 - i);
    }

    let firstDigit = 11 - (sum % 11);
    if (firstDigit > 9) {
        firstDigit = 0;
    }

    // Verifica se o primeiro dígito verificador é válido
    if (parseInt(clearedCpf.charAt(9)) !== firstDigit) {
        return false;
    }

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(clearedCpf.charAt(i)) * (11 - i);
    }

    let secondDigit = 11 - (sum % 11);
    if (secondDigit > 9) {
        secondDigit = 0;
    }

    // Verifica se o segundo dígito verificador é válido
    return parseInt(clearedCpf.charAt(10)) === secondDigit;
}
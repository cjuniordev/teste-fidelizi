<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Cpf implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (app()->environment('local')) {
            return;
        }

        /**
         *  Código retirado do gist: https://gist.github.com/rafael-neri/ab3e58803a08cb4def059fce4e3c0e40
         */
        $cpf = preg_replace( '/[^0-9]/is', '', $value);

        if (strlen($cpf) != 11) {
            $fail('O CPF precisa ter 11 dígitos.');
        }

        if (preg_match('/(\d)\1{10}/', $cpf)) {
            $fail('O CPF precisa ser válido.');
        }

        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) {
                $fail('O CPF precisa ser válido.');
            }
        }
    }
}

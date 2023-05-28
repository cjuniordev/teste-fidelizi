<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'cpf' => [
                'string',
                'size:11',
            ],
            'user' => ['array'],
            'user.name' => [
                'string',
                'max:255',
            ],
            'user.email' => [
                'string',
                'email',
            ],
            'user.password' => [
                'string',
                'min:8',
            ],
        ];

        if ($this->isMethod('POST')) {
            $postRules = [
                'cpf' => [
                    'required',
                    'unique:clients,cpf',
                ],
                'user' => ['required'],
                'user.name' => ['required'],
                'user.email' => [
                    'required',
                    'unique:users,email',
                ],
                'user.password' => ['required'],
            ];

            return array_merge_recursive($rules, $postRules);
        }

        return $rules;
    }
}

<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Client>
 */
class ClientFactory extends Factory
{
    public function definition(): array
    {
        return [
            'cpf' => $this->faker->cpf(false),
            'user_id' => fn () => User::factory()->client()->create()->id,
        ];
    }
}

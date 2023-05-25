<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
         User::factory()->create([
             'name' => 'admin',
             'email' => 'admin@email.com',
         ]);

         User::factory(10)->create();

    }
}

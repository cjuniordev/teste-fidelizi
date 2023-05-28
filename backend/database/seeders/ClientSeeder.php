<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Offer;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $offers = Offer::query()->inRandomOrder()->limit(3)->get();

        Client::factory()
            ->hasAttached(
                $offers,
                ['created_at' => now()]
            )
            ->count(2)
            ->create();

        Client::factory()
            ->count(5)
            ->create();
    }
}

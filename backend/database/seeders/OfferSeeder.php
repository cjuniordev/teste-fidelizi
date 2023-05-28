<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Offer;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OfferSeeder extends Seeder
{
    public function run(): void
    {
        Offer::factory()
            ->for(
                Company::factory()
                    ->create([
                        'name' => 'Demonstração FideliZi',
                    ])
            )
            ->create([
                'title' => '20% de desconto na compra de qualquer hamburguer',
                'slug' => 'demonstracao-fidelizi',
                'validity' => Carbon::now()->addDays(172),
            ]);

        Offer::factory()
            ->count(10)
            ->create();
    }
}

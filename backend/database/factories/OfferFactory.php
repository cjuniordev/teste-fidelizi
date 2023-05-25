<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Offer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Offer>
 */
class OfferFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->text,
            'slug' => $this->faker->slug,
            'amount' => $this->faker->randomNumber(),
            'image' => $this->faker->imageUrl(),
            'validity' => $this->faker->dateTimeBetween(endDate: '+1 year')->format('Y-m-d'),
            'company_id' => fn () => Company::factory()->create()->id,
        ];
    }
}

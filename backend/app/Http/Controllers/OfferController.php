<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function __construct(
        private readonly Offer $offer
    ) {
    }

    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $slug, int $id): JsonResponse
    {
        /** @var Offer $offer */
        $offer = $this->offer->newQuery()
            ->where('slug', $slug)
            ->where('id', $id)
            ->first();

        if (! $offer) {
            return response()->json([
                'message' => 'Oferta não encontrada',
            ], 404);
        }

        $offer->load('company:id,name');

        return response()->json([
            ...$offer->toArray(),
            'deadline' => $offer->deadline,
            'available_amount' => $offer->available_amount,
        ]);
    }

    public function update(Request $request, Offer $offer)
    {
        //
    }

    public function destroy(Offer $offer)
    {
        //
    }
}

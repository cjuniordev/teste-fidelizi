<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function __construct(
        private readonly Offer $offer
    ) {}

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
        $offer = $this->offer->newQuery()
            ->where('slug', $slug)
            ->where('id', $id)
            ->firstOrFail();

        $offer->load('company:id,name');

        return response()->json([
            ...$offer->toArray(),
            'deadline' => $offer->deadline,
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

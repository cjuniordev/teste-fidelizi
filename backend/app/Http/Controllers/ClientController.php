<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActivateOfferRequest;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use App\Models\Offer;
use Illuminate\Http\JsonResponse;

class ClientController extends Controller
{
    public function __construct(
        private readonly Client $client,
        private readonly Offer $offer,
    ) {}

    public function index()
    {
        //
    }


    public function store(StoreClientRequest $request)
    {
        //
    }

    public function show(Client $client)
    {
        //
    }


    public function update(UpdateClientRequest $request, Client $client)
    {
        //
    }

    public function destroy(Client $client)
    {
        //
    }

    public function activateOffer(ActivateOfferRequest $request, string $cpf): JsonResponse
    {
        // TODO: remove chars from cpf

        $attributes = $request->validated();
        $offerId = $attributes['offer_id'];

        $client = $this->client->newQuery()
            ->where('cpf', $cpf)
            ->firstOrFail();

        $offer = $this->offer->newQuery()
            ->where('id', $offerId)
            ->firstOrFail();

        $clientHasOffer = $client->offers()->count();

        if ($clientHasOffer > 0) {
            return response()->json([
                'message' => 'Você já tem essa oferta ativa!',
            ], 403);
        }

        $client
            ->offers()
            ->attach($offer);

        $offer->amount = $offer->amount - 1;
        $offer->save();

        return response()->json($client);
    }
}

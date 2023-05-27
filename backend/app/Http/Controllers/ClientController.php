<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActivateOfferRequest;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use App\Models\Offer;
use App\Notifications\OfferActivatedNotification;
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
        $cpf = only_numbers($cpf);

        $attributes = $request->validated();
        $offerId = $attributes['offer_id'];

        /** @var Client $client */
        $client = $this->client->newQuery()
            ->where('cpf', $cpf)
            ->first();

        if (!$client) {
            return response()->json([
                'message' => 'Cliente não encontrado!',
            ], 404);
        }

        /** @var Offer $offer */
        $offer = $this->offer->newQuery()
            ->findOrFail($offerId);

        $amount = $offer->amount;

        if ($amount <= 0) {
            return response()->json([
                'message' => 'Não há mais ofertas disponíveis!',
            ], 403);
        }

        $clientHasOffer = $client->offers()->count();

        if ($clientHasOffer > 0) {
            return response()->json([
                'message' => 'Você já tem essa oferta ativa!',
            ], 403);
        }

        $client
            ->offers()
            ->attach($offer);

        $offer->amount = $amount - 1;
        $offer->save();

        $client->user->notify(
            new OfferActivatedNotification($offer)
        );

        return response()->json($client);
    }
}

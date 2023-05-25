<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActivateOfferRequest;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
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
        $attributes = $request->validated();

        $client = $this->client->newQuery()
            ->where('cpf', $cpf)
            ->firstOrFail();

        $offer = $this->offer->newQuery()
            ->where('id', $attributes['offert_id'])
            ->firstOrFail();

        $client
            ->offers()
            ->attach($offer);

        $offer->update([
            'amount' => $offer->amount - 1,
        ]);

        return response()->json($client);
    }
}

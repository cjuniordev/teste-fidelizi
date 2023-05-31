<?php

namespace App\Http\Controllers;

use App\Enums\UserType;
use App\Http\Requests\ActivateOfferRequest;
use App\Http\Requests\ClientRequest;
use App\Models\Client;
use App\Models\Offer;
use App\Models\User;
use App\Notifications\OfferActivatedNotification;
use Illuminate\Http\JsonResponse;

class ClientController extends Controller
{
    public function __construct(
        private readonly Client $client,
        private readonly Offer $offer,
        private readonly User $user,
    ) {
    }

    public function index()
    {
        //
    }

    public function store(ClientRequest $request): JsonResponse
    {
        $attributes = $request->validated();
        $userAttributes = $attributes['user'] ?? [];

        $user = $this->user->create([
            ...$userAttributes,
            'type' => UserType::CLIENT,
        ]);

        $client = $user->client()->create($attributes);

        return response()->json($client);
    }

    public function show(Client $client)
    {
        //
    }

    public function update(ClientRequest $request, Client $client)
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

        if (! $client) {
            return response()->json([
                'message' => 'Cliente não encontrado!',
            ], 404);
        }

        /** @var Offer $offer */
        $offer = $this->offer->newQuery()
            ->findOrFail($offerId);

        $availableAmount = $offer->available_amount;

        if ($availableAmount <= 0) {
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

        \DB::transaction(function () use ($client, $offer) {
            $client->offers()->attach($offer);

            $client->user->notify(
                new OfferActivatedNotification($offer)
            );
        });

        return response()->json($client);
    }
}

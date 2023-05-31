<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $amount
 * @property int $deadline
 * @property Carbon $validity
 * @property int $available_amount
 * @property string $slug
 *
 * @method Builder active()
 */
class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'validity',
        'company_id',
    ];

    protected $casts = [
        'validity' => 'date',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function getDeadlineAttribute(): bool|int
    {
        $now = Carbon::now();
        $validity = Carbon::parse($this->validity);

        if ($now->greaterThanOrEqualTo($validity)) {
            return 0;
        }

        return $validity->diff($now)->days;
    }

    public function getAvailableAmountAttribute()
    {
        $result = $this->newQuery()
            ->selectRaw("
                offers.amount,
                COUNT(client_offer.id) as count
            ")
            ->leftJoin('client_offer', 'offers.id', '=', 'client_offer.offer_id')
            ->where('offers.id', $this->id)
            ->groupBy('offers.amount')
            ->first()
            ->toArray();


        return $result['amount'] - $result['count'];
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query
            ->where('amount', '>', 0)
            ->where('validity', '>=', Carbon::now());
    }
}

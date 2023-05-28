<?php

namespace App\Jobs;

use App\Models\Offer;
use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateReports implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
        //
    }

    public function handle(): void
    {
        $now = Carbon::now()->format('Y-m-d H:i:s');
        $subHour = Carbon::now()->subHour()->format('Y-m-d H:i:s');
        $subFifteenMinutes = Carbon::now()->subMinutes(15)->format('Y-m-d H:i:s');

        $countQuery = fn (string $as) => "
            (
                COUNT(CASE WHEN client_offer.created_at BETWEEN ? AND ? THEN 1 ELSE NULL END)
            ) as $as";

        $reports = Offer::query()
            ->selectRaw("
                offers.id AS offer_id,
                {$countQuery('last_hour_count')},
                {$countQuery('last_fifteen_minutes_count')}
             ", [
                $subHour,
                $now,
                $subFifteenMinutes,
                $now,
            ])
            ->leftJoin('client_offer', 'client_offer.offer_id', '=', 'offers.id')
            ->groupBy('offers.id')
            ->active()
            ->get()
            ->toArray();

        foreach ($reports as &$report) {
            $report['created_at'] = Carbon::now();
        }

        Report::query()
            ->insert($reports);
    }
}

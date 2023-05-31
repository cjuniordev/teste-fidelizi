<?php

namespace App\Console;

use App\Jobs\GenerateReports;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
//        if (app()->environment('local')) {
//            $schedule->job(new GenerateReports)->everyMinute();
//        } else {
            $schedule->job(new GenerateReports)->hourly();
//        }
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

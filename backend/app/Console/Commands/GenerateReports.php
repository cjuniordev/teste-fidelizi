<?php

namespace App\Console\Commands;

use App\Jobs\GenerateReports as GenerateReportsJob;
use Illuminate\Console\Command;

class GenerateReports extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'report';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate reports';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        GenerateReportsJob::dispatch();
    }
}

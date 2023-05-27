<?php

if (! function_exists('only_numbers')) {
    function only_numbers(string $value): array|string|null
    {
        return preg_replace('/\D/', '', $value);
    }
}

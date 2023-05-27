<?php

namespace App\Enums;

enum UserType: string
{
    case ADMIN = 'Admin';
    case CLIENT = 'Client';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

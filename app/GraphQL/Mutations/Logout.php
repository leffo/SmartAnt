<?php

namespace App\GraphQL\Mutations;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;

class Logout
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     * @return Authenticatable|null
     */
    public function __invoke($_, array $args)
    {
        $guard = Auth::guard(config('sanctum.guard', 'web'));

        $user = $guard->user();
        $guard->logout();

        return $user;
    }
}

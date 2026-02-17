<?php

namespace App\Http\Middleware;

use App\Core\General\Enums\BooleanDBEnum;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogOutDeactivatedUser
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::user() && Auth::user()->active === BooleanDBEnum::FALSE) {
            if (config('auth.allow_jwt_auth') && Auth::guard('api')->check()) {
                Auth::guard('api')->logout();
            } else {
                Auth::guard('web')->logout();

                $request->session()->invalidate();

                $request->session()->regenerateToken();
            }

            return response('Unauthorized', 419);
        }

        return $next($request);
    }
}

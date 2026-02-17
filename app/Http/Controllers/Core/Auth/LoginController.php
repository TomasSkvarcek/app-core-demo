<?php

namespace App\Http\Controllers\Core\Auth;

use App\Core\Auth\DataTransferObjects\Requests\LoginRequest;
use App\Core\General\Enums\BooleanDBEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * @throws ValidationException
     */
    public function __invoke(LoginRequest $data, Request $request): JsonResponse
    {
        if (!Auth::attempt($data->only('email', 'password')->toArray())) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        $user = Auth::user();
        if ($user->active === BooleanDBEnum::FALSE) {
            throw ValidationException::withMessages([
                'email' => [__('auth.user_deactivated')],
            ]);
        }

        $request->session()->regenerate();

        return response()->json(['user' => $user->only('id', 'first_name', 'last_name', 'email')]);
    }
}

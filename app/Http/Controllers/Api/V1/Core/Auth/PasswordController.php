<?php

namespace App\Http\Controllers\Api\V1\Core\Auth;

use App\Core\Auth\Actions\AuthPasswordChangeAction;
use App\Core\Auth\Actions\AuthPasswordResetAction;
use App\Core\Auth\Actions\AuthPasswordSetupAction;
use App\Core\Auth\Actions\AuthSendPasswordResetMailAction;
use App\Core\Auth\Actions\AuthValidateTokenAction;
use App\Core\Auth\DataTransferObjects\Requests\ChangePasswordRequest;
use App\Core\Auth\DataTransferObjects\Requests\NewPasswordRequest;
use App\Core\Auth\DataTransferObjects\Requests\ResetPasswordRequest;
use App\Core\Auth\DataTransferObjects\Requests\TokenValidationRequest;
use App\Core\Auth\Services\AuthTokenService;
use App\Core\Exceptions\ProcessException;
use App\Domain\User\DataTransferObjects\Requests\UserEmailRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class PasswordController extends Controller
{
    /**
     * @throws ValidationException
     */
    public function createPassword(NewPasswordRequest $data): Response
    {
        try {
            AuthPasswordSetupAction::execute($data);
        } catch (ProcessException $exception) {
            throw ValidationException::withMessages([
                'token' => [$exception->getMessage()],
            ]);
        }

        return response()->noContent();
    }

    /**
     * @throws ValidationException
     */
    public function resetPassword(ResetPasswordRequest $data): Response
    {
        try {
            AuthPasswordResetAction::execute($data);
        } catch (ProcessException $exception) {
            throw ValidationException::withMessages([
                'token' => [$exception->getMessage()],
            ]);
        }

        return response()->noContent();
    }

    public function changePassword(ChangePasswordRequest $data): Response
    {
        AuthPasswordChangeAction::execute($data);

        return response()->noContent();
    }

    public function handleForgotPassword(UserEmailRequest $data): Response
    {
        AuthSendPasswordResetMailAction::execute($data);

        return response()->noContent();
    }

    /**
     * @throws ValidationException
     */
    public function validateToken(TokenValidationRequest $data): Response
    {
        try {
            AuthValidateTokenAction::execute($data->id, $data->token, AuthTokenService::getAuthTokenExpirationMinutes($data->token_type));
        } catch (ProcessException $exception) {
            throw ValidationException::withMessages([
                'token' => [$exception->getMessage()],
            ]);
        }

        return response()->noContent();
    }
}

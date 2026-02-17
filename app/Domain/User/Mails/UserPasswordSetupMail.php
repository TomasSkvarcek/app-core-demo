<?php

namespace App\Domain\User\Mails;

use App\Config\Enums\UrlPaths;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\App;

class UserPasswordSetupMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public string $password_setup_link;

    public function __construct(public User $user, string $password_reset_token, string $hashed_email)
    {
        $this->password_setup_link = url(UrlPaths::PASSWORD_CREATE.'?'.Arr::query(['token' => $password_reset_token, 'id' => $hashed_email]));
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('email.subject.password_setup', ['app_name' => config('app.name')]),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'user.mail.'.App::currentLocale().'.password-setup',
        );
    }
}

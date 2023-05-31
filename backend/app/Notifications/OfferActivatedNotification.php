<?php

namespace App\Notifications;

use App\Models\Offer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OfferActivatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public function __construct(
        private readonly Offer $offer,
    ) {
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $to = env('FRONTEND_URL') . '/ofertas/' . $this->offer->slug . '/' . $this->offer->id;

        return (new MailMessage)
            ->subject('Você ativou uma oferta!')
            ->greeting('Olá, '.$notifiable->name.'!')
            ->line('Você ativou uma oferta!')
            ->action('Ver Oferta', $to)
            ->line('Obrigado por usar nossa aplicação!')
            ->salutation('Atenciosamente, ' . config('app.name'));
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}

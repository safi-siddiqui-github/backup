<?php

use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('About Us')] #[Layout('livewire.layout.app')] class extends Component {};
?>

<div class="flex-seconadry">
    <x-ui.landing-card-one :image="asset('images/contact.jpg')">
        <p class="text-extra-large">About Us</p>
        <p class="w-5/6 max-w-xl tracking-tight">
            Have questions about our platform? Need technical support? Want to request a custom feature or partnership? Just reach out—we'd love to
            hear from you..
        </p>
    </x-ui.landing-card-one>
</div>

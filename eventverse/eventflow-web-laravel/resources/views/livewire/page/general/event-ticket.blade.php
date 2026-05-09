<?php

use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Event Ticket')] #[Layout('livewire.layout.app')] class extends Component {
    public $promo = null;
    public $name = null;
    public $email = null;
    public $phone = null;
};

?>

<div
    class="flex flex-col"
    x-data="{
        show: 'first',
        update(value) {
            this.show = value
        },
    }"
>
    <img
        src="{{ asset('images/carousel-image-one.png') }}"
        alt="carousel-image-one.png"
        class="h-96 w-full object-cover"
    />

    <div class="flex flex-col gap-8 p-4 lg:p-8">
        <div class="flex flex-col gap-4">
            <p class="heading-two">Summer Music Festival 2025</p>

            <div class="pill-purple">Music</div>

            <p class="max-w-md">Enjoy an evening of smooth jazz performances by local and international artists. Dinner packages available.</p>

            <div class="flex items-center gap-2">
                <livewire:svg.calender class="text-primary" />
                <p class="">Friday 11 June, 11:50</p>
            </div>

            <div class="flex items-center gap-2">
                <livewire:svg.map class="text-primary" />
                <p class="">Central Park, New York</p>
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <p class="heading-three">Tickets (3)</p>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                @for ($i=1; $i< 6; $i++)
                    <div class="gray-box flex-col">
                        <p class="heading-three text-primary">{{ 77 * $i }}</p>

                        <div class="flex flex-wrap items-center gap-2">
                            <livewire:svg.ticket-outlined />
                            <p class="">X{{ $i }}</p>
                            <p class="">Ticket - Early Bird</p>
                        </div>
                    </div>
                @endfor
            </div>
        </div>

        <div
            class="border-box gap-4 md:flex-row md:justify-between md:gap-8 md:p-8"
            x-transition
            x-show="show === 'first'"
        >
            <div class="flex flex-col gap-4 md:w-1/3">
                <p class="heading-three">Do you have a promo code?</p>

                <div class="flex flex-col gap-1">
                    <label
                        for="promo"
                        class="font-medium"
                    >
                        Promo
                    </label>
                    <input
                        id="promo"
                        wire:model="promo"
                        type="text"
                        class="input-one"
                        placeholder="SALE-44"
                    />
                    @error('promo')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>

                <p class="leading-one">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam quidem minus eligendi at. Sit accusamus impedit dignissimos, eos
                    alias natus.
                </p>
            </div>

            <div class="border-primary"></div>

            <div class="flex flex-col gap-4 md:flex-1">
                <div class="flex items-center justify-between">
                    <p class="">Tickets Price</p>
                    <p class="heading-four">$372</p>
                </div>
                <div class="flex items-center justify-between">
                    <p class="">Service Fee</p>
                    <p class="heading-four">$20</p>
                </div>
                <div class="flex items-center justify-between">
                    <p class="">Transaction Fee</p>
                    <p class="heading-four">$27</p>
                </div>

                <hr class="border-primary" />

                <div class="flex items-center justify-between">
                    <p class="">Total</p>
                    <p class="heading-four">$548</p>
                </div>
                <button
                    class="purple-button"
                    @click="update('second')"
                >
                    <livewire:svg.ticket-outlined />
                    <span>Continue</span>
                </button>

                <p class="leading-one text-center">
                    <span class="text-black">Refund Policy:</span>
                    Refunds available up to 7 days before the event.
                </p>
            </div>
        </div>

        <div
            class="border-box gap-4 md:flex-row md:justify-between md:gap-8 md:p-8"
            x-transition
            x-show="show === 'second'"
        >
            <div class="flex flex-col gap-4 md:w-1/3">
                <p class="heading-three">Do you have a promo code?</p>

                <div class="flex flex-col gap-1">
                    <label
                        for="name"
                        class="font-medium"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        wire:model="name"
                        type="text"
                        class="input-one"
                        placeholder="John"
                    />
                    @error('name')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>
                <div class="flex flex-col gap-1">
                    <label
                        for="email"
                        class="font-medium"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        wire:model="email"
                        type="text"
                        class="input-one"
                        placeholder="johndoe@gmail.com"
                    />
                    @error('email')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>
                <div class="flex flex-col gap-1">
                    <label
                        for="phone"
                        class="font-medium"
                    >
                        Phone
                    </label>
                    <input
                        id="phone"
                        wire:model="phone"
                        type="text"
                        class="input-one"
                        placeholder="999 777 666"
                    />
                    @error('phone')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <div class="border-primary"></div>

            <div class="flex flex-col gap-4 md:flex-1">
                <div class="flex items-center justify-between">
                    <p class="">Tickets Price</p>
                    <p class="heading-four">$372</p>
                </div>
                <div class="flex items-center justify-between">
                    <p class="">Service Fee</p>
                    <p class="heading-four">$20</p>
                </div>
                <div class="flex items-center justify-between">
                    <p class="">Transaction Fee</p>
                    <p class="heading-four">$27</p>
                </div>

                <hr class="border-primary" />

                <div class="flex items-center justify-between">
                    <p class="">Total</p>
                    <p class="heading-four">$548</p>
                </div>

                <hr class="border-light" />

                <p class="heading-three">Payment Method</p>

                <div class="white-button w-fit">
                    <input
                        type="radio"
                        id="visa"
                        name="payment"
                    />
                    <label for="visa">Visa | Mastercard</label>
                </div>

                <div class="white-button w-fit">
                    <input
                        type="radio"
                        id="google"
                        name="payment"
                    />
                    <label for="google">Google Pay</label>
                </div>

                <div class="flex items-center gap-1">
                    <input
                        type="checkbox"
                        id="acceptTerms"
                        class="size-4 accent-purple-500"
                    />
                    <label
                        for="acceptTerms"
                        class="font-medium"
                    >
                        I accept terms & conditions
                    </label>
                </div>

                <button class="purple-button">
                    <livewire:svg.ticket-outlined />
                    <span>Pay</span>
                </button>

                <button
                    class="gray-box"
                    @click="update('first')"
                >
                    <livewire:svg.arrow-left-outlined />
                    <span>Back to promo</span>
                </button>

                <p class="leading-one text-center">
                    <span class="text-black">Refund Policy:</span>
                    Refunds available up to 7 days before the event.
                </p>
            </div>
        </div>
    </div>
</div>

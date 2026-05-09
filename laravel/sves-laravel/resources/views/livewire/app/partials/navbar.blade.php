<?php

use App\Enums\ToastBarEnum;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\CartRequest;
use App\Http\Requests\NotificationRequest;
use Flux\Flux;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Computed;
use Livewire\Attributes\On;
use Livewire\Volt\Component;
use Livewire\WithPagination;

new class extends Component {
    use WithPagination;

    #[Computed]
    public function user()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        return $user
            ? $user->load([
                'image',
                'carts',
                'carts.product',
                'carts.product.image',
                'notifications',
            ])
            : null;
    }

    #[Computed]
    public function logoUrl()
    {
        return Storage::url('web/logo.jpg');
    }

    #[Computed]
    public function cartCount()
    {
        return $this->user()?->carts?->sum('quantity') ?? 0;
    }

    public function handleCart($action, $product_id)
    {
        $cartRequest = new CartRequest();

        $user_id = Auth::id();
        if (! $user_id) {
            Flux::modal('app-login')->show();
            return;
        }

        if ($action == 'add') {
            $cartRequest->add(user_id: $user_id, product_id: $product_id);
        } else {
            $cartRequest->remove(user_id: $user_id, product_id: $product_id);
        }
    }

    #[On('cart-updated')]
    public function cartUpdated()
    {
        $this->resetPage();
    }

    public function logout()
    {
        $authRequest = new AuthRequest();
        $authRequest->attemptLogoutFN();
        //
        session()->flash('status', ToastBarEnum::LOGOUT_SUCCESS);
        //
        $this->redirectRoute('app.home', navigate: true);
    }

    #[Computed]
    public function urnCount()
    {
        return $this->user?->unreadNotifications?->count() ?? 0;
    }

    public function handleNotification($action, $notification_id)
    {
        $notificationRequest = new NotificationRequest();

        $user_id = Auth::id();
        if (! $user_id) {
            Flux::modal('app-login')->show();
            return;
        }

        if ($action == 'read') {
            $notificationRequest->markRead(notification_id: $notification_id);
        } else {
            $notificationRequest->markUnread(notification_id: $notification_id);
        }
    }

    #[On('notification-updated')]
    public function notificationUpdated()
    {
        $this->resetPage();
    }
};

?>

<div>
    <flux:header
        class="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
        container
    >
        <flux:sidebar.toggle
            class="lg:hidden"
            icon="bars-2"
            inset="left"
        />

        <flux:brand
            class="max-lg:hidden"
            name="SVES Store"
            :href="route('app.home')"
            :logo="$this->logoUrl"
            wire:navigate
        />

        <flux:navbar class="max-lg:hidden">
            <flux:navbar.item
                :current="request()->routeIs('app.home')"
                :href="route('app.home')"
                icon="home"
                wire:navigate
            >
                Home
            </flux:navbar.item>
            <flux:navbar.item
                :current="request()->routeIs('app.categories')"
                :href="route('app.categories')"
                icon="square-2-stack"
                wire:navigate
            >
                Categories
            </flux:navbar.item>
            <flux:navbar.item
                :current="request()->routeIs('app.search')"
                :href="route('app.search')"
                icon="magnifying-glass"
                wire:navigate
            >
                Search
            </flux:navbar.item>

            @auth
                <flux:navbar.item
                    :href="route('app.orders')"
                    icon="shopping-bag"
                    wire:navigate
                >
                    Orders
                </flux:navbar.item>
            @else
                <flux:modal.trigger name="app-login">
                    <flux:navbar.item icon="shopping-bag">Orders</flux:navbar.item>
                </flux:modal.trigger>
            @endauth
        </flux:navbar>

        <flux:spacer />

        <flux:navbar class="">
            @auth
                <flux:dropdown class="max-sm:hidden">
                    <flux:navbar.item
                        :badge="$this->cartCount"
                        :current="request()->routeIs('app.cart')"
                        icon="shopping-cart"
                    />

                    <flux:navmenu class="w-96 space-y-2">
                        <div class="flex flex-col gap-4 p-4">
                            <flux:heading size="xl">My Cart ({{ $this->cartCount }})</flux:heading>

                            @foreach ($this->user?->carts ?? [] as $each)
                                <div
                                    class="flex gap-2"
                                    :key="$each->id.'cart'"
                                >
                                    <img
                                        class="h-28 w-28 rounded object-cover"
                                        alt="{{ $each->product->image->imageUrl }}"
                                        src="{{ $each->product->image->imageUrl }}"
                                    />

                                    <div class="flex w-full flex-col">
                                        <flux:heading size="lg">
                                            {{ $each->product->name }}
                                        </flux:heading>
                                        <flux:text class="text-xl">
                                            ${{ $each->product->price }}
                                        </flux:text>

                                        <flux:spacer />

                                        <flux:button.group>
                                            <flux:button
                                                class="w-full"
                                                wire:click="handleCart('add', {{ $each->product->id }})"
                                                icon="plus"
                                            />
                                            <flux:button
                                                class="px-4"
                                                square
                                            >
                                                {{ $each->quantity }}
                                            </flux:button>

                                            <flux:button
                                                class="w-full"
                                                wire:click="handleCart('remove', {{ $each->product->id }})"
                                                icon="trash"
                                            />
                                        </flux:button.group>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <flux:navmenu.item
                            class="flex justify-center"
                            :href="route('app.cart')"
                            wire:navigate
                        >
                            View Cart
                        </flux:navmenu.item>
                    </flux:navmenu>
                </flux:dropdown>

                <flux:dropdown class="max-sm:hidden">
                    <flux:navbar.item
                        :badge="$this->urnCount"
                        :current="request()->routeIs('app.notifications')"
                        icon="bell"
                    />

                    <flux:navmenu class="w-96 space-y-2">
                        <div class="flex flex-col gap-4 p-4">
                            <flux:heading size="xl">
                                My Notifications ({{ $this->urnCount }})
                            </flux:heading>

                            @foreach ($this->user?->notifications ?? [] as $each)
                                <div
                                    class="flex items-center gap-2"
                                    key="$each->id.'notification'"
                                >
                                    <div class="flex flex-col">
                                        <flux:heading>
                                            {{ $each->data['name'] }}
                                        </flux:heading>
                                        <flux:text>
                                            {{ $each->data['msg'] }}
                                        </flux:text>
                                    </div>

                                    <flux:spacer />

                                    @if ($each->read_at)
                                        <flux:button
                                            class=""
                                            disabled
                                            icon="bell"
                                            variant="subtle"
                                        />
                                    @else
                                        <flux:button
                                            class=""
                                            wire:click="handleNotification('read', '{{ $each->id }}')"
                                            icon="bell"
                                        />
                                    @endif
                                </div>
                            @endforeach
                        </div>

                        <flux:navmenu.item
                            class="flex justify-center"
                            :href="route('app.notifications')"
                            wire:navigate
                        >
                            View Notifications
                        </flux:navmenu.item>
                    </flux:navmenu>
                </flux:dropdown>
            @else
                <flux:modal.trigger name="app-login">
                    <flux:navbar.item icon="shopping-cart"></flux:navbar.item>
                    <flux:navbar.item icon="bell"></flux:navbar.item>
                </flux:modal.trigger>
            @endauth

            <flux:dropdown
                align="end"
                x-data
            >
                <flux:button
                    class="group"
                    square
                    variant="subtle"
                    aria-label="Preferred color scheme"
                >
                    <flux:icon.sun
                        class="text-zinc-500 dark:text-white"
                        variant="mini"
                        x-show="$flux.appearance === 'light'"
                    />
                    <flux:icon.moon
                        class="text-zinc-500 dark:text-white"
                        variant="mini"
                        x-show="$flux.appearance === 'dark'"
                    />
                    <flux:icon.moon
                        variant="mini"
                        x-show="$flux.appearance === 'system' && $flux.dark"
                    />
                    <flux:icon.sun
                        variant="mini"
                        x-show="$flux.appearance === 'system' && ! $flux.dark"
                    />
                </flux:button>
                <flux:menu>
                    <flux:menu.item
                        icon="sun"
                        x-on:click="$flux.appearance = 'light'"
                    >
                        Light
                    </flux:menu.item>
                    <flux:menu.item
                        icon="moon"
                        x-on:click="$flux.appearance = 'dark'"
                    >
                        Dark
                    </flux:menu.item>
                    <flux:menu.item
                        icon="computer-desktop"
                        x-on:click="$flux.appearance = 'system'"
                    >
                        System
                    </flux:menu.item>
                </flux:menu>
            </flux:dropdown>

            @auth
                <flux:dropdown
                    align="end"
                    position="bottom"
                >
                    <flux:profile
                        :avatar="$this->user?->image?->image_url ?? $this->user?->avatar"
                        :name="$this->user?->name"
                    />

                    <flux:navmenu>
                        <flux:navmenu.item
                            :href="route('app.profile')"
                            icon="user"
                            wire:navigate
                        >
                            Account
                        </flux:navmenu.item>
                        <flux:navmenu.item
                            wire:click="logout"
                            icon="arrow-right-start-on-rectangle"
                        >
                            Logout
                        </flux:navmenu.item>
                    </flux:navmenu>
                </flux:dropdown>
            @else
                <flux:modal.trigger name="app-login">
                    <flux:navbar.item icon="arrow-right-start-on-rectangle">Login</flux:navbar.item>
                </flux:modal.trigger>
            @endauth
        </flux:navbar>
    </flux:header>

    <flux:sidebar
        class="border border-zinc-200 bg-zinc-50 lg:hidden rtl:border-r-0 rtl:border-l dark:border-zinc-700 dark:bg-zinc-900"
        stashable
        sticky
    >
        <flux:sidebar.toggle
            class="lg:hidden"
            icon="x-mark"
        />

        <flux:brand
            name="SVES Store"
            :href="route('app.home')"
            :logo="$this->logoUrl"
            wire:navigate
        />

        <flux:navlist variant="outline">
            <flux:navlist.item
                :current="request()->routeIs('app.home')"
                :href="route('app.home')"
                icon="home"
                wire:navigate
            >
                Home
            </flux:navlist.item>
            <flux:navlist.item
                :current="request()->routeIs('app.categories')"
                :href="route('app.categories')"
                icon="square-2-stack"
                wire:navigate
            >
                Categories
            </flux:navlist.item>
            <flux:navlist.item
                :current="request()->routeIs('app.search')"
                :href="route('app.search')"
                icon="magnifying-glass"
                wire:navigate
            >
                Search
            </flux:navlist.item>

            @auth
                <flux:navlist.item
                    :badge="$this->cartCount"
                    :href="route('app.cart')"
                    icon="shopping-cart"
                    wire:navigate
                >
                    Cart
                </flux:navlist.item>

                <flux:navlist.item
                    :href="route('app.orders')"
                    icon="shopping-bag"
                    wire:navigate
                >
                    Orders
                </flux:navlist.item>

                <flux:navlist.item
                    :badge="$this->urnCount"
                    :href="route('app.notifications')"
                    icon="bell"
                    wire:navigate
                >
                    Notifications
                </flux:navlist.item>
            @else
                <flux:modal.trigger name="app-login">
                    <flux:navlist.item icon="shopping-cart">Cart</flux:navlist.item>
                    <flux:navlist.item icon="shopping-bag">Order</flux:navlist.item>
                    <flux:navlist.item icon="bell">Notifications</flux:navlist.item>
                </flux:modal.trigger>
            @endauth

            <flux:navlist.group
                class="max-lg:hidden"
                expandable
                heading="Favorites"
            >
                <flux:navlist.item href="#">Marketing site</flux:navlist.item>
                <flux:navlist.item href="#">Android app</flux:navlist.item>
                <flux:navlist.item href="#">Brand guidelines</flux:navlist.item>
            </flux:navlist.group>
        </flux:navlist>

        <flux:spacer />

        <flux:navlist variant="outline">
            <flux:navlist.item
                href="#"
                icon="cog-6-tooth"
            >
                Settings
            </flux:navlist.item>

            <flux:navlist.item
                href="#"
                icon="information-circle"
            >
                Help
            </flux:navlist.item>

            @auth
                <flux:navlist.item
                    :href="route('app.profile')"
                    icon="user"
                    wire:navigate
                >
                    {{ $this->user?->name }}
                </flux:navlist.item>

                <flux:navlist.item
                    wire:click="logout"
                    icon="arrow-right-start-on-rectangle"
                >
                    Logout
                </flux:navlist.item>
            @endauth
        </flux:navlist>
    </flux:sidebar>
</div>

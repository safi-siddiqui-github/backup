<?php

use Livewire\Volt\Component;

new class extends Component {
    public $class = null;
}; ?>

<svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    class="{{ $class }} size-6"
>
    <path
        d="M20 9V17C20 18.7 18.7 20 17 20H3C1.3 20 0 18.7 0 17V9H20ZM1 10V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V10H1ZM14 0C14.6 0 15 0.4 15 1V2H17C18.7 2 20 3.3 20 5V7H0V5C0 3.3 1.3 2 3 2H5V1C5 0.4 5.4 0 6 0C6.6 0 7 0.4 7 1V2H13V1C13 0.4 13.4 0 14 0Z"
        fill="currentColor"
    />
</svg>

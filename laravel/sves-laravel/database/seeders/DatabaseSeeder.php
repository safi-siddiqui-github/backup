<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Color;
use App\Models\Image;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\File;

enum Path: string
{
    case TEMP = 'livewire-tmp';
    case WEB = 'web';
    case USERS = 'users';
    case CATEGORIES = 'categories';
    case PRODUCTS = 'products';
}

enum ColorEnum: int
{
    case RED = 1;
    case ORANGE = 2;
    case AMBER = 3;
    case YELLOW = 4;
    case LIME = 5;
    case GREEN = 6;
    case EMERALD = 7;
    case TEAL = 8;
    case CYAN = 9;
    case SKY = 10;
    case BLUE = 11;
    case INDIGO = 12;
    case VIOLET = 13;
    case PURPLE = 14;
    case FUCHSIA = 15;
    case PINK = 16;
    case ROSE = 17;
    case SLATE = 18;
    case GRAY = 19;
    case ZINC = 20;
    case NEUTRAL = 21;
    case STONE = 22;
    case BLACK = 23;
    case WHITE = 24;
}

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        function saveImage(
            $slug,
            Path $path,
            $save = true,
            $user_id = null,
            $category_id = null,
            $product_id = null,
            $order = null,
            $color_id = null,
            $video = false
        ) {
            $defExt = '.jpg';

            if ($video) {
                $defExt = '.mp4';
            }

            $file = new File(public_path('/default/' . $slug . $defExt));
            $name = $slug . '.' . $file->extension();

            $filePath = Storage::putFileAs($path->value, $file, $name);

            if (!$save) {
                return;
            }

            $image = new Image();

            if ($user_id) {
                $image->user_id = $user_id;
                //
            } elseif ($category_id) {
                $image->category_id = $category_id;
                //
            } elseif ($product_id) {
                $image->product_id = $product_id;
                //
            }

            if ($order) {
                $image->order = $order;
            }

            if ($color_id) {
                $image->color_id = $color_id;
            }

            $image->name = $name;
            $image->size = $file->getSize();
            $image->type = $file->getMimeType();
            $image->path = $filePath;
            $image->save();
        }

        try {
            Storage::deleteDirectory(Path::TEMP->value);
            Storage::deleteDirectory(Path::WEB->value);
            Storage::deleteDirectory(Path::USERS->value);
            Storage::deleteDirectory(Path::CATEGORIES->value);
            Storage::deleteDirectory(Path::PRODUCTS->value);

            // Web Images
            $images = ['logo', 'refund', 'discount', 'delivery', 'pledge', 'sale'];

            foreach ($images as $each) {
                saveImage(
                    slug: $each,
                    path: Path::WEB,
                    save: false,
                    user_id: null,
                    category_id: null,
                    product_id: null,
                    order: null,
                    color_id: null,
                    video: false
                );
            }

            $videos = ['rays'];

            foreach ($videos as $each) {
                saveImage(
                    slug: $each,
                    path: Path::WEB,
                    save: false,
                    user_id: null,
                    category_id: null,
                    product_id: null,
                    order: null,
                    color_id: null,
                    video: true
                );
            }

            $colors = [
                'red', // 1
                'orange', // 2
                'amber', // 3
                'yellow', // 4
                'lime', // 5
                'green', // 6
                'emerald', // 7
                'teal', // 8
                'cyan', // 9
                'sky', // 10
                'blue', // 11
                'indigo', // 12
                'violet', // 13
                'purple', // 14
                'fuchsia', // 15
                'pink', // 16
                'rose', // 17
                'slate', // 18
                'gray', // 19
                'zinc', // 20
                'neutral', // 21
                'stone', // 22
                'black', // 23
                'white', // 24
            ];

            foreach ($colors as $each) {
                $color = new Color();
                $color->name = $each;
                $color->save();
            }

            // User
            $user = new User();
            $user->name = 'Safi Siddiqui';
            $user->email = 'safisiddiqui.work@gmail.com';
            $user->username = 'safisiddiqui.work';
            $user->password = 'safisiddiqui.work';
            $user->email_verified_at = now();
            $user->save();

            // User Image
            saveImage(
                slug: $user->username,
                path: Path::USERS,
                save: true,
                user_id: $user->id,
                category_id: null,
                product_id: null,
                order: null,
                color_id: null,
                video: false
            );

            // Fake Users
            $emails = [
                'oliver.smith@gmail.com',
                'amelia.johnson@gmail.com',
                'harry.brown@gmail.com',
                'isla.jones@gmail.com',
                'jack.taylor@gmail.com',
                'sophie.williams@gmail.com',
                'charlie.davies@gmail.com',
                'grace.evans@gmail.com',
                'george.wilson@gmail.com',
                'mia.thomas@gmail.com',
                'jacob.moore@gmail.com',
                'lily.walker@gmail.com',
                'freddie.hall@gmail.com',
                'ruby.clark@gmail.com',
                'archie.robinson@gmail.com',
                'evie.lewis@gmail.com',
                'alfie.young@gmail.com',
                'ella.king@gmail.com',
                'leo.hill@gmail.com',
                'ivy.green@gmail.com',
                'theo.scott@gmail.com',
                'florence.adams@gmail.com',
                'oscar.baker@gmail.com',
                'phoebe.mitchell@gmail.com',
                'finley.carter@gmail.com',
                'millie.hughes@gmail.com',
                'henry.ward@gmail.com',
                'rosie.morgan@gmail.com',
                'archie.cooper@gmail.com',
                'daisy.foster@gmail.com',
                'isaac.kelly@gmail.com',
                'elsie.bennett@gmail.com',
                'arthur.bailey@gmail.com',
                'poppy.wright@gmail.com',
                'jude.howard@gmail.com',
                'matilda.wood@gmail.com',
                'sebastian.brooks@gmail.com',
                'erin.bell@gmail.com',
                'harvey.burns@gmail.com',
                'layla.turner@gmail.com',
                'louis.morris@gmail.com',
                'nancy.murray@gmail.com',
                'elliot.dixon@gmail.com',
                'maisie.riley@gmail.com',
                'hugo.harrison@gmail.com',
                'emma.franklin@gmail.com',
                'jasper.chapman@gmail.com',
                'holly.harper@gmail.com',
                'mason.fletcher@gmail.com',
                'summer.reid@gmail.com',
            ];

            foreach ($emails as $key => $each) {
                // Convert email prefix to name
                $namePart = Str::before($each, '@'); // e.g., 'summer.reid'
                $name = collect(explode('.', $namePart)) // ['summer', 'reid']
                    ->map(fn($word) => Str::ucfirst($word)) // ['Summer', 'Reid']
                    ->join(' '); // 'Summer Reid'

                $username = Str::slug(Str::lower(Str::before($each, '@')), '-');

                $user = new User();
                $user->name = $name;
                $user->email = $each;
                $user->username = $username;
                $user->password = $username;
                $user->email_verified_at = $key % 2 === 0 ? now() : null;
                $user->save();

                // Fake User Image
                saveImage(
                    slug: 'user-' . mt_rand(1, 10),
                    path: Path::USERS,
                    save: true,
                    user_id: $user->id,
                    category_id: null,
                    product_id: null,
                    order: null,
                    color_id: null,
                    video: false
                );
            }

            $categories = [
                [
                    'name' => 'Electronics & Gadgets',
                    'slug' => 'electronics',
                    'image' => 'electronics',
                    'description' => 'Discover gadgets that make life easier!',
                    'subCategories' => [
                        [
                            'name' => 'phones',
                            'slug' => 'phones',
                            'image' => 'phone-blue',
                            'description' => 'Smartphones that keep you connected always.',
                            'products' => [
                                [
                                    'name' => 'Shadow Mate Phone',
                                    'slug' => 'shadow-mate-phone',
                                    'description' =>
                                        'This Blue Phone offers a sleek design, high-performance features, and incredible battery life. It provides a smooth and responsive user experience, perfect for staying connected with friends, work, and entertainment. Enjoy a high-quality camera, impressive storage capacity, and seamless software integration. Its vibrant blue color adds a refreshing touch, making it a stylish companion for your daily activities. Whether you\'re using it for work or play, this phone is a reliable and stylish choice that won\'t disappoint. Stay ahead with the latest technology in the palm of your hand.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::BLACK,
                                            'name' => 'phone-black',
                                        ],
                                        [
                                            'color_id' => ColorEnum::NEUTRAL,
                                            'name' => 'phone-neutral',
                                        ],
                                        [
                                            'color_id' => ColorEnum::WHITE,
                                            'name' => 'phone-white',
                                        ],
                                        [
                                            'color_id' => ColorEnum::BLUE,
                                            'name' => 'phone-blue',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'Smart Watches',
                            'slug' => 'smart-watches',
                            'image' => 'smart-watch-zinc',
                            'description' => 'Fashionable and functional watches for all needs.',
                            'products' => [
                                [
                                    'name' => 'Stealth Wear Watch',
                                    'slug' => 'stealth-wear-watch',
                                    'description' =>
                                        'This White Smart Watch is your perfect fitness and connectivity companion. Featuring a sleek and modern design, it blends seamlessly into your daily wear. Track your workouts, monitor your health, and stay connected with notifications directly on your wrist. With a long-lasting battery and multiple customization options, this smartwatch is built to keep up with your active lifestyle. It also integrates well with various apps, ensuring you never miss a beat. Whether for fitness tracking, health monitoring, or simply staying connected, this smartwatch offers incredible value and reliability.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::BLACK,
                                            'name' => 'smart-watch-black',
                                        ],
                                        [
                                            'color_id' => ColorEnum::STONE,
                                            'name' => 'smart-watch-stone',
                                        ],
                                        [
                                            'color_id' => ColorEnum::WHITE,
                                            'name' => 'smart-watch-white',
                                        ],
                                        [
                                            'color_id' => ColorEnum::ZINC,
                                            'name' => 'smart-watch-zinc',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'laptops',
                            'slug' => 'laptops',
                            'image' => 'laptop-purple',
                            'description' => 'Laptops designed to elevate your productivity.',
                            'products' => [
                                [
                                    'name' => 'Lunar White Laptop',
                                    'slug' => 'lunar-white-laptop',
                                    'description' =>
                                        'The Apple laptop is a powerful and sleek device designed to deliver exceptional performance. Equipped with cutting-edge technology, it provides seamless multitasking, fast processing speeds, and long battery life. Whether for work, creative projects, or entertainment, this laptop is versatile enough to handle any task with ease. Its high-resolution display offers stunning visuals, perfect for media consumption and productivity tasks alike. The Apple laptop\'s lightweight design makes it easy to carry anywhere, ensuring you stay productive on the go. Experience unmatched reliability and innovation with this high-quality device.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::STONE,
                                            'name' => 'laptop-stone',
                                        ],
                                        [
                                            'color_id' => ColorEnum::SLATE,
                                            'name' => 'laptop-slate',
                                        ],
                                        [
                                            'color_id' => ColorEnum::NEUTRAL,
                                            'name' => 'laptop-neutral',
                                        ],
                                        [
                                            'color_id' => ColorEnum::PURPLE,
                                            'name' => 'laptop-purple',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'cameras',
                            'slug' => 'cameras',
                            'image' => 'camera-black',
                            'description' => 'Capture every moment with high-quality cameras.',
                            'products' => [
                                [
                                    'name' => 'Leather Lens Camera',
                                    'slug' => 'leather-lens-camera',
                                    'description' =>
                                        'The Canon Camera brings your photography to life with exceptional quality and precision. Whether you\re capturing stunning landscapes, portraits, or everyday moments, this camera ensures your memories are captured in vivid detail. Its fast autofocus and image stabilization features allow for clear, crisp shots in any condition. With a wide range of customizable settings, it caters to both beginner and advanced photographers. The compact design makes it portable, while its durable construction guarantees longevity. Whether you\'re a professional or hobbyist, the Canon Camera provides everything you need to take breathtaking photos and videos.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::AMBER,
                                            'name' => 'camera-amber',
                                        ],
                                        [
                                            'color_id' => ColorEnum::YELLOW,
                                            'name' => 'camera-yellow',
                                        ],
                                        [
                                            'color_id' => ColorEnum::BLUE,
                                            'name' => 'camera-blue',
                                        ],
                                        [
                                            'color_id' => ColorEnum::BLACK,
                                            'name' => 'camera-black',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'headphones',
                            'slug' => 'headphones',
                            'image' => 'headphone-stone',
                            'description' => 'Premium audio quality for an immersive experience.',
                            'products' => [
                                [
                                    'name' => 'Midnight Beats Headphone',
                                    'slug' => 'midnight-beats-headphone',
                                    'description' =>
                                        'The Sony Headphone delivers an unmatched audio experience with deep bass, clear treble, and excellent noise isolation. Perfect for music lovers and audio enthusiasts, these headphones provide rich, high-fidelity sound that enhances every note. Whether you\'re listening to your favorite playlist, watching movies, or gaming, these headphones ensure immersive sound that pulls you into the experience. Their comfortable, padded ear cups provide a snug fit, allowing for hours of listening without discomfort. Built to last, these headphones are durable, lightweight, and easy to fold, making them the ideal portable companion for audio enjoyment.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::BLACK,
                                            'name' => 'headphone-black',
                                        ],
                                        [
                                            'color_id' => ColorEnum::GREEN,
                                            'name' => 'headphone-green',
                                        ],
                                        [
                                            'color_id' => ColorEnum::ORANGE,
                                            'name' => 'headphone-orange',
                                        ],
                                        [
                                            'color_id' => ColorEnum::STONE,
                                            'name' => 'headphone-stone',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'screens',
                            'slug' => 'screens',
                            'image' => 'screen-purple',
                            'description' => 'Displays that provide clear, vibrant visuals.',
                            'products' => [
                                [
                                    'name' => 'Ocean Blue Screen',
                                    'slug' => 'ocean-blue-screen',
                                    'description' =>
                                        'The LED Screen offers a stunning display with vibrant colors and crystal-clear visuals. Whether for watching movies, gaming, or working, this screen provides an immersive viewing experience. With high resolution, excellent brightness, and sharp contrast, every detail comes to life. The screen\'s energy-efficient LED technology reduces power consumption while delivering top-notch quality. It\'s designed with your comfort in mind, providing flicker-free and eye-friendly viewing for long periods. The sleek design and slim profile make it a perfect fit for any setup, ensuring you enjoy both performance and style in one package.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::BLUE,
                                            'name' => 'screen-blue',
                                        ],
                                        [
                                            'color_id' => ColorEnum::WHITE,
                                            'name' => 'screen-white',
                                        ],
                                        [
                                            'color_id' => ColorEnum::ORANGE,
                                            'name' => 'screen-orange',
                                        ],
                                        [
                                            'color_id' => ColorEnum::PURPLE,
                                            'name' => 'screen-purple',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                [
                    'name' => 'Fashion & Apparel',
                    'slug' => 'fashion',
                    'image' => 'fashion',
                    'description' => 'Find the latest trends for everyone!',
                    'subCategories' => [
                        [
                            'name' => 'men',
                            'slug' => 'men',
                            'image' => 'men-white',
                            'description' => 'Fashionable clothing to suit every occasion.',
                            'products' => [
                                [
                                    'name' => 'Ash Stone Shirt',
                                    'slug' => 'ash-stone-shirt',
                                    'description' =>
                                        'The Men Casual outfit is designed for ultimate comfort and style. Made from soft, breathable fabrics, it provides a relaxed fit perfect for any casual outing. The versatile design allows you to pair it easily with other wardrobe essentials, making it a go-to option for day-to-day wear. Whether you\'re hanging out with friends, running errands, or just relaxing, this outfit offers the perfect balance of comfort and fashion. With its modern cut and trendy look, the Men Casual outfit ensures that you look sharp and feel great throughout the day.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::STONE,
                                            'name' => 'men-stone',
                                        ],
                                        [
                                            'color_id' => ColorEnum::BLUE,
                                            'name' => 'men-blue',
                                        ],
                                        [
                                            'color_id' => ColorEnum::ORANGE,
                                            'name' => 'men-orange',
                                        ],
                                        [
                                            'color_id' => ColorEnum::WHITE,
                                            'name' => 'men-white',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'women',
                            'slug' => 'women',
                            'image' => 'women-white',
                            'description' => 'Elegance and fashion for every woman.',
                            'products' => [
                                [
                                    'name' => 'Cotton Candy Top',
                                    'slug' => 'cotton-candy-top',
                                    'description' =>
                                        'The Women Casual outfit combines elegance and comfort, perfect for any casual day. Made from high-quality, soft fabrics, it provides a relaxed yet chic look that\'s ideal for both lounging at home or meeting up with friends. The easy-to-wear design pairs well with sneakers, sandals, or boots, making it versatile for any occasion. Its flattering cut accentuates your natural shape, offering both style and ease. With timeless design and casual appeal, the Women Casual outfit ensures you look effortlessly put-together while feeling completely comfortable in any setting.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::PINK,
                                            'name' => 'women-pink',
                                        ],
                                        [
                                            'color_id' => ColorEnum::YELLOW,
                                            'name' => 'women-yellow',
                                        ],
                                        [
                                            'color_id' => ColorEnum::ORANGE,
                                            'name' => 'women-orange',
                                        ],
                                        [
                                            'color_id' => ColorEnum::WHITE,
                                            'name' => 'women-white',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'kids',
                            'slug' => 'kids',
                            'image' => 'kids-yellow',
                            'description' => 'Fun, comfortable clothing for little ones.',
                            'products' => [
                                [
                                    'name' => 'Little Blue Top',
                                    'slug' => 'little-blue-top',
                                    'description' =>
                                        'The Kids Suite is perfect for keeping your little one both cozy and stylish. Made from soft, breathable materials, it ensures all-day comfort, whether they\'re playing, running, or resting. The vibrant colors and fun patterns add a playful touch, while the design offers easy movement for active kids. The outfit is easy to dress and ideal for a variety of occasions, from casual days at the park to family gatherings. With durability built in, the Kids Suite is designed to withstand wear and tear, making it an essential addition to any child\'s wardrobe.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::BLUE,
                                            'name' => 'kids-blue',
                                        ],
                                        [
                                            'color_id' => ColorEnum::RED,
                                            'name' => 'kids-red',
                                        ],
                                        [
                                            'color_id' => ColorEnum::PINK,
                                            'name' => 'kids-pink',
                                        ],
                                        [
                                            'color_id' => ColorEnum::YELLOW,
                                            'name' => 'kids-yellow',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'hats',
                            'slug' => 'hats',
                            'image' => 'hat-white',
                            'description' => 'Accessorize your look with stylish hats.',
                            'products' => [
                                [
                                    'name' => 'Silver Gray Hat',
                                    'slug' => 'silver-gray-hat',
                                    'description' =>
                                        'The White Cap is a classic accessory that adds the perfect finishing touch to any casual outfit. Made from lightweight, breathable material, it keeps you comfortable all day long while offering sun protection. Its adjustable strap ensures a custom fit, making it suitable for all head sizes. The clean white color is versatile, easily pairing with any style, from sporty to casual. Whether you\'re out running errands, enjoying outdoor activities, or simply looking for a stylish way to complete your look, the White Cap is the ideal choice for both comfort and style.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::GRAY,
                                            'name' => 'hat-gray',
                                        ],
                                        [
                                            'color_id' => ColorEnum::STONE,
                                            'name' => 'hat-stone',
                                        ],
                                        [
                                            'color_id' => ColorEnum::ORANGE,
                                            'name' => 'hat-orange',
                                        ],
                                        [
                                            'color_id' => ColorEnum::WHITE,
                                            'name' => 'hat-white',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'shoes',
                            'slug' => 'shoes',
                            'image' => 'shoes-stone',
                            'description' => 'Step up your style with trendy shoes.',
                            'products' => [
                                [
                                    'name' => 'Ruby Red Shoes',
                                    'slug' => 'ruby-red-shoes',
                                    'image' => 'shoes',
                                    'description' =>
                                        'The Vans Shoes are a stylish and versatile footwear option that complements a wide range of outfits. Made from durable materials, they offer comfort and support while ensuring long-lasting wear. Their timeless design, featuring a classic low-top silhouette, pairs well with both casual and semi-casual looks. The cushioned insole provides extra comfort for all-day wear, while the rubber outsole ensures a firm grip on various surfaces. Whether you\'re heading to school, a weekend outing, or hanging out with friends, the Vans Shoes add a cool, laid-back vibe to your wardrobe.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::RED,
                                            'name' => 'shoes-red',
                                        ],
                                        [
                                            'color_id' => ColorEnum::YELLOW,
                                            'name' => 'shoes-yellow',
                                        ],
                                        [
                                            'color_id' => ColorEnum::GREEN,
                                            'name' => 'shoes-green',
                                        ],
                                        [
                                            'color_id' => ColorEnum::STONE,
                                            'name' => 'shoes-stone',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'shirts',
                            'slug' => 'shirts',
                            'image' => 'shirt-blue',
                            'description' => 'Shirts that offer style and comfort.',
                            'products' => [
                                [
                                    'name' => 'Raven Black Shirt',
                                    'slug' => 'raven-black-shirt',
                                    'description' =>
                                        'The Mimble Shirts are designed to provide both comfort and style for any occasion. Made from soft, breathable fabric, they ensure a relaxed fit without compromising on sophistication. The versatile design allows these shirts to be paired with jeans, trousers, or shorts, making them perfect for both casual and semi-formal settings. Whether you\'re at work, attending a social event, or just hanging out with friends, the Mimble Shirts offer a perfect balance of comfort and fashion. Their classic cut and timeless design make them a wardrobe staple for any modern man or woman.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::BLACK,
                                            'name' => 'shirt-black',
                                        ],
                                        [
                                            'color_id' => ColorEnum::GREEN,
                                            'name' => 'shirt-green',
                                        ],
                                        [
                                            'color_id' => ColorEnum::WHITE,
                                            'name' => 'shirt-white',
                                        ],
                                        [
                                            'color_id' => ColorEnum::BLUE,
                                            'name' => 'shirt-blue',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                [
                    'name' => 'Accessories & Wearables',
                    'slug' => 'accessories',
                    'image' => 'accessories',
                    'description' => 'Enhancing style and technology on the go.',
                    'subCategories' => [
                        [
                            'name' => 'sunglasses',
                            'slug' => 'sunglasses',
                            'image' => 'sunglass-black',
                            'description' => 'Eye protection meets fashion in stylish shades.',
                            'products' => [
                                [
                                    'name' => 'Pebble Stone Sunglass',
                                    'slug' => 'pebble-stone-sunglass',
                                    'description' =>
                                        'These sleek black sunglasses offer timeless style and essential eye protection. The dark lenses shield your eyes from bright sunlight, reducing glare and providing comfortable vision. Their classic design effortlessly complements any look, adding a touch of cool sophistication whether you\'re enjoying a sunny day outdoors or adding a touch of mystery to your everyday wear.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::STONE,
                                            'name' => 'sunglass-stone',
                                        ],
                                        [
                                            'color_id' => ColorEnum::ORANGE,
                                            'name' => 'sunglass-orange',
                                        ],
                                        [
                                            'color_id' => ColorEnum::RED,
                                            'name' => 'sunglass-red',
                                        ],
                                        [
                                            'color_id' => ColorEnum::BLACK,
                                            'name' => 'sunglass-black',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'bags',
                            'slug' => 'bags',
                            'image' => 'bag-blue',
                            'description' =>
                                'Stylish carriers for your everyday essentials and adventures.',
                            'products' => [
                                [
                                    'name' => 'Rosy Petal Bag',
                                    'slug' => 'rosy-petal-bag',
                                    'description' =>
                                        'Bags are versatile companions, designed to carry your belongings with ease and style. From practical backpacks for daily commutes to chic handbags for special occasions, they offer organization and a touch of personal flair. Choose from a variety of materials, sizes, and designs to find the perfect bag to complement your needs and express your individuality.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::ROSE,
                                            'name' => 'bag-rose',
                                        ],
                                        [
                                            'color_id' => ColorEnum::YELLOW,
                                            'name' => 'bag-yellow',
                                        ],
                                        [
                                            'color_id' => ColorEnum::STONE,
                                            'name' => 'bag-stone',
                                        ],
                                        [
                                            'color_id' => ColorEnum::BLUE,
                                            'name' => 'bag-blue',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'watches',
                            'slug' => 'watches',
                            'image' => 'watch-stone',
                            'description' =>
                                'Timekeeping elegance and functional style for your wrist.',
                            'products' => [
                                [
                                    'name' => 'Mist Grey Watch',
                                    'slug' => 'mist-grey-watch',
                                    'description' =>
                                        'Watches are more than just time-telling devices; they are statements of personal style and engineering marvels. From classic analog designs to cutting-edge smartwatches packed with features, they offer a blend of functionality and aesthetics. A watch can be a subtle accent or a bold centerpiece, reflecting your taste and keeping you connected to your most valuable asset: time.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::GRAY,
                                            'name' => 'watch-gray',
                                        ],
                                        [
                                            'color_id' => ColorEnum::BLUE,
                                            'name' => 'watch-blue',
                                        ],
                                        [
                                            'color_id' => ColorEnum::ROSE,
                                            'name' => 'watch-rose',
                                        ],
                                        [
                                            'color_id' => ColorEnum::STONE,
                                            'name' => 'watch-stone',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'jewelries',
                            'slug' => 'jewelries',
                            'image' => 'jewelry-black',
                            'description' =>
                                'Adornments of beauty, crafted to enhance personal expression.',
                            'products' => [
                                [
                                    'name' => 'Sapphire Stone Jewelry',
                                    'slug' => 'sapphire-stone-jewelry',
                                    'description' =>
                                        'Jewelry pieces are personal treasures that add sparkle and significance to our lives. From delicate necklaces and elegant earrings to bold rings and intricate bracelets, each piece tells a story and reflects individual style. Crafted from precious metals, gemstones, and diverse materials, jewelry elevates everyday looks and commemorates special moments, becoming cherished heirlooms over time.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::BLUE,
                                            'name' => 'jewelry-blue',
                                        ],
                                        [
                                            'color_id' => ColorEnum::STONE,
                                            'name' => 'jewelry-stone',
                                        ],
                                        [
                                            'color_id' => ColorEnum::ROSE,
                                            'name' => 'jewelry-rose',
                                        ],
                                        [
                                            'color_id' => ColorEnum::BLACK,
                                            'name' => 'jewelry-black',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'perfumes',
                            'slug' => 'perfumes',
                            'image' => 'perfume-black',
                            'description' =>
                                'Invisible accents of scent, expressing individuality and mood.',
                            'products' => [
                                [
                                    'name' => 'Twilight Aqua Perfume',
                                    'slug' => 'twilight-aqua-perfume',
                                    'description' =>
                                        'Perfumes are olfactory masterpieces, carefully blended scents that evoke emotions and leave a lasting impression. A signature fragrance can enhance your presence, boost confidence, and become an integral part of your personal identity. From light and floral notes to rich and woody accords, choosing the right perfume is a sensory journey that allows you to express your unique character without saying a word.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::BLUE,
                                            'name' => 'perfume-blue',
                                        ],
                                        [
                                            'color_id' => ColorEnum::STONE,
                                            'name' => 'perfume-stone',
                                        ],
                                        [
                                            'color_id' => ColorEnum::ROSE,
                                            'name' => 'perfume-rose',
                                        ],
                                        [
                                            'color_id' => ColorEnum::BLACK,
                                            'name' => 'perfume-black',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => 'wallets',
                            'slug' => 'wallets',
                            'image' => 'wallet-black',
                            'description' => 'Compact organizers for cards, cash, and essentials.',
                            'products' => [
                                [
                                    'name' => 'Deepwater Bluefold Wallet',
                                    'slug' => 'deepwater-bluefold-wallet',
                                    'description' =>
                                        'Wallets are practical yet personal accessories, designed to keep your essential cards, cash, and identification secure and organized. Available in various styles, from slim cardholders to traditional bi-folds and trifolds, they cater to different needs and preferences. Crafted from leather, fabric, and other materials, a wallet is a daily companion that combines functionality with a touch of personal style.',
                                    'images' => [
                                        [
                                            'color_id' => ColorEnum::BLUE,
                                            'name' => 'wallet-blue',
                                        ],
                                        [
                                            'color_id' => ColorEnum::WHITE,
                                            'name' => 'wallet-white',
                                        ],
                                        [
                                            'color_id' => ColorEnum::GREEN,
                                            'name' => 'wallet-green',
                                        ],
                                        [
                                            'color_id' => ColorEnum::BLACK,
                                            'name' => 'wallet-black',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ];

            $comments = [
                "This product exceeded my expectations. The quality is top-notch, the design is modern, and it arrived earlier than expected. I would definitely recommend it to friends and family. It's exactly what I was looking for and works perfectly in my space. Great value for the price, thank you!",
                "I was hesitant to purchase at first, but I'm so glad I did. The customer service was excellent, the shipping was fast, and the item was well-packaged. The craftsmanship is evident and it feels durable. I'm very satisfied with the entire experience and will be shopping here again soon.",
                "Everything about this purchase was smooth and hassle-free. The product is just as described, maybe even better. Installation was easy and it works like a charm. I appreciate the clear instructions and quality packaging. I'll be keeping an eye on future products from this seller. Totally worth the investment.",
                "Honestly, I didn't expect much, but this turned out to be a great deal. The finish is beautiful, the performance is reliable, and the size is perfect. I've already received compliments on it. I'd highly suggest it to anyone who's looking for something affordable yet well-made. Truly satisfied customer here.",
                "I love how simple the ordering process was. The website made it easy to navigate, and checkout was a breeze. I received updates on shipping and tracking regularly. The item came in excellent condition and looked exactly like the photos. I'm very happy with this purchase. Would buy again definitely.",
                "From start to finish, everything was handled professionally. I reached out with a question and received a quick, helpful response. The shipping was faster than expected, and the item itself is amazing. It feels sturdy and well-built. I couldn't be happier with how everything turned out. Definitely a five-star experience.",
                "Great quality and great service. The packaging was secure, and the delivery was prompt. It arrived without any issues, and I was immediately impressed by how it looked and felt. I've recommended this product to coworkers already. It really stands out and performs exactly as described. Very happy overall!",
                "I purchased this for a gift and it was a hit. The recipient was thrilled and said it's one of the best they've received. The attention to detail is incredible. It shows that care went into making this. Thank you for making gift shopping so much easier and enjoyable!",
                "This is the kind of product you don't realize you needed until you have it. It's well-designed, durable, and very practical. I've used it daily and it holds up wonderfully. I'm planning to order another one for a friend. It's rare to find something this good at this price.",
                "Absolutely love it. Everything from the unboxing experience to using the product was enjoyable. The build quality is impressive and you can tell it's made to last. I appreciate the thoughtful design and functionality. Would definitely recommend to anyone considering it. Will be checking back for more products soon.",
            ];

            foreach ($categories as $key => $each) {
                // Category
                $category = new Category();
                $category->name = ucfirst($each['name']);
                $category->slug = $each['slug'];
                $category->description = $each['description'];
                $category->save();

                // Category Image
                saveImage(
                    slug: $each['image'],
                    path: Path::CATEGORIES,
                    save: true,
                    user_id: null,
                    category_id: $category->id,
                    product_id: null,
                    order: null,
                    color_id: null,
                    video: false
                );

                foreach ($each['subCategories'] as $eachSub) {
                    // Sub Category
                    $subCategory = new Category();
                    $subCategory->parent_id = $category->id;
                    $subCategory->name = ucfirst($eachSub['name']);
                    $subCategory->slug = $eachSub['slug'];
                    $subCategory->description = $eachSub['description'];
                    $subCategory->save();

                    // Sub Category Image
                    saveImage(
                        slug: $eachSub['image'],
                        path: Path::CATEGORIES,
                        save: true,
                        user_id: null,
                        category_id: $subCategory->id,
                        product_id: null,
                        order: null,
                        color_id: null,
                        video: false
                    );

                    foreach ($eachSub['products'] as $eachProduct) {
                        // Product
                        $product = new Product();
                        $product->category_id = $category->id;
                        $product->sub_category_id = $subCategory->id;
                        $product->name = $eachProduct['name'];
                        $product->slug = $eachProduct['slug'];
                        $product->description = $eachProduct['description'];
                        $product->price = mt_rand(499, 1999);
                        $product->save();

                        foreach ($eachProduct['images'] as $imageKey => $eachImage) {
                            // Product Image
                            saveImage(
                                slug: $eachImage['name'],
                                path: Path::PRODUCTS,
                                save: true,
                                user_id: null,
                                category_id: null,
                                product_id: $product->id,
                                order: $imageKey + 1,
                                color_id: $eachImage['color_id']->value,
                                video: false
                            );
                        }

                        for ($i = 0; $i < 19; $i++) {
                            $review = new Review();
                            $review->user_id = mt_rand(2, 11);
                            $review->product_id = $product->id;
                            $review->rating = mt_rand(1, 5);
                            $review->comment = $comments[mt_rand(0, 9)];
                            $review->save();
                        }
                    }
                }
            }
        } catch (\Throwable $th) {
            dump($th->getMessage());
        }
    }
}

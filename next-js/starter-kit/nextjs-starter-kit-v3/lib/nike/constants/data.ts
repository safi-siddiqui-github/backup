import { NikeCardThreeProps } from "@/components/nike/cards/NikeCardThreeComponent";
import { NikeCardTwoProps } from "@/components/nike/cards/NikeCardTwoComponent";
import { NikeCategorySectionImages, NikeHeroSectionImages, NikeHighlightSectionImages, NikePromotionSectionImages, NikeShopSectionImages } from ".";
import { NikeCardOneProps, NikeCardOneTypeEnum } from "@/components/nike/cards/NikeCardOneComponent";
import { NikeSectionOneProps } from "@/components/nike/sections/NikeSectionOneComponent";
import { SearchResultType } from "@/components/nike/modals/NikeSearchBarModalComponent";
import { ShopDataTypeExtended } from "@/components/nike/search/NikeShopClientComponent";

export const heroData: NikeSectionOneProps = {
  image: NikeHeroSectionImages.heroSectionOne,
  subtitle: 'Nike Power',
  title: 'Get comfortable with winning',
  leading: 'Comfort you want with support you need to power this',
};

export const categoryData: NikeCardTwoProps[] = [
  { id: '1', title: 'Men', image: NikeCategorySectionImages.categorySectionOneImageOne },
  { id: '2', title: 'Teens', image: NikeCategorySectionImages.categorySectionOneImageTwo },
  { id: '3', title: 'Players', image: NikeCategorySectionImages.categorySectionOneImageThree },
  { id: '4', title: 'Specials', image: NikeCategorySectionImages.categorySectionOneImageFour },
  { id: '5', title: 'Talent', image: NikeCategorySectionImages.categorySectionOneImageFive },
  { id: '6', title: 'Kids', image: NikeCategorySectionImages.categorySectionOneImageSix },
]

export const promotionData: NikeCardThreeProps[] = [
  {
    id: '1', title: 'Exclusive Access', category: 'Member Product', linkText: 'Shop',
    image: NikePromotionSectionImages.promotionSectionOneImageOne
  },
  {
    id: '2', title: 'Spirited Movement', category: 'Sports & Wellness', linkText: 'Move',
    image: NikePromotionSectionImages.promotionSectionOneImageTwo
  },
  {
    id: '3', title: 'Thankyou Savings', category: 'Member Reward', linkText: 'Save',
    image: NikePromotionSectionImages.promotionSectionOneImageThree
  },
  {
    id: '4', title: 'Curated Technology', category: 'Nike Apps', linkText: 'Tech',
    image: NikePromotionSectionImages.promotionSectionOneImageFour
  },
  {
    id: '5', title: 'Customer Fashion', category: 'Nike By You', linkText: 'Customize',
    image: NikePromotionSectionImages.promotionSectionOneImageFive
  },
  {
    id: '6', title: 'Exlpore More Offers', category: 'Specials', linkText: 'Explore',
    image: NikePromotionSectionImages.promotionSectionOneImageSix
  },
];

export const highlightData: NikeCardOneProps[] = [
  {
    id: '1',
    title: 'Nike Air Zoom Pegasus 39',
    category: 'Running Shoes',
    price: '120',
    type: NikeCardOneTypeEnum.LATEST,
    images: [
      NikeHighlightSectionImages.highlightLatestSectionOneImageOnePartOne,
      NikeHighlightSectionImages.highlightLatestSectionOneImageOnePartTwo,
      NikeHighlightSectionImages.highlightLatestSectionOneImageOnePartThree,
    ],
  },
  {
    id: '2',
    title: 'Nike Court Vision Mid',
    category: 'Casual Shoes',
    price: '95',
    type: NikeCardOneTypeEnum.LATEST,
    images: [
      NikeHighlightSectionImages.highlightLatestSectionOneImageTwoPartOne,
      NikeHighlightSectionImages.highlightLatestSectionOneImageTwoPartTwo,
      NikeHighlightSectionImages.highlightLatestSectionOneImageTwoPartThree,
    ],
  },
  {
    id: '3',
    title: 'Nike Air Zoom Alphafly',
    category: 'Racing Shoes',
    price: '275',
    type: NikeCardOneTypeEnum.SELLER,
    images: [
      NikeHighlightSectionImages.highlightSellerSectionOneImageOnePartOne,
      NikeHighlightSectionImages.highlightSellerSectionOneImageOnePartTwo,
      NikeHighlightSectionImages.highlightSellerSectionOneImageOnePartThree,
    ],
  },
  {
    id: '4',
    title: 'Nike Air Max 90',
    category: 'Lifestyle Shoes',
    price: '130',
    type: NikeCardOneTypeEnum.SELLER,
    images: [
      NikeHighlightSectionImages.highlightSellerSectionOneImageTwoPartOne,
      NikeHighlightSectionImages.highlightSellerSectionOneImageTwoPartTwo,
      NikeHighlightSectionImages.highlightSellerSectionOneImageTwoPartThree,
    ],
  },
  {
    id: '5',
    title: 'Nike Dunk Low Retro',
    category: 'Basketball Shoes',
    price: '110',
    type: NikeCardOneTypeEnum.TRENDING,
    images: [
      NikeHighlightSectionImages.highlightTrendingSectionOneImageOnePartOne,
      NikeHighlightSectionImages.highlightTrendingSectionOneImageOnePartTwo,
      NikeHighlightSectionImages.highlightTrendingSectionOneImageOnePartThree,
    ],
  },
  {
    id: '6',
    title: 'Nike LeBron 19',
    category: 'Basketball Shoes',
    price: '200',
    type: NikeCardOneTypeEnum.TRENDING,
    images: [
      NikeHighlightSectionImages.highlightTrendingSectionOneImageTwoPartOne,
      NikeHighlightSectionImages.highlightTrendingSectionOneImageTwoPartTwo,
      NikeHighlightSectionImages.highlightTrendingSectionOneImageTwoPartThree,
    ],
  },
];

export const searchData: SearchResultType[] = [
  {
    id: 1, title: 'Nike Air Force', category: 'Mens Shoes', price: '65',
    image: NikeHighlightSectionImages.highlightLatestSectionOneImageOnePartOne
  },
  {
    id: 2, title: 'Nike Air Max Plus', category: 'Teens Shoes', price: '50',
    image: NikeHighlightSectionImages.highlightLatestSectionOneImageTwoPartOne
  },
  {
    id: 3, title: 'Nike Air Zoom', category: 'Kids Shoes', price: '75',
    image: NikeHighlightSectionImages.highlightSellerSectionOneImageOnePartOne
  },
  {
    id: 4, title: 'Nike Notiva', category: 'Boys Shoes', price: '40',
    image: NikeHighlightSectionImages.highlightSellerSectionOneImageTwoPartOne
  },
  {
    id: 5, title: 'Nike P-6000', category: 'Mens Shoes', price: '85',
    image: NikeHighlightSectionImages.highlightTrendingSectionOneImageOnePartOne
  },
  {
    id: 6, title: 'Nike Pegasus', category: 'Teens Shoes', price: '30',
    image: NikeHighlightSectionImages.highlightTrendingSectionOneImageTwoPartOne
  },
  {
    id: 7, title: 'New Year Gear', category: 'Teens Shoes', price: '85',
    image: NikeHighlightSectionImages.highlightLatestSectionOneImageOnePartTwo
  },
  {
    id: 8, title: 'Shox Super Grip', category: 'Mens Shoes', price: '20',
    image: NikeHighlightSectionImages.highlightLatestSectionOneImageTwoPartTwo
  },
  {
    id: 9, title: 'Elastic Speed Flux', category: 'Boys Shoes', price: '95',
    image: NikeHighlightSectionImages.highlightSellerSectionOneImageOnePartTwo
  },
  {
    id: 10, title: 'Deep Dive Run', category: 'Kids Shoes', price: '10',
    image: NikeHighlightSectionImages.highlightSellerSectionOneImageTwoPartTwo
  },
  {
    id: 11, title: 'Spotless Light', category: 'Women Shoes', price: '75',
    image: NikeHighlightSectionImages.highlightTrendingSectionOneImageOnePartTwo
  },
  {
    id: 12, title: 'Pump Boost', category: 'Boys Shoes', price: '30',
    image: NikeHighlightSectionImages.highlightTrendingSectionOneImageTwoPartTwo
  },
];

export const shopData: ShopDataTypeExtended[] = [
  {
    id: '1',
    title: "Nike Calm Slides",
    category: "Slides",
    subCategories: ["Casual", "Footwear", "Summer", "Comfort"],
    color: ["White", "Black"],
    leadingPrice: "49.99",
    discountedPrice: "34.99",
    discountPercent: "30",
    highlight: "Sustainable Materials",
    images: [
      NikeShopSectionImages.shopSectionImageOnePartOne,
      NikeShopSectionImages.shopSectionImageOnePartTwo,
      NikeShopSectionImages.shopSectionImageOnePartThree,
    ],
  },
  {
    id: '2',
    title: "Nike Zoom Run",
    category: "Running",
    subCategories: ["Sports", "Athletics", "Performance", "Marathon"],
    color: ["Black", "Blue", "Red"],
    leadingPrice: "120.00",
    discountedPrice: "99.99",
    discountPercent: "17",
    highlight: "For Your Next Marathon",
    images: [
      NikeShopSectionImages.shopSectionImageTwoPartOne,
      NikeShopSectionImages.shopSectionImageTwoPartTwo,
      NikeShopSectionImages.shopSectionImageTwoPartThree,
    ],
  },
  {
    id: '3',
    title: "Nike Dri-FIT Tee",
    category: "Training",
    subCategories: ["Sportswear", "Performance", "Activewear", "Breathable"],
    color: ["Gray", "Red"],
    leadingPrice: "30.00",
    discountedPrice: "24.99",
    discountPercent: "17",
    highlight: "Stay Cool and Dry",
    images: [
      NikeShopSectionImages.shopSectionImageThreePartOne,
      NikeShopSectionImages.shopSectionImageThreePartTwo,
      NikeShopSectionImages.shopSectionImageThreePartThree,
    ],
  },
  {
    id: '4',
    title: "Nike Tech Fleece",
    category: "Hoodies",
    subCategories: ["Activewear", "Winter", "Warmth", "Casual"],
    color: ["Navy", "Olive", "Black"],
    leadingPrice: "100.00",
    discountedPrice: "84.99",
    discountPercent: "15",
    highlight: "Lightweight Warmth",
    images: [
      NikeShopSectionImages.shopSectionImageFourPartOne,
      NikeShopSectionImages.shopSectionImageFourPartTwo,
      NikeShopSectionImages.shopSectionImageFourPartThree,
    ],
  },
  {
    id: '5',
    title: "Nike Court Shoe",
    category: "Sneakers",
    subCategories: ["Sports", "Performance", "Court", "Footwear"],
    color: ["White", "Black"],
    leadingPrice: "70.00",
    discountedPrice: "59.99",
    discountPercent: "14",
    highlight: "On-Court Performance",
    images: [
      NikeShopSectionImages.shopSectionImageFivePartOne,
      NikeShopSectionImages.shopSectionImageFivePartTwo,
      NikeShopSectionImages.shopSectionImageFivePartThree,
    ],
  },
  {
    id: '6',
    title: "Nike Swim Jammer",
    category: "Swimwear",
    subCategories: ["Water Sports", "Swimming", "Athletics", "Performance"],
    color: ["Black", "Blue"],
    leadingPrice: "50.00",
    discountedPrice: "42.99",
    discountPercent: "14",
    highlight: "Streamlined Fit",
    images: [
      NikeShopSectionImages.shopSectionImageSixPartOne,
      NikeShopSectionImages.shopSectionImageSixPartTwo,
      NikeShopSectionImages.shopSectionImageSixPartThree,
    ],
  },
  {
    id: '7',
    title: "Nike Yoga Pant",
    category: "Yoga",
    subCategories: ["Activewear", "Comfort", "Flexibility", "Sports"],
    color: ["Black", "Gray"],
    leadingPrice: "60.00",
    discountedPrice: "49.99",
    discountPercent: "17",
    highlight: "Comfort and Flexibility",
    images: [
      NikeShopSectionImages.shopSectionImageSevenPartOne,
      NikeShopSectionImages.shopSectionImageSevenPartTwo,
      NikeShopSectionImages.shopSectionImageSevenPartThree,
    ],
  },
  {
    id: '8',
    title: "Nike Air Force",
    category: "Lifestyle",
    subCategories: ["Casual", "Fashion", "Sneakers", "Style"],
    color: ["White", "Black", "Red"],
    leadingPrice: "110.00",
    discountedPrice: "94.99",
    discountPercent: "14",
    highlight: "Classic Style",
    images: [
      NikeShopSectionImages.shopSectionImageEightPartOne,
      NikeShopSectionImages.shopSectionImageEightPartTwo,
      NikeShopSectionImages.shopSectionImageEightPartThree,
    ],
  },
  {
    id: '9',
    title: "Nike Sport Bag",
    category: "Bags",
    subCategories: ["Accessories", "Sports", "Gear", "Travel"],
    color: ["Black", "Navy"],
    leadingPrice: "45.00",
    discountedPrice: "39.99",
    discountPercent: "11",
    highlight: "Carry Your Gear",
    images: [
      NikeShopSectionImages.shopSectionImageNinePartOne,
      NikeShopSectionImages.shopSectionImageNinePartTwo,
      NikeShopSectionImages.shopSectionImageNinePartThree,
    ],
  },
];
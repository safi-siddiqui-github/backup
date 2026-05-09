import { CardOneProps, CardOneTypeEnum } from "@/components/CardOneComponent";
import { Images } from "./images";
import { SectionOneProps } from "@/components/SectionOneComponent";
import { CardTwoProps } from "@/components/CardTwoComponent";
import { CardThreeProps } from "@/components/CardThreeComponent";
import { SearchResultType } from "@/components/SearchBarModalComponent";
import { ShopDataTypeExtended } from "@/components/ShopClientComponent";

export const heroData: SectionOneProps = {
  image: Images.heroSectionImages.sectionOne,
  subtitle: 'Nike Power',
  title: 'Get comfortable with winning',
  leading: 'Comfort you want with support you need to power this',
};

export const categoryData: CardTwoProps[] = [
  { id: '1', title: 'Men', image: Images.categorySectionImages.sectionOneImageOne },
  { id: '2', title: 'Teens', image: Images.categorySectionImages.sectionOneImageTwo },
  { id: '3', title: 'Players', image: Images.categorySectionImages.sectionOneImageThree },
  { id: '4', title: 'Specials', image: Images.categorySectionImages.sectionOneImageFour },
  { id: '5', title: 'Talent', image: Images.categorySectionImages.sectionOneImageFive },
  { id: '6', title: 'Kids', image: Images.categorySectionImages.sectionOneImageSix },
]

export const promotionData: CardThreeProps[] = [
  {
    id: '1', title: 'Exclusive Access', category: 'Member Product', linkText: 'Shop',
    image: Images.promotionSectionImages.sectionOneImageOne
  },
  {
    id: '2', title: 'Spirited Movement', category: 'Sports & Wellness', linkText: 'Move',
    image: Images.promotionSectionImages.sectionOneImageTwo
  },
  {
    id: '3', title: 'Thankyou Savings', category: 'Member Reward', linkText: 'Save',
    image: Images.promotionSectionImages.sectionOneImageThree
  },
  {
    id: '4', title: 'Curated Technology', category: 'Nike Apps', linkText: 'Tech',
    image: Images.promotionSectionImages.sectionOneImageFour
  },
  {
    id: '5', title: 'Customer Fashion', category: 'Nike By You', linkText: 'Customize',
    image: Images.promotionSectionImages.sectionOneImageFive
  },
  {
    id: '6', title: 'Exlpore More Offers', category: 'Specials', linkText: 'Explore',
    image: Images.promotionSectionImages.sectionOneImageSix
  },
];

export const highlightData: CardOneProps[] = [
  {
    id: '1',
    title: 'Nike Air Zoom Pegasus 39',
    category: 'Running Shoes',
    price: '120',
    type: CardOneTypeEnum.LATEST,
    images: [
      Images.highlightSectionImages.latestSectionOneImageOnePartOne,
      Images.highlightSectionImages.latestSectionOneImageOnePartTwo,
      Images.highlightSectionImages.latestSectionOneImageOnePartThree,
    ],
  },
  {
    id: '2',
    title: 'Nike Court Vision Mid',
    category: 'Casual Shoes',
    price: '95',
    type: CardOneTypeEnum.LATEST,
    images: [
      Images.highlightSectionImages.latestSectionOneImageTwoPartOne,
      Images.highlightSectionImages.latestSectionOneImageTwoPartTwo,
      Images.highlightSectionImages.latestSectionOneImageTwoPartThree,
    ],
  },
  {
    id: '3',
    title: 'Nike Air Zoom Alphafly',
    category: 'Racing Shoes',
    price: '275',
    type: CardOneTypeEnum.SELLER,
    images: [
      Images.highlightSectionImages.sellerSectionOneImageOnePartOne,
      Images.highlightSectionImages.sellerSectionOneImageOnePartTwo,
      Images.highlightSectionImages.sellerSectionOneImageOnePartThree,
    ],
  },
  {
    id: '4',
    title: 'Nike Air Max 90',
    category: 'Lifestyle Shoes',
    price: '130',
    type: CardOneTypeEnum.SELLER,
    images: [
      Images.highlightSectionImages.sellerSectionOneImageTwoPartOne,
      Images.highlightSectionImages.sellerSectionOneImageTwoPartTwo,
      Images.highlightSectionImages.sellerSectionOneImageTwoPartThree,
    ],
  },
  {
    id: '5',
    title: 'Nike Dunk Low Retro',
    category: 'Basketball Shoes',
    price: '110',
    type: CardOneTypeEnum.TRENDING,
    images: [
      Images.highlightSectionImages.trendingSectionOneImageOnePartOne,
      Images.highlightSectionImages.trendingSectionOneImageOnePartTwo,
      Images.highlightSectionImages.trendingSectionOneImageOnePartThree,
    ],
  },
  {
    id: '6',
    title: 'Nike LeBron 19',
    category: 'Basketball Shoes',
    price: '200',
    type: CardOneTypeEnum.TRENDING,
    images: [
      Images.highlightSectionImages.trendingSectionOneImageTwoPartOne,
      Images.highlightSectionImages.trendingSectionOneImageTwoPartTwo,
      Images.highlightSectionImages.trendingSectionOneImageTwoPartThree,
    ],
  },
];

export const searchData: SearchResultType[] = [
  {
    id: 1, title: 'Nike Air Force', category: 'Mens Shoes', price: '65',
    image: Images.highlightSectionImages.latestSectionOneImageOnePartOne
  },
  {
    id: 2, title: 'Nike Air Max Plus', category: 'Teens Shoes', price: '50',
    image: Images.highlightSectionImages.latestSectionOneImageTwoPartOne
  },
  {
    id: 3, title: 'Nike Air Zoom', category: 'Kids Shoes', price: '75',
    image: Images.highlightSectionImages.sellerSectionOneImageOnePartOne
  },
  {
    id: 4, title: 'Nike Notiva', category: 'Boys Shoes', price: '40',
    image: Images.highlightSectionImages.sellerSectionOneImageTwoPartOne
  },
  {
    id: 5, title: 'Nike P-6000', category: 'Mens Shoes', price: '85',
    image: Images.highlightSectionImages.trendingSectionOneImageOnePartOne
  },
  {
    id: 6, title: 'Nike Pegasus', category: 'Teens Shoes', price: '30',
    image: Images.highlightSectionImages.trendingSectionOneImageTwoPartOne
  },
  {
    id: 7, title: 'New Year Gear', category: 'Teens Shoes', price: '85',
    image: Images.highlightSectionImages.latestSectionOneImageOnePartTwo
  },
  {
    id: 8, title: 'Shox Super Grip', category: 'Mens Shoes', price: '20',
    image: Images.highlightSectionImages.latestSectionOneImageTwoPartTwo
  },
  {
    id: 9, title: 'Elastic Speed Flux', category: 'Boys Shoes', price: '95',
    image: Images.highlightSectionImages.sellerSectionOneImageOnePartTwo
  },
  {
    id: 10, title: 'Deep Dive Run', category: 'Kids Shoes', price: '10',
    image: Images.highlightSectionImages.sellerSectionOneImageTwoPartTwo
  },
  {
    id: 11, title: 'Spotless Light', category: 'Women Shoes', price: '75',
    image: Images.highlightSectionImages.trendingSectionOneImageOnePartTwo
  },
  {
    id: 12, title: 'Pump Boost', category: 'Boys Shoes', price: '30',
    image: Images.highlightSectionImages.trendingSectionOneImageTwoPartTwo
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
      Images.shopSectionImages.sectionImageOnePartOne,
      Images.shopSectionImages.sectionImageOnePartTwo,
      Images.shopSectionImages.sectionImageOnePartThree,
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
      Images.shopSectionImages.sectionImageTwoPartOne,
      Images.shopSectionImages.sectionImageTwoPartTwo,
      Images.shopSectionImages.sectionImageTwoPartThree,
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
      Images.shopSectionImages.sectionImageThreePartOne,
      Images.shopSectionImages.sectionImageThreePartTwo,
      Images.shopSectionImages.sectionImageThreePartThree,
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
      Images.shopSectionImages.sectionImageFourPartOne,
      Images.shopSectionImages.sectionImageFourPartTwo,
      Images.shopSectionImages.sectionImageFourPartThree,
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
      Images.shopSectionImages.sectionImageFivePartOne,
      Images.shopSectionImages.sectionImageFivePartTwo,
      Images.shopSectionImages.sectionImageFivePartThree,
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
      Images.shopSectionImages.sectionImageSixPartOne,
      Images.shopSectionImages.sectionImageSixPartTwo,
      Images.shopSectionImages.sectionImageSixPartThree,
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
      Images.shopSectionImages.sectionImageSevenPartOne,
      Images.shopSectionImages.sectionImageSevenPartTwo,
      Images.shopSectionImages.sectionImageSevenPartThree,
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
      Images.shopSectionImages.sectionImageEightPartOne,
      Images.shopSectionImages.sectionImageEightPartTwo,
      Images.shopSectionImages.sectionImageEightPartThree,
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
      Images.shopSectionImages.sectionImageNinePartOne,
      Images.shopSectionImages.sectionImageNinePartTwo,
      Images.shopSectionImages.sectionImageNinePartThree,
    ],
  },
];
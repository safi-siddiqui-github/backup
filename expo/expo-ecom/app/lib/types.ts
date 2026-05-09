export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
};
export type Category = {
  id: number;
  title: string;
  slug: string;
  image: string;
};


// "availabilityStatus": "In Stock",
//  "brand": "Essence",
//   "category": "beauty",
//    "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//     "dimensions": {"depth": 22.99, "height": 13.08, "width": 15.14},
//    "discountPercentage": 10.48,
//    "id": 1,
//     "images": ["https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"],
//      "meta": {"barcode": "5784719087687", "createdAt": "2025-04-30T09:41:02.053Z", "qrCode": "https://cdn.dummyjson.com/public/qr-code.png", "updatedAt": "2025-04-30T09:41:02.053Z"},
//      "minimumOrderQuantity": 48,
//       "price": 9.99,
//        "rating": 2.56,
//         "returnPolicy": "No return policy",
//          "reviews": [[Object], [Object], [Object]],
//           "shippingInformation": "Ships in 3-5 business days",
//            "sku": "BEA-ESS-ESS-001",
//             "stock": 99,
//              "tags": ["beauty", "mascara"],
//              "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
//              "title": "Essence Mascara Lash Princess",
//               "warrantyInformation": "1 week warranty",
//                "weight": 4},

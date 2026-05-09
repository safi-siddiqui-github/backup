import { CiShoppingBasket } from "react-icons/ci";
import { defineArrayMember, defineField, defineType } from 'sanity'

export const orderType = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: CiShoppingBasket,
  fields: [
    defineField({
      name: 'orderNumber',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stripeCheckoutSessionId',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stripeCustomerId',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stripePaymentIntentId',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clerkUserId',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'customerName',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'products',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              type: 'reference',
              to: [{ type: 'product' }]
            }),
            defineField({
              name: 'quantity',
              type: 'number',
            }),
          ],
          preview: {
            select: {
              name: 'product.name',
              image: 'product.image',
              price: 'product.price',
              quantity: 'quantity',
            },
            prepare: ({ name, price, image, quantity }) => {
              return {
                title: `${name} x ${quantity}`,
                subtitle: `${price * quantity}`,
                media: image
              }
            }
          }
        }),
      ],
    }),
    defineField({
      name: 'totalPrice',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'amountDiscount',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Canceled', value: 'canceled' },
        ],
        layout: 'radio',  // Optional: adds radio button style for selection
      }
    }),
    defineField({
      name: 'orderDate',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      orderNumber: 'orderNumber',
      customerName: 'customerName',
      customerEmail: 'customerEmail',
      totalPrice: 'totalPrice',
      currency: 'currency',
    },
    prepare: ({ orderNumber, customerName, customerEmail, currency, totalPrice }) => {
      const formated = `${orderNumber.slice(0, 5)}...${orderNumber.slice(-5)}`;
      return {
        title: `${customerName} - ${formated}`,
        subtitle: `${totalPrice} ${currency}`,
        description: `${customerEmail} - ${orderNumber}`,
        media: CiShoppingBasket,
      }
    }
  }
})

import { CiDiscount1, CiShoppingBasket } from "react-icons/ci";
import { defineArrayMember, defineField, defineType } from 'sanity'

export const saleType = defineType({
  name: 'sale',
  title: 'Sale',
  type: 'document',
  icon: CiDiscount1,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'discountAmount',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'couponCode',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'validFrom',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'validUntil',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      validation: (rule) => rule.required(),
      initialValue: true
    }),
  ],
  preview: {
    select: {
      title: 'title',
      discountAmount: 'discountAmount',
      couponCode: 'couponCode',
      isActive: 'isActive',
    },
    prepare: ({ title, discountAmount, couponCode, isActive }) => {
      const status = isActive ? 'Active' : 'Inactive';
      return {
        title,
        subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
      }
    }
  }
})

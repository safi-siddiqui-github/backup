import { Copyright, ExternalLink } from "lucide-react";
import Link from "next/link";
import NikeMainFooterDropDownComponent from "./client/NikeMainFooterDropDownComponent";

export default function NikeMainFooterComponent() {

  const footerNavData = [
    {
      id: 1,
      title: 'Resources',
      sublinks: [
        { id: 1, title: 'Gift Cards', },
        { id: 2, title: 'Find A Store', },
        { id: 3, title: 'Nike Journal', },
        { id: 4, title: 'Become a Member', },
        { id: 5, title: 'Student Discount', },
        { id: 6, title: 'Feedback', },
        { id: 7, title: 'Promo Codes', },
      ]
    },
    {
      id: 2,
      title: 'Help',
      sublinks: [
        { id: 1, title: 'Get Help', },
        { id: 2, title: 'Order Status', },
        { id: 3, title: 'Shipping & Delivery', },
        { id: 4, title: 'Returns', },
        { id: 5, title: 'Payment Options', },
        { id: 6, title: 'Contact Us', },
        { id: 7, title: 'Reviews', },
      ]
    },
    {
      id: 3,
      title: 'Company',
      sublinks: [
        { id: 1, title: 'About Nike', },
        { id: 2, title: 'News', },
        { id: 3, title: 'Careers', },
        { id: 4, title: 'Investors', },
        { id: 5, title: 'Sustainability', },
        { id: 6, title: 'Purpose', },
        { id: 7, title: 'Global', },
      ]
    },
  ];

  const footerTermsNavData = [
    { id: 1, title: 'Terms of User' },
    { id: 2, title: 'Terms of Sale' },
    { id: 3, title: 'Company Details' },
    { id: 4, title: 'Privacy & Cookie Policy' },
    { id: 5, title: 'Privacy & Cookie Settings' },
    { id: 6, title: 'Policies' },
    { id: 7, title: 'Terms & Conditions' },
  ];

  return (
    <footer className="flex flex-wrap lg:justify-center p-6 gap-6 xl:gap-10">

      <div className="flex flex-wrap gap-6">
        {footerNavData.map((eachNav) => (<NikeMainFooterDropDownComponent key={eachNav.id} navData={eachNav} />))}
      </div>

      <div className="flex flex-col gap-4 items-start min-w-56">

        <div className="flex gap-2 items-center">
          <Copyright className="size-6" />
          <p className="font-medium text-2xl">
            2025 Nike, Inc.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {
            footerTermsNavData.map(({ id, title }) => (
              <Link key={`footerTerm-${title}-${id}`} href={'/nike'} className="flex items-center gap-4 group">
                <p className="font-medium group-hover:underline">{title}</p>
                <ExternalLink className="size-4 hidden group-hover:inline-block" />
              </Link>
            ))
          }
        </div>

      </div>

    </footer>
  )
}
import { Images } from "@/lib/images";

export default function ContactSectionOneComponent() {
  return (
    <div
      className="flex flex-col items-center gap-4 bg-cover bg-center px-5 py-20 md:gap-8 md:py-28"
      style={{ backgroundImage: `url(${Images.landingPage})` }}
    >
      {/*  */}

      <p className="text-center text-2xl font-semibold text-white md:text-4xl">
        Contact Information
      </p>
      <p className="text-center tracking-tight text-white md:max-w-lg">
        Have questions about our platform? Need technical support? Want to
        request a custom feature or partnership? Just reach out—we would love to
        hear from you.
      </p>
    </div>
  );
}

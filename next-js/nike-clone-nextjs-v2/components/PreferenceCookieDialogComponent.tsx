'use client';

import { PreferenceCookieConsentType, usePreferenceCookieConsentStore } from "@/utils/cookies";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

export default function PreferenceCookieDialogComponent() {

  const divRef = useRef<HTMLDivElement>(null);

  const {
    setBehaviouralSharing,
    setImprovedExperience,
    setPersonalizedExperience,
    setProfileBasedSharing,
    setCloseDivForever,
    closeDivForever,
  }: PreferenceCookieConsentType = usePreferenceCookieConsentStore();

  const openModal = useCallback(() => {
    divRef.current?.classList.remove("hidden");
    divRef.current?.classList.add("flex");
  }, []);

  const closeModal = useCallback(() => {
    divRef.current?.classList.add("hidden");
    divRef.current?.classList.remove("flex");
    setCloseDivForever(true);
  }, [setCloseDivForever]);

  const handleSubmit = useCallback(
    (formData: FormData) => {
      const improvedExperience = formData.get("improvedExperience") === "1";
      const personalizedExperience = formData.get("personalizedExperience") === "1";
      const behaviouralSharing = formData.get("behaviouralSharing") === "1";
      const profileBasedSharing = formData.get("profileBasedSharing") === "1";

      setImprovedExperience(improvedExperience);
      setPersonalizedExperience(personalizedExperience);
      setBehaviouralSharing(behaviouralSharing);
      setProfileBasedSharing(profileBasedSharing);
      closeModal();
    },
    [setImprovedExperience, setPersonalizedExperience, setBehaviouralSharing, setProfileBasedSharing, closeModal]
  );

  const acceptAll = useCallback(() => {
    setImprovedExperience(true);
    setPersonalizedExperience(true);
    setBehaviouralSharing(true);
    setProfileBasedSharing(true);
    closeModal();
  }, [setImprovedExperience, setPersonalizedExperience, setBehaviouralSharing, setProfileBasedSharing, closeModal]);


  useEffect(() => {
    if (!closeDivForever) {
      openModal();
    } else {
      closeModal();
    }
  }, [closeDivForever, openModal, closeModal]);

  return (
    <div ref={divRef} className="h-screen min-h-fit items-center justify-center overflow-y-auto absolute backdrop-blur-sm z-10 hidden">

      <form action={handleSubmit} className="flex flex-col gap-6 md:w-3/4 lg:w-1/2 md:border border-slate-200 md:shadow-xl p-4 rounded-md bg-white">

        <p className="text-2xl font-semibold tracking-tight text-center">Data improves your experience</p>

        <div className="flex flex-col gap-2 max-h-96 scrollbar overflow-y-scroll px-4">

          <div className="flex flex-col gap-2 text-center items-center">

            <p className="">
              In order to enhance your experience across our platforms and show you more relevant information, we use cookies and similar technologies, both Nike owned and third party owned, as well as data sent directly from our servers. You can make changes at any time by visiting &#34;Privacy&#34; in Settings or by visiting &#34;Privacy & Cookie Settings&#34; at the bottom of Nike.com.
            </p>

            <div className="flex flex-wrap justify-center gap-1">
              <p>For more information, see our</p>
              <Link href={'/'} className="underline font-medium">Privacy & Cookie Policy.</Link>
            </div>

          </div>

          <hr />

          <div className="flex flex-col gap-2">
            <p className="text-base font-medium">
              Strictly necessary &#40;always on&#41;
            </p>
            <p className="">
              Enables core functionality to power your language, location and shopping bag. Also supports security, network management and accessibility.
            </p>
          </div>

          <hr />

          <div className="flex flex-col gap-2">
            <p className="text-base font-medium">
              Performance & analytics
            </p>
            <p className="">
              Allows use of behavioural data to optimise performance, review how you interact with our sites and apps, and improve Nike experiences.
            </p>

            <div className="flex flex-col">
              <div className="flex gap-1">
                <input type="radio" name="improvedExperience" id="improvedExperience" value={1} defaultChecked />
                <label htmlFor="improvedExperience" className="">
                  Allow data for improved experiences
                </label>
              </div>
              <div className="flex gap-1">
                <input type="radio" name="improvedExperience" id="noImprovedExperience" value={0} />
                <label htmlFor="noImprovedExperience" className="">
                  Do not allow data for improved experiences
                </label>
              </div>
            </div>
          </div>

          <hr />

          <div className="flex flex-col gap-2">
            <p className="text-base font-medium">
              Personalised experiences
            </p>
            <p className="">
              Allows use of behavioural data, using cookies and other technologies, to improve your experience and provide relevant content on Nike platforms and in communications.
            </p>

            <div className="flex flex-col">
              <div className="flex gap-1">
                <input type="radio" name="personalizedExperience" id="personalizedExperience" value={1} defaultChecked />
                <label htmlFor="personalizedExperience" className="">
                  Allow personalised experiences
                </label>
              </div>
              <div className="flex gap-1">
                <input type="radio" name="personalizedExperience" id="noPersonalizedExperience" value={0} />
                <label htmlFor="noPersonalizedExperience" className="">
                  Do not allow personalised experiences
                </label>
              </div>
            </div>
          </div>

          <hr />

          <div className="flex flex-col gap-2">
            <p className="text-base font-medium">
              Personalised advertising
            </p>
            <p className="">
              Allows sharing of behavioural data with advertising partners. This data is used to enhance and report on the personalised advertising experience on partner sites.
            </p>

            <Link href={'/'} className="underline">
              Learn more about personalised advertising
            </Link>

            <div className="flex flex-col">
              <div className="flex gap-1">
                <input type="radio" name="behaviouralSharing" id="behaviouralSharing" value={1} defaultChecked />
                <label htmlFor="behaviouralSharing" className="">
                  Allow behavioural data sharing
                </label>
              </div>
              <div className="flex gap-1">
                <input type="radio" name="behaviouralSharing" id="noBehaviouralSharing" value={0} />
                <label htmlFor="noBehaviouralSharing" className="">
                  Do not allow behavioural data sharing
                </label>
              </div>
            </div>
          </div>

          <hr />

          <div className="flex flex-col gap-2">
            <p className="text-base font-medium">
              Profile-based personalised advertising
            </p>
            <p className="">
              Allows sharing of your email address and phone number with advertising partners to personalise advertising based on your interests and measure the effectiveness of advertising on partner sites.
            </p>

            <Link href={'/'} className="underline">
              Learn more about profile-based advertising
            </Link>

            <div className="flex flex-col">
              <div className="flex gap-1">
                <input type="radio" name="profileBasedSharing" id="profileBasedSharing" value={1} defaultChecked />
                <label htmlFor="profileBasedSharing" className="">
                  Allow profile-based data sharing
                </label>
              </div>
              <div className="flex gap-1">
                <input type="radio" name="profileBasedSharing" id="noProfileBasedSharing" value={0} />
                <label htmlFor="noProfileBasedSharing" className="">
                  Do not allow profile-based data sharing
                </label>
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-center gap-2">
          <button onClick={acceptAll} type="button" className="bg-black text-white rounded px-4 py-1">
            Accept All
          </button>

          <button type="submit" className="border rounded px-4 py-1 shadow">
            Confirm Choices
          </button>
        </div>

      </form>

    </div>
  )
}
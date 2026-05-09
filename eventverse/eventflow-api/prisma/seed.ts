// import { clerkClient } from "@clerk/nextjs/server";
import { addDays } from "date-fns";
import prisma from "./database";

/*
npx prisma migrate reset
npx prisma migrate dev --name init
npx prisma db seed
*/

async function main() {
  try {
    return;
    await prisma.event.deleteMany();

    await prisma.user.deleteMany();
    await prisma.category.deleteMany();
    await prisma.moduleCategory.deleteMany();
    await prisma.module.deleteMany();
    await prisma.guestGroup.deleteMany();
    await prisma.formFieldType.deleteMany();
    //
    // const clerk = await clerkClient();
    // const clerkUsers = await clerk.users.getUserList();
    // const clerkData = await clerkUsers?.data;
    // clerkData?.forEach(async (each) => {
    //   await prisma.user.upsert({
    //     where: {
    //       clerkId: each?.id,
    //     },
    //     create: {
    //       clerkId: each?.id,
    //       firstname: each?.firstName,
    //       lastname: each?.lastName,
    //       email: each?.emailAddresses[0]?.emailAddress,
    //     },
    //     update: {
    //       firstname: each?.firstName,
    //       lastname: each?.lastName,
    //       email: each?.emailAddresses[0]?.emailAddress,
    //     },
    //   });
    // });
    //
    const categories = [
      {
        name: "Personal & Family",
        slug: "personal-family",
        list: [
          {
            name: "Wedding",
            slug: "wedding",
            description: "Celebrate your special day",
          },
          {
            name: "Birthday Party",
            slug: "birthday-party",
            description: "Celebrate another year of life",
          },
          {
            name: "Baby Shower",
            slug: "baby-shower",
            description: "Welcome the new arrival",
          },
          {
            name: "Anniversary",
            slug: "anniversary",
            description: "Celebrate years together",
          },
          {
            name: "Graduation Party",
            slug: "graduation-party",
            description: "Honor academic achievements",
          },
          {
            name: "Holiday Party",
            slug: "holiday-party",
            description: "Seasonal celebrations",
          },
        ],
      },
      {
        name: "Business & Corporate",
        slug: "business-corporate",
        list: [
          {
            name: "Corporate Event",
            slug: "corporate-event",
            description: "Professional meetings and conference",
          },
          {
            name: "Conference",
            slug: "conference",
            description: "Large scale professional gatherings",
          },
          {
            name: "Workshop",
            slug: "workshop",
            description: "Interactive learning sessions",
          },
          {
            name: "Networking Event",
            slug: "networking-event",
            description: "Professional Connections",
          },
          {
            name: "Product Launch",
            slug: "product-launch",
            description: "Professional Connections",
          },
          {
            name: "Webinar",
            slug: "webinar",
            description: "Online Presentations",
          },
        ],
      },
      {
        name: "Cultural & Arts",
        slug: "cultural-arts",
        list: [
          {
            name: "Cultural Event",
            slug: "cultural-event",
            description: "Art shows & cultural celebrations",
          },
          {
            name: "Art Exhibition",
            slug: "art-exhibition",
            description: "Showcase artistic works",
          },
          {
            name: "Concert",
            slug: "concert",
            description: "Live musical performances",
          },
          {
            name: "Theatre Performance",
            slug: "theatre-performance",
            description: "Stage performances & play",
          },
        ],
      },
      {
        name: "Educational & Training",
        slug: "educational-training",
        list: [
          {
            name: "Seminar",
            slug: "seminar",
            description: "Educational presentations",
          },
          {
            name: "Training Sessions",
            slug: "training-essions",
            description: "Skill development sessions",
          },
        ],
      },
      {
        name: "Entertainment & Recreation",
        slug: "entertainment-recreation",
        list: [
          {
            name: "Festival",
            slug: "festival",
            description: "Music, food & entertainment",
          },
          {
            name: "Sports Event",
            slug: "sports-event",
            description: "Athletic competitions",
          },
          {
            name: "Gaming Event",
            slug: "gaming-event",
            description: "Video game competitions",
          },
        ],
      },
      {
        name: "Community & Social",
        slug: "community-social",
        list: [
          {
            name: "Charity Gala",
            slug: "charity-gala",
            description: "Fundraising events",
          },
          {
            name: "Community Events",
            slug: "community-events",
            description: "Local community gatherings",
          },
          {
            name: "Reunion",
            slug: "reunion",
            description: "Reconnect with old friends",
          },
        ],
      },
    ];
    //
    categories.forEach(async (element) => {
      const parent = await prisma.category.create({
        data: {
          name: element.name,
          slug: element.slug,
        },
      });

      element.list.forEach(async (child) => {
        await prisma.category.create({
          data: {
            parentId: parent.id,
            name: child.name,
            slug: child.slug,
            description: child.description,
          },
        });
      });
    });
    //
    const moduleCategories = [
      {
        name: "Essential Modules",
        slug: "essential-module",
        description: "Core functionality every event needs",
        list: [
          {
            name: "Rsvp Management",
            slug: "rsvp-management",
            description:
              "Guest management and RSVP tracking with groups and analytics",
            optionOne: "Response tracking",
            optionTwo: "Dietary preferences",
            optionThree: "Plus-one management",
            price: 0,
          },
          {
            name: "Schedule & Timeline",
            slug: "schedule-timeline",
            description: "Event scheduling and timeline management",
            optionOne: "Custom timeline",
            optionTwo: "Session management",
            optionThree: "Speaker profiles",
            price: 0,
          },
          {
            name: "Announcements",
            slug: "announcements",
            description: "Event announcements and updates system",
            optionOne: "Real-time updates",
            optionTwo: "Push notifications",
            optionThree: "Priority messaging",
            price: 0,
          },
        ],
      },
      {
        name: "Guest Engagement",
        slug: "guest-engagement",
        description: "Interactive features to enhance experience",
        list: [
          {
            name: "Games & Activities",
            slug: "games-activities",
            description:
              "Interactive games and activities for guest engagement",
            optionOne: "Trivia games",
            optionTwo: "Photo contests",
            optionThree: "Leaderboards",
            price: 15,
          },
          {
            name: "Survey & Feedback",
            slug: "survey-feedback",
            description: "Guest surveys and feedback collection system",
            optionOne: "Custom surveys",
            optionTwo: "Real-time results",
            optionThree: "Analytics",
            price: 10,
          },
          {
            name: "Media Management",
            slug: "media-management",
            description:
              "Photo galleries and media management with guest uploads",
            optionOne: "Shared albums",
            optionTwo: "Live photo feed",
            optionThree: "QR code sharing",
            price: 20,
          },
        ],
      },
      {
        name: "Business Features",
        slug: "business-feature",
        description: "Professional event management tools",
        list: [
          {
            name: "Seating Arrangement",
            slug: "seating-arrangement",
            description:
              "Table planning and seating arrangements with visual editor",
            optionOne: "Visual seating charts",
            optionTwo: "Auto-assignment",
            optionThree: "Guest preferences",
            price: 30,
          },
          {
            name: "Ticketing System",
            slug: "ticketing-system",
            description: "Ticket sales and check-in system with pricing tiers",
            optionOne: "Multiple ticket types",
            optionTwo: "Payment processing",
            optionThree: "Promo codes",
            price: 30,
          },
          {
            name: "Budget Planning",
            slug: "budget-planning",
            description:
              "Budget planning and expense tracking with vendor integration",
            optionOne: "Expense tracking",
            optionTwo: "Vendor management",
            optionThree: "Budget analytics",
            price: 20,
          },
        ],
      },
    ];
    //
    moduleCategories.forEach(async (element) => {
      const parent = await prisma.moduleCategory.create({
        data: {
          name: element.name,
          slug: element.slug,
          description: element.description,
        },
      });

      element.list.forEach(async (child) => {
        await prisma.moduleCategory.create({
          data: {
            parentId: parent.id,
            name: child.name,
            slug: child.slug,
            description: child.description,
            optionOne: child.optionOne,
            optionTwo: child.optionTwo,
            optionThree: child.optionThree,
            price: child.price,
          },
        });
      });
    });
    //
    const startDate = addDays(new Date(), 1);
    const endDate = addDays(new Date(), 2);
    const recurringEndDate = addDays(new Date(), 10);
    const host = await prisma.user.findFirst({
      where: { email: "safisiddiqui.work@gmail.com" },
    });
    const category = await prisma.category.findFirst({
      where: { parentId: { not: null } },
    });
    //
    const rsvpModuleCategory = await prisma.moduleCategory.findFirst({
      where: { parentId: { not: null }, slug: "rsvp-management" },
    });
    const scheduleModuleCategory = await prisma.moduleCategory.findFirst({
      where: { parentId: { not: null }, slug: "schedule-timeline" },
    });
    //
    const event = await prisma.event.create({
      data: {
        name: "Test Event",
        slug: "test-event",
        description: "Test Event Description",
        step: 4,
        //
        // startDate: startDate,
        // startTime: format(setMinutes(setHours(startDate, 7), 11), "HH:mm"),
        // endTime: format(setMinutes(setHours(startDate, 9), 21), "HH:mm"),
        // isMultiDayEvent: true,
        // endDate: endDate,
        //
        // isRecurringEvent: true,
        // recurringRepeat: 5,
        // recurringOccerrence: 10,
        // recurringEndDate: recurringEndDate,
        //
        isVenueEnabled: true,
        venueName: "Test Venue",
        venueCapacity: 31,
        venueFeature: "Wifi, Parking",
        venueAddress: "Test Address",
        venueLink: "http://test-link.com",
        //
        hostId: host?.id,
        categoryId: category?.id,
        // timezone: "UTC",
        // recurringPattern: "NONE",
        // recurringEnd: "NONE",
        venueType: "NONE",
        launchStrategy: "NONE",
        //
        modules: {
          create: [
            {
              slug: `${rsvpModuleCategory?.slug}-${Date.now()}`,
              categoryId: rsvpModuleCategory?.id,
            },
            {
              slug: `${scheduleModuleCategory?.slug}-${Date.now()}`,
              categoryId: scheduleModuleCategory?.id,
            },
          ],
        },
      },
    });
    //
    await prisma.formFieldType.createMany({
      data: [
        {
          name: "Full Name",
          slug: `full-name-${Date.now()}`,
          isRequired: true,
          placeholder: "Enter full name",
          type: "TEXT",
        },
        {
          name: "Email Address",
          slug: `email-address-${Date.now()}`,
          isRequired: true,
          placeholder: "Enter email address",
          type: "TEXT",
        },
        {
          name: "Phone Number",
          slug: `phone-number-${Date.now()}`,
          isRequired: false,
          placeholder: "Enter phone number",
          type: "TEXT",
        },
        {
          name: "Plus One",
          slug: `plus-one-${Date.now()}`,
          isRequired: false,
          placeholder: "Enter plus one",
          type: "TEXT",
        },
        {
          name: "Dietary Instruction",
          slug: `dietary-instruction-${Date.now()}`,
          isRequired: false,
          placeholder: "Food allergies and preferences",
          type: "TEXTAREA",
        },
        {
          name: "Message To Host",
          slug: `message-to-host-${Date.now()}`,
          isRequired: false,
          placeholder: "Personal note or wishes",
          type: "TEXTAREA",
        },
        {
          name: "Special Accommodation",
          slug: `special-accommodation-${Date.now()}`,
          isRequired: false,
          placeholder: "Accessibility requirements",
          type: "TEXTAREA",
        },
        {
          name: "Song Request",
          slug: `song-request-${Date.now()}`,
          isRequired: false,
          placeholder: "Music Preference",
          type: "TEXTAREA",
        },
      ],
    });
    //
    await prisma.formFieldType.create({
      data: {
        name: "Will you be attending?",
        slug: `attending-${Date.now()}`,
        isRequired: true,
        placeholder: "Enter attending status",
        type: "RADIO",
        options: {
          create: [
            {
              slug: `yes-${Date.now()}`,
              name: "Yes, I'll be there",
            },
            {
              slug: `maybe-${Date.now()}`,
              name: "Maybe, Not Sure",
            },
            {
              slug: `sorry-${Date.now()}`,
              name: "Sorry, Can't make it",
            },
          ],
        },
      },
    });
    //
  } catch (error) {
    console.log(error);
  }
}

main();

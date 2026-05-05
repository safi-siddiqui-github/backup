import prisma from "@/prisma/database";
import {
  EventCategoryModelType,
  EventModuleModelType,
} from "@/type/type-model";

export async function LibSeedDatabaseHelper() {
  await seedEventCategories();
  await seedEventModules();
}

async function seedEventCategories() {
  const categories: EventCategoryModelType[] = [
    {
      name: "Music & Concerts",
      slug: "music-concerts",
    },
    {
      name: "Festivals & Carnivals",
      slug: "festivals-carnivals",
    },
    {
      name: "Arts & Exhibitions",
      slug: "arts-exhibitions",
    },
    {
      name: "Theatre & Performances",
      slug: "theatre-performances",
    },
    {
      name: "Comedy Shows",
      slug: "comedy-shows",
    },
    {
      name: "Film Screenings",
      slug: "film-screenings",
    },

    {
      name: "Conferences & Summits",
      slug: "conferences-summits",
    },
    {
      name: "Workshops & Training",
      slug: "workshops-training",
    },
    {
      name: "Networking Events",
      slug: "networking-events",
    },
    {
      name: "Startup & Entrepreneurship",
      slug: "startup-entrepreneurship",
    },
    {
      name: "Career Fairs",
      slug: "career-fairs",
    },
    {
      name: "Leadership & Management",
      slug: "leadership-management",
    },

    {
      name: "Classes & Courses",
      slug: "classes-courses",
    },
    {
      name: "Seminars & Lectures",
      slug: "seminars-lectures",
    },
    {
      name: "Webinars & Online Courses",
      slug: "webinars-online-courses",
    },
    {
      name: "Skill Development",
      slug: "skill-development",
    },
    {
      name: "Technology & Coding",
      slug: "technology-coding",
    },
    {
      name: "Academic Conferences",
      slug: "academic-conferences",
    },

    {
      name: "Sports Matches",
      slug: "sports-matches",
    },
    {
      name: "Fitness Classes",
      slug: "fitness-classes",
    },
    {
      name: "Marathons & Races",
      slug: "marathons-races",
    },
    {
      name: "Yoga & Wellness",
      slug: "yoga-wellness",
    },
    {
      name: "Outdoor Adventures",
      slug: "outdoor-adventures",
    },
    {
      name: "Esports & Gaming",
      slug: "esports-gaming",
    },

    {
      name: "Dinner & Drink",
      slug: "dinner-drink",
    },
    {
      name: "Wine & Tasting",
      slug: "wine-tasting",
    },
    {
      name: "Cooking Classes",
      slug: "cooking-classes",
    },
    {
      name: "Market & Fairs",
      slug: "market-fairs",
    },
    {
      name: "Fashion & Style",
      slug: "fashion-style",
    },
    {
      name: "Shopping & Sales",
      slug: "shopping-sales",
    },
    {
      name: "Mental Health",
      slug: "mental-health",
    },
    {
      name: "Meditation & Mindfulness",
      slug: "meditation-mindfulness",
    },
    {
      name: "Wellness Retreats",
      slug: "wellness-retreats",
    },
    {
      name: "Health Camps",
      slug: "health-camps",
    },
    {
      name: "Support Groups",
      slug: "support-groups",
    },
    {
      name: "Nutrition & Diet",
      slug: "nutrition-diet",
    },
    {
      name: "AI & Machine Learning",
      slug: "ai-machine-learning",
    },
    {
      name: "Hackathons & Coding",
      slug: "hackathons-coding",
    },
    {
      name: "Product Launches",
      slug: "product-launches",
    },
    {
      name: "Developer Meetups",
      slug: "developer-meetups",
    },
    {
      name: "Cybersecurity",
      slug: "cybersecurity",
    },
    {
      name: "Tech Conferences",
      slug: "tech-conferences",
    },
    {
      name: "Tours & Sightseeing",
      slug: "tours-sightseeing",
    },
    {
      name: "Hiking & Trekking",
      slug: "hiking-trekking",
    },
    {
      name: "Camping & Outdoor Adventures",
      slug: "camping-outdoor-adventures",
    },
    {
      name: "Nature & Wildlife",
      slug: "nature-wildlife",
    },
    {
      name: "Adventure Sports",
      slug: "adventure-sports",
    },
    {
      name: "Beach & Water Activities",
      slug: "beach-water-activities",
    },
  ];

  for (const category of categories) {
    await prisma.eventCategory.upsert({
      where: {
        slug: category?.slug ?? "",
      },
      create: {
        name: category?.name,
        slug: category?.slug,
      },
      update: {
        name: category?.name,
      },
    });
  }
}

async function seedEventModules() {
  const modules: EventModuleModelType[] = [
    {
      name: "Essential Modules",
      slug: "essential-modules",
      description: "Core functionalities for event management",
      children: [
        {
          name: "RSVP Management",
          slug: "rsvp-management",
          description: "Guest responses and attendance tracking",
          price: 0,
          optionOne: "Response tracking",
          optionTwo: "Dietary preferences",
          optionThree: "Plus-one management",
        },
        {
          name: "Announcements",
          slug: "announcements",
          description: "Keep guests informed with updates",
          price: 0,
          optionOne: "Real-time updates",
          optionTwo: "Push notifications",
          optionThree: "Priority messaging",
        },
        {
          name: "Event Schedule",
          slug: "event-schedule",
          description: "Timeline and agenda management",
          price: 0,
          optionOne: "Custom timeline",
          optionTwo: "Session management",
          optionThree: "Speaker profiles",
        },
      ],
    },
    {
      name: "Guest Engagement",
      slug: "guest-engagement",
      description: "Tools to manage guest interactions and RSVPs",
      children: [
        {
          name: "Photo & Media Gallery",
          slug: "photo-media-gallery",
          description: "Showcase event photos and media",
          price: 20,
          optionOne: "Photo uploads",
          optionTwo: "Video uploads",
          optionThree: "Social media integration",
        },
        {
          name: "Interactive Games & Quizzes",
          slug: "interactive-games-quizzes",
          description: "Engage guests with interactive games and quizzes",
          price: 15,
          optionOne: "Multiple choice questions",
          optionTwo: "True or False questions",
          optionThree: "Short answer questions",
        },
        {
          name: "Surveys & Feedback",
          slug: "surveys-feedback",
          description: "Collect guest feedback and surveys",
          price: 10,
          optionOne: "Multiple choice questions",
          optionTwo: "Short answer questions",
          optionThree: "Open-ended questions",
        },
      ],
    },
    {
      name: "Business Features",
      slug: "business-features",
      description: "Professional event management tools",
      children: [
        {
          name: "Budget Planning",
          slug: "budget-planning",
          description: "Track and manage event costs",
          price: 20,
          optionOne: "Cost breakdown",
          optionTwo: "Budget management",
          optionThree: "Expense tracking",
        },
        {
          name: "Seating Management",
          slug: "seating-management",
          description: "Efficiently manage seating arrangements",
          price: 15,
          optionOne: "Virtual seating",
          optionTwo: "Physical seating",
          optionThree: "Seating chart",
        },
        {
          name: "Ticketing System",
          slug: "ticketing-system",
          description: "Sell tickets and manage sales",
          price: 10,
          optionOne: "Online ticketing",
          optionTwo: "Physical ticketing",
          optionThree: "Digital ticketing",
        },
      ],
    },
    {
      name: "Analytics & Insights",
      slug: "analytics-insights",
      description: "Data-driven event optimization",
      children: [
        {
          name: "Event Analytics",
          slug: "event-analytics",
          description: "Track and analyze event performance",
          price: 35,
          optionOne: "Real-time analytics",
          optionTwo: "Custom reports",
          optionThree: "Audience insights",
        },
      ],
    },
  ];

  for (const eModule of modules) {
    const parent = await prisma.eventModule.upsert({
      where: {
        slug: eModule?.slug ?? "",
      },
      create: {
        name: eModule?.name,
        slug: eModule?.slug,
        description: eModule?.description,
      },
      update: {
        name: eModule?.name,
        description: eModule?.description,
      },
    });

    for (const eceModule of eModule?.children ?? []) {
      await prisma.eventModule.upsert({
        where: {
          slug: eceModule?.slug ?? "",
        },
        create: {
          parentId: parent?.id,
          name: eceModule?.name,
          slug: eceModule?.slug,
          price: eceModule?.price,
          description: eceModule?.description,
          optionOne: eceModule?.optionOne,
          optionTwo: eceModule?.optionTwo,
          optionThree: eceModule?.optionThree,
        },
        update: {
          parentId: parent?.id,
          name: eceModule?.name,
          price: eceModule?.price,
          description: eceModule?.description,
          optionOne: eceModule?.optionOne,
          optionTwo: eceModule?.optionTwo,
          optionThree: eceModule?.optionThree,
        },
      });
    }
  }
}

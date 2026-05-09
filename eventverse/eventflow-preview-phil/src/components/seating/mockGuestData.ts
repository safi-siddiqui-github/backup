import type { Guest } from "@/types/venue";
import { getInitials, getAvatarColor } from "./GuestAvatar";

const firstNames = [
  "John", "Sarah", "Michael", "Emma", "David", "Lisa", "James", "Emily",
  "Robert", "Jessica", "William", "Ashley", "Richard", "Amanda", "Joseph",
  "Melissa", "Thomas", "Jennifer", "Christopher", "Michelle", "Daniel", "Stephanie",
  "Matthew", "Nicole", "Anthony", "Elizabeth", "Mark", "Rebecca", "Donald", "Laura",
  "Steven", "Karen", "Paul", "Nancy", "Andrew", "Betty", "Joshua", "Helen",
  "Kenneth", "Sandra", "Kevin", "Donna", "Brian", "Carol", "George", "Ruth",
  "Edward", "Sharon", "Ronald", "Dorothy"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
  "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
  "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter"
];

const groups = [
  { name: "Family", weight: 30 },
  { name: "Friends", weight: 25 },
  { name: "VIP", weight: 15 },
  { name: "Colleagues", weight: 20 },
  { name: "Plus Ones", weight: 10 }
];

const dietaryRestrictions = [
  { name: "None", weight: 60 },
  { name: "Vegetarian", weight: 15 },
  { name: "Vegan", weight: 8 },
  { name: "Gluten-free", weight: 10 },
  { name: "Halal", weight: 4 },
  { name: "Kosher", weight: 3 }
];

const statuses: Array<"pending" | "attending" | "declined" | "maybe"> = [
  "attending", "attending", "attending", "attending", // 80% attending
  "pending"
];

const getWeightedRandom = <T extends { name: string; weight: number }>(items: T[]): string => {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of items) {
    if (random < item.weight) {
      return item.name;
    }
    random -= item.weight;
  }
  
  return items[0].name;
};

export const generateMockGuests = (count: number = 50): Guest[] => {
  const guests: Guest[] = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let fullName: string;
    let attempts = 0;
    
    // Generate unique names
    do {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      fullName = `${firstName} ${lastName}`;
      attempts++;
    } while (usedNames.has(fullName) && attempts < 100);
    
    usedNames.add(fullName);

    const email = fullName.toLowerCase().replace(/\s+/g, ".") + "@example.com";
    const group = getWeightedRandom(groups);
    const dietary = getWeightedRandom(dietaryRestrictions);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const plusOnes = Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0;

    const guest: Guest = {
      id: i + 1,
      name: fullName,
      email,
      group,
      dietary,
      status,
      plusOnes,
      phone: Math.random() > 0.5 ? `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : undefined,
      initials: getInitials(fullName),
      avatarColor: getAvatarColor(i + 1),
      notes: Math.random() > 0.8 ? "Special requirements or preferences" : undefined
    };

    guests.push(guest);
  }

  return guests;
};

// Export a default set of 50 guests
export const mockGuests = generateMockGuests(50);

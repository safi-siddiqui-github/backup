import { Contributor, PhotoLike } from "./types";

const firstNames = [
  "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason", "Isabella", "William",
  "Mia", "James", "Charlotte", "Benjamin", "Amelia", "Lucas", "Harper", "Henry", "Evelyn", "Alexander",
  "Abigail", "Michael", "Emily", "Daniel", "Elizabeth", "Matthew", "Avery", "Jackson", "Sofia", "Sebastian",
  "Ella", "David", "Madison", "Carter", "Scarlett", "Jayden", "Victoria", "Wyatt", "Aria", "John",
  "Grace", "Owen", "Chloe", "Dylan", "Camila"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores"
];

const companies = [
  "TechCorp", "InnovateLabs", "GlobalTech", "DataSystems", "CloudWorks", "DevStudio", "SmartSolutions",
  "NextGen Inc", "Digital Dynamics", "FutureWorks", "CodeCraft", "TechNova", "ByteForge"
];

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();
};

const getAvatarColor = (name: string): string => {
  const colors = [
    "from-blue-500 to-purple-500",
    "from-green-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-yellow-500 to-orange-500",
    "from-teal-500 to-green-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export const generateMockContributors = (count: number = 45): Contributor[] => {
  const contributors: Contributor[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const role = Math.random() > 0.3 ? 'uploader' : 'viewer';
    const uploadCount = role === 'uploader' ? Math.floor(Math.random() * 30) + 1 : 0;
    
    contributors.push({
      id: `contributor-${i + 1}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      avatar: undefined, // We'll use gradient avatars with initials
      role,
      uploadCount,
      joinedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within last week
    });
  }
  
  return contributors;
};

export const generatePhotoLikes = (photoId: string, allContributors: Contributor[]): PhotoLike[] => {
  const likeCount = Math.floor(Math.random() * 20) + 1;
  const shuffled = [...allContributors].sort(() => 0.5 - Math.random());
  const likers = shuffled.slice(0, likeCount);
  
  return likers.map(contributor => ({
    userId: contributor.id,
    userName: contributor.name,
    userEmail: contributor.email,
    userAvatar: contributor.avatar,
    likedAt: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000) // Random date within last 5 days
  }));
};

export const getRandomContributors = (allContributors: Contributor[], count: number): Contributor[] => {
  const shuffled = [...allContributors].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export { getInitials, getAvatarColor };

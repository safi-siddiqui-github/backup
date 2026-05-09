import { Attendee } from "@/types/conferenceScheduling";

const firstNames = [
  "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason", "Isabella", "William",
  "Mia", "James", "Charlotte", "Benjamin", "Amelia", "Lucas", "Harper", "Henry", "Evelyn", "Alexander",
  "Sarah", "Michael", "Jessica", "David", "Emily", "Daniel", "Ashley", "Matthew", "Samantha", "Andrew"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"
];

const companies = [
  "TechCorp", "Innovate Labs", "Digital Dynamics", "CloudScale Inc", "DataFlow Systems",
  "NextGen Solutions", "CodeCraft", "ByteForge", "Quantum Tech", "Neural Networks Ltd",
  "AI Innovations", "CyberSphere", "DevOps Masters", "Agile Ventures", "CloudNative Co"
];

const titles = [
  "Senior Software Engineer", "Product Manager", "CTO", "VP of Engineering",
  "Lead Developer", "Data Scientist", "DevOps Engineer", "Solutions Architect",
  "Engineering Manager", "Tech Lead", "Principal Engineer", "Full Stack Developer",
  "Backend Engineer", "Frontend Developer", "Security Engineer"
];

const interests = [
  "AI/ML", "Cloud Computing", "DevOps", "Security", "Frontend", "Backend",
  "Mobile Development", "Data Science", "Blockchain", "IoT", "AR/VR"
];

const dietaryRestrictions = [
  "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut Allergy", "None"
];

const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateMockAttendees = (count: number = 100): Attendee[] => {
  const attendees: Attendee[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    
    // Generate initials for avatar
    const initials = `${firstName[0]}${lastName[0]}`;
    
    // Random registration date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const registrationDate = new Date();
    registrationDate.setDate(registrationDate.getDate() - daysAgo);
    
    // Random check-in status (80% pending, 15% checked-in, 5% no-show)
    const rand = Math.random();
    let checkInStatus: Attendee['checkInStatus'];
    if (rand < 0.8) checkInStatus = 'pending';
    else if (rand < 0.95) checkInStatus = 'checked-in';
    else checkInStatus = 'no-show';
    
    const attendee: Attendee = {
      id: `attendee-${i + 1}`,
      name,
      email,
      avatar: initials,
      company: getRandomItem(companies),
      title: getRandomItem(titles),
      bio: `Passionate ${getRandomItem(titles).toLowerCase()} with ${Math.floor(Math.random() * 15) + 1} years of experience in tech.`,
      linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      twitter: `@${firstName.toLowerCase()}${lastName[0].toLowerCase()}`,
      registrationDate,
      checkInStatus,
      dietaryRestrictions: [getRandomItem(dietaryRestrictions)],
      accessibilityNeeds: Math.random() > 0.9 ? ["Wheelchair Access"] : [],
      interests: getRandomItems(interests, Math.floor(Math.random() * 3) + 2)
    };
    
    attendees.push(attendee);
  }
  
  return attendees;
};

// Generate a default set of attendees
export const mockAttendees = generateMockAttendees(100);

// Helper function to assign random attendees to a session
export const getRandomAttendeesForSession = (
  sessionCapacity: number,
  registeredCount: number,
  allAttendees: Attendee[] = mockAttendees
): Attendee[] => {
  const count = Math.min(registeredCount, sessionCapacity, allAttendees.length);
  return getRandomItems(allAttendees, count);
};

// Generate high-density schedule for testing 5+ concurrent sessions
export const generateHighDensitySchedule = (
  baseDate: Date,
  tracks: Array<{ id: string; name: string }>,
  locations: string[]
) => {
  const sessions = [];
  
  // Day 1: 8 concurrent sessions at 10:00 AM (Peak Hour)
  for (let i = 0; i < 8; i++) {
    const sessionDate = new Date(baseDate);
    sessions.push({
      id: `high-density-day1-${i + 1}`,
      title: `Session ${i + 1}: ${getRandomItem(['Advanced', 'Introduction to', 'Deep Dive into', 'Workshop on'])} ${getRandomItem(['AI', 'Cloud', 'Security', 'DevOps', 'Frontend', 'Backend'])}`,
      description: `Comprehensive session covering key concepts and best practices. Join us for an engaging discussion and hands-on activities.`,
      type: getRandomItem(['session', 'workshop', 'panel']) as any,
      trackId: tracks[i % tracks.length]?.id,
      speakerNames: [
        `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
        Math.random() > 0.5 ? `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}` : ''
      ].filter(Boolean),
      date: sessionDate,
      startTime: '10:00',
      endTime: '11:30',
      location: locations[i % locations.length] || `Room ${String.fromCharCode(65 + i)}`,
      capacity: Math.floor(Math.random() * 50) + 30,
      registeredCount: Math.floor(Math.random() * 60) + 20,
      waitlistCount: Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0,
      level: getRandomItem(['beginner', 'intermediate', 'advanced', 'all']) as any,
      tags: getRandomItems(['AI', 'Cloud', 'Security', 'Best Practices', 'Hands-on'], 2)
    });
  }
  
  // Day 2: 5 concurrent sessions at 2:00 PM
  const day2Date = new Date(baseDate);
  day2Date.setDate(day2Date.getDate() + 1);
  for (let i = 0; i < 5; i++) {
    sessions.push({
      id: `high-density-day2-${i + 1}`,
      title: `Afternoon Session ${i + 1}: ${getRandomItem(['Mastering', 'Building', 'Scaling', 'Optimizing'])} ${getRandomItem(['Microservices', 'APIs', 'Databases', 'Infrastructure'])}`,
      description: `Learn practical skills and strategies from industry experts in this focused session.`,
      type: getRandomItem(['session', 'workshop']) as any,
      trackId: tracks[i % tracks.length]?.id,
      speakerNames: [`${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`],
      date: day2Date,
      startTime: '14:00',
      endTime: '15:30',
      location: locations[i % locations.length] || `Room ${String.fromCharCode(65 + i)}`,
      capacity: Math.floor(Math.random() * 40) + 25,
      registeredCount: Math.floor(Math.random() * 50) + 15,
      waitlistCount: Math.random() > 0.8 ? Math.floor(Math.random() * 5) : 0,
      level: getRandomItem(['intermediate', 'advanced', 'all']) as any,
      tags: getRandomItems(['Backend', 'Architecture', 'Performance', 'Scalability'], 2)
    });
  }
  
  // Day 3: 12 concurrent sessions at 9:00 AM (Extreme Case)
  const day3Date = new Date(baseDate);
  day3Date.setDate(day3Date.getDate() + 2);
  for (let i = 0; i < 12; i++) {
    sessions.push({
      id: `high-density-day3-${i + 1}`,
      title: `Morning Track ${i + 1}: ${getRandomItem(['Exploring', 'Understanding', 'Implementing', 'Designing'])} ${getRandomItem(['Machine Learning', 'Kubernetes', 'Serverless', 'GraphQL', 'React', 'Python'])}`,
      description: `Start your day with this informative session packed with insights and practical takeaways.`,
      type: i < 2 ? 'keynote' : getRandomItem(['session', 'workshop', 'panel']) as any,
      trackId: tracks[i % tracks.length]?.id,
      speakerNames: [
        `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
        i % 3 === 0 ? `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}` : ''
      ].filter(Boolean),
      date: day3Date,
      startTime: '09:00',
      endTime: '10:30',
      location: locations[i % locations.length] || `Room ${String.fromCharCode(65 + (i % 12))}`,
      capacity: Math.floor(Math.random() * 60) + 20,
      registeredCount: Math.floor(Math.random() * 70) + 10,
      waitlistCount: Math.random() > 0.6 ? Math.floor(Math.random() * 15) : 0,
      level: getRandomItem(['beginner', 'intermediate', 'advanced', 'all']) as any,
      tags: getRandomItems(['Frontend', 'Backend', 'Mobile', 'Data Science', 'Cloud'], 2)
    });
  }
  
  return sessions;
};

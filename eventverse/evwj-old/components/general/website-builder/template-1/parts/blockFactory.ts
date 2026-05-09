// factory for creating initial blocks used by Template1
export function createId(prefix = 'p'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function createBlock(type: string): any {
  const id = createId('b');
  const newBlock: any = { id, type, data: {} };

  switch (type) {
    case 'layout':
      newBlock.data = {
        title: 'Welcome to Our Event',
        subtitle: 'Join us for an amazing experience',
        description: 'This is going to be an unforgettable event',
        buttonText: 'Learn More',
        button2Text: 'Register',
        bgColor: '#ffffff',
        textColor: '#111827',
        buttonColor: '#2563eb',
        buttonTextColor: '#ffffff',
        button2Color: '#f3f4f6',
        button2TextColor: '#111827',
      };
      break;

    case 'content':
      newBlock.data = {
        title: 'Section Title',
        content: 'Add your content here. You can include multiple paragraphs and format the text as needed.',
        bgColor: '',
        textColor: '',
      };
      break;

    case 'about':
      newBlock.data = {
        title: 'About This Event',
        subtitle: 'We build unforgettable experiences',
        description:
          'EventDome helps you create beautiful and functional event websites quickly. Customize this section to tell attendees what makes your event special.',
        imageUrl:
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
        bullets: ['Professional templates', 'Easy-to-use editor', 'Responsive by default'],
        ctaText: 'Get Started',
        ctaLink: '/get-started',
        layout: 'two',
        items: [
          { id: `${id}-i1`, title: 'Speakers', description: 'Top industry experts', imageUrl: '' },
          { id: `${id}-i2`, title: 'Schedule', description: 'Curated event agenda', imageUrl: '' },
          { id: `${id}-i3`, title: 'Tickets', description: 'Secure checkout', imageUrl: '' },
        ],
        bgColor: '#ffffff',
        textColor: '#111827',
      };
      break;

    case 'countdown': {
      const defaultDate = new Date('2025-12-11T14:00:00');
      newBlock.data = {
        title: 'Event Countdown',
        subtitle: "Don't miss out on this amazing event",
        targetDate: defaultDate.toISOString(),
        message: 'Event starts on Thursday, December 11, 2025 at 02:00 PM',
        bgColor: '',
        textColor: '',
      };
      break;
    }

    case 'map':
      newBlock.data = {
        title: 'Find Us',
        subtitle: 'Event location and directions',
        description: 'Interactive Map Coming Soon add a fake location with some more details',
        address: '123 Event Street, City, Country',
        bgColor: '',
        textColor: '',
      };
      break;

    case 'venue':
      newBlock.data = {
        title: 'Event Venue',
        subtitle: 'Find your way around our venue',
        address: '123 Event Street, City, Country',
        embedUrl: '',
        bgColor: '',
        textColor: '',
      };
      break;

    case 'live-stream':
      newBlock.data = {
        title: 'Watch Live',
        subtitle: 'Join us virtually for the live stream',
        streamUrl: '',
        bgColor: '',
        textColor: '',
      };
      break;

    case 'networking':
      newBlock.data = {
        title: 'Network & Connect',
        subtitle: 'Meet fellow attendees and expand your professional network',
        description:
          'Join structured networking sessions, speed-dating rounds, and informal meetups to connect with peers, mentors, and potential collaborators.',
        activities: [
          { title: 'Speed Networking', time: '10:30 AM', desc: 'Quick 5-min rounds to meet many attendees.' },
          { title: 'Mentor Roundtables', time: '2:00 PM', desc: 'Small-group discussions with industry mentors.' },
        ],
        cta: 'See Events',
        bgColor: '',
        textColor: '',
      };
      break;

    case 'gallery':
      newBlock.data = {
        title: 'Image Gallery',
        images: [
          'https://images.unsplash.com/photo-1762656668994-57d8933d59dd?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=387',
          'https://images.unsplash.com/photo-1676819188139-a9304e74d572?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=436',
          'https://images.unsplash.com/photo-1693335919628-515005659b5c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=387',
          'https://images.unsplash.com/photo-1607242868486-91ee404a05ca?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=387',
          'https://images.unsplash.com/photo-1745378716145-8d6fab53f0e4?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=387',
        ],
        bgColor: '',
        textColor: '',
      };
      break;

    case 'footer':
      newBlock.data = {
        title: 'About EventDome',
        description: 'We build beautiful event websites and tools to help you manage events.',
        col1Title: 'Resources',
        col2Title: 'Company',
        col1: [{ label: 'Docs', href: '#' }, { label: 'Help', href: '#' }],
        col2: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }],
        copyright: `© ${new Date().getFullYear()} EventDome`,
        rightText: '',
        dark: false,
        bgColor: '',
        textColor: '',
      };
      break;

    case 'ticket':
      newBlock.data = {
        title: 'Get Your Tickets',
        subtitle: 'Choose the perfect ticket for your needs',
        tickets: [
          {
            label: 'Early Bird',
            price: '$299.00',
            highlights: ['Full conference access', 'Welcome kit', 'Networking lunch', 'Certificate'],
            maxPerPerson: 5,
          },
          {
            label: 'Standard',
            price: '$399.00',
            highlights: ['Full conference access', 'Welcome kit', 'Networking lunch', 'Certificate', 'Workshop access'],
            availabilityText: '100 tickets available',
            maxPerPerson: 5,
          },
        ],
        bgColor: '',
        textColor: '',
      };
      break;

    case 'sessions':
      newBlock.data = {
        title: 'Conference Sessions',
        subtitle: 'Explore our diverse lineup of sessions and workshops',
        tabs: ['All Sessions', 'Keynotes', 'Workshops', 'Panels'],
        sessions: [
          {
            track: 'All Sessions',
            title: 'Opening Keynote: The Future of Innovation',
            speaker: 'Dr. Sarah Johnson',
            time: '09:00 - 10:00',
            location: 'Main Auditorium',
            level: 'beginner',
            description: 'Join us for an inspiring keynote about emerging technologies and their impact on business.',
            tag1: 'innovation',
            tag2: 'technology',
          },
          {
            track: 'Technical',
            title: 'AI in Modern Development',
            speaker: 'Michael Chen',
            time: '10:30 - 11:30',
            location: 'Room A',
            level: 'intermediate',
            description: 'Learn how artificial intelligence is transforming software development practices.',
            tag1: 'AI',
            tag2: 'development',
          },
        ],
        bgColor: '',
        textColor: '',
      };
      break;

    case 'pricing':
      newBlock.data = {
        title: 'Tickets & Speakers',
        subtitle: 'Speakers and ticket options',
        speakers: [
          {
            name: 'Dr. Sarah Johnson',
            role: 'Chief Innovation Officer',
            company: 'InnovateTech Corp',
            bio: 'Dr. Johnson is a renowned technology researcher with over 15 years of experience in innovation strategy and emerging technologies.',
          },
          {
            name: 'Michael Chen',
            role: 'Senior AI Engineer',
            company: 'TechCorp',
            bio: 'Michael specializes in machine learning and AI development, with a focus on practical applications in software engineering.',
          },
        ],
        tickets: [
          {
            label: 'Early Bird',
            price: '$299.00',
            sub: 'Perfect for individual attendees',
            highlights: ['Access to all sessions', 'Welcome reception', 'Lunch and coffee breaks', 'Digital resources', 'Networking opportunities'],
            availabilityText: '50 tickets available',
            cta: 'Get Early Bird Ticket',
          },
          {
            label: 'Professional',
            price: '$499.00',
            sub: 'For teams and professionals',
            highlights: ['All access', 'Workshop access', 'VIP networking', 'Priority seating'],
            availabilityText: 'Limited',
            cta: 'Get Professional Ticket',
          },
        ],
        bgColor: '',
        textColor: '',
      };
      break;

    default:
      newBlock.data = { message: 'Default block: customize this content', bgColor: '', textColor: '' };
  }

  return newBlock;
}
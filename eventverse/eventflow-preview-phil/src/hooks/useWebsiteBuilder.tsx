import { useState, useCallback, useEffect } from "react";
import { Website, Page, Section, Theme, NavigationConfig } from "@/types/website";
import { toast } from "sonner";

export const useWebsiteBuilder = (eventId?: string, websiteId?: string) => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [currentWebsite, setCurrentWebsite] = useState<Website | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Load websites from storage
  useEffect(() => {
    const stored = localStorage.getItem('event-websites');
    if (stored) {
      try {
        const parsedWebsites = JSON.parse(stored);
        setWebsites(parsedWebsites);
        
        // If a specific websiteId is provided, set it as current
        if (websiteId) {
          const targetWebsite = parsedWebsites.find((w: Website) => w.id === websiteId);
          if (targetWebsite) {
            setCurrentWebsite(targetWebsite);
            setCurrentPage(targetWebsite.pages[0]);
          }
        }
      } catch (error) {
        console.error('Error loading websites:', error);
      }
    }
  }, [websiteId]);

  // Save websites to storage
  const saveWebsites = useCallback((updatedWebsites: Website[]) => {
    setWebsites(updatedWebsites);
    localStorage.setItem('event-websites', JSON.stringify(updatedWebsites));
  }, []);

  // Create new website from template
  const createWebsite = useCallback((templateId: string, websiteName: string) => {
    const templatePages = getTemplatePages(templateId);
    
    const newWebsite: Website = {
      id: `website-${Date.now()}`,
      eventId: eventId || '',
      name: websiteName,
      template: templateId,
      pages: templatePages,
      theme: getDefaultTheme(templateId),
      navigationConfig: getTemplateNavigationConfig(templateId),
      settings: {
        integrations: {}
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedWebsites = [...websites, newWebsite];
    saveWebsites(updatedWebsites);
    
    // Set as current website and page immediately
    setCurrentWebsite(newWebsite);
    setCurrentPage(newWebsite.pages[0]);
    
    toast.success(`Website "${websiteName}" created successfully!`);
    return newWebsite;
  }, [websites, eventId, saveWebsites]);

  // Update website
  const updateWebsite = useCallback((updatedWebsite: Website) => {
    const updatedWebsites = websites.map(w => 
      w.id === updatedWebsite.id 
        ? { ...updatedWebsite, updatedAt: new Date().toISOString() }
        : w
    );
    saveWebsites(updatedWebsites);
    
    // Update current website if it's the one being updated
    if (currentWebsite && currentWebsite.id === updatedWebsite.id) {
      setCurrentWebsite(updatedWebsite);
    }
  }, [websites, saveWebsites, currentWebsite]);

  // Delete website
  const deleteWebsite = useCallback((id: string) => {
    const updatedWebsites = websites.filter(website => website.id !== id);
    saveWebsites(updatedWebsites);
    if (currentWebsite?.id === id) {
      setCurrentWebsite(null);
      setCurrentPage(null);
    }
  }, [websites, saveWebsites, currentWebsite]);

  // Update current page
  const updatePage = useCallback((updatedPage: Page) => {
    if (!currentWebsite) return;

    const updatedWebsite = {
      ...currentWebsite,
      pages: currentWebsite.pages.map(p => 
        p.id === updatedPage.id ? updatedPage : p
      ),
      updatedAt: new Date().toISOString(),
    };

    updateWebsite(updatedWebsite);
    setCurrentPage(updatedPage);
  }, [currentWebsite, updateWebsite]);

  // Add section to current page
  const addSection = useCallback((sectionType: Section['type'], content: Section['content']) => {
    if (!currentPage) return;

    const newSection: Section = {
      id: `section-${Date.now()}`,
      type: sectionType,
      content,
      styling: {},
      order: currentPage.sections.length,
    };

    const updatedPage = {
      ...currentPage,
      sections: [...currentPage.sections, newSection],
    };

    updatePage(updatedPage);
    toast.success('Section added successfully!');
    
    // Return the new section ID for scroll targeting
    return newSection.id;
  }, [currentPage, updatePage]);

  // Update section
  const updateSection = useCallback((sectionId: string, updates: Partial<Section>) => {
    if (!currentPage) return;

    const updatedPage = {
      ...currentPage,
      sections: currentPage.sections.map(s =>
        s.id === sectionId ? { ...s, ...updates } : s
      ),
    };

    updatePage(updatedPage);
  }, [currentPage, updatePage]);

  // Delete section
  const deleteSection = useCallback((sectionId: string) => {
    if (!currentPage) return;

    const updatedPage = {
      ...currentPage,
      sections: currentPage.sections.filter(s => s.id !== sectionId),
    };

    updatePage(updatedPage);
    setSelectedSection(null);
    toast.success('Section deleted successfully!');
  }, [currentPage, updatePage]);

  // Reorder sections
  const reorderSections = useCallback((startIndex: number, endIndex: number) => {
    if (!currentPage) return;

    const sections = [...currentPage.sections];
    const [movedSection] = sections.splice(startIndex, 1);
    sections.splice(endIndex, 0, movedSection);

    // Update order property
    const updatedSections = sections.map((section, index) => ({
      ...section,
      order: index,
    }));

    const updatedPage = {
      ...currentPage,
      sections: updatedSections,
    };

    updatePage(updatedPage);
  }, [currentPage, updatePage]);

  // Update theme
  const updateTheme = useCallback((theme: Theme) => {
    if (!currentWebsite) return;

    const updatedWebsite = {
      ...currentWebsite,
      theme,
      updatedAt: new Date().toISOString(),
    };

    updateWebsite(updatedWebsite);
    toast.success('Theme updated successfully!');
  }, [currentWebsite, updateWebsite]);

  // Add page to current website
  const addPage = useCallback((pageName: string, pagePath: string) => {
    if (!currentWebsite) return;

    const newPage: Page = {
      id: `page-${Date.now()}`,
      name: pageName,
      path: pagePath,
      sections: [],
      seoSettings: {
        title: pageName,
        description: `${pageName} page`,
        keywords: [],
      }
    };

    const updatedWebsite = {
      ...currentWebsite,
      pages: [...currentWebsite.pages, newPage],
      updatedAt: new Date().toISOString(),
    };

    updateWebsite(updatedWebsite);
    setCurrentPage(newPage);
    toast.success(`Page "${pageName}" created successfully!`);
    return newPage;
  }, [currentWebsite, updateWebsite]);

  // Delete page
  const deletePage = useCallback((pageId: string) => {
    if (!currentWebsite || currentWebsite.pages.length <= 1) {
      toast.error("Cannot delete the only page");
      return;
    }

    const updatedWebsite = {
      ...currentWebsite,
      pages: currentWebsite.pages.filter(p => p.id !== pageId),
      updatedAt: new Date().toISOString(),
    };

    updateWebsite(updatedWebsite);
    
    // If deleted page was current, switch to first page
    if (currentPage?.id === pageId) {
      setCurrentPage(updatedWebsite.pages[0]);
    }
    
    toast.success('Page deleted successfully!');
  }, [currentWebsite, currentPage, updateWebsite]);

  // Duplicate page
  const duplicatePage = useCallback((pageId: string) => {
    if (!currentWebsite) return;

    const pageToClone = currentWebsite.pages.find(p => p.id === pageId);
    if (!pageToClone) return;

    const newPage: Page = {
      ...pageToClone,
      id: `page-${Date.now()}`,
      name: `${pageToClone.name} Copy`,
      path: `${pageToClone.path}-copy`,
      sections: pageToClone.sections.map(section => ({
        ...section,
        id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }))
    };

    const updatedWebsite = {
      ...currentWebsite,
      pages: [...currentWebsite.pages, newPage],
      updatedAt: new Date().toISOString(),
    };

    updateWebsite(updatedWebsite);
    setCurrentPage(newPage);
    toast.success(`Page "${newPage.name}" created successfully!`);
    return newPage;
  }, [currentWebsite, updateWebsite]);

  // Switch to page
  const switchToPage = useCallback((pageId: string) => {
    if (!currentWebsite) return;

    const targetPage = currentWebsite.pages.find(p => p.id === pageId);
    if (targetPage) {
      setCurrentPage(targetPage);
      setSelectedSection(null); // Clear selected section when switching pages
    }
  }, [currentWebsite]);

  const updateNavigationConfig = useCallback((config: NavigationConfig) => {
    if (!currentWebsite) return;
    
    const updatedWebsite = {
      ...currentWebsite,
      navigationConfig: config,
      updatedAt: new Date().toISOString()
    };
    
    updateWebsite(updatedWebsite);
    toast.success('Navigation updated successfully!');
  }, [currentWebsite, updateWebsite]);

  // Toggle preview mode
  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode(prev => !prev);
    setSelectedSection(null); // Clear selection when toggling preview
  }, []);

  return {
    websites,
    currentWebsite,
    currentPage,
    selectedSection,
    isPreviewMode,
    previewDevice,
    setCurrentWebsite,
    setCurrentPage,
    setSelectedSection,
    setIsPreviewMode,
    setPreviewDevice,
    createWebsite,
    updateWebsite,
    deleteWebsite,
    updatePage,
    addPage,
    deletePage,
    duplicatePage,
    switchToPage,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    updateTheme,
    updateNavigationConfig,
    togglePreviewMode,
  };
};

const getTemplatePages = (templateId: string): Page[] => {
  // Personal & Family Templates
  if (templateId.includes('wedding') || templateId === 'elegant-wedding') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getWeddingHomeSections(),
        seoSettings: {
          title: '[Event Name] - Wedding Celebration',
          description: 'Join us for our special day. View details, RSVP, and more.',
          keywords: ['wedding', 'celebration', 'rsvp', 'event']
        }
      },
      {
        id: 'rsvp',
        name: 'RSVP',
        path: '/rsvp',
        sections: [
          {
            id: 'rsvp-section',
            type: 'rsvp' as const,
            content: {
              title: 'RSVP for Our Wedding',
              description: 'Please let us know if you can attend our special day',
              data: {
                eventDate: '[Event Date]',
                eventLocation: '[Event Location]',
                maxGuests: 4
              }
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'RSVP - [Event Name]',
          description: 'RSVP for our wedding celebration',
          keywords: ['rsvp', 'wedding', 'attendance']
        }
      },
      {
        id: 'schedule',
        name: 'Schedule',
        path: '/schedule',
        sections: [
          {
            id: 'countdown-section',
            type: 'countdown-timer' as const,
            content: {
              title: 'Countdown to Our Big Day',
              description: 'The celebration begins soon!',
              targetDate: '[Event Date]'
            },
            styling: { padding: '3rem 0', backgroundColor: 'hsl(var(--muted)/0.3)' },
            order: 0
          },
          {
            id: 'schedule-section',
            type: 'schedule' as const,
            content: {
              title: 'Wedding Schedule',
              description: 'Timeline of our special day',
              schedule: [
                { id: '1', title: 'Ceremony', startTime: '15:00', endTime: '15:30', date: '[Event Date]', type: 'session', location: '[Ceremony Location]' },
                { id: '2', title: 'Cocktail Hour', startTime: '15:30', endTime: '16:30', date: '[Event Date]', type: 'break', location: '[Reception Location]' },
                { id: '3', title: 'Reception', startTime: '16:30', endTime: '22:00', date: '[Event Date]', type: 'session', location: '[Reception Location]' }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 1
          }
        ],
        seoSettings: {
          title: 'Wedding Schedule - [Event Name]',
          description: 'View the complete wedding timeline and schedule',
          keywords: ['wedding', 'schedule', 'timeline', 'ceremony']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Get in Touch',
              description: 'Questions? We\'d love to hear from you!',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact Us - [Event Name]',
          description: 'Contact the happy couple with questions or messages',
          keywords: ['contact', 'wedding', 'questions']
        }
      }
    ];
  }

  if (templateId.includes('conference') || templateId === 'corporate-conference') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getConferenceHomeSections(),
        seoSettings: {
          title: '[Event Name] - Professional Conference',
          description: 'Join industry leaders for an inspiring conference experience.',
          keywords: ['conference', 'professional', 'networking', 'speakers']
        }
      },
      {
        id: 'pricing',
        name: 'Pricing',
        path: '/pricing',
        sections: [
          {
            id: 'pricing-section',
            type: 'pricing-table' as const,
            content: {
              title: 'Conference Pricing',
              description: 'Choose the perfect ticket for your needs',
              pricing: [
                {
                  id: 'early',
                  name: 'Early Bird',
                  price: 299,
                  currency: 'USD',
                  description: 'Perfect for early registrants',
                  features: ['Full conference access', 'Networking events', 'Digital materials'],
                  earlyBird: { price: 199, deadline: '2024-06-01' }
                },
                {
                  id: 'standard',
                  name: 'Standard',
                  price: 399,
                  currency: 'USD',
                  description: 'Complete conference experience',
                  features: ['All Standard features', 'Workshop access', 'Priority seating'],
                  isPopular: true
                },
                {
                  id: 'vip',
                  name: 'VIP',
                  price: 599,
                  currency: 'USD',
                  description: 'Premium conference experience',
                  features: ['All Standard features', 'VIP networking dinner', 'Speaker meet & greet', 'Premium seating']
                }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Pricing - [Event Name]',
          description: 'View conference pricing and registration options',
          keywords: ['pricing', 'tickets', 'conference', 'registration']
        }
      },
      {
        id: 'speakers',
        name: 'Speakers',
        path: '/speakers',
        sections: [
          {
            id: 'speakers-section',
            type: 'speaker-profiles' as const,
            content: {
              title: 'Featured Speakers',
              description: 'Learn from industry experts and thought leaders',
              speakers: [
                {
                  id: '1',
                  name: 'Dr. Sarah Johnson',
                  title: 'Chief Technology Officer',
                  company: 'TechCorp',
                  bio: 'Leading expert in artificial intelligence and machine learning with over 15 years of experience.',
                  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
                  social: {
                    twitter: '@sarahjohnson',
                    linkedin: 'sarah-johnson-tech'
                  },
                  sessions: ['AI in Business', 'Future of Technology']
                },
                {
                  id: '2',
                  name: 'Michael Chen',
                  title: 'Product Manager',
                  company: 'InnovateNow',
                  bio: 'Product strategy specialist who has launched successful products reaching millions of users.',
                  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
                  social: {
                    twitter: '@michaelchen',
                    website: 'michaelchen.com'
                  },
                  sessions: ['Product Strategy', 'User Experience Design']
                }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Speakers - [Event Name]',
          description: 'Meet our amazing conference speakers and industry experts',
          keywords: ['speakers', 'experts', 'conference', 'professionals']
        }
      },
      {
        id: 'sponsors',
        name: 'Sponsors',
        path: '/sponsors',
        sections: [
          {
            id: 'sponsors-section',
            type: 'sponsor-showcase' as const,
            content: {
              title: 'Our Sponsors',
              description: 'Thank you to our amazing sponsors who make this conference possible',
              sponsors: [
                {
                  id: '1',
                  name: 'TechCorp',
                  logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop',
                  website: 'https://techcorp.com',
                  tier: 'platinum',
                  description: 'Leading technology solutions provider'
                },
                {
                  id: '2',
                  name: 'InnovateLab',
                  logo: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=200&h=100&fit=crop',
                  website: 'https://innovatelab.com',
                  tier: 'gold',
                  description: 'Innovation and research laboratory'
                }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Sponsors - [Event Name]',
          description: 'Meet our conference sponsors and partners',
          keywords: ['sponsors', 'partners', 'conference', 'support']
        }
      },
      {
        id: 'schedule',
        name: 'Schedule',
        path: '/schedule',
        sections: [
          {
            id: 'countdown-section',
            type: 'countdown' as const,
            content: {
              title: 'Conference Countdown',
              description: 'Don\'t miss this incredible event!',
              data: { targetDate: '[Event Date]' }
            },
            styling: { padding: '3rem 0', backgroundColor: 'hsl(var(--muted)/0.3)' },
            order: 0
          },
          {
            id: 'schedule-section',
            type: 'multi-day-schedule' as const,
            content: {
              title: 'Conference Schedule',
              description: 'Complete agenda with all sessions and activities',
              schedule: [
                { id: '1', title: 'Opening Keynote', startTime: '09:00', endTime: '10:00', date: '[Event Date]', type: 'keynote', location: 'Main Auditorium', description: 'Welcome and opening remarks' },
                { id: '2', title: 'AI in Business', startTime: '10:30', endTime: '11:30', date: '[Event Date]', type: 'session', location: 'Room A', description: 'Exploring AI applications in modern business' },
                { id: '3', title: 'Networking Break', startTime: '11:30', endTime: '12:00', date: '[Event Date]', type: 'break', location: 'Lobby', description: 'Coffee and networking' },
                { id: '4', title: 'Product Strategy Workshop', startTime: '13:00', endTime: '14:30', date: '[Event Date]', type: 'workshop', location: 'Room B', description: 'Hands-on product strategy session' }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 1
          }
        ],
        seoSettings: {
          title: 'Schedule - [Event Name]',
          description: 'View the complete conference schedule and agenda',
          keywords: ['schedule', 'agenda', 'conference', 'sessions']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Contact Us',
              description: 'Questions about the conference? We\'re here to help!',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'company', type: 'text', label: 'Company', required: false },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          },
          {
            id: 'social-section',
            type: 'social-feed' as const,
            content: {
              title: 'Follow the Conversation',
              description: 'Stay updated with live conference updates',
              data: {
                hashtag: '#Conference2024',
                platforms: ['twitter', 'linkedin']
              }
            },
            styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.3)' },
            order: 1
          }
        ],
        seoSettings: {
          title: 'Contact - [Event Name]',
          description: 'Contact conference organizers with questions',
          keywords: ['contact', 'conference', 'organizers', 'questions']
        }
      }
    ];
  }

  if (templateId === 'birthday-celebration' || templateId === 'Birthday') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getBirthdayHomeSections(),
        seoSettings: {
          title: '[Name]\'s Birthday Celebration',
          description: 'Join us for an amazing birthday celebration!',
          keywords: ['birthday', 'party', 'celebration', 'fun']
        }
      },
      {
        id: 'rsvp',
        name: 'RSVP',
        path: '/rsvp',
        sections: [
          {
            id: 'rsvp-section',
            type: 'rsvp' as const,
            content: {
              title: 'RSVP for the Party',
              description: 'Let us know if you can make it to the celebration!',
              data: {
                eventDate: '[Event Date]',
                eventLocation: '[Party Location]',
                maxGuests: 6
              }
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'RSVP - [Name]\'s Birthday',
          description: 'RSVP for the birthday celebration',
          keywords: ['rsvp', 'birthday', 'party', 'attendance']
        }
      },
      {
        id: 'games',
        name: 'Games & Fun',
        path: '/games',
        sections: [
          {
            id: 'games-section',
            type: 'about' as const,
            content: {
              title: 'Party Games & Activities',
              description: 'Get ready for an exciting lineup of games, activities, and surprises! We\'ll have party games, photo booth, trivia about the birthday person, and lots of music and dancing.'
            },
            styling: { padding: '4rem 0' },
            order: 0
          },
          {
            id: 'photo-section',
            type: 'gallery' as const,
            content: {
              title: 'Photo Memories',
              description: 'Share your favorite photos from the party!',
              images: [
                'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
              ]
            },
            styling: { padding: '4rem 0' },
            order: 1
          }
        ],
        seoSettings: {
          title: 'Games & Activities - [Name]\'s Birthday',
          description: 'Fun games and activities for the birthday party',
          keywords: ['games', 'activities', 'birthday', 'fun']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Questions?',
              description: 'Have questions about the party? Get in touch!',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact - [Name]\'s Birthday',
          description: 'Contact the party organizers',
          keywords: ['contact', 'birthday', 'party', 'questions']
        }
      }
    ];
  }

  if (templateId === 'charity-gala' || templateId === 'Charity') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getCharityGalaHomeSections(),
        seoSettings: {
          title: '[Event Name] - Charity Gala',
          description: 'Join us for an evening of giving and making a difference.',
          keywords: ['charity', 'gala', 'fundraising', 'donation']
        }
      },
      {
        id: 'donate',
        name: 'Donate',
        path: '/donate',
        sections: [
          {
            id: 'donation-section',
            type: 'pricing-table' as const,
            content: {
              title: 'Make a Difference',
              description: 'Choose your donation level and help us reach our goal',
              pricing: [
                {
                  id: 'supporter',
                  name: 'Supporter',
                  price: 50,
                  currency: 'USD',
                  description: 'Help fund essential programs',
                  features: ['Thank you certificate', 'Newsletter updates', 'Impact reports']
                },
                {
                  id: 'advocate',
                  name: 'Advocate',
                  price: 150,
                  currency: 'USD',
                  description: 'Make a significant impact',
                  features: ['All Supporter benefits', 'Recognition on website', 'Exclusive updates'],
                  isPopular: true
                },
                {
                  id: 'champion',
                  name: 'Champion',
                  price: 500,
                  currency: 'USD',
                  description: 'Be a true champion for our cause',
                  features: ['All Advocate benefits', 'VIP gala seating', 'Meet the beneficiaries', 'Custom impact report']
                }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Donate - [Event Name]',
          description: 'Make a donation to support our cause',
          keywords: ['donate', 'charity', 'fundraising', 'support']
        }
      },
      {
        id: 'impact',
        name: 'Our Impact',
        path: '/impact',
        sections: [
          {
            id: 'impact-section',
            type: 'testimonials' as const,
            content: {
              title: 'Stories of Impact',
              description: 'See how your donations make a real difference in people\'s lives',
              testimonials: [
                {
                  id: '1',
                  content: 'This organization changed my life completely. The support I received helped me get back on my feet.',
                  name: 'Maria Rodriguez',
                  role: 'Program Beneficiary',
                  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop'
                },
                {
                  id: '2',
                  content: 'Thanks to the scholarship program, I was able to complete my education and start my career.',
                  name: 'James Thompson',
                  role: 'Scholarship Recipient',
                  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop'
                }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Our Impact - [Event Name]',
          description: 'See the real impact of our charitable work',
          keywords: ['impact', 'charity', 'stories', 'testimonials']
        }
      },
      {
        id: 'sponsors',
        name: 'Sponsors',
        path: '/sponsors',
        sections: [
          {
            id: 'sponsors-section',
            type: 'sponsor-showcase' as const,
            content: {
              title: 'Our Generous Sponsors',
              description: 'Thank you to these amazing organizations supporting our cause',
              sponsors: [
                {
                  id: '1',
                  name: 'Community Bank',
                  logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop',
                  website: 'https://communitybank.com',
                  tier: 'gold',
                  description: 'Supporting local communities for over 50 years'
                },
                {
                  id: '2',
                  name: 'Local Business Coalition',
                  logo: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=200&h=100&fit=crop',
                  website: 'https://localbusiness.org',
                  tier: 'silver',
                  description: 'United in supporting charitable causes'
                }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Sponsors - [Event Name]',
          description: 'Meet our generous charity gala sponsors',
          keywords: ['sponsors', 'charity', 'supporters', 'gala']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Get Involved',
              description: 'Want to volunteer or learn more? We\'d love to hear from you!',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'interest', type: 'select', label: 'I\'m interested in', options: ['Volunteering', 'Sponsorship', 'Donation', 'General Info'], required: true },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact - [Event Name]',
          description: 'Contact us to get involved with our charity',
          keywords: ['contact', 'charity', 'volunteer', 'involvement']
        }
      }
    ];
  }

  if (templateId === 'tech-meetup') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getTechMeetupHomeSections(),
        seoSettings: {
          title: '[Event Name] - Tech Meetup',
          description: 'Join the local tech community for networking and learning.',
          keywords: ['tech', 'meetup', 'networking', 'technology']
        }
      },
      {
        id: 'speakers',
        name: 'Speakers',
        path: '/speakers',
        sections: [
          {
            id: 'speakers-section',
            type: 'speaker-profiles' as const,
            content: {
              title: 'Featured Speakers',
              description: 'Learn from experienced developers and tech leaders',
              speakers: [
                {
                  id: '1',
                  name: 'Alex Kim',
                  title: 'Senior Software Engineer',
                  company: 'TechStartup',
                  bio: 'Full-stack developer with expertise in React, Node.js, and cloud architecture.',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
                  social: {
                    twitter: '@alexkimdev',
                    linkedin: 'alex-kim-dev',
                    website: 'alexkim.dev'
                  },
                  sessions: ['Modern React Patterns', 'Scaling Node.js Applications']
                },
                {
                  id: '2',
                  name: 'Taylor Chen',
                  title: 'DevOps Engineer',
                  company: 'CloudCorp',
                  bio: 'Specializing in Kubernetes, CI/CD pipelines, and cloud infrastructure automation.',
                  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
                  social: {
                    website: 'taylorchen.dev',
                    twitter: '@taylorchen'
                  },
                  sessions: ['Kubernetes Best Practices', 'CI/CD Automation']
                }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Speakers - [Event Name]',
          description: 'Meet our amazing tech speakers and industry professionals',
          keywords: ['speakers', 'tech', 'developers', 'meetup']
        }
      },
      {
        id: 'schedule',
        name: 'Schedule',
        path: '/schedule',
        sections: [
          {
            id: 'countdown-section',
            type: 'countdown-timer' as const,
            content: {
              title: 'Meetup Countdown',
              description: 'Don\'t miss our next tech meetup!',
              targetDate: '[Event Date]'
            },
            styling: { padding: '3rem 0', backgroundColor: 'hsl(var(--muted)/0.3)' },
            order: 0
          },
          {
            id: 'schedule-section',
            type: 'schedule' as const,
            content: {
              title: 'Meetup Schedule',
              description: 'Agenda for the evening',
              schedule: [
                { id: '1', title: 'Networking & Pizza', startTime: '18:00', endTime: '18:30', date: '[Event Date]', type: 'networking', location: 'Main Hall' },
                { id: '2', title: 'Modern React Patterns', startTime: '18:30', endTime: '19:15', date: '[Event Date]', type: 'session', location: 'Main Hall' },
                { id: '3', title: 'Break & Discussions', startTime: '19:15', endTime: '19:30', date: '[Event Date]', type: 'break', location: 'Main Hall' },
                { id: '4', title: 'Kubernetes Best Practices', startTime: '19:30', endTime: '20:15', date: '[Event Date]', type: 'session', location: 'Main Hall' },
                { id: '5', title: 'Q&A & Networking', startTime: '20:15', endTime: '21:00', date: '[Event Date]', type: 'networking', location: 'Main Hall' }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 1
          }
        ],
        seoSettings: {
          title: 'Schedule - [Event Name]',
          description: 'View the complete tech meetup schedule',
          keywords: ['schedule', 'meetup', 'tech', 'agenda']
        }
      },
      {
        id: 'resources',
        name: 'Resources',
        path: '/resources',
        sections: [
          {
            id: 'resources-section',
            type: 'about' as const,
            content: {
              title: 'Resources & Links',
              description: 'Useful resources, code repositories, and links shared during our meetups. Join our Discord community for ongoing discussions, check out the GitHub organization for code samples, and follow our social media for updates on upcoming events.'
            },
            styling: { padding: '4rem 0' },
            order: 0
          },
          {
            id: 'social-section',
            type: 'social-feed' as const,
            content: {
              title: 'Join the Community',
              description: 'Stay connected with fellow developers and get the latest updates',
              data: {
                hashtag: '#TechMeetup',
                platforms: ['twitter', 'github', 'discord']
              }
            },
            styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.3)' },
            order: 1
          }
        ],
        seoSettings: {
          title: 'Resources - [Event Name]',
          description: 'Useful resources and community links for developers',
          keywords: ['resources', 'tech', 'community', 'developers']
        }
      }
    ];
  }

  if (templateId === 'festival-music') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getMusicFestivalHomeSections(),
        seoSettings: {
          title: '[Event Name] - Music Festival',
          description: 'Experience the ultimate music festival with amazing artists and vibes.',
          keywords: ['music', 'festival', 'artists', 'concerts']
        }
      },
      {
        id: 'artists',
        name: 'Artists',
        path: '/artists',
        sections: [
          {
            id: 'artists-section',
            type: 'speaker-profiles' as const,
            content: {
              title: 'Festival Lineup',
              description: 'Incredible artists performing across multiple stages',
              speakers: [
                {
                  id: '1',
                  name: 'Electric Dreams',
                  title: 'Electronic/EDM',
                  company: 'Headliner',
                  bio: 'Internationally acclaimed DJ and producer known for electrifying festival performances.',
                  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
            social: {
              website: 'electricdreams.com',
              twitter: '@electricdreams'
            },
                  sessions: ['Main Stage - Saturday 21:00']
                },
                {
                  id: '2',
                  name: 'Riverside Folk',
                  title: 'Folk/Acoustic',
                  company: 'Featured Artist',
                  bio: 'Award-winning folk duo creating beautiful harmonies and storytelling through music.',
                  image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
            social: {
              website: 'riversidefolk.com',
              twitter: '@riversidefolk'
            },
                  sessions: ['Acoustic Stage - Sunday 16:00']
                }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Artists - [Event Name]',
          description: 'Meet the amazing artists performing at our music festival',
          keywords: ['artists', 'music', 'festival', 'lineup']
        }
      },
      {
        id: 'schedule',
        name: 'Schedule',
        path: '/schedule',
        sections: [
          {
            id: 'countdown-section',
            type: 'countdown-timer' as const,
            content: {
              title: 'Festival Countdown',
              description: 'Get ready for the music experience of a lifetime!',
              targetDate: '[Event Date]'
            },
            styling: { padding: '3rem 0', backgroundColor: 'hsl(var(--muted)/0.3)' },
            order: 0
          },
          {
            id: 'schedule-section',
            type: 'multi-day-schedule' as const,
            content: {
              title: 'Festival Schedule',
              description: 'Multi-day lineup across all stages',
              schedule: [
                { id: '1', title: 'Festival Gates Open', startTime: '12:00', endTime: '12:30', date: '[Event Date]', type: 'networking', location: 'Main Entrance' },
                { id: '2', title: 'Opening Act', startTime: '13:00', endTime: '14:00', date: '[Event Date]', type: 'session', location: 'Main Stage' },
                { id: '3', title: 'Riverside Folk', startTime: '16:00', endTime: '17:00', date: '[Event Date]', type: 'session', location: 'Acoustic Stage' },
                { id: '4', title: 'Electric Dreams', startTime: '21:00', endTime: '22:30', date: '[Event Date]', type: 'keynote', location: 'Main Stage' },
                { id: '5', title: 'After Party', startTime: '23:00', endTime: '02:00', date: '[Event Date]', type: 'networking', location: 'Dance Tent' }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 1
          }
        ],
        seoSettings: {
          title: 'Schedule - [Event Name]',
          description: 'Complete music festival schedule and artist lineup',
          keywords: ['schedule', 'music', 'festival', 'artists', 'lineup']
        }
      },
      {
        id: 'tickets',
        name: 'Tickets',
        path: '/tickets',
        sections: [
          {
            id: 'tickets-section',
            type: 'pricing-table' as const,
            content: {
              title: 'Festival Tickets',
              description: 'Get your tickets for the ultimate music experience',
              pricing: [
                {
                  id: 'general',
                  name: 'General Admission',
                  price: 149,
                  currency: 'USD',
                  description: 'Access to all stages and areas',
                  features: ['All festival access', 'Food court access', 'Merchandise discount'],
                  earlyBird: { price: 99, deadline: '2024-05-01' }
                },
                {
                  id: 'vip',
                  name: 'VIP Experience',
                  price: 299,
                  currency: 'USD',
                  description: 'Premium festival experience',
                  features: ['All General features', 'VIP viewing areas', 'Complimentary drinks', 'Artist meet & greet'],
                  isPopular: true
                },
                {
                  id: 'platinum',
                  name: 'Platinum Pass',
                  price: 499,
                  currency: 'USD',
                  description: 'Ultimate festival luxury',
                  features: ['All VIP features', 'Backstage access', 'Premium hospitality tent', 'Festival merchandise package', 'Reserved parking']
                }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Tickets - [Event Name]',
          description: 'Purchase music festival tickets and passes',
          keywords: ['tickets', 'music', 'festival', 'passes', 'vip']
        }
      },
      {
        id: 'venue',
        name: 'Venue & Info',
        path: '/venue',
        sections: [
          {
            id: 'venue-section',
            type: 'map' as const,
            content: {
              title: 'Festival Grounds',
              description: '[Festival Location] - Complete with multiple stages, food vendors, and amenities'
            },
            styling: { padding: '4rem 0' },
            order: 0
          },
          {
            id: 'info-section',
            type: 'about' as const,
            content: {
              title: 'Festival Information',
              description: 'Important information for festival attendees: Gates open at 12:00 PM each day. Bring valid ID and printed/digital ticket. No outside food or drinks allowed. Free water stations throughout the venue. Parking available for $20/day. Shuttles run from downtown every 30 minutes. Check weather and dress appropriately!'
            },
            styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.3)' },
            order: 1
          }
        ],
        seoSettings: {
          title: 'Venue & Info - [Event Name]',
          description: 'Festival location, venue information and attendee guidelines',
          keywords: ['venue', 'location', 'festival', 'information', 'guidelines']
        }
      }
    ];
  }

  // Personal & Family Templates
  if (templateId === 'Baby Shower') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getBabyShowerHomeSections(),
        seoSettings: {
          title: '[Baby\'s Name] Baby Shower',
          description: 'Join us in celebrating the upcoming arrival of our little one!',
          keywords: ['baby', 'shower', 'celebration', 'family']
        }
      },
      {
        id: 'rsvp',
        name: 'RSVP',
        path: '/rsvp',
        sections: [
          {
            id: 'rsvp-section',
            type: 'rsvp' as const,
            content: {
              title: 'RSVP for Baby Shower',
              description: 'Please let us know if you can celebrate with us!',
              data: {
                eventDate: '[Event Date]',
                eventLocation: '[Event Location]',
                maxGuests: 2
              }
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'RSVP - Baby Shower',
          description: 'RSVP for the baby shower celebration',
          keywords: ['rsvp', 'baby shower', 'attendance']
        }
      },
      {
        id: 'registry',
        name: 'Gift Registry',
        path: '/registry',
        sections: [
          {
            id: 'registry-section',
            type: 'about' as const,
            content: {
              title: 'Gift Registry',
              description: 'We\'re so grateful for your love and support! If you\'d like to give a gift, here are some items we\'d love to have for our little one. Your presence is the greatest gift of all!'
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Gift Registry - Baby Shower',
          description: 'Baby gift registry and wishlist',
          keywords: ['gifts', 'registry', 'baby', 'shower']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Questions?',
              description: 'Have questions about the baby shower? Get in touch!',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact - Baby Shower',
          description: 'Contact the baby shower hosts',
          keywords: ['contact', 'baby shower', 'questions']
        }
      }
    ];
  }

  if (templateId === 'Anniversary') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getAnniversaryHomeSections(),
        seoSettings: {
          title: '[Couple Names] Anniversary Celebration',
          description: 'Celebrating [X] wonderful years together!',
          keywords: ['anniversary', 'celebration', 'milestone', 'love']
        }
      },
      {
        id: 'rsvp',
        name: 'RSVP',
        path: '/rsvp',
        sections: [
          {
            id: 'rsvp-section',
            type: 'rsvp' as const,
            content: {
              title: 'RSVP for Anniversary Celebration',
              description: 'Please join us in celebrating this special milestone!',
              data: {
                eventDate: '[Event Date]',
                eventLocation: '[Event Location]',
                maxGuests: 3
              }
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'RSVP - Anniversary',
          description: 'RSVP for the anniversary celebration',
          keywords: ['rsvp', 'anniversary', 'celebration']
        }
      },
      {
        id: 'memories',
        name: 'Memory Lane',
        path: '/memories',
        sections: [
          {
            id: 'memories-section',
            type: 'gallery' as const,
            content: {
              title: 'Memory Lane',
              description: 'A journey through [X] beautiful years together',
              images: [
                'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1594736797933-d0d4da7390b3?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop'
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Memory Lane - Anniversary',
          description: 'Photos and memories from years together',
          keywords: ['memories', 'photos', 'anniversary', 'journey']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Get in Touch',
              description: 'Questions about the anniversary celebration?',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact - Anniversary',
          description: 'Contact the anniversary celebration hosts',
          keywords: ['contact', 'anniversary', 'questions']
        }
      }
    ];
  }

  if (templateId === 'Graduation') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getGraduationHomeSections(),
        seoSettings: {
          title: '[Graduate Name] Graduation Party',
          description: 'Celebrating academic achievement and new beginnings!',
          keywords: ['graduation', 'celebration', 'achievement', 'academic']
        }
      },
      {
        id: 'rsvp',
        name: 'RSVP',
        path: '/rsvp',
        sections: [
          {
            id: 'rsvp-section',
            type: 'rsvp' as const,
            content: {
              title: 'RSVP for Graduation Party',
              description: 'Please join us in celebrating this major milestone!',
              data: {
                eventDate: '[Event Date]',
                eventLocation: '[Event Location]',
                maxGuests: 4
              }
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'RSVP - Graduation',
          description: 'RSVP for the graduation celebration',
          keywords: ['rsvp', 'graduation', 'party']
        }
      },
      {
        id: 'achievements',
        name: 'Achievements',
        path: '/achievements',
        sections: [
          {
            id: 'achievements-section',
            type: 'about' as const,
            content: {
              title: 'Academic Journey',
              description: 'Celebrating years of hard work, dedication, and achievement. From [School/Program] to new horizons - here\'s to the next chapter!'
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Achievements - Graduation',
          description: 'Graduate achievements and academic journey',
          keywords: ['achievements', 'graduation', 'academic', 'success']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Questions?',
              description: 'Have questions about the graduation party?',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact - Graduation',
          description: 'Contact the graduation party hosts',
          keywords: ['contact', 'graduation', 'questions']
        }
      }
    ];
  }

  if (templateId === 'Holiday Party') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getHolidayPartyHomeSections(),
        seoSettings: {
          title: '[Holiday] Celebration',
          description: 'Join us for festive holiday fun and celebration!',
          keywords: ['holiday', 'party', 'celebration', 'festive']
        }
      },
      {
        id: 'rsvp',
        name: 'RSVP',
        path: '/rsvp',
        sections: [
          {
            id: 'rsvp-section',
            type: 'rsvp' as const,
            content: {
              title: 'RSVP for Holiday Party',
              description: 'Please let us know if you can join our holiday celebration!',
              data: {
                eventDate: '[Event Date]',
                eventLocation: '[Event Location]',
                maxGuests: 5
              }
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'RSVP - Holiday Party',
          description: 'RSVP for the holiday celebration',
          keywords: ['rsvp', 'holiday', 'party']
        }
      },
      {
        id: 'activities',
        name: 'Activities',
        path: '/activities',
        sections: [
          {
            id: 'activities-section',
            type: 'about' as const,
            content: {
              title: 'Holiday Activities',
              description: 'Join us for festive games, holiday music, seasonal treats, gift exchange, and lots of holiday cheer! Don\'t forget to wear your festive attire!'
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Activities - Holiday Party',
          description: 'Holiday party activities and entertainment',
          keywords: ['activities', 'holiday', 'party', 'games']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Questions?',
              description: 'Have questions about the holiday party?',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact - Holiday Party',
          description: 'Contact the holiday party hosts',
          keywords: ['contact', 'holiday', 'party']
        }
      }
    ];
  }

  // Business & Corporate Templates  
  if (templateId === 'Corporate' || templateId === 'Corporate Event') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getCorporateEventHomeSections(),
        seoSettings: {
          title: '[Event Name] - Corporate Event',
          description: 'Professional corporate gathering for networking and business development.',
          keywords: ['corporate', 'business', 'professional', 'networking']
        }
      },
      {
        id: 'agenda',
        name: 'Agenda',
        path: '/agenda',
        sections: [
          {
            id: 'schedule-section',
            type: 'schedule' as const,
            content: {
              title: 'Event Agenda',
              description: 'Complete schedule of presentations and activities',
              schedule: [
                { id: '1', title: 'Registration & Welcome', startTime: '09:00', endTime: '09:30', date: '[Event Date]', type: 'networking', location: 'Main Lobby' },
                { id: '2', title: 'Opening Keynote', startTime: '09:30', endTime: '10:30', date: '[Event Date]', type: 'keynote', location: 'Main Auditorium' },
                { id: '3', title: 'Networking Break', startTime: '10:30', endTime: '11:00', date: '[Event Date]', type: 'break', location: 'Exhibition Hall' },
                { id: '4', title: 'Panel Discussion', startTime: '11:00', endTime: '12:00', date: '[Event Date]', type: 'session', location: 'Conference Room A' }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Agenda - Corporate Event',
          description: 'View the complete corporate event schedule',
          keywords: ['agenda', 'schedule', 'corporate', 'business']
        }
      },
      {
        id: 'speakers',
        name: 'Speakers',
        path: '/speakers',
        sections: [
          {
            id: 'speakers-section',
            type: 'speaker-profiles' as const,
            content: {
              title: 'Featured Speakers',
              description: 'Industry leaders and business experts',
              speakers: [
                {
                  id: '1',
                  name: 'John Smith',
                  title: 'CEO',
                  company: 'Business Corp',
                  bio: 'Experienced business leader with 20+ years in corporate strategy.',
                  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
                  social: {
                    linkedin: 'john-smith-ceo',
                    website: 'johnsmith.com'
                  },
                  sessions: ['Opening Keynote']
                }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Speakers - Corporate Event',
          description: 'Meet our corporate event speakers and industry experts',
          keywords: ['speakers', 'corporate', 'business', 'leaders']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Event Information',
              description: 'Questions about the corporate event? Contact us!',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'company', type: 'text', label: 'Company', required: false },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact - Corporate Event',
          description: 'Contact corporate event organizers',
          keywords: ['contact', 'corporate', 'business']
        }
      }
    ];
  }

  if (templateId === 'Workshop') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getWorkshopHomeSections(),
        seoSettings: {
          title: '[Workshop Name] - Interactive Learning Session',
          description: 'Join our hands-on workshop for skill development and learning.',
          keywords: ['workshop', 'training', 'skills', 'learning']
        }
      },
      {
        id: 'curriculum',
        name: 'Curriculum',
        path: '/curriculum',
        sections: [
          {
            id: 'curriculum-section',
            type: 'about' as const,
            content: {
              title: 'Workshop Curriculum',
              description: 'Comprehensive learning modules designed to enhance your skills through hands-on practice, expert guidance, and interactive sessions.'
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Curriculum - Workshop',
          description: 'Workshop curriculum and learning objectives',
          keywords: ['curriculum', 'workshop', 'learning', 'skills']
        }
      },
      {
        id: 'registration',
        name: 'Registration',
        path: '/registration',
        sections: [
          {
            id: 'registration-section',
            type: 'contact' as const,
            content: {
              title: 'Workshop Registration',
              description: 'Register for the workshop and secure your spot!',
              formFields: [
                { id: 'name', type: 'text', label: 'Full Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'company', type: 'text', label: 'Company', required: false },
                { id: 'experience', type: 'text', label: 'Experience Level', required: false },
                { id: 'goals', type: 'textarea', label: 'Learning Goals', required: false }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Registration - Workshop',
          description: 'Register for the workshop',
          keywords: ['registration', 'workshop', 'signup']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Questions?',
              description: 'Have questions about the workshop? Contact us!',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact - Workshop',
          description: 'Contact workshop organizers',
          keywords: ['contact', 'workshop', 'questions']
        }
      }
    ];
  }

  if (templateId === 'Networking' || templateId === 'Networking Event') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getNetworkingHomeSections(),
        seoSettings: {
          title: '[Event Name] - Professional Networking Event',
          description: 'Connect with industry professionals and expand your network.',
          keywords: ['networking', 'professional', 'connections', 'business']
        }
      },
      {
        id: 'attendees',
        name: 'Attendees',
        path: '/attendees',
        sections: [
          {
            id: 'attendees-section',
            type: 'about' as const,
            content: {
              title: 'Who\'s Attending',
              description: 'Connect with professionals from various industries including technology, finance, healthcare, marketing, and more. This is your opportunity to meet potential collaborators, mentors, and industry leaders.'
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Attendees - Networking Event',
          description: 'View networking event attendees and professionals',
          keywords: ['attendees', 'networking', 'professionals']
        }
      },
      {
        id: 'register',
        name: 'Register',
        path: '/register',
        sections: [
          {
            id: 'register-section',
            type: 'contact' as const,
            content: {
              title: 'Event Registration',
              description: 'Register for the networking event and join the conversation!',
              formFields: [
                { id: 'name', type: 'text', label: 'Full Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'company', type: 'text', label: 'Company', required: true },
                { id: 'title', type: 'text', label: 'Job Title', required: true },
                { id: 'industry', type: 'text', label: 'Industry', required: false },
                { id: 'linkedin', type: 'text', label: 'LinkedIn Profile', required: false }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Register - Networking Event',
          description: 'Register for the networking event',
          keywords: ['register', 'networking', 'professional']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Event Information',
              description: 'Questions about the networking event? Get in touch!',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact - Networking Event',
          description: 'Contact networking event organizers',
          keywords: ['contact', 'networking', 'questions']
        }
      }
    ];
  }

  if (templateId === 'Product Launch' || templateId === 'Product Launch') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getProductLaunchHomeSections(),
        seoSettings: {
          title: '[Product Name] Launch Event',
          description: 'Join us for the exclusive launch of our revolutionary new product.',
          keywords: ['product', 'launch', 'innovation', 'new']
        }
      },
      {
        id: 'product',
        name: 'Product Info',
        path: '/product',
        sections: [
          {
            id: 'product-section',
            type: 'about' as const,
            content: {
              title: 'Introducing [Product Name]',
              description: 'Revolutionary innovation that changes everything. Discover the features, benefits, and capabilities that make this product a game-changer in the industry.'
            },
            styling: { padding: '4rem 0' },
            order: 0
          },
          {
            id: 'features-section',
            type: 'gallery' as const,
            content: {
              title: 'Product Features',
              description: 'Explore the innovative features that set our product apart',
              images: [
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1526378787940-576a539ba69d?w=400&h=300&fit=crop'
              ]
            },
            styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.3)' },
            order: 1
          }
        ],
        seoSettings: {
          title: 'Product Info - Launch Event',
          description: 'Learn about our new product features and benefits',
          keywords: ['product', 'features', 'innovation', 'launch']
        }
      },
      {
        id: 'register',
        name: 'Register',
        path: '/register',
        sections: [
          {
            id: 'register-section',
            type: 'contact' as const,
            content: {
              title: 'Launch Event Registration',
              description: 'Register for exclusive early access to our product launch!',
              formFields: [
                { id: 'name', type: 'text', label: 'Full Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'company', type: 'text', label: 'Company', required: false },
                { id: 'interest', type: 'textarea', label: 'Why are you interested?', required: false }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Register - Product Launch',
          description: 'Register for the product launch event',
          keywords: ['register', 'product', 'launch']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Questions?',
              description: 'Have questions about the product or launch event?',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact - Product Launch',
          description: 'Contact product launch organizers',
          keywords: ['contact', 'product', 'launch']
        }
      }
    ];
  }

  if (templateId === 'Webinar') {
    return [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        sections: getWebinarHomeSections(),
        seoSettings: {
          title: '[Webinar Title] - Online Learning Session',
          description: 'Join our informative webinar and learn from industry experts.',
          keywords: ['webinar', 'online', 'learning', 'education']
        }
      },
      {
        id: 'topics',
        name: 'Topics',
        path: '/topics',
        sections: [
          {
            id: 'topics-section',
            type: 'about' as const,
            content: {
              title: 'Webinar Topics',
              description: 'Comprehensive coverage of key industry topics, trends, and best practices. Learn from experts and get your questions answered in our interactive Q&A session.'
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Topics - Webinar',
          description: 'Webinar topics and learning objectives',
          keywords: ['topics', 'webinar', 'learning', 'education']
        }
      },
      {
        id: 'register',
        name: 'Register',
        path: '/register',
        sections: [
          {
            id: 'register-section',
            type: 'contact' as const,
            content: {
              title: 'Webinar Registration',
              description: 'Register for the webinar and receive the join link!',
              formFields: [
                { id: 'name', type: 'text', label: 'Full Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'company', type: 'text', label: 'Company', required: false },
                { id: 'questions', type: 'textarea', label: 'Questions for Q&A', required: false }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Register - Webinar',
          description: 'Register for the webinar',
          keywords: ['register', 'webinar', 'online']
        }
      },
      {
        id: 'contact',
        name: 'Contact',
        path: '/contact',
        sections: [
          {
            id: 'contact-section',
            type: 'contact' as const,
            content: {
              title: 'Questions?',
              description: 'Have questions about the webinar? Contact us!',
              formFields: [
                { id: 'name', type: 'text', label: 'Name', required: true },
                { id: 'email', type: 'email', label: 'Email', required: true },
                { id: 'message', type: 'textarea', label: 'Message', required: true }
              ]
            },
            styling: { padding: '4rem 0' },
            order: 0
          }
        ],
        seoSettings: {
          title: 'Contact - Webinar',
          description: 'Contact webinar organizers',
          keywords: ['contact', 'webinar', 'questions']
        }
      }
    ];
  }

  // Default single page
  return [
    {
      id: 'home',
      name: 'Home',
      path: '/',
      sections: getTemplateSections(templateId),
      seoSettings: {
        title: 'Event Website',
        description: 'Join us for an amazing event',
        keywords: ['event', 'celebration']
      }
    }
  ];
};

const getWeddingHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: '[Couple Names]',
        subtitle: 'Are Getting Married!',
        description: 'Join us for an unforgettable celebration of love',
        buttons: [
          { text: 'RSVP Now', link: '/rsvp', style: 'primary' },
          { text: 'View Schedule', link: '/schedule', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    },
    {
      id: 'navigation',
      type: 'navigation-buttons',
      content: {
        title: 'Explore Our Wedding',
        description: 'Everything you need to know about our special day',
        buttons: [
          { text: 'RSVP', link: '/rsvp', style: 'primary' },
          { text: 'Schedule', link: '/schedule', style: 'secondary' },
          { text: 'Contact', link: '/contact', style: 'outline' }
        ]
      },
      styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.1)' },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      content: {
        title: 'Our Love Story',
        description: 'Two hearts, one love, one life together. We met [How We Met] and have been inseparable ever since. Join us as we celebrate the beginning of our forever journey together.'
      },
      styling: { padding: '4rem 0' },
      order: 2
    },
    {
      id: 'countdown',
      type: 'countdown-timer',
      content: {
        title: 'Countdown to Our Big Day',
        description: 'The celebration begins soon!',
        targetDate: '[Event Date]'
      },
      styling: { 
        padding: '3rem 0',
        backgroundColor: 'hsl(var(--muted)/0.3)'
      },
      order: 3
    },
    {
      id: 'location',
      type: 'map',
      content: {
        title: 'Wedding Venue',
        description: '[Venue Name] - [Venue Address]'
      },
      styling: { padding: '4rem 0' },
      order: 4
    },
    {
      id: 'gallery',
      type: 'gallery',
      content: {
        title: 'Photo Gallery',
        description: 'Memories from our journey together',
        images: [
          'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1594736797933-d0d4da7390b3?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop'
        ]
      },
      styling: { padding: '4rem 0' },
      order: 5
    },
    {
      id: 'image-block',
      type: 'image',
      content: {
        title: 'Save the Date',
        images: ['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop']
      },
      styling: { padding: '3rem 0' },
      order: 6
    },
    {
      id: 'rsvp-section',
      type: 'rsvp',
      content: {
        title: 'RSVP',
        description: 'Please let us know if you can attend our special day',
        data: {
          eventDate: '[Event Date]',
          eventLocation: '[Event Location]',
          maxGuests: 4
        }
      },
      styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.1)' },
      order: 7
    },
    {
      id: 'schedule-section',
      type: 'schedule',
      content: {
        title: 'Wedding Timeline',
        description: 'Schedule of our special day',
        schedule: [
          { id: '1', title: 'Ceremony', startTime: '15:00', endTime: '15:30', date: '[Event Date]', type: 'session', location: '[Ceremony Location]' },
          { id: '2', title: 'Cocktail Hour', startTime: '15:30', endTime: '16:30', date: '[Event Date]', type: 'break', location: '[Reception Location]' },
          { id: '3', title: 'Reception', startTime: '16:30', endTime: '22:00', date: '[Event Date]', type: 'session', location: '[Reception Location]' }
        ]
      },
      styling: { padding: '4rem 0' },
      order: 8
    },
    {
      id: 'contact-section',
      type: 'contact',
      content: {
        title: 'Get in Touch',
        description: 'Questions? We\'d love to hear from you!',
        formFields: [
          { id: 'name', type: 'text', label: 'Name', required: true },
          { id: 'email', type: 'email', label: 'Email', required: true },
          { id: 'message', type: 'textarea', label: 'Message', required: true }
        ]
      },
      styling: { padding: '4rem 0' },
      order: 9
    }
  ];
};

const getConferenceHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: '[Event Name] 2024',
        subtitle: 'Professional Conference',
        description: 'Join industry leaders for networking, learning, and innovation',
        buttons: [
          { text: 'Register Now', link: '/pricing', style: 'primary' },
          { text: 'View Schedule', link: '/schedule', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    },
    {
      id: 'navigation',
      type: 'navigation-buttons',
      content: {
        title: 'Conference Information',
        description: 'Everything you need to know about the conference',
        buttons: [
          { text: 'Pricing', link: '/pricing', style: 'primary' },
          { text: 'Speakers', link: '/speakers', style: 'secondary' },
          { text: 'Sponsors', link: '/sponsors', style: 'outline' },
          { text: 'Schedule', link: '/schedule', style: 'outline' },
          { text: 'Contact', link: '/contact', style: 'outline' }
        ]
      },
      styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.1)' },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      content: {
        title: 'About the Conference',
        description: 'Join industry leaders, innovators, and professionals for [Event Name] 2024. This premier conference brings together the brightest minds to share insights, explore trends, and shape the future of our industry.'
      },
      styling: { padding: '4rem 0' },
      order: 2
    },
    {
      id: 'countdown',
      type: 'countdown-timer',
      content: {
        title: 'Conference Countdown',
        description: 'Don\'t miss this incredible event!',
        targetDate: '[Event Date]'
      },
      styling: { 
        padding: '3rem 0',
        backgroundColor: 'hsl(var(--muted)/0.3)'
      },
      order: 3
    },
    {
      id: 'location',
      type: 'map',
      content: {
        title: 'Conference Venue',
        description: '[Venue Name] - [Venue Address]'
      },
      styling: { padding: '4rem 0' },
      order: 4
    },
    {
      id: 'gallery',
      type: 'gallery',
      content: {
        title: 'Event Highlights',
        description: 'Photos from previous conferences',
        images: [
          'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=400&h=300&fit=crop'
        ]
      },
      styling: { padding: '4rem 0' },
      order: 5
    },
    {
      id: 'image-block',
      type: 'image',
      content: {
        title: 'Professional Networking',
        images: ['https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&h=400&fit=crop']
      },
      styling: { padding: '3rem 0' },
      order: 6
    },
    {
      id: 'pricing-section',
      type: 'pricing-table',
      content: {
        title: 'Conference Pricing',
        description: 'Choose the perfect ticket for your needs',
        pricing: [
          {
            id: 'early',
            name: 'Early Bird',
            price: 299,
            currency: 'USD',
            description: 'Perfect for early registrants',
            features: ['Full conference access', 'Networking events', 'Digital materials'],
            earlyBird: { price: 199, deadline: '2024-06-01' }
          },
          {
            id: 'standard',
            name: 'Standard',
            price: 399,
            currency: 'USD',
            description: 'Complete conference experience',
            features: ['Full conference access', 'Networking events', 'Digital materials', 'Workshop access'],
            isPopular: true
          }
        ]
      },
      styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.1)' },
      order: 7
    },
    {
      id: 'sessions-section',
      type: 'sessions-grid',
      content: {
        title: 'Featured Sessions',
        description: 'Preview of our exciting conference sessions',
        sessions: [
          {
            id: '1',
            title: 'AI in Business Transformation',
            description: 'Exploring how artificial intelligence is revolutionizing modern business practices',
            speaker: 'Dr. Sarah Johnson',
            startTime: '10:30',
            endTime: '11:30',
            date: '[Event Date]',
            location: 'Main Auditorium',
            category: 'Technology',
            level: 'intermediate',
            tags: ['AI', 'Business', 'Innovation']
          }
        ]
      },
      styling: { padding: '4rem 0' },
      order: 8
    },
    {
      id: 'schedule-section',
      type: 'multi-day-schedule',
      content: {
        title: 'Conference Schedule',
        description: 'Complete agenda and timeline',
        schedule: [
          { id: '1', title: 'Registration & Welcome', startTime: '08:00', endTime: '09:00', date: '[Event Date]', type: 'networking', location: 'Main Lobby' },
          { id: '2', title: 'Opening Keynote', startTime: '09:00', endTime: '10:00', date: '[Event Date]', type: 'keynote', location: 'Main Auditorium' },
          { id: '3', title: 'AI in Business', startTime: '10:30', endTime: '11:30', date: '[Event Date]', type: 'session', location: 'Room A' }
        ]
      },
      styling: { padding: '4rem 0' },
      order: 9
    },
    {
      id: 'speakers-section',
      type: 'speaker-profiles',
      content: {
        title: 'Featured Speakers',
        description: 'Meet our amazing speakers and industry experts',
        speakers: [
          {
            id: '1',
            name: 'Dr. Sarah Johnson',
            title: 'Chief Technology Officer',
            company: 'TechCorp',
            bio: 'Leading expert in artificial intelligence and machine learning with over 15 years of experience.',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
            sessions: ['AI in Business']
          },
          {
            id: '2',
            name: 'Michael Chen',
            title: 'Product Manager',
            company: 'InnovateNow',
            bio: 'Product strategy specialist who has launched successful products reaching millions of users.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
            sessions: ['Product Strategy']
          }
        ]
      },
      styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.1)' },
      order: 10
    },
    {
      id: 'sponsors-section',
      type: 'sponsor-showcase',
      content: {
        title: 'Our Sponsors',
        description: 'Thank you to our amazing sponsors who make this conference possible',
        sponsors: [
          {
            id: '1',
            name: 'TechCorp',
            logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop',
            website: 'https://techcorp.com',
            tier: 'platinum',
            description: 'Leading technology solutions provider'
          },
          {
            id: '2',
            name: 'InnovateLab',
            logo: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=200&h=100&fit=crop',
            website: 'https://innovatelab.com',
            tier: 'gold',
            description: 'Innovation and research laboratory'
          }
        ]
      },
      styling: { padding: '4rem 0' },
      order: 11
    },
    {
      id: 'social-section',
      type: 'social-feed',
      content: {
        title: 'Join the Conversation',
        description: 'Follow us for live updates and behind-the-scenes content',
        data: {
          hashtag: '#Conference2024',
          platforms: ['twitter', 'linkedin']
        }
      },
      styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.1)' },
      order: 12
    },
    {
      id: 'contact-section',
      type: 'contact',
      content: {
        title: 'Contact Us',
        description: 'Questions about the conference? We\'re here to help!',
        formFields: [
          { id: 'name', type: 'text', label: 'Name', required: true },
          { id: 'email', type: 'email', label: 'Email', required: true },
          { id: 'company', type: 'text', label: 'Company', required: false },
          { id: 'message', type: 'textarea', label: 'Message', required: true }
        ]
      },
      styling: { padding: '4rem 0' },
      order: 13
    }
  ];
};

const getTemplateSections = (templateId: string): Section[] => {
  const baseSections: Record<string, Section[]> = {
    'elegant-wedding': [
      {
        id: 'hero-1',
        type: 'hero',
        content: {
          title: 'Sarah & Michael',
          subtitle: 'We\'re Getting Married!',
          description: 'Join us for our special day',
          buttons: [
            { text: 'RSVP Now', link: '#rsvp', style: 'primary' }
          ],
        },
        styling: {
          backgroundColor: 'hsl(var(--background))',
          backgroundImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop',
        },
        order: 0,
      },
      {
        id: 'about-1',
        type: 'about',
        content: {
          title: 'Our Story',
          description: 'We met in college and have been inseparable ever since. Now we\'re ready to start our forever together.',
        },
        styling: {},
        order: 1,
      }
    ],
    'corporate-conference': [
      {
        id: 'hero-1',
        type: 'hero',
        content: {
          title: 'Tech Conference 2024',
          subtitle: 'Innovation & Technology Summit',
          description: 'Join industry leaders and innovators',
          buttons: [
            { text: 'Register Now', link: '#register', style: 'primary' }
          ],
        },
        styling: {
          backgroundColor: 'hsl(var(--primary))',
          textColor: 'hsl(var(--primary-foreground))',
        },
        order: 0,
      },
      {
        id: 'speakers-1',
        type: 'speaker-profiles',
        content: {
          title: 'Keynote Speakers',
          description: 'Learn from industry experts and thought leaders',
          speakers: [
            {
              id: '1',
              name: 'Dr. Sarah Johnson',
              title: 'Chief Innovation Officer',
              bio: 'Dr. Johnson is a renowned technology researcher with over 15 years of experience in innovation strategy.',
              company: 'InnovateTech Corp',
              image: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=400&h=400&fit=crop',
              social: {
                twitter: 'https://twitter.com/sarahjohnson',
                linkedin: 'https://linkedin.com/in/sarahjohnson'
              }
            }
          ]
        },
        styling: {
          backgroundColor: 'hsl(var(--muted)/0.3)',
          padding: '4rem 0'
        },
        order: 1,
      },
      {
        id: 'sessions-1',
        type: 'sessions-grid',
        content: {
          title: 'Conference Sessions',
          description: 'Explore our diverse lineup of sessions and workshops',
          sessions: [
            {
              id: '1',
              title: 'Opening Keynote: The Future of Innovation',
              description: 'Join us for an inspiring keynote about emerging technologies.',
              speaker: 'Dr. Sarah Johnson',
              startTime: '09:00',
              endTime: '10:00',
              date: '2024-03-15',
              location: 'Main Auditorium',
              category: 'Keynote',
              level: 'beginner',
              tags: ['innovation', 'technology']
            }
          ]
        },
        styling: {
          padding: '4rem 0'
        },
        order: 2,
      },
      {
        id: 'pricing-1',
        type: 'pricing-table',
        content: {
          title: 'Conference Tickets',
          description: 'Choose the perfect ticket for your needs',
          pricing: [
            {
              id: '1',
              name: 'Early Bird',
              price: 299,
              currency: 'USD',
              description: 'Perfect for individual attendees',
              features: [
                'Access to all sessions',
                'Welcome reception',
                'Lunch and coffee breaks',
                'Digital resources'
              ],
              isPopular: true
            }
          ]
        },
        styling: {
          padding: '4rem 0'
        },
        order: 3,
      }
    ],
  };

  return baseSections[templateId] || [];
};

const getBirthdayHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: '[Name]\'s Birthday Celebration',
        subtitle: 'Join Us for an Amazing Party!',
        description: 'Come celebrate another wonderful year of life with fun, food, and great company',
        buttons: [
          { text: 'RSVP Now', link: '/rsvp', style: 'primary' },
          { text: 'View Games', link: '/games', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    },
    {
      id: 'navigation',
      type: 'navigation-buttons',
      content: {
        title: 'Party Information',
        description: 'Everything you need to know about the celebration',
        buttons: [
          { text: 'RSVP', link: '/rsvp', style: 'primary' },
          { text: 'Games & Fun', link: '/games', style: 'secondary' },
          { text: 'Contact', link: '/contact', style: 'outline' }
        ]
      },
      styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.1)' },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      content: {
        title: 'About the Birthday Star',
        description: 'Join us in celebrating another amazing year of [Name]\'s life! This special person brings joy and laughter wherever they go. Let\'s make this birthday celebration one to remember with great food, fun games, and wonderful memories.'
      },
      styling: { padding: '4rem 0' },
      order: 2
    },
    {
      id: 'countdown',
      type: 'countdown-timer',
      content: {
        title: 'Party Countdown',
        description: 'The celebration begins soon!',
        targetDate: '[Event Date]'
      },
      styling: { 
        padding: '3rem 0',
        backgroundColor: 'hsl(var(--muted)/0.3)'
      },
      order: 3
    },
    {
      id: 'gallery',
      type: 'gallery',
      content: {
        title: 'Birthday Memories',
        description: 'Fun moments and celebrations from past years',
        images: [
          'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
        ]
      },
      styling: { padding: '4rem 0' },
      order: 4
    }
  ];
};

const getCharityGalaHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: '[Event Name] Charity Gala',
        subtitle: 'An Evening of Giving',
        description: 'Join us for an elegant evening supporting an important cause and making a real difference',
        buttons: [
          { text: 'Donate Now', link: '/donate', style: 'primary' },
          { text: 'Learn More', link: '/impact', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    },
    {
      id: 'navigation',
      type: 'navigation-buttons',
      content: {
        title: 'Get Involved',
        description: 'Learn how you can make a difference',
        buttons: [
          { text: 'Donate', link: '/donate', style: 'primary' },
          { text: 'Our Impact', link: '/impact', style: 'secondary' },
          { text: 'Sponsors', link: '/sponsors', style: 'outline' },
          { text: 'Contact', link: '/contact', style: 'outline' }
        ]
      },
      styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.1)' },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      content: {
        title: 'Our Mission',
        description: 'We are dedicated to [Cause Description]. Through community support and generous donations, we work tirelessly to make a positive impact in the lives of those who need it most. Every contribution, no matter the size, helps us get closer to our goals.'
      },
      styling: { padding: '4rem 0' },
      order: 2
    },
    {
      id: 'countdown',
      type: 'countdown-timer',
      content: {
        title: 'Gala Event Countdown',
        description: 'Join us for this special evening of giving!',
        targetDate: '[Event Date]'
      },
      styling: { 
        padding: '3rem 0',
        backgroundColor: 'hsl(var(--muted)/0.3)'
      },
      order: 3
    },
    {
      id: 'testimonials',
      type: 'testimonials',
      content: {
        title: 'Impact Stories',
        description: 'Hear from those whose lives have been changed',
        testimonials: [
          {
            id: '1',
            content: 'This organization gave me hope when I needed it most. Their support changed everything for my family.',
            name: 'Maria Rodriguez',
            role: 'Program Beneficiary',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop'
          }
        ]
      },
      styling: { padding: '4rem 0' },
      order: 4
    }
  ];
};

const getTechMeetupHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: '[Event Name] Tech Meetup',
        subtitle: 'Connect. Learn. Code.',
        description: 'Join fellow developers and tech enthusiasts for an evening of learning and networking',
        buttons: [
          { text: 'Join Meetup', link: '/speakers', style: 'primary' },
          { text: 'View Schedule', link: '/schedule', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    },
    {
      id: 'navigation',
      type: 'navigation-buttons',
      content: {
        title: 'Meetup Info',
        description: 'Everything you need to know about our tech meetup',
        buttons: [
          { text: 'Speakers', link: '/speakers', style: 'primary' },
          { text: 'Schedule', link: '/schedule', style: 'secondary' },
          { text: 'Resources', link: '/resources', style: 'outline' }
        ]
      },
      styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.1)' },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      content: {
        title: 'About Our Meetup',
        description: 'We\'re a community of passionate developers, designers, and tech enthusiasts who meet regularly to share knowledge, learn new skills, and build connections. Whether you\'re a beginner or an experienced professional, everyone is welcome!'
      },
      styling: { padding: '4rem 0' },
      order: 2
    },
    {
      id: 'countdown',
      type: 'countdown-timer',
      content: {
        title: 'Next Meetup Countdown',
        description: 'Don\'t miss our upcoming tech session!',
        targetDate: '[Event Date]'
      },
      styling: { 
        padding: '3rem 0',
        backgroundColor: 'hsl(var(--muted)/0.3)'
      },
      order: 3
    },
    {
      id: 'social',
      type: 'social-feed',
      content: {
        title: 'Join Our Community',
        description: 'Stay connected with fellow developers',
        data: {
          hashtag: '#TechMeetup',
          platforms: ['twitter', 'github', 'discord']
        }
      },
      styling: { padding: '4rem 0' },
      order: 4
    }
  ];
};

const getMusicFestivalHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: '[Event Name] Music Festival',
        subtitle: 'Live. Love. Music.',
        description: 'Experience incredible artists, amazing vibes, and unforgettable moments at our music festival',
        buttons: [
          { text: 'Get Tickets', link: '/tickets', style: 'primary' },
          { text: 'View Lineup', link: '/artists', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    },
    {
      id: 'navigation',
      type: 'navigation-buttons',
      content: {
        title: 'Festival Information',
        description: 'Everything you need for the ultimate festival experience',
        buttons: [
          { text: 'Tickets', link: '/tickets', style: 'primary' },
          { text: 'Artists', link: '/artists', style: 'secondary' },
          { text: 'Schedule', link: '/schedule', style: 'outline' },
          { text: 'Venue Info', link: '/venue', style: 'outline' }
        ]
      },
      styling: { padding: '4rem 0', backgroundColor: 'hsl(var(--muted)/0.1)' },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      content: {
        title: 'About the Festival',
        description: '[Event Name] brings together the best in music across multiple stages and days. From emerging artists to headline acts, experience a diverse lineup in a beautiful outdoor setting with food, drinks, and amazing vibes. This is more than just a concert – it\'s a celebration of music and community.'
      },
      styling: { padding: '4rem 0' },
      order: 2
    },
    {
      id: 'countdown',
      type: 'countdown-timer',
      content: {
        title: 'Festival Countdown',
        description: 'Get ready for the music experience of a lifetime!',
        targetDate: '[Event Date]'
      },
      styling: { 
        padding: '3rem 0',
        backgroundColor: 'hsl(var(--muted)/0.3)'
      },
      order: 3
    },
    {
      id: 'artists-preview',
      type: 'speaker-profiles',
      content: {
        title: 'Featured Artists',
        description: 'Preview of our incredible lineup',
        speakers: [
          {
            id: '1',
            name: 'Electric Dreams',
            title: 'Electronic/EDM',
            company: 'Headliner',
            bio: 'Internationally acclaimed DJ and producer.',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
            sessions: ['Main Stage - Saturday 21:00']
          }
        ]
      },
      styling: { padding: '4rem 0' },
      order: 4
    }
  ];
};

const getDefaultTheme = (templateId: string): Theme => {
  const themes: Record<string, Theme> = {
    'elegant-wedding': {
      id: 'elegant',
      name: 'Elegant',
      colors: {
        primary: 'hsl(340, 82%, 52%)',
        secondary: 'hsl(346, 77%, 49%)',
        accent: 'hsl(24, 70%, 56%)',
        background: 'hsl(0, 0%, 100%)',
        text: 'hsl(222.2, 84%, 4.9%)',
        muted: 'hsl(210, 40%, 96%)',
      },
      fonts: {
        heading: 'Playfair Display',
        body: 'Inter',
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
    },
    'corporate-conference': {
      id: 'corporate',
      name: 'Corporate',
      colors: {
        primary: 'hsl(221.2, 83.2%, 53.3%)',
        secondary: 'hsl(210, 40%, 96%)',
        accent: 'hsl(24, 70%, 56%)',
        background: 'hsl(0, 0%, 100%)',
        text: 'hsl(222.2, 84%, 4.9%)',
        muted: 'hsl(210, 40%, 96%)',
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter',
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
    },
    'birthday-celebration': {
      id: 'celebration',
      name: 'Celebration',
      colors: {
        primary: 'hsl(291, 64%, 42%)',
        secondary: 'hsl(270, 95%, 75%)',
        accent: 'hsl(43, 96%, 56%)',
        background: 'hsl(0, 0%, 100%)',
        text: 'hsl(222.2, 84%, 4.9%)',
        muted: 'hsl(270, 20%, 96%)',
      },
      fonts: {
        heading: 'Comic Neue',
        body: 'Inter',
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
    },
    'charity-gala': {
      id: 'charity',
      name: 'Charity',
      colors: {
        primary: 'hsl(142, 76%, 36%)',
        secondary: 'hsl(142, 70%, 45%)',
        accent: 'hsl(24, 70%, 56%)',
        background: 'hsl(0, 0%, 100%)',
        text: 'hsl(222.2, 84%, 4.9%)',
        muted: 'hsl(142, 20%, 96%)',
      },
      fonts: {
        heading: 'Playfair Display',
        body: 'Inter',
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
    },
    'tech-meetup': {
      id: 'tech',
      name: 'Tech',
      colors: {
        primary: 'hsl(200, 98%, 39%)',
        secondary: 'hsl(200, 90%, 50%)',
        accent: 'hsl(24, 70%, 56%)',
        background: 'hsl(0, 0%, 100%)',
        text: 'hsl(222.2, 84%, 4.9%)',
        muted: 'hsl(200, 20%, 96%)',
      },
      fonts: {
        heading: 'JetBrains Mono',
        body: 'Inter',
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
    },
    'festival-music': {
      id: 'festival',
      name: 'Festival',
      colors: {
        primary: 'hsl(320, 65%, 52%)',
        secondary: 'hsl(45, 93%, 47%)',
        accent: 'hsl(195, 100%, 50%)',
        background: 'hsl(0, 0%, 100%)',
        text: 'hsl(222.2, 84%, 4.9%)',
        muted: 'hsl(320, 20%, 96%)',
      },
      fonts: {
        heading: 'Fredoka One',
        body: 'Inter',
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
    },
  };

  return themes[templateId] || themes['elegant-wedding'];
};

// Get template navigation configuration
const getTemplateNavigationConfig = (templateId: string): NavigationConfig => {
  const configs: Record<string, NavigationConfig> = {
    'elegant-wedding': {
      showLogo: true,
      logoText: 'Our Wedding',
      buttons: [
        { id: '1', text: 'RSVP Now', link: '/rsvp', style: 'primary', showInHeader: true },
        { id: '2', text: 'View Photos', link: '#gallery', style: 'outline', showInHeader: true, target: '_self' }
      ]
    },
    'corporate-conference': {
      showLogo: true,
      logoText: 'Conference 2024',
      buttons: [
        { id: '1', text: 'Register', link: '/pricing', style: 'primary', showInHeader: true },
        { id: '2', text: 'View Speakers', link: '/speakers', style: 'secondary', showInHeader: true },
        { id: '3', text: 'Schedule', link: '#schedule', style: 'outline', showInHeader: false, target: '_self' }
      ]
    },
    'birthday-celebration': {
      showLogo: true,
      logoText: 'Birthday Bash',
      buttons: [
        { id: '1', text: 'RSVP', link: '#rsvp', style: 'primary', showInHeader: true, target: '_self' },
        { id: '2', text: 'Gift Registry', link: '#gifts', style: 'secondary', showInHeader: true, target: '_self' }
      ]
    }
  };

  return configs[templateId] || configs['elegant-wedding'];
};

// Baby Shower Home Sections
const getBabyShowerHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: 'Baby Shower',
        subtitle: 'Celebrating Our Little Bundle of Joy!',
        description: 'Join us as we prepare for the arrival of our precious baby',
        buttons: [
          { text: 'RSVP Now', link: '/rsvp', style: 'primary' },
          { text: 'Gift Registry', link: '/registry', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    },
    {
      id: 'countdown',
      type: 'countdown-timer',
      content: {
        title: 'Countdown to Baby Shower',
        description: 'The celebration begins soon!',
        targetDate: '[Event Date]'
      },
      styling: { 
        padding: '3rem 0',
        backgroundColor: 'hsl(var(--muted)/0.3)'
      },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      content: {
        title: 'Celebrating New Life',
        description: 'We\'re so excited to welcome our little one and can\'t wait to celebrate with family and friends. Join us for games, gifts, and lots of baby talk!'
      },
      styling: { padding: '4rem 0' },
      order: 2
    },
    {
      id: 'location',
      type: 'map',
      content: {
        title: 'Baby Shower Location',
        description: '[Venue Name] - [Venue Address]'
      },
      styling: { padding: '4rem 0' },
      order: 3
    }
  ];
};

// Anniversary Home Sections
const getAnniversaryHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: '[X] Years Together',
        subtitle: 'Celebrating Our Anniversary',
        description: 'Join us as we celebrate another year of love, laughter, and memories',
        buttons: [
          { text: 'RSVP Now', link: '/rsvp', style: 'primary' },
          { text: 'View Memories', link: '/memories', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    },
    {
      id: 'countdown',
      type: 'countdown-timer',
      content: {
        title: 'Countdown to Our Anniversary',
        description: 'The celebration approaches!',
        targetDate: '[Event Date]'
      },
      styling: { 
        padding: '3rem 0',
        backgroundColor: 'hsl(var(--muted)/0.3)'
      },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      content: {
        title: 'Our Journey Together',
        description: '[X] beautiful years filled with love, adventures, and countless memories. Thank you for being part of our story - let\'s celebrate together!'
      },
      styling: { padding: '4rem 0' },
      order: 2
    },
    {
      id: 'location',
      type: 'map',
      content: {
        title: 'Anniversary Celebration Venue',
        description: '[Venue Name] - [Venue Address]'
      },
      styling: { padding: '4rem 0' },
      order: 3
    }
  ];
};

// Graduation Home Sections
const getGraduationHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: 'Graduation Celebration',
        subtitle: 'The Adventure Begins!',
        description: 'Celebrating academic achievement and the start of a new chapter',
        buttons: [
          { text: 'RSVP Now', link: '/rsvp', style: 'primary' },
          { text: 'View Journey', link: '/achievements', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    },
    {
      id: 'countdown',
      type: 'countdown-timer',
      content: {
        title: 'Countdown to Graduation Party',
        description: 'Time to celebrate this amazing achievement!',
        targetDate: '[Event Date]'
      },
      styling: { 
        padding: '3rem 0',
        backgroundColor: 'hsl(var(--muted)/0.3)'
      },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      content: {
        title: 'Academic Achievement',
        description: 'Years of hard work, dedication, and perseverance have led to this moment. Let\'s celebrate this incredible milestone together!'
      },
      styling: { padding: '4rem 0' },
      order: 2
    },
    {
      id: 'location',
      type: 'map',
      content: {
        title: 'Graduation Party Venue',
        description: '[Venue Name] - [Venue Address]'
      },
      styling: { padding: '4rem 0' },
      order: 3
    }
  ];
};

// Holiday Party Home Sections
const getHolidayPartyHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: 'Holiday Celebration',
        subtitle: 'Spreading Holiday Cheer!',
        description: 'Join us for a festive celebration filled with joy, laughter, and holiday spirit',
        buttons: [
          { text: 'RSVP Now', link: '/rsvp', style: 'primary' },
          { text: 'View Activities', link: '/activities', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    },
    {
      id: 'countdown',
      type: 'countdown-timer',
      content: {
        title: 'Holiday Party Countdown',
        description: 'The festive fun begins soon!',
        targetDate: '[Event Date]'
      },
      styling: { 
        padding: '3rem 0',
        backgroundColor: 'hsl(var(--muted)/0.3)'
      },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      content: {
        title: 'Holiday Festivities',
        description: 'Come celebrate the season with us! We\'ll have festive music, holiday treats, games, and plenty of holiday cheer. Don\'t forget to wear your holiday best!'
      },
      styling: { padding: '4rem 0' },
      order: 2
    },
    {
      id: 'location',
      type: 'map',
      content: {
        title: 'Holiday Party Location',
        description: '[Venue Name] - [Venue Address]'
      },
      styling: { padding: '4rem 0' },
      order: 3
    }
  ];
};

// Corporate Event Home Sections
const getCorporateEventHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: 'Corporate Event',
        subtitle: 'Professional Excellence & Innovation',
        description: 'Join industry leaders for networking, insights, and business development opportunities',
        buttons: [
          { text: 'Register Now', link: '/register', style: 'primary' },
          { text: 'View Agenda', link: '/agenda', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    },
    {
      id: 'countdown',
      type: 'countdown-timer',
      content: {
        title: 'Event Countdown',
        description: 'Don\'t miss this premier business gathering!',
        targetDate: '[Event Date]'
      },
      styling: { 
        padding: '3rem 0',
        backgroundColor: 'hsl(var(--muted)/0.3)'
      },
      order: 1
    },
    {
      id: 'about',
      type: 'about',
      content: {
        title: 'Professional Development',
        description: 'Connect with industry professionals, gain valuable insights, and explore new business opportunities in this exclusive corporate gathering.'
      },
      styling: { padding: '4rem 0' },
      order: 2
    },
    {
      id: 'location',
      type: 'map',
      content: {
        title: 'Event Venue',
        description: '[Venue Name] - [Venue Address]'
      },
      styling: { padding: '4rem 0' },
      order: 3
    }
  ];
};

// Workshop Home Sections
const getWorkshopHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: 'Interactive Workshop',
        subtitle: 'Hands-On Learning Experience',
        description: 'Develop new skills through expert guidance and practical exercises',
        buttons: [
          { text: 'Register Now', link: '/registration', style: 'primary' },
          { text: 'View Curriculum', link: '/curriculum', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    }
  ];
};

// Networking Event Home Sections  
const getNetworkingHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: 'Professional Networking',
        subtitle: 'Connect • Collaborate • Grow',
        description: 'Build meaningful professional relationships and expand your network',
        buttons: [
          { text: 'Register Now', link: '/register', style: 'primary' },
          { text: 'View Attendees', link: '/attendees', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    }
  ];
};

// Product Launch Home Sections
const getProductLaunchHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero', 
      content: {
        title: 'Product Launch',
        subtitle: 'Innovation Unveiled',
        description: 'Be among the first to experience our groundbreaking new product',
        buttons: [
          { text: 'Register Now', link: '/register', style: 'primary' },
          { text: 'Learn More', link: '/product', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    }
  ];
};

// Webinar Home Sections
const getWebinarHomeSections = (): Section[] => {
  return [
    {
      id: 'hero',
      type: 'hero',
      content: {
        title: 'Expert Webinar',
        subtitle: 'Learn From Industry Leaders', 
        description: 'Join our online session for insights, strategies, and expert knowledge',
        buttons: [
          { text: 'Register Now', link: '/register', style: 'primary' },
          { text: 'View Topics', link: '/topics', style: 'outline' }
        ]
      },
      styling: {
        padding: '6rem 0',
        backgroundImage: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=1200&h=600&fit=crop',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textColor: 'white'
      },
      order: 0
    }
  ];
};
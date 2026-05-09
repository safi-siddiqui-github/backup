import { createContext, useContext, useState, ReactNode } from 'react';
import { VenueHierarchy, VenueLocation, VenueSection, SeatingArrangement } from '@/types/venue';

interface VenueHierarchyContextType {
  hierarchy: VenueHierarchy;
  setHierarchy: (hierarchy: VenueHierarchy) => void;
  currentLocation: VenueLocation | null;
  currentSection: VenueSection | null;
  currentArrangement: SeatingArrangement | null;
  navigateToArrangement: (locationId: string, sectionId: string, arrangementId: string) => void;
  addLocation: (location: Omit<VenueLocation, 'id' | 'sections'>) => void;
  addSection: (locationId: string, section: Omit<VenueSection, 'id' | 'arrangements'>) => void;
  addArrangement: (sectionId: string, arrangement: Omit<SeatingArrangement, 'id'>) => void;
  updateArrangement: (arrangementId: string, updates: Partial<SeatingArrangement>) => void;
  duplicateArrangement: (arrangementId: string, newName: string) => void;
  deleteLocation: (locationId: string) => void;
  deleteSection: (sectionId: string) => void;
  deleteArrangement: (arrangementId: string) => void;
}

const VenueHierarchyContext = createContext<VenueHierarchyContextType | undefined>(undefined);

export const useVenueHierarchy = () => {
  const context = useContext(VenueHierarchyContext);
  if (!context) {
    throw new Error('useVenueHierarchy must be used within a VenueHierarchyProvider');
  }
  return context;
};

interface VenueHierarchyProviderProps {
  children: ReactNode;
  initialHierarchy?: VenueHierarchy;
}

export const VenueHierarchyProvider = ({ children, initialHierarchy }: VenueHierarchyProviderProps) => {
  const [hierarchy, setHierarchy] = useState<VenueHierarchy>(
    initialHierarchy || {
      id: 'demo-hierarchy',
      name: 'Demo Venue Hierarchy',
      eventId: 'demo-event',
      eventName: 'Demo Event',
      locations: [
        {
          id: 'location-1',
          name: 'Main Reception Hall',
          description: 'Primary event space',
          sections: [
            {
              id: 'section-1',
              locationId: 'location-1',
              name: 'Main Floor',
              description: 'Central dining area',
              arrangements: [
                {
                  id: 'arrangement-1',
                  sectionId: 'section-1',
                  name: 'Dinner Setup',
                  description: 'Formal dinner arrangement',
                  startTime: '19:00',
                  endTime: '21:00',
                  venueType: 'table-based',
                  tables: [],
                  chairs: [],
                  seats: [],
                  seatSections: [],
                  venueObjects: [],
                  isActive: true
                }
              ]
            }
          ]
        }
      ],
      currentPath: {
        locationId: 'location-1',
        sectionId: 'section-1',
        arrangementId: 'arrangement-1'
      }
    }
  );

  const currentLocation = hierarchy.locations.find(l => l.id === hierarchy.currentPath.locationId) || null;
  const currentSection = currentLocation?.sections.find(s => s.id === hierarchy.currentPath.sectionId) || null;
  const currentArrangement = currentSection?.arrangements.find(a => a.id === hierarchy.currentPath.arrangementId) || null;

  const navigateToArrangement = (locationId: string, sectionId: string, arrangementId: string) => {
    setHierarchy(prev => ({
      ...prev,
      currentPath: { locationId, sectionId, arrangementId }
    }));
  };

  const addLocation = (location: Omit<VenueLocation, 'id' | 'sections'>) => {
    const newLocation: VenueLocation = {
      ...location,
      id: `location-${Date.now()}`,
      sections: []
    };
    
    setHierarchy(prev => ({
      ...prev,
      locations: [...prev.locations, newLocation]
    }));
  };

  const addSection = (locationId: string, section: Omit<VenueSection, 'id' | 'arrangements'>) => {
    const newSection: VenueSection = {
      ...section,
      id: `section-${Date.now()}`,
      locationId,
      arrangements: []
    };

    setHierarchy(prev => ({
      ...prev,
      locations: prev.locations.map(location =>
        location.id === locationId
          ? { ...location, sections: [...location.sections, newSection] }
          : location
      )
    }));
  };

  const addArrangement = (sectionId: string, arrangement: Omit<SeatingArrangement, 'id'>) => {
    const newArrangement: SeatingArrangement = {
      ...arrangement,
      id: `arrangement-${Date.now()}`,
      sectionId,
      chairs: arrangement.chairs || []
    };

    setHierarchy(prev => ({
      ...prev,
      locations: prev.locations.map(location => ({
        ...location,
        sections: location.sections.map(section =>
          section.id === sectionId
            ? { ...section, arrangements: [...section.arrangements, newArrangement] }
            : section
        )
      }))
    }));
  };

  const updateArrangement = (arrangementId: string, updates: Partial<SeatingArrangement>) => {
    setHierarchy(prev => ({
      ...prev,
      locations: prev.locations.map(location => ({
        ...location,
        sections: location.sections.map(section => ({
          ...section,
          arrangements: section.arrangements.map(arrangement =>
            arrangement.id === arrangementId
              ? { ...arrangement, ...updates }
              : arrangement
          )
        }))
      }))
    }));
  };

  const duplicateArrangement = (arrangementId: string, newName: string) => {
    const sourceArrangement = hierarchy.locations
      .flatMap(l => l.sections)
      .flatMap(s => s.arrangements)
      .find(a => a.id === arrangementId);

    if (sourceArrangement) {
      const duplicatedArrangement: SeatingArrangement = {
        ...sourceArrangement,
        id: `arrangement-${Date.now()}`,
        name: newName,
        tables: sourceArrangement.tables.map(table => ({
          ...table,
          id: Date.now() + Math.random()
        })),
        chairs: sourceArrangement.chairs?.map(chair => ({
          ...chair,
          id: Date.now() + Math.random()
        })) || [],
        seats: sourceArrangement.seats.map(seat => ({
          ...seat,
          id: Date.now() + Math.random()
        })),
        venueObjects: sourceArrangement.venueObjects.map(obj => ({
          ...obj,
          id: Date.now() + Math.random()
        }))
      };

      addArrangement(sourceArrangement.sectionId, duplicatedArrangement);
    }
  };

  const deleteLocation = (locationId: string) => {
    setHierarchy(prev => {
      const newLocations = prev.locations.filter(l => l.id !== locationId);
      let newPath = prev.currentPath;
      
      // If deleting current location, navigate to first available location
      if (prev.currentPath.locationId === locationId) {
        if (newLocations.length > 0) {
          const firstLocation = newLocations[0];
          const firstSection = firstLocation.sections[0];
          const firstArrangement = firstSection?.arrangements[0];
          
          newPath = {
            locationId: firstLocation.id,
            sectionId: firstSection?.id || '',
            arrangementId: firstArrangement?.id || ''
          };
        } else {
          newPath = { locationId: '', sectionId: '', arrangementId: '' };
        }
      }

      return {
        ...prev,
        locations: newLocations,
        currentPath: newPath
      };
    });
  };

  const deleteSection = (sectionId: string) => {
    setHierarchy(prev => {
      const newHierarchy = {
        ...prev,
        locations: prev.locations.map(location => ({
          ...location,
          sections: location.sections.filter(s => s.id !== sectionId)
        }))
      };

      // If deleting current section, navigate to first available section in location
      if (prev.currentPath.sectionId === sectionId) {
        const currentLocation = newHierarchy.locations.find(l => l.id === prev.currentPath.locationId);
        const firstSection = currentLocation?.sections[0];
        const firstArrangement = firstSection?.arrangements[0];

        newHierarchy.currentPath = {
          ...prev.currentPath,
          sectionId: firstSection?.id || '',
          arrangementId: firstArrangement?.id || ''
        };
      }

      return newHierarchy;
    });
  };

  const deleteArrangement = (arrangementId: string) => {
    setHierarchy(prev => {
      const newHierarchy = {
        ...prev,
        locations: prev.locations.map(location => ({
          ...location,
          sections: location.sections.map(section => ({
            ...section,
            arrangements: section.arrangements.filter(a => a.id !== arrangementId)
          }))
        }))
      };

      // If deleting current arrangement, navigate to first available arrangement in section
      if (prev.currentPath.arrangementId === arrangementId) {
        const currentLocation = newHierarchy.locations.find(l => l.id === prev.currentPath.locationId);
        const currentSection = currentLocation?.sections.find(s => s.id === prev.currentPath.sectionId);
        const firstArrangement = currentSection?.arrangements[0];

        newHierarchy.currentPath = {
          ...prev.currentPath,
          arrangementId: firstArrangement?.id || ''
        };
      }

      return newHierarchy;
    });
  };

  return (
    <VenueHierarchyContext.Provider
      value={{
        hierarchy,
        setHierarchy,
        currentLocation,
        currentSection,
        currentArrangement,
        navigateToArrangement,
        addLocation,
        addSection,
        addArrangement,
        updateArrangement,
        duplicateArrangement,
        deleteLocation,
        deleteSection,
        deleteArrangement
      }}
    >
      {children}
    </VenueHierarchyContext.Provider>
  );
};

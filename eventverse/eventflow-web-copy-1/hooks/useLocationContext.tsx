
import { createContext, useContext, ReactNode } from 'react';
import { useVenueHierarchy } from './useVenueHierarchy';

interface LocationContextType {
  selectedLocationId: string | null;
  setSelectedLocationId: (locationId: string | null) => void;
  currentLocationData: {
    location: any;
    sections: any[];
    currentSection: any;
    currentArrangement: any;
  } | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationContextProvider');
  }
  return context;
};

interface LocationContextProviderProps {
  children: ReactNode;
}

export const LocationContextProvider = ({ children }: LocationContextProviderProps) => {
  const { hierarchy, currentLocation, currentSection, currentArrangement, navigateToArrangement } = useVenueHierarchy();
  
  // Derive selectedLocationId from hierarchy's currentPath
  const selectedLocationId = hierarchy.currentPath.locationId || null;

  const setSelectedLocationId = (locationId: string | null) => {
    if (locationId) {
      const location = hierarchy.locations.find(l => l.id === locationId);
      if (location) {
        const firstSection = location.sections[0];
        if (firstSection) {
          const firstArrangement = firstSection.arrangements[0];
          navigateToArrangement(
            locationId, 
            firstSection.id, 
            firstArrangement?.id || ''
          );
        } else {
          // No sections, just set location
          navigateToArrangement(locationId, '', '');
        }
      }
    }
  };

  const currentLocationData = selectedLocationId ? {
    location: currentLocation,
    sections: currentLocation?.sections || [],
    currentSection: currentSection,
    currentArrangement: currentArrangement
  } : null;

  return (
    <LocationContext.Provider
      value={{
        selectedLocationId,
        setSelectedLocationId,
        currentLocationData
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

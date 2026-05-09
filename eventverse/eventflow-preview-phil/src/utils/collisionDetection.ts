
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CollisionElement {
  id: number;
  type: 'table' | 'seat' | 'venue-object';
  boundingBox: BoundingBox;
}

// Minimum spacing between elements
export const SPACING_RULES = {
  tableToTable: 60,
  seatToSeat: 25,
  tableToVenueObject: 40,
  seatToVenueObject: 30,
  venueObjectToVenueObject: 35,
  tableToSeat: 45,
  canvasPadding: 20
};

export function calculateBoundingBox(
  element: any,
  elementType: 'table' | 'seat' | 'venue-object',
  zoomLevel: number = 1
): BoundingBox {
  switch (elementType) {
    case 'table':
      const scale = (element.scale || 1) * zoomLevel;
      let baseSize;
      
      switch (element.shape) {
        case "round":
          baseSize = { width: 80, height: 80 };
          break;
        case "rectangular":
          baseSize = { width: 120, height: 60 };
          break;
        case "long-rectangular":
          baseSize = { width: 160, height: 50 };
          break;
        default:
          baseSize = { width: 80, height: 80 };
      }
      
      const seatScale = Math.min(1 + (element.seats - 4) * 0.1, 1.5);
      const width = baseSize.width * scale * seatScale;
      const height = baseSize.height * scale * seatScale;
      
      // Add buffer for seat indicators around the table
      const seatBuffer = 50;
      
      return {
        x: element.x - width / 2 - seatBuffer,
        y: element.y - height / 2 - seatBuffer,
        width: width + seatBuffer * 2,
        height: height + seatBuffer * 2
      };

    case 'seat':
      const seatSize = 20;
      return {
        x: element.x - seatSize / 2,
        y: element.y - seatSize / 2,
        width: seatSize,
        height: seatSize
      };

    case 'venue-object':
      return {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height
      };

    default:
      return { x: 0, y: 0, width: 0, height: 0 };
  }
}

export function checkCollision(box1: BoundingBox, box2: BoundingBox, minSpacing: number = 0): boolean {
  const expandedBox1 = {
    x: box1.x - minSpacing,
    y: box1.y - minSpacing,
    width: box1.width + minSpacing * 2,
    height: box1.height + minSpacing * 2
  };

  return !(
    expandedBox1.x + expandedBox1.width < box2.x ||
    box2.x + box2.width < expandedBox1.x ||
    expandedBox1.y + expandedBox1.height < box2.y ||
    box2.y + box2.height < expandedBox1.y
  );
}

export function findCollisions(
  element: CollisionElement,
  allElements: CollisionElement[]
): CollisionElement[] {
  const collisions: CollisionElement[] = [];
  
  for (const other of allElements) {
    if (other.id === element.id || other.type === element.type) continue;
    
    const minSpacing = getMinSpacing(element.type, other.type);
    
    if (checkCollision(element.boundingBox, other.boundingBox, minSpacing)) {
      collisions.push(other);
    }
  }
  
  return collisions;
}

export function getMinSpacing(type1: string, type2: string): number {
  const key = `${type1}To${type2.charAt(0).toUpperCase() + type2.slice(1)}` as keyof typeof SPACING_RULES;
  const reverseKey = `${type2}To${type1.charAt(0).toUpperCase() + type1.slice(1)}` as keyof typeof SPACING_RULES;
  
  return SPACING_RULES[key] || SPACING_RULES[reverseKey] || 30;
}

export function findNearestValidPosition(
  element: any,
  elementType: 'table' | 'seat' | 'venue-object',
  allElements: CollisionElement[],
  canvasWidth: number = 800,
  canvasHeight: number = 600,
  zoomLevel: number = 1
): { x: number; y: number } | null {
  const maxAttempts = 100;
  const searchRadius = 10;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const radius = attempt * searchRadius;
    const angleStep = Math.PI / 4; // 45 degree steps
    
    for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
      const testX = element.x + Math.cos(angle) * radius;
      const testY = element.y + Math.sin(angle) * radius;
      
      const testElement = { ...element, x: testX, y: testY };
      const testBoundingBox = calculateBoundingBox(testElement, elementType, zoomLevel);
      
      // Check canvas boundaries
      if (
        testBoundingBox.x < SPACING_RULES.canvasPadding ||
        testBoundingBox.y < SPACING_RULES.canvasPadding ||
        testBoundingBox.x + testBoundingBox.width > canvasWidth - SPACING_RULES.canvasPadding ||
        testBoundingBox.y + testBoundingBox.height > canvasHeight - SPACING_RULES.canvasPadding
      ) {
        continue;
      }
      
      const testCollisionElement: CollisionElement = {
        id: element.id,
        type: elementType,
        boundingBox: testBoundingBox
      };
      
      const collisions = findCollisions(testCollisionElement, allElements);
      
      if (collisions.length === 0) {
        return { x: testX, y: testY };
      }
    }
  }
  
  return null;
}

export function generateCollisionElements(
  tables: any[],
  seats: any[],
  venueObjects: any[],
  zoomLevel: number = 1
): CollisionElement[] {
  const elements: CollisionElement[] = [];
  
  // Add tables
  tables.forEach(table => {
    elements.push({
      id: table.id,
      type: 'table',
      boundingBox: calculateBoundingBox(table, 'table', zoomLevel)
    });
  });
  
  // Add individual seats
  seats.forEach(seat => {
    elements.push({
      id: seat.id,
      type: 'seat',
      boundingBox: calculateBoundingBox(seat, 'seat', zoomLevel)
    });
  });
  
  // Add venue objects
  venueObjects.forEach(obj => {
    elements.push({
      id: obj.id,
      type: 'venue-object',
      boundingBox: calculateBoundingBox(obj, 'venue-object', zoomLevel)
    });
  });
  
  return elements;
}

export function autoFixOverlaps(
  tables: any[],
  seats: any[],
  venueObjects: any[],
  canvasWidth: number = 800,
  canvasHeight: number = 600,
  zoomLevel: number = 1
): { 
  tables: any[]; 
  seats: any[]; 
  venueObjects: any[]; 
  fixed: number; 
} {
  let fixedCount = 0;
  const updatedTables = [...tables];
  const updatedSeats = [...seats];
  const updatedVenueObjects = [...venueObjects];
  
  // Start with venue objects (usually fixed)
  const allElements = generateCollisionElements(updatedTables, updatedSeats, updatedVenueObjects, zoomLevel);
  
  // Fix tables
  for (let i = 0; i < updatedTables.length; i++) {
    const table = updatedTables[i];
    const tableElement: CollisionElement = {
      id: table.id,
      type: 'table',
      boundingBox: calculateBoundingBox(table, 'table', zoomLevel)
    };
    
    const collisions = findCollisions(tableElement, allElements);
    
    if (collisions.length > 0) {
      const newPosition = findNearestValidPosition(
        table, 'table', allElements, canvasWidth, canvasHeight, zoomLevel
      );
      
      if (newPosition) {
        updatedTables[i] = { ...table, ...newPosition };
        // Update the collision element for this table
        const updatedElement = allElements.find(el => el.id === table.id && el.type === 'table');
        if (updatedElement) {
          updatedElement.boundingBox = calculateBoundingBox(updatedTables[i], 'table', zoomLevel);
        }
        fixedCount++;
      }
    }
  }
  
  // Fix individual seats
  for (let i = 0; i < updatedSeats.length; i++) {
    const seat = updatedSeats[i];
    const seatElement: CollisionElement = {
      id: seat.id,
      type: 'seat',
      boundingBox: calculateBoundingBox(seat, 'seat', zoomLevel)
    };
    
    const collisions = findCollisions(seatElement, allElements);
    
    if (collisions.length > 0) {
      const newPosition = findNearestValidPosition(
        seat, 'seat', allElements, canvasWidth, canvasHeight, zoomLevel
      );
      
      if (newPosition) {
        updatedSeats[i] = { ...seat, ...newPosition };
        // Update the collision element for this seat
        const updatedElement = allElements.find(el => el.id === seat.id && el.type === 'seat');
        if (updatedElement) {
          updatedElement.boundingBox = calculateBoundingBox(updatedSeats[i], 'seat', zoomLevel);
        }
        fixedCount++;
      }
    }
  }
  
  return {
    tables: updatedTables,
    seats: updatedSeats,
    venueObjects: updatedVenueObjects,
    fixed: fixedCount
  };
}

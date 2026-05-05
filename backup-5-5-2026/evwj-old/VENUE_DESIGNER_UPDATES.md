# Venue Designer - Major Updates 🎉

## Overview
Complete refactor of the venue designer system using **Konva.js** for professional-grade floor planning with advanced chair management.

---

## ✨ New Features

### 1. **Rounded Chairs Around Tables** 🪑
- **Circular chair design** with rounded backrest
- Automatic positioning around tables based on seat count
- Visual seat indicators:
  - Gray: Empty seats
  - Green: Assigned seats
  - Blue outline: Selected chairs
- Seat numbers displayed on each chair

### 2. **Draggable Individual Chairs** 🖱️
- Click and drag any chair to reposition
- Chairs maintain connection to their table
- Custom positions are saved with the layout
- Press `Delete` to reset chair to default position
- Multi-select support (Shift + Click)

### 3. **Advanced Chair Row Creation** 📊
- **Drag-to-create** chair rows
- Configure spacing (30-100px)
- Create **multiple parallel rows** (1-20 rows)
- Automatic rotation based on drag direction
- Row spacing configuration

### 4. **Professional Wall Drawing** 🏗️
- Click-to-place wall points
- Three wall types:
  - **Exterior**: Thick walls (12px)
  - **Interior**: Medium walls (6px)
  - **Glass**: Thin walls (4px), blue color
- Press `Esc` to finish wall
- Press `Enter` to close as room

### 5. **Doors & Windows** 🚪
- Single-click placement
- Draggable and resizable
- Rotation handles
- Visual indicators (yellow doors, blue windows)

### 6. **Table Management** 🍽️
- Four shapes: Round, Rectangular, Square, Oval
- Configurable seats (2-20)
- Visual seat positions around table
- Drag to move entire table with chairs
- Transform handles for resize/rotate

### 7. **Venue Objects** 📦
- 10+ object types:
  - Stage, Podium, Dance Floor
  - Bar, Buffet, Booth, Tent
  - Exit, Restroom, Plant/Decor
- Custom colors and icons
- Draggable and resizable

---

## 🛠️ Technical Implementation

### Technology Stack
- **Konva.js**: High-performance canvas rendering
- **react-konva**: React bindings for Konva
- **TypeScript**: Full type safety
- **Tailwind CSS**: UI styling

### Key Components

#### 1. `KonvaVenueDesigner.tsx` (New)
Main designer component with:
- Canvas management (zoom, pan, grid)
- Tool system (select, wall, door, window, chair, table, object)
- State management for all venue elements
- Undo/Redo history
- Export to PNG

#### 2. `RoomLayoutDesigner.tsx` (Updated)
Wrapper component:
- Dynamic import for SSR compatibility
- Loading state
- Props forwarding

#### 3. `VenueDesignerExample.tsx` (New)
Demo component showcasing:
- Feature highlights
- Quick start guide
- Example layouts

---

## 📊 Data Structure

### Table with Chair Positions
```typescript
interface VenueTable {
  id: string;
  name: string;
  x: number;
  y: number;
  shape: "round" | "rectangular" | "square" | "oval";
  width: number;
  height: number;
  rotation: number;
  seats: number;
  color: string;
  seatAssignments: Record<number, any>;
  chairPositions?: Array<{
    x: number;        // Relative to table center
    y: number;        // Relative to table center
    rotation: number; // Chair rotation in degrees
  }>;
}
```

### Chair Row
```typescript
interface ChairRow {
  id: string;
  chairs: ChairInRow[];
  x: number;
  y: number;
  rotation: number;
  spacing: number;
  curved: boolean;
  curveRadius?: number;
}
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `V` | Select tool |
| `H` | Pan tool |
| `W` | Wall tool |
| `D` | Door tool |
| `Esc` | Finish wall / Cancel |
| `Enter` | Close wall as room |
| `Delete` | Remove selected / Reset chair |
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |
| `Shift + Click` | Multi-select |
| `Mouse Wheel` | Zoom in/out |

---

## 🎯 Usage Examples

### Basic Usage
```tsx
import RoomLayoutDesigner from "@/components/preview/seating/RoomLayoutDesigner";

<RoomLayoutDesigner
  onSave={(layout) => console.log("Saved:", layout)}
  onExport={() => console.log("Exported")}
  initialLayout={existingLayout}
  viewMode="design"
/>
```

### With Initial Layout
```tsx
const initialLayout = {
  tables: [{
    id: "1",
    name: "Table 1",
    seats: 8,
    shape: "round",
    x: 300,
    y: 300,
    // ... other properties
  }],
  chairs: [],
  venueObjects: [],
  seats: [],
};

<RoomLayoutDesigner
  initialLayout={initialLayout}
  onSave={handleSave}
/>
```

---

## 📁 File Structure

```
components/preview/seating/
├── KonvaVenueDesigner.tsx        # Main designer (NEW)
├── RoomLayoutDesigner.tsx        # Wrapper component (UPDATED)
├── VenueDesignerExample.tsx      # Demo component (NEW)
├── VENUE_DESIGNER_GUIDE.md       # User guide (NEW)
└── ... (other existing files)
```

---

## 🚀 Performance Optimizations

1. **Canvas-based rendering**: Konva provides hardware-accelerated rendering
2. **Lazy loading**: Designer loaded dynamically to avoid SSR issues
3. **Memoized renders**: useCallback for render functions
4. **Efficient updates**: Only re-render changed elements
5. **Grid caching**: Grid lines calculated once per zoom level

---

## 🎨 Styling & Theming

### Chair Colors
```typescript
const CHAIR_COLORS = {
  empty: "#f3f4f6",      // Gray
  assigned: "#22c55e",   // Green
  selected: "#3b82f6",   // Blue outline
  backrest: "#d1d5db",   // Light gray
};
```

### Table Colors
```typescript
const TABLE_COLORS = [
  "#f0f9ff", // Light blue
  "#fef3c7", // Light yellow
  "#d1fae5", // Light green
  "#fce7f3", // Light pink
  "#e0e7ff", // Light indigo
  "#f3e8ff", // Light purple
];
```

---

## 🔄 Migration Guide

### From Old Designer
The old canvas-based designer has been replaced. Key changes:

1. **Import path remains the same**:
   ```tsx
   import RoomLayoutDesigner from "@/components/preview/seating/RoomLayoutDesigner";
   ```

2. **Props are compatible**:
   - `onSave`, `onExport`, `initialLayout` work the same
   - `viewMode` is supported

3. **Layout data format**:
   - Tables now include `chairPositions` array
   - All other data structures remain compatible

---

## 📝 TODO / Future Enhancements

- [ ] Chair style variations (different designs)
- [ ] Chair color customization per seat
- [ ] Auto-arrange chairs in patterns (theater, classroom, etc.)
- [ ] Chair templates library
- [ ] Seat assignment dialog integration
- [ ] Chair rotation handles (manual rotation)
- [ ] Curved chair rows
- [ ] Copy/paste elements
- [ ] Alignment tools
- [ ] Measurement tools
- [ ] Layer management
- [ ] Templates gallery
- [ ] Collaboration features

---

## 🐛 Known Issues & Limitations

1. **SSR Compatibility**: Must use dynamic import (already implemented)
2. **Touch Support**: Basic touch support, can be enhanced
3. **Mobile Responsiveness**: Optimized for desktop, mobile needs improvement
4. **Browser Compatibility**: Tested on Chrome, Firefox, Safari (latest versions)

---

## 📚 Resources

- [Konva.js Documentation](https://konvajs.org/)
- [react-konva Documentation](https://konvajs.org/docs/react/)
- [Component Guide](./VENUE_DESIGNER_GUIDE.md)

---

## 🎉 Summary

This update brings professional-grade venue design capabilities with:
- ✅ Rounded, draggable chairs
- ✅ Advanced wall/door/window tools
- ✅ Drag-to-create chair rows
- ✅ Professional table management
- ✅ High-performance canvas rendering
- ✅ Full undo/redo support
- ✅ Export capabilities

The new Konva-based designer provides a much better user experience and is ready for production use!


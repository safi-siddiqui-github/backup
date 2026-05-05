# Konva Venue Designer Guide

## Overview
Professional venue floor plan designer built with Konva.js for high-performance canvas rendering.

## ✨ New Features

### 1. **Rounded Chairs Around Tables**
- All table chairs now have a **rounded/circular design**
- Chairs automatically position around tables based on seat count
- Visual indicators:
  - **Gray chairs**: Empty seats
  - **Green chairs**: Assigned seats
  - **Blue outline**: Selected chair

### 2. **Draggable Individual Chairs**
- **Click and drag** any chair around a table to reposition it
- Chairs maintain their seat number
- Custom positions are saved with the table
- Press `Delete` to reset a chair to its default position

### 3. **Chair Design**
- Circular seat (15px radius)
- Rounded backrest at the top
- Seat number displayed in the center
- Smooth rotation based on position around table

## 🎯 How to Use

### Adding Tables with Chairs
1. Select the **Table** tool (📋 icon)
2. Configure:
   - **Shape**: Round, Rectangular, Square, or Oval
   - **Seats**: 2-20 chairs
3. Click on canvas to place table
4. Chairs automatically appear around the table

### Moving Individual Chairs
1. Select the **Select** tool (🖱️ icon)
2. Click on any chair around a table
3. Drag to new position
4. Chair stays connected to the table

### Resetting Chair Positions
1. Select a chair
2. Press `Delete` or `Backspace`
3. Chair returns to default position around table

### Moving Entire Table with Chairs
1. Select the **Select** tool
2. Click on the table (not the chairs)
3. Drag to move table and all chairs together

## 🎨 Chair Styling

```typescript
// Chair appearance
- Seat: Circular, 15px radius
- Fill: #f3f4f6 (empty) or #22c55e (assigned)
- Backrest: Rounded top, #d1d5db
- Border: #9ca3af (normal) or #3b82f6 (selected)
- Number: Centered, 10px font
```

## 📐 Technical Details

### Chair Position Calculation
```typescript
// Default positions around table
const angle = (i / table.seats) * Math.PI * 2 - Math.PI / 2;
const seatRadius = table.width / 2 + 20;
const x = Math.cos(angle) * seatRadius;
const y = Math.sin(angle) * seatRadius;
const rotation = (angle * 180) / Math.PI + 90;
```

### Data Structure
```typescript
interface VenueTable {
  chairPositions?: Array<{
    x: number;        // Relative to table center
    y: number;        // Relative to table center
    rotation: number; // Chair rotation in degrees
  }>;
}
```

## 🔄 State Management

- Chair positions are stored per table
- Custom positions override default calculations
- Positions are relative to table center
- Saved with layout data on export

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Click + Drag` | Move selected chair |
| `Delete` | Reset chair to default position |
| `Shift + Click` | Multi-select chairs |
| `Ctrl/Cmd + Z` | Undo chair movement |

## 💡 Tips

1. **Precise Positioning**: Enable snap-to-grid for aligned chair placement
2. **Custom Layouts**: Drag chairs to create unique seating arrangements
3. **Group Selection**: Shift+click multiple chairs to move them together
4. **Reset All**: Delete the table and re-add it to reset all chairs

## 🐛 Troubleshooting

**Chairs not moving?**
- Make sure you're in **Select** mode (not Pan or other tools)
- Click directly on the chair circle, not between chairs

**Chair disappeared?**
- Press `Ctrl+Z` to undo
- Or delete and re-add the table

**Chairs overlapping?**
- Manually drag chairs apart
- Increase table size for more space

## 📊 Export Format

When saving, chair positions are included:

```json
{
  "tables": [{
    "id": "table-1",
    "chairPositions": [
      { "x": 50, "y": 0, "rotation": 90 },
      { "x": 35, "y": 35, "rotation": 135 }
    ]
  }]
}
```

## 🚀 Future Enhancements

- [ ] Chair styles (different designs)
- [ ] Chair colors per seat
- [ ] Auto-arrange chairs in patterns
- [ ] Chair templates
- [ ] Seat assignment dialog
- [ ] Chair rotation handles


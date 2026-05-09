interface DropZone {
  id: string;
  name: string;
  bounds: { x: number; y: number; width: number; height: number };
  isActive: boolean;
}

interface DropZonesProps {
  zones: DropZone[];
  isVisible: boolean;
}

export const DropZones = ({ zones, isVisible }: DropZonesProps) => {
  if (!isVisible || zones.length === 0) return null;

  return (
    <>
      {zones.map(zone => (
        <div
          key={zone.id}
          className={`
            absolute pointer-events-none transition-all duration-200 rounded-lg border-2 border-dashed
            flex items-center justify-center text-sm font-medium
            ${zone.isActive 
              ? 'border-violet-500 bg-violet-100/80 text-violet-700 scale-105' 
              : 'border-violet-300 bg-violet-50/50 text-violet-500'
            }
          `}
          style={{
            left: zone.bounds.x,
            top: zone.bounds.y,
            width: zone.bounds.width,
            height: zone.bounds.height,
            zIndex: 1000
          }}
        >
          <div className="text-center">
            <div className="text-xs opacity-75">Drop here</div>
            <div className="font-semibold">{zone.name}</div>
          </div>
        </div>
      ))}
    </>
  );
};
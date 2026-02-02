import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Circle, useMap, Marker, Popup, ScaleControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { SafType } from '../lib/utils';
import { Maximize } from 'lucide-react';

// Fix Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  center: [number, number];
  areaHectares: number;
  safType: SafType;
  scope: 'pax' | 'plane' | 'global';
  onCenterChange: (center: [number, number]) => void;
}

// Component to handle map updates when center changes
function MapUpdater({ center, radius }: { center: [number, number], radius: number }) {
  const map = useMap();
  
  useEffect(() => {
    // Calculate bounds for the circle
    const circleBounds = L.latLng(center).toBounds(radius * 2); 
    
    // fitBounds ensures the entire bounds are visible.
    // padding: [50, 50] adds 50px padding around the bounds in the view
    map.fitBounds(circleBounds, { 
        padding: [50, 50],
        animate: true,
        duration: 0.5
    });
  }, [center, map, radius]);
  
  return null;
}

function ZoomToFit({ position, radius }: { position: [number, number], radius: number }) {
    const map = useMap();
    
    const handleZoom = () => {
        const circleBounds = L.latLng(position).toBounds(radius * 2); // approximate
        map.fitBounds(circleBounds.pad(0.5));
    };

    return (
        <button 
            onClick={handleZoom}
            className="absolute bottom-8 right-8 z-[400] bg-white p-2 rounded-lg shadow-md border border-gray-300 hover:bg-gray-50 text-gray-700"
            title="Zoom to Area"
        >
            <Maximize className="w-5 h-5" />
        </button>
    );
}

export default function MapView({ center, areaHectares, safType, scope, onCenterChange }: MapViewProps) {
  // Calculate radius in meters
  // Area (ha) * 10,000 = Area (m2)
  // Area = PI * r^2  => r = sqrt(Area / PI)
  const radiusMeters = useMemo(() => {
    const areaSqMeters = areaHectares * 10000;
    return Math.sqrt(areaSqMeters / Math.PI);
  }, [areaHectares]);

  const [position, setPosition] = useState(center);
  
  // Reset position when center prop changes (e.g. user changes city)
  useEffect(() => {
    setPosition(center);
  }, [center]);

  // Determine circle color based on SAF type
  const circleOptions = useMemo(() => ({ 
    color: safType.color, 
    fillColor: safType.color, 
    fillOpacity: 0.4,
    weight: 2
  }), [safType]);

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={11} 
        scrollWheelZoom={true} 
        className="h-full w-full"
        style={{ background: '#e5e7eb' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ScaleControl position="bottomright" />
        <MapUpdater center={center} radius={radiusMeters} />
        
        <DraggableArea 
            initialPos={position} 
            radius={radiusMeters} 
            options={circleOptions}
            label={`${areaHectares < 0.01 ? '< 0.01' : areaHectares.toFixed(2)} hectare-years`}
            onPositionChange={(newPos) => {
                setPosition(newPos);
                onCenterChange(newPos);
            }}
        />

        <ZoomToFit position={position} radius={radiusMeters} />

      </MapContainer>
    </div>
  );
}

function DraggableArea({ 
    initialPos, 
    radius, 
    options, 
    label,
    onPositionChange 
}: { 
    initialPos: [number, number], 
    radius: number, 
    options: any, 
    label: string,
    onPositionChange: (pos: [number, number]) => void
}) {
    const [pos, setPos] = useState(initialPos);
    
    // Update local state if parent updates initialPos (e.g. city change)
    useEffect(() => {
        setPos(initialPos);
    }, [initialPos]);

    const markerRef = useRef<L.Marker>(null);
    
    const eventHandlers = useMemo(
        () => ({
            drag(e: any) {
                const marker = e.target;
                if (marker) {
                    const newPos = marker.getLatLng();
                    setPos(newPos);
                    // Do NOT update parent on every frame to avoid re-render loops/artifacts
                }
            },
            dragend(e: any) {
                const marker = e.target;
                if (marker) {
                    const newPos = marker.getLatLng();
                    onPositionChange([newPos.lat, newPos.lng]);
                }
            }
        }),
        [onPositionChange],
    );

    return (
        <>
            <Circle 
                center={pos} 
                radius={radius} 
                pathOptions={options}
            />
            <Marker 
                draggable={true} 
                eventHandlers={eventHandlers} 
                position={pos} 
                ref={markerRef}
                opacity={0.9}
            >
                <Popup>
                    <div className="text-center">
                        <p className="font-bold">Production Area</p>
                        <p>{label}</p>
                        <p className="text-xs text-gray-500">Drag me to move</p>
                    </div>
                </Popup>
            </Marker>
        </>
    );
}


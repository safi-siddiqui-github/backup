"use client";

import { LayoutFileType } from "@/type/type-layout";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
  InfoWindow,
  MapProps,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import {
  ComponentProps,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import { envLib } from "./lib-env";
import { cn } from "./lib-shadcn";

const API_KEY = envLib.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

export function GoogleMapProvider({ children }: LayoutFileType) {
  return <APIProvider apiKey={API_KEY}>{children}</APIProvider>;
}

type Types = {
  children?: ReactNode;
  latLng?: google.maps.LatLng;
  latLngLiteral?: google.maps.LatLngLiteral;

  advancedMarker?: google.maps.marker.AdvancedMarkerElement;
  advancedMarkerProps?: ComponentProps<typeof AdvancedMarker> & {
    advancedMarkerLoaded?: (marker: Types["advancedMarker"]) => void;
  };

  infoWindowProps?: ComponentProps<typeof InfoWindow>;
  mapMouseEvent: google.maps.MapMouseEvent;

  place: google.maps.places.Place;
  placeOptions: google.maps.places.PlaceOptions;

  autocomplete: google.maps.places.PlaceAutocompleteElement;
  autocompleteOptions: google.maps.places.PlaceAutocompleteElementOptions;
  autocompleteSelectEvent: Event & {
    placePrediction: google.maps.places.PlacePrediction;
  };

  geocoder: google.maps.Geocoder;

  //
  // marker: google.maps.marker.AdvancedMarkerElement;
  // location: google.maps.LatLngLiteral;
  poi: {
    id: string;
    name: string;
    placeId: string;
    // key: string;
    location: Types["latLngLiteral"];
  };
  selectProps: {
    poi: Types["poi"];
    marker: Types["advancedMarker"];
  };
  registerProps: {
    id: string;
    marker: Types["advancedMarker"] | null;
  };
};

function useGetCurrentPosition() {
  const defaultPosition = useMemo(
    () => ({
      lat: 40,
      lng: -100,
    }),
    [],
  );
  // default to usa

  const [latLngLiteral, setLatLngLiteral] =
    useState<Types["latLngLiteral"]>(defaultPosition);

  const error = useRef<string | null>(null);

  useEffect(() => {
    if (!navigator?.geolocation) {
      error.current = "Geolocation not supported";
      return;
    }

    navigator?.geolocation?.getCurrentPosition(
      (position) => {
        setLatLngLiteral({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      // (err) => setError(err.message),
      (err) => (error.current = err.message),
    );
  }, []);

  return {
    latLngLiteral: latLngLiteral ?? defaultPosition,
    error,
  };
}

function useMapControl({
  position,
  create,
}: {
  position: google.maps.ControlPosition;
  create: () => HTMLElement | null;
}) {
  const map = useMap();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!map || ref.current) return;

    const el = create();
    if (!el) return;

    map.controls[position].push(el);
    ref.current = el;

    return () => {
      const controls = map.controls[position];
      const index = controls.getArray().indexOf(el);
      if (index > -1) controls.removeAt(index);
      ref.current = null;
    };
  }, [map, position, create]);
}

function useMaptFitBounds(props?: {
  markers: RefObject<Types["advancedMarker"][]>;
  triggerEffect?: number;
}) {
  const { markers, triggerEffect } = props ?? {};
  // marker is ref
  // ref.current donot trigger effects
  // effect runs when map is available
  // trigger effect when markers are added

  const map = useMap();

  useEffect(() => {
    if (!map || !markers?.current) return;
    const bounds = new google.maps.LatLngBounds();

    markers?.current.forEach((marker) => {
      if (!marker?.position) return;
      bounds?.extend(marker?.position);
    });

    map.fitBounds(bounds, 50);
  }, [map, markers, triggerEffect]);
}

// lib/pickBestGeocoderResult.ts
function pickBestGeocoderResult(
  results: google.maps.GeocoderResult[],
): google.maps.GeocoderResult | null {
  const priority = [
    "street_address",
    "premise",
    "subpremise",
    "route",
    "locality",
  ];

  for (const type of priority) {
    const found = results.find((r) => r.types.includes(type));
    if (found) return found;
  }

  return results[0] ?? null;
}

function reverseGeocodeLatLng(
  geocoder: google.maps.Geocoder,
  location: google.maps.LatLngLiteral,
): Promise<google.maps.GeocoderResult | null> {
  return new Promise((resolve, reject) => {
    geocoder.geocode({ location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results) {
        resolve(pickBestGeocoderResult(results));
      } else {
        reject(status);
      }
    });
  });
}

async function getPlaceFromGeocoderResult(
  places: google.maps.PlacesLibrary,
  geocoderResult: google.maps.GeocoderResult,
): Promise<google.maps.places.Place> {
  const place = new places.Place({
    id: geocoderResult.place_id,
  });

  await place.fetchFields({
    fields: ["displayName", "formattedAddress", "location"],
  });

  return place;
}

// Hooks

function usePlaceAutocomplete({
  options,
  onPlaceSelected,
}: {
  options?: Types["autocompleteOptions"];
  onPlaceSelected?: (e: Event) => void;
}) {
  const placesLibrary = useMapsLibrary("places");
  const autocompleteRef = useRef<Types["autocomplete"] | null>(null);
  const handlerRef = useRef<typeof onPlaceSelected | null>(null);

  /* Keep handler fresh without re-attaching listener */
  useEffect(() => {
    handlerRef.current = onPlaceSelected;
  }, [onPlaceSelected]);

  /* Create autocomplete once */
  useEffect(() => {
    if (!placesLibrary || autocompleteRef.current) return;

    const autocomplete = new google.maps.places.PlaceAutocompleteElement({
      types: ["geocode"],
      ...options,
    });

    const listener = (e: Event) => {
      handlerRef.current?.(e);
    };

    autocomplete.addEventListener("gmp-select", listener);
    autocompleteRef.current = autocomplete;

    return () => {
      autocompleteRef.current = null;
      autocomplete.removeEventListener("gmp-select", listener);
    };
  }, [placesLibrary, options]);

  return autocompleteRef;
}

function useGeocoder() {
  const ref = useRef<Types["geocoder"] | null>(null);

  useEffect(() => {
    if (ref.current) return;

    const geocoder = new google.maps.Geocoder();

    ref.current = geocoder;

    return () => {
      ref.current = null;
    };
  }, []);

  return ref;
}

// Utils

function getLatlLngLiteralLocation(
  location?: Types["latLng"] | null,
): Types["latLngLiteral"] | undefined {
  if (!location) return undefined;
  return {
    lat: location.lat(),
    lng: location.lng(),
  };
}

async function getGeocoderResultByLatLng({
  // geocoder,
  latLng,
}: {
  // geocoder?: Types["geocoder"] | null;
  latLng?: Types["latLng"] | null;
  // }): Promise<google.maps.GeocoderResult | null> {
}): Promise<google.maps.GeocoderResponse | null> {
  // if (!geocoder || !latLng) return null;
  if (!latLng) return null;

  const geocoder = new google.maps.Geocoder();

  const res = await geocoder?.geocode({
    location: latLng,
  });

  return res;

  // if(res?.plus_code){
  //   return res.plus_code
  // }

  // if (res?.results && res?.results.length !== 0) {
  //   return res.results[0];
  // }

  return null;
}

async function getPlaceById(
  options: Types["placeOptions"],
): Promise<Types["place"] | null> {
  const place = new google.maps.places.Place(options);

  if (!place) return null;

  await place.fetchFields({
    fields: ["displayName", "formattedAddress", "location"],
  });

  return place;
}

function normalizePlace(
  place?: Partial<Types["place"] | null>,
): Partial<Types["place"]> | null {
  if (!place || !place?.location) return null;

  const lat =
    typeof place.location.lat === "function"
      ? place.location.lat()
      : place.location.lat;
  const lng =
    typeof place.location.lng === "function"
      ? place.location.lng()
      : place.location.lng;

  if (!lat || !lng) return null;

  const latLng = new google.maps.LatLng(lat as number, lng as number);

  return {
    ...place,
    location: latLng,
  };
}

function MapsComponent(props?: MapProps) {
  const { children, className: mapClassName, ...inlineProps } = props ?? {};
  return (
    <GoogleMap
      defaultZoom={1}
      mapId={"map_id"}
      defaultCenter={{
        lat: 0,
        lng: 0,
      }}
      className={cn("flex-1", mapClassName)}
      // className={cn('flex-1  border border-red-500', {mapClassName})}
      // className={cn('absolute top-0 left-0 h-full w-full', {mapClassName})}
      {...inlineProps}
      // defaultCenter={{
      //   // lat: 24.886013,
      //   // lng: 67.053217,

      //   lat: -33.860664,
      //   lng: 151.208138,
      // }}
      // onCameraChanged={(ev: MapCameraChangedEvent) => {
      //   console.log(
      //     "camera changed",
      //     ev.detail.center,
      //     "zoom",
      //     ev.detail.zoom,
      //   );
      // }}

      // onClick={handleClick}

      // onDblclick={(ev) => {
      //   console.log(ev);
      // }}
    >
      {children}
    </GoogleMap>
  );
}

function AdvancedMarkerComponent(props?: Types["advancedMarkerProps"]) {
  return (
    <AdvancedMarker
      // position={{ lat: 40, lng: -100 }}
      // draggable={true}
      {...props}
    />
  );
}

function InfoWindowComponent(props?: Types["infoWindowProps"]) {
  const { children, ...propsElement } = props ?? {};
  return <InfoWindow {...propsElement}>{children}</InfoWindow>;
}

function MarkerWindowComponent({
  infoProps,
  markerProps,
}: {
  infoProps?: Types["infoWindowProps"];
  markerProps?: Types["advancedMarkerProps"];
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const { onClose } = infoProps ?? {};
  const { onClick } = markerProps ?? {};

  const handleInfoOnClose = useCallback(() => {
    onClose?.();
    setShowInfoWindow(false);
  }, [onClose]);

  const handleMarkerClick = useCallback(
    (e: Types["mapMouseEvent"]) => {
      onClick?.(e);
      setShowInfoWindow((prev) => !prev);
    },
    [onClick],
  );

  return (
    <>
      <AdvancedMarkerComponent
        ref={markerRef}
        onClick={handleMarkerClick}
        {...markerProps}
      />
      {showInfoWindow && (
        <InfoWindowComponent
          anchor={marker}
          onClose={() => handleInfoOnClose}
          {...infoProps}
        />
      )}
    </>
  );
}

// Radius in miles/km, specific
// Location COmponent Address, city/state/country

function MarkerDragComponent() {
  const map = useMap();
  const { latLngLiteral } = useGetCurrentPosition();
  const [position, setPosition] = useState<Types["latLngLiteral"] | null>(
    latLngLiteral,
  );
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  useEffect(() => {
    setPosition(latLngLiteral);
  }, [latLngLiteral]);

  useEffect(() => {
    if (!map || !position) return;
    map?.setCenter(position);
    map?.setZoom(15);
  }, [map, position]);

  const handleAdvMarkerClick = useCallback((e: Types["mapMouseEvent"]) => {
    setShowInfoWindow((prev) => !prev);
  }, []);

  const handleAdvMarkerDrag = useCallback((e: Types["mapMouseEvent"]) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (!lat || !lng) return;

    setPosition({
      lat,
      lng,
    });
  }, []);

  return (
    <>
      <AdvancedMarkerComponent
        ref={markerRef}
        position={position}
        clickable={true}
        onClick={handleAdvMarkerClick}
        draggable={true}
        onDragEnd={handleAdvMarkerDrag}
      />
      {showInfoWindow && (
        <InfoWindowComponent
          anchor={marker}
          onClose={() => setShowInfoWindow(false)}
        >
          <div>Current Location</div>
          <p>Lat: {position?.lat}</p>
          <p>Lng: {position?.lng}</p>
        </InfoWindowComponent>
      )}
    </>
  );
}

export function MapOneComponent() {
  return (
    <MapsComponent>
      {/* <CurrentPositionComponent /> */}
      {/* <CurrentPositionWithMarkerComponent /> */}
      {/* <MarkerDragComponent /> */}
      {/* <MultipleMarkersComponent pois={pois} /> */}
      {/* <PlacesTextSearchComponent /> */}
      {/* <PlacesAutocompleteComponent /> */}
      {/* <DirectionBetweenTwoPositions /> */}
    </MapsComponent>
  );
}

export function SearchPlacesMapComponent({
  value,
  onPlaceChanged,
}: {
  value?: string | null;
  onPlaceChanged?: (place: Partial<Types["place"]>) => void;
}) {
  const handlePlace = useMemo(() => {
    if (!value) return;
    return normalizePlace(JSON.parse(value));
  }, [value]);

  return (
    <MapsComponent
      disableDefaultUI={true}
      // className=""
      // props={{
      //   disableDefaultUI: true,
      // }}
    >
      <SearchPlacesComponent
        defaultValue={handlePlace}
        onPlaceChanged={onPlaceChanged}
      />
    </MapsComponent>
  );
}

function SearchPlacesComponent({
  defaultValue,
  onPlaceChanged,
}: {
  defaultValue?: Partial<Types["place"]> | null;
  onPlaceChanged?: (place: Partial<Types["place"]>) => void;
}) {
  const map = useMap();
  const [place, setPlace] = useState<Partial<Types["place"]> | null>(
    defaultValue ?? null,
  );

  const handlePlaceSelect = useCallback(async (e: Event) => {
    const placeEvent = e as Types["autocompleteSelectEvent"];
    const toPlace = placeEvent?.placePrediction?.toPlace();

    if (!toPlace || !toPlace?.id) return;

    const placeRes = await getPlaceById({
      id: toPlace?.id,
    });

    setPlace({
      id: placeRes?.id,
      displayName: placeRes?.displayName,
      location: placeRes?.location,
      formattedAddress: placeRes?.formattedAddress,
    });
  }, []);

  useEffect(() => {
    if (!place || !onPlaceChanged) return;
    onPlaceChanged(place);
  }, [onPlaceChanged, place]);

  const autocompleteRef = usePlaceAutocomplete({
    onPlaceSelected: handlePlaceSelect,
  });

  useMapControl({
    position: google.maps.ControlPosition.TOP_CENTER,
    create: () => autocompleteRef.current,
  });

  const position = useMemo(() => {
    return getLatlLngLiteralLocation(place?.location);
  }, [place?.location]);

  useEffect(() => {
    if (!map || !position) return;
    map?.panTo(position);
    map?.setZoom(17);
  }, [map, position]);

  const markersContent = useMemo(() => {
    if (!place) return null;
    return (
      <MarkerWindowComponent
        key={place?.id}
        markerProps={{
          position,
        }}
        infoProps={{
          className: "text-black",
          headerContent: (
            <strong className="text-black">{place?.displayName}</strong>
          ),
          children: (
            <>
              <p>{place?.formattedAddress}</p>
            </>
          ),
        }}
      />
    );
  }, [place, position]);

  return <>{markersContent}</>;
}

/*

// Draggable Search Marker

function SearchPlacesComponent({
  defaultValue,
  onPlaceChanged,
}: {
  defaultValue?: Partial<Types["place"]> | null;
  onPlaceChanged?: (place: Partial<Types["place"]>) => void;
}) {
  const map = useMap();
  const [place, setPlace] = useState<Partial<Types["place"]> | null>(
    defaultValue ?? null,
  );

  const handlePlaceSelect = useCallback(async (e: Event) => {
    const placeEvent = e as Types["autocompleteSelectEvent"];
    const toPlace = placeEvent?.placePrediction?.toPlace();

    if (!toPlace || !toPlace?.id) return;

    const placeRes = await getPlaceById({
      id: toPlace?.id,
    });

    console.log(placeRes);

    setPlace({
      id: placeRes?.id,
      displayName: placeRes?.displayName,
      location: placeRes?.location,
    });
  }, []);

  useEffect(() => {
    if (!place || !onPlaceChanged) return;
    onPlaceChanged(place);
  }, [onPlaceChanged, place]);

  const autocompleteRef = usePlaceAutocomplete({
    onPlaceSelected: handlePlaceSelect,
  });

  useMapControl({
    position: google.maps.ControlPosition.TOP_CENTER,
    create: () => autocompleteRef.current,
  });

  const position = useMemo(() => {
    return getLatlLngLiteralLocation(place?.location);
  }, [place?.location]);

  useEffect(() => {
    if (!map || !position) return;
    map?.panTo(position);
    map?.setZoom(17);
  }, [map, position]);

  const handleDragEnd = useCallback(async (e: Types["mapMouseEvent"]) => {
    if (!e.latLng) return;

    const geocoderRes = await getGeocoderResultByLatLng({
      latLng: e.latLng,
    });

    if (geocoderRes?.plus_code && geocoderRes?.plus_code?.compound_code) {
      setPlace({
        id: geocoderRes?.plus_code?.global_code,
        displayName: geocoderRes?.plus_code?.compound_code,
        location: e.latLng,
      });
      return;
    }

    setPlace({
      id: "unknown",
      displayName: "Unknown Location",
      location: e.latLng,
    });
  }, []);

  const markersContent = useMemo(() => {
    if (!place) return null;
    return (
      <MarkerWindowComponent
        key={place?.id}
        markerProps={{
          position,
          onDragEnd: handleDragEnd,
        }}
        infoProps={{
          headerContent: <strong>{place?.displayName}</strong>,
          children: (
            <>
              <p>Lat: {position?.lat}</p>
              <p>Lng: {position?.lng}</p>
            </>
          ),
        }}
      />
    );
  }, [handleDragEnd, place, position]);

  return <>{markersContent}</>;
}
*/

function CurrentPositionComponent() {
  const map = useMap();
  const { latLngLiteral } = useGetCurrentPosition();

  // const [zoom, setZoom] = useState(4);

  const handleMap = useCallback(() => {
    if (latLngLiteral) {
      map?.setCenter(latLngLiteral);
    }
    map?.setZoom(4);
  }, [map, latLngLiteral]);

  useEffect(() => {
    handleMap();
  }, [handleMap]);

  return null;
}

function CurrentLocationButton(): HTMLElement {
  const button = document.createElement("button");
  button.innerText = "Current Location";
  button.type = "button";
  button.className = "bg-white border text-sm font-medium p-2 mt-2.5 rounded";
  return button;
}

function CurrentPositionWithMarkerComponent() {
  const map = useMap();
  const { latLngLiteral } = useGetCurrentPosition();
  const [position, setPosition] = useState<Types["latLngLiteral"] | null>(null);
  const btnPosition = useMemo(() => google.maps.ControlPosition.TOP_CENTER, []);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMap = useCallback(() => {
    setPosition(latLngLiteral);
    map?.setCenter(latLngLiteral);
    map?.setZoom(15);
  }, [map, latLngLiteral]);

  useMapControl({
    position: btnPosition,
    create: () => {
      const btn = CurrentLocationButton();
      btn.onclick = handleMap;
      return btn;
    },
  });

  const handleAdvMarkerClick = useCallback((e: Types["mapMouseEvent"]) => {
    setShowInfoWindow((prev) => !prev);
  }, []);

  return (
    <>
      <AdvancedMarkerComponent
        ref={markerRef}
        position={position}
        clickable={true}
        onClick={handleAdvMarkerClick}
      />
      {showInfoWindow && (
        <InfoWindowComponent
          anchor={marker}
          onClose={() => setShowInfoWindow(false)}
        >
          <div>Current Location</div>
        </InfoWindowComponent>
      )}
    </>
  );
}

function AdvancedMarkerWithRefComponent(props?: Types["advancedMarkerProps"]) {
  const { advancedMarkerLoaded } = props ?? {};
  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(() => {
    if (!marker || !advancedMarkerLoaded) return;
    advancedMarkerLoaded(marker);
  }, [marker, advancedMarkerLoaded]);

  return (
    <AdvancedMarker
      ref={markerRef}
      // position={{ lat: 40, lng: -100 }}
      // draggable={true}
      {...props}
    />
  );
}

export type MultiplePlacesComponentType = {
  place?: Partial<Types["place"]>;
  places?: MultiplePlacesComponentType["place"][];
  poi?: Types["poi"];
  pois?: Types["poi"][];
};

export function MultiplePlacesComponent(creds?: MultiplePlacesComponentType) {
  const { pois } = creds ?? {};

  // getGeocoderResultByLatLng

  // useEffect(() => {
  //   async function abc() {
  //     if (!pois) return;
  //     for (const poi of pois) {
  //       if (!poi?.id) continue;
  //       console.log(poi.id);

  //       const place = await getPlaceById({
  //         id: poi.id,
  //       });

  //       console.log(place);
  //     }
  //   }
  //   abc();
  // }, [pois]);

  return (
    <MapsComponent disableDefaultUI={true}>
      <MultipleMarkersComponent pois={pois} />
    </MapsComponent>
  );
}

function MultipleMarkersComponent({ pois }: { pois?: Types["poi"][] }) {
  const map = useMap();
  const clustererRef = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<Types["advancedMarker"][]>([]);
  const [triggerEffect, setTriggerEffect] = useState(0);

  const handleMarkerLoaded = useCallback((marker: Types["advancedMarker"]) => {
    if (!clustererRef.current || !markersRef.current || !marker) return;
    markersRef.current.push(marker);
    clustererRef.current.addMarker(marker);
    setTriggerEffect((prev) => prev + 1);
  }, []);

  const poiContent = useMemo(() => {
    const content = pois?.map((poi) => (
      <AdvancedMarkerWithRefComponent
        key={poi.id}
        position={poi.location}
        advancedMarkerLoaded={handleMarkerLoaded}
      />
    ));
    return content;
  }, [handleMarkerLoaded, pois]);

  useEffect(() => {
    if (!map || clustererRef.current) return;
    clustererRef.current = new MarkerClusterer({ map, markers: [] });

    return () => {
      clustererRef.current?.clearMarkers();
      clustererRef.current = null;
      markersRef.current = [];
    };
  }, [map]);

  useMaptFitBounds({ markers: markersRef, triggerEffect });

  return <>{poiContent}</>;
}

function InputComponent() {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type here...";
  input.className = "bg-white p-2 text-base rounded mt-2.5";
  return input;
}

function MarkerWindowPlaceDetailComponent({
  place,
}: {
  place?: Types["place"];
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleAdvMarkerClick = useCallback((e: Types["mapMouseEvent"]) => {
    setShowInfoWindow((prev) => !prev);
  }, []);

  const infoHeaderContent = useMemo(() => {
    return <strong>{place?.displayName ?? "title"}</strong>;
  }, [place]);

  return (
    <>
      <AdvancedMarkerComponent
        ref={markerRef}
        position={place?.location}
        clickable={true}
        onClick={handleAdvMarkerClick}
      />
      {showInfoWindow && (
        <InfoWindowComponent
          anchor={marker}
          onClose={() => setShowInfoWindow(false)}
          headerContent={infoHeaderContent}
        >
          <div className="flex flex-col">
            {/* <p>{place?.displayName}</p> */}
            <p>{place?.formattedAddress}</p>
          </div>
        </InfoWindowComponent>
      )}
    </>
  );
}

function PlacesTextSearchComponent() {
  const map = useMap();
  const placesLibrary = useMapsLibrary("places");
  const [search, setSearch] = useState("");
  const [searchDebounced] = useDebounce(search, 1000);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [places, setPlaces] = useState<Types["place"][]>([]);

  // as create is new on every re-render
  // usecallback keeps the inputRef
  const createControl = useCallback(() => {
    return inputRef.current;
  }, []);

  useEffect(() => {
    if (inputRef.current) return;
    const input = InputComponent();
    const onInput = (e: Event) => {
      setSearch((e.target as HTMLInputElement).value);
    };

    input.addEventListener("input", onInput);

    inputRef.current = input;
    return () => {
      input.removeEventListener("input", onInput);
      inputRef.current = null;
    };
  }, []);

  useMapControl({
    position: google.maps.ControlPosition.TOP_CENTER,
    create: createControl,
  });

  useEffect(() => {
    if (!map || !placesLibrary || !searchDebounced) return;

    const handlePlaces = async () => {
      const bounds = new google.maps.LatLngBounds();

      const placesRes = await placesLibrary?.Place?.searchByText({
        textQuery: searchDebounced,
        fields: ["displayName", "location", "businessStatus"],
      });

      setPlaces(placesRes?.places);

      placesRes?.places?.forEach((place) => {
        if (place?.location) {
          bounds.extend(place?.location);
        }
      });
      map?.fitBounds(bounds);
    };

    handlePlaces();
  }, [map, placesLibrary, searchDebounced]);

  const markersContent = useMemo(() => {
    return (
      places?.map((place) => (
        <MarkerWindowPlaceDetailComponent
          key={place.id}
          place={place}
        />
      )) ?? null
    );
  }, [places]);

  return <>{markersContent}</>;
}

function PlacesAutocompleteComponent() {
  const map = useMap();
  const placesLibrary = useMapsLibrary("places");
  const autocompleteRef =
    useRef<google.maps.places.PlaceAutocompleteElement | null>(null);
  const [place, setPlace] = useState<Types["place"] | null>(null);

  useEffect(() => {
    if (!placesLibrary || !map || autocompleteRef.current) return;

    const autocomplete = new google.maps.places.PlaceAutocompleteElement({
      types: ["geocode"],
    });

    const handleSelect = async (e: Event) => {
      const placeEvent = e as Event & {
        placePrediction: google.maps.places.PlacePrediction;
      };
      const place = placeEvent?.placePrediction?.toPlace();
      const fields = await place.fetchFields({
        fields: ["displayName", "formattedAddress", "location"],
      });

      setPlace(fields?.place);

      const latLng = {
        lat: fields?.place?.location?.lat() ?? 0,
        lng: fields?.place?.location?.lng() ?? 0,
      };

      map?.panTo(latLng);
      map?.setZoom(17);

      // const latLngBounds = new google.maps.LatLngBounds(latLng);
      // map?.fitBounds(latLngBounds);
    };

    autocomplete.className = "bg-white text-black";
    autocomplete.addEventListener("gmp-select", handleSelect);
    autocompleteRef.current = autocomplete;

    return () => {
      autocomplete.removeEventListener("gmp-select", handleSelect);
      autocompleteRef.current = null;
    };
  }, [map, placesLibrary]);

  useMapControl({
    position: google.maps.ControlPosition.TOP_CENTER,
    create: () => autocompleteRef.current,
  });

  const markersContent = useMemo(() => {
    if (!place) return null;
    return (
      <MarkerWindowPlaceDetailComponent
        key={place?.id}
        place={place}
      />
    );
  }, [place]);

  return <>{markersContent}</>;
}

function getTotalDistanceKm(
  directions: google.maps.DirectionsResult | null,
): number {
  if (!directions || !directions.routes.length) return 0;

  const route = directions.routes[0];
  let totalMeters = 0;

  for (const leg of route.legs) {
    if (leg.distance?.value) {
      totalMeters += leg.distance.value;
    }
  }

  return totalMeters / 1000;
}

function DirectionBetweenTwoPositions() {
  const map = useMap();
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
    null,
  );
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null,
  );
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const [origin, setOrigin] = useState<Types["latLngLiteral"] | null>(null);
  const [destination, setDestination] = useState<Types["latLngLiteral"] | null>(
    null,
  );
  const [originPlace, setOriginPlace] = useState<Types["place"] | null>(null);
  const [destinationPlace, setDestinationPlace] = useState<
    Types["place"] | null
  >(null);
  const placesLibrary = useMapsLibrary("places");
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (
      !map ||
      directionsRendererRef.current ||
      directionsServiceRef.current ||
      geocoderRef.current
    )
      return;

    const geocoder = new google.maps.Geocoder();
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map,
      draggable: true,
      suppressMarkers: true,
    });

    geocoderRef.current = geocoder;
    directionsServiceRef.current = directionsService;
    directionsRendererRef.current = directionsRenderer;

    const listener = directionsRenderer.addListener(
      "directions_changed",
      () => {
        const directions = directionsRenderer.getDirections();
        const km = getTotalDistanceKm(directions);
        setDistance(km);
      },
    );

    (() => {
      setOrigin({ lat: 40, lng: -100 });
      setDestination({ lat: 40.5, lng: -100 });
    })();

    return () => {
      listener.remove();
      geocoderRef.current = null;
      directionsServiceRef.current = null;
      directionsRendererRef.current = null;
    };
  }, [map]);

  useEffect(() => {
    if (!origin || !destination) return;
    directionsServiceRef.current?.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRendererRef.current?.setDirections(result);
        } else {
          // console.error(status);
        }
      },
    );

    (async () => {
      if (!geocoderRef.current || !placesLibrary) return;

      const originGeocoder = await reverseGeocodeLatLng(
        geocoderRef.current,
        origin,
      );
      const destinationGeocoder = await reverseGeocodeLatLng(
        geocoderRef.current,
        destination,
      );

      if (!originGeocoder || !destinationGeocoder) return;
      const originPlace = await getPlaceFromGeocoderResult(
        placesLibrary,
        originGeocoder,
      );
      const destinationPlace = await getPlaceFromGeocoderResult(
        placesLibrary,
        destinationGeocoder,
      );

      setOriginPlace(originPlace);
      setDestinationPlace(destinationPlace);
    })();
  }, [origin, destination, placesLibrary]);

  const originDestinationMarkers = useMemo(() => {
    if (!originPlace || !destinationPlace) return null;

    return (
      <>
        <MarkerWindowPlaceDetailComponent place={originPlace} />
        <MarkerWindowPlaceDetailComponent place={destinationPlace} />
      </>
    );
  }, [originPlace, destinationPlace]);

  return (
    <>
      {originDestinationMarkers}
      <strong>Total distance: {distance} km</strong>
    </>
  );
}

/*

function PoiMarkerLayer({ pois }: { pois: Types["poi"][] }) {
  const map = useMap();

  const clusterer = useRef<MarkerClusterer | null>(null);
  const markers = useRef<Map<string, Types["advancedMarker"]>>(new Map());

  const [selectedPoi, setSelectedPoi] = useState<Types["poi"] | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<
    Types["advancedMarker"] | null
  >(null);

  useEffect(() => {
    if (!map || clusterer.current) return;
    clusterer.current = new MarkerClusterer({ map });
  }, [map]);

  const registerMarker = useCallback(
    ({ id, marker }: Types["registerProps"]) => {
      if (!clusterer.current) return;

      if (marker) {
        markers.current.set(id, marker);
        clusterer.current.addMarker(marker);
      } else {
        const existing = markers.current.get(id);
        if (existing) {
          clusterer.current.removeMarker(existing);
          markers.current.delete(id);
        }
      }
    },
    [],
  );

  const handleSelect = useCallback(({ poi, marker }: Types["selectProps"]) => {
    setSelectedPoi(poi);
    setSelectedMarker(marker);
  }, []);

  return (
    <>
      {pois?.map((poi) => (
        <PoiMarker
          key={poi.id}
          poi={poi}
          onSelect={handleSelect}
          registerMarker={registerMarker}
        />
      ))}

      <MapInfoWindow
        poi={selectedPoi}
        marker={selectedMarker}
        onClose={() => {
          setSelectedPoi(null);
          setSelectedMarker(null);
        }}
      />
    </>
  );
}

function PoiMarker({
  poi,
  onSelect,
  registerMarker,
}: {
  poi: Types["poi"];
  onSelect: (props: Types["selectProps"]) => void;
  registerMarker: (props: Types["registerProps"]) => void;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(() => {
    registerMarker({ id: poi.id, marker });
    return () => registerMarker({ id: poi.id, marker: null });
  }, [marker, poi.id, registerMarker]);

  const handleClick = useCallback(() => {
    if (marker) onSelect({ poi, marker });
  }, [marker, onSelect, poi]);

  return (
    <AdvancedMarker
      ref={markerRef}
      position={poi.location}
      onClick={handleClick}
    />
  );
}

function MapInfoWindow({
  poi,
  marker,
  onClose,
}: {
  poi: Types["poi"] | null;
  marker: Types["advancedMarker"] | null;
  onClose: () => void;
}) {
  if (!poi || !marker) return null;

  return (
    <InfoWindow
      anchor={marker}
      onClose={onClose}
    >
      <div className="space-y-1">
        <h3 className="font-semibold">{poi.id}</h3>
        <p>Lat: {poi?.location?.lat}</p>
        <p>Lng: {poi?.location?.lng}</p>
      </div>
    </InfoWindow>
  );
}

export function DistanceBetweenTwoLocationsOLD() {
  const map = useMap();
  const [origin, setOrigin] = useState<Types["latLngLiteral"] | null>(null);
  const [destination, setDestination] = useState<Types["latLngLiteral"] | null>(
    null,
  );

  const handleClick = useCallback((ev: MapMouseEvent) => {
    const coords = ev?.detail?.latLng;
    setOrigin(coords);
  }, []);

  const handleDBClick = useCallback(
    (ev: MapMouseEvent) => {
      const coords = ev?.detail?.latLng;
      if (!coords) return;
      setDestination(coords);
      map?.panTo(coords);
      setOrigin(coords);
    },
    [map],
  );

  useEffect(() => {
    if (!map || origin || !navigator?.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      map?.panTo(coords);
      setOrigin(coords);
    });
  }, [map, origin]);

  const pois: Types["poi"][] = useMemo(
    () => [
      {
        id: "Origin",
        location: origin ?? { lat: 0, lng: 0 },
      },
      {
        id: "Destination",
        location: destination ?? { lat: 0, lng: 0 },
      },
    ],
    [destination, origin],
  );

  return (
    <div className="flex h-96 flex-col">
      <GoogleMap
        defaultZoom={13}
        mapId={"map_id"}
        defaultCenter={{ lat: 0, lng: 0 }}
        onClick={handleClick}
        onDblclick={handleDBClick}
        disableDoubleClickZoom
      >
        <PoiMarkerLayer pois={pois} />
      </GoogleMap>
    </div>
  );
}
function PlaceAutocompleteInput({
  placeholder,
  onPlaceSelect,
}: {
  placeholder: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
}) {
  const places = useMapsLibrary("places");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!places || !inputRef.current || autocompleteRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ["geometry", "formatted_address", "name"],
    });

    autocompleteRef.current = autocomplete;

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onPlaceSelect(place);
    });

    return () => {
      listener.remove();
      autocompleteRef.current = null;
    };
  }, [onPlaceSelect, places]);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="w-full rounded border bg-white px-3 py-2 text-sm shadow"
      />
    </>
  );
}
function DestinationSearch() {
  const map = useMap();

  return (
    <PlaceAutocompleteInput
      placeholder="Search Destination"
      onPlaceSelect={(place) => {
        if (!place?.geometry?.location || !map) return;

        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        map.panTo(location);
      }}
    />
  );
}
type SelectedPlace = {
  id?: string;
  name?: string;
  address?: string;
  location: google.maps.LatLngLiteral;
  viewport?: google.maps.LatLngBounds;
};

function PlaceMarkerLayer({
  place,
  onClose,
}: {
  place: SelectedPlace | null;
  onClose: () => void;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  if (!place) return null;

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={place.location}
        draggable={true}
      />

      <InfoWindow
        anchor={marker}
        onClose={onClose}
      >
        <div className="space-y-1 text-sm">
          <div className="font-semibold">{place.name}</div>
          <div>{place.address}</div>
          {place.id && (
            <div className="text-xs text-gray-500">Place ID: {place.id}</div>
          )}
        </div>
      </InfoWindow>
    </>
  );
}
export function SearchMap() {
  const map = useMap();
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null,
  );

  const handlePlaceSelect = useCallback(
    (place: google.maps.places.PlaceResult) => {
      if (!place.geometry?.location || !map) return;

      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      // Match Google docs behavior
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.panTo(location);
        map.setZoom(17);
      }

      setSelectedPlace({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        location,
        viewport: place.geometry.viewport ?? undefined,
      });
    },
    [map],
  );

  return (
    <div className="flex h-96 flex-col gap-2">
      <PlaceAutocompleteInput
        placeholder="Search a place"
        onPlaceSelect={handlePlaceSelect}
      />

      <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 20, lng: 0 }}
        mapId="map_id"
      >
        <PlaceMarkerLayer
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      </GoogleMap>
    </div>
  );
}

function DirectionsLayer({
  origin,
  destination,
}: {
  origin: google.maps.LatLngLiteral | null;
  destination: google.maps.LatLngLiteral | null;
}) {
  const map = useMap();
  const directionsService = useDirectionsService();
  const directionsRenderer = useDirectionsRenderer({
    suppressMarkers: true, // we already render markers
  });

  useEffect(() => {
    if (!map || !directionsService || !directionsRenderer) return;
    if (!origin || !destination) return;

    directionsRenderer.setMap(map);

    directionsService
      .route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((res) => {
        directionsRenderer.setDirections(res);
      })
      .catch((err) => {
        console.error("Directions failed", err);
      });

    return () => {
      directionsRenderer.setMap(null);
    };
  }, [map, origin, destination, directionsService, directionsRenderer]);

  return null;
}

export function DistanceBetweenTwoLocations() {
  const map = useMap();
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral | null>(null);

  // Single click → destination
  const handleClick = useCallback((ev: MapMouseEvent) => {
    const latLng = ev.detail?.latLng;
    if (!latLng) return;

    setDestination({
      lat: latLng.lat,
      lng: latLng.lng,
    });
  }, []);

  // Double click → reset origin
  const handleDBClick = useCallback(
    (ev: MapMouseEvent) => {
      const latLng = ev.detail?.latLng;
      if (!latLng || !map) return;

      const coords = {
        lat: latLng.lat,
        lng: latLng.lng,
      };

      setOrigin(coords);
      map.panTo(coords);
    },
    [map],
  );

  // Initial origin = geolocation
  useEffect(() => {
    if (!map || origin || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setOrigin(coords);
      map.panTo(coords);
    });
  }, [map, origin]);

  const pois: Types["poi"][] = useMemo(
    () =>
      [
        origin && { id: "Origin", location: origin },
        destination && { id: "Destination", location: destination },
      ].filter(Boolean) as Types["poi"][],
    [origin, destination],
  );

  return (
    <div className="flex h-96 flex-col">
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 0, lng: 0 }}
        mapId="map_id"
        onClick={handleClick}
        onDblclick={handleDBClick}
        disableDoubleClickZoom
      >
        <PoiMarkerLayer pois={pois} />

        <DirectionsLayer
          origin={origin}
          destination={destination}
        />
      </GoogleMap>
    </div>
  );
}


*/

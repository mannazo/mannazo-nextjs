

import { GoogleMap, Autocomplete, LoadScript } from '@react-google-maps/api'
import { useCallback, useRef, useState } from 'react'
import { Library } from '@googlemaps/js-api-loader'

const containerStyle : any = {
  position: 'absolute',
  width: '70%',
  height: '60%',
  left: '15%'
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const libraries : ('places')[] = ["places"];

const MapContent:React.FC = () => {

//지도
  const autocompleteRef = useRef(null);
  const markerRef = useRef(null);

  const [map,setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((autocomplete) => {

    autocompleteRef.current = autocomplete;
  }, []);



  const onPlaceChanged = useCallback(() => {
    const autocomplete = autocompleteRef.current;

    if (autocomplete !== null) {
      const placeResult = autocomplete.getPlace();

      if (map && placeResult.geometry) {
        // 이전 마커를 제거
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        // 새로운 마커 생성
        const newMarker = new window.google.maps.Marker({
          position: placeResult.geometry.location,
          map: map,
          title: placeResult.name,
        });

        // 새로운 마커로 참조 업데이트
        markerRef.current = newMarker;

        // 지도를 검색 위치로 이동
        map.panTo(placeResult.geometry.location);
      }
    } else {
      console.log(console.error());
    }
  }, [map]);

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyBHaPCHtCW4P7oYFQBSizE2rSc1Q7AMtsM"//api 키s
        // googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      />
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          id="autocomplete"
          placeholder="장소를 검색해주세요"
        />
      </Autocomplete>


      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={{disableDefaultUI: true}}
        onLoad={(map) => setMap(map)}
      />

    </>

  )
}
export default MapContent



// import {useEffect, useRef, useState} from 'react'
//
// function GoogleMapAPI(){
//
//   const ref = useRef<HTMLDivElement>(null);
//   const [googleMap, setGoogleMap] = useState<google.maps.Map>();
//
//   useEffect(() => {
//     if (ref.current) {
//       const initialMap = new window.google.maps.Map(ref.current, {
//         center: {
//           lat: 37.5,
//           lng: 127.0,
//         },
//         zoom: 16,
//       })
//
//       setGoogleMap(initialMap);
//     }
//   }, []);
//
//   return <div ref={ref} id='map' style={{ minHeight: '100vh'}} />
// }
//
// export default GoogleMapAPI;




// import React, { useEffect, useRef } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';
//
// const MapContent: React.FC = () => {
//   const mapRef = useRef<HTMLDivElement>(null);
//
//   useEffect(() => {
//     const loader = new Loader({
//       apiKey: process.env.GOOGLE_MAPS_API_KEY,
//       version: 'weekly',
//     });
//
//     let map: google.maps.Map;
//
//     loader.load().then(() => {
//       if (mapRef.current) {
//         map = new google.maps.Map(mapRef.current, {
//           center: { lat: -34.397, lng: 150.644 },
//           zoom: 8,
//         });
//       }
//     });
//   }, []);
//
//   return <div id="map" ref={mapRef} style={{ height: '100vh', width: '100%' }} />;
// };
//
// export default MapContent;
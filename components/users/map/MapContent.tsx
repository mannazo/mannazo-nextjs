'use client'

import { GoogleMap, Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useRef, useState } from 'react'
import { Input, Card } from '@nextui-org/react'

const containerStyle = {
  width: '100%',
  height: '60vh',
} as const

const center = {
  lat: -3.745,
  lng: -38.523,
}

const libraries: 'places'[] = ['places']

const MapContent: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBHaPCHtCW4P7oYFQBSizE2rSc1Q7AMtsM', // API 키
    libraries: libraries,
  })

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback(
    (autocomplete: google.maps.places.Autocomplete) => {
      autocompleteRef.current = autocomplete
    },
    []
  )

  const onPlaceChanged = useCallback(() => {
    const autocomplete = autocompleteRef.current

    if (autocomplete !== null) {
      const placeResult = autocomplete.getPlace()

      if (map && placeResult.geometry && placeResult.geometry.location) {
        if (markerRef.current) {
          markerRef.current.setMap(null)
        }

        const newMarker = new google.maps.Marker({
          position: placeResult.geometry.location,
          map: map,
          title: placeResult.name,
        })

        markerRef.current = newMarker

        map.panTo(placeResult.geometry.location)
      }
    } else {
      console.error('Autocomplete is not loaded yet!')
    }
  }, [map])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="mx-auto max-w-4xl px-4">
      <Card className="my-4 p-4">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <Input
            type="text"
            placeholder="Let's search some places!"
            size="lg"
            className="w-full"
          />
        </Autocomplete>
      </Card>

      <Card>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          options={{ disableDefaultUI: true }}
          onLoad={(map) => setMap(map)}
        />
      </Card>
    </div>
  )
}

export default MapContent

import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '5px',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  margin: '40px auto',
};

const center = {
  lat: -2.9016942977905273,
  lng: -79.0299072265625
};

function GoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB_VtOh2ZZRFeAnOFP6M9jHfWpeM2Y0aRw"
  })


  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        disableDefaultUI={true}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
        <Marker position={center} />            
        </>
      </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMaps)
import React from "react";
import GoogleMapReact from "google-map-react";

const LocationPin = ({ text }) => (
  <div className="pin">
   <p>O</p>
  </div>
);

const Map = ({ location, zoomLevel }) => (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        style={{ width: "80%", height: "80%" }}
        bootstrapURLKeys={{ key: "AIzaSyAM-zIYfRLQXyOvoe2dYHhPKxOrMdrsvT4" }}
        center={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin lat={location.lat} lng={location.lng} />
      </GoogleMapReact>
    </div>
  </div>
);

export default Map;

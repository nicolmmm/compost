import { useEffect, useState, useMemo } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import dotenv from "dotenv";

export function GMapsSmall() {
  dotenv.config();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  function Map() {
    return <div>map</div>;
  }

  if (!isLoaded) return <div>loading...</div>;
  return <Map />;
}

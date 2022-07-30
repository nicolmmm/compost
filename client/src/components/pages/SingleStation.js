import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SEARCH_STATION_BY_ID } from "../../utils/queries";
import { Link, useParams } from "react-router-dom";

export function SingleStation() {
  const { stationId } = useParams();
  console.log("station ID is ", stationId);
  const { loading, data } = useQuery(SEARCH_STATION_BY_ID, {
    // pass URL parameter
    variables: { stationId: stationId },
  });

  const station = data?.singleStation || {};

  console.log("data is ", data);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="stationSearchData">
      <div className="stationSearchEl border" key={station._id}>
        <h3> {station.stationName}</h3>

        <p>{station.stationDescription}</p>
        <div className="station-street-address lh-base">
          <h4>{station.city}</h4>
          <h5>{station.postCode}</h5>
          <p>{station.street}</p>
          <p>{station.streetNumber}</p>
        </div>
        <div className="collection-status">
          <b>Accepting waste</b>
          {station.acceptingWaste ? <p>yes</p> : <p>no</p>}
          <b>Distributing Soil</b>
          {station.distributingSoil ? <p>yes</p> : <p>no</p>}
        </div>
        <button
          className="homepage-btn btn  btn-outline-info"
          style={{ cursor: "pointer" }}
          type="submit"
        >
          Save Station
        </button>
      </div>
    </div>
  );
}

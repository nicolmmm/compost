import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { USER_BY_ID_STATION_LISTS } from "../utils/queries";

export function ListOwnsStations({ userId }) {
  console.log("userId is", { userId });
  const { loading, data } = useQuery(USER_BY_ID_STATION_LISTS, {
    variables: { userId: userId },
  });

  const ownsStations = data?.user.ownsStations || {};
  console.log("Owns station is", ownsStations);
  return (
    <div className="saved-station-list">
      <h2>Owns Stations</h2>
      {loading ? (
        <p> No Stations saved yet</p>
      ) : (
        ownsStations.map((station) => (
          <div key={station} className="individual-saved-stations">
            <Link to={`/search/${station._id}`}>
              <h4>{station.stationName}</h4>
            </Link>
            <p>{station.stationDescription}</p>
          </div>
        ))
      )}
    </div>
  );
}

import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { USER_BY_ID_STATION_LISTS } from "../utils/queries";

export function ListOwnsStations({ userId }) {
  const { loading, data, refetch } = useQuery(USER_BY_ID_STATION_LISTS, {
    variables: { userId: userId },
  });

  useEffect(() => {
    refetch();
  }, []);

  const ownsStations = data?.user.ownsStations || {};

  return (
    <div className="saved-station-list">
      <h2>Owns Stations</h2>
      {loading ? (
        <p> Loading...</p>
      ) : (
        ownsStations.map((station) => (
          <div key={station._id} className="individual-saved-stations">
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

import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { USER_BY_ID_STATION_LISTS } from "../utils/queries";
import { RemoveSavedStationButton } from "./RemoveSavedStationButton";
import Auth from "../../src/utils/auth";

export function ListSavedStations({ userId }) {
  const { loading, data } = useQuery(USER_BY_ID_STATION_LISTS, {
    variables: { userId: userId },
  });

  const savedStations = data?.user.savedStations || {};

  const [savedStationsArr, setSavedStationsArr] = useState({});

  const setState = () =>
    savedStations ? setSavedStationsArr(savedStations) : null;

  setState();

  console.log(savedStationsArr);

  //setSavedStationsArr({ savedStations });
  /* 
  console.log(
    "savedStationsArr is",
    savedStationsArr,
    "savedStations is",
    savedStations
  ); */

  const isUsersProfile = (usedId) => {
    if (userId === Auth.getProfile().data._id) return true;
  };

  return (
    <div className="saved-station-list">
      <h2>Saved Stations</h2>
      {loading ? (
        <p> Loading...</p>
      ) : (
        savedStations.map((station) => (
          <div key={station._id} className="individual-saved-stations">
            <Link to={`/search/${station._id}`}>
              <h4>{station.stationName}</h4>
            </Link>
            <p>{station.stationDescription}</p>
            {isUsersProfile(userId) ? (
              <RemoveSavedStationButton stationId={station._id} />
            ) : null}
          </div>
        ))
      )}

      {loading ? <p>loading...</p> : null}
    </div>
  );
}

import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SEARCH_BY_POSTCODE } from "../../utils/queries";
import { Link, useParams } from "react-router-dom";

export function SearchPage() {
  const [formState, setFormState] = useState({});
  const [stationData, setStationData] = useState(null);

  const { loading, error, data, refetch } = useQuery(SEARCH_BY_POSTCODE, {
    skip: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      name: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await refetch({ postCode: Number(formState.name) });
      setStationData(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="search-page-body">
      <div className="Search-page-title-">
        <h2>Search for Stations</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Search for a post code"
            name="QueryPostCode"
            type="postCode"
            defaultValue={""}
            onChange={handleChange}
          />
        </form>
      </div>

      <div className="stationSearchData">
        {stationData &&
          stationData.data.stationByPostCode.map((station) => (
            <div className="stationSearchEl border" key={station._id}>
              <Link to={`/search/${station._id}`}>
                <h3> {station.stationName}</h3>
              </Link>

              <p>{station.stationDescription}</p>

              <div className="collection-status">
                <b>Accepting waste</b>
                {station.acceptingWaste ? <p>yes</p> : <p>no</p>}
                <b>Distributing Soil</b>
                {station.distributingSoil ? <p>yes</p> : <p>no</p>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SEARCH_BY_POSTCODE } from "../../utils/queries";

export function SearchPage(/* { userPostCodeQuery } */) {
  const [formState, setFormState] = useState({});
  const [stationData, setStationData] = useState(null);

  const { loading, error, data, refetch } = useQuery(SEARCH_BY_POSTCODE, {
    //variables: { postCode: Number(formState.name) },
    skip: true,
  });
  //const [postCodeQuery, setPostCodeQuery] = useState({});

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
      console.log(data);
      //return stationData;
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
            <div className="stationSearchEl" key={station._id}>
              <li>
                <h3> {station.stationName}</h3>
              </li>
              <li>{station.stationDescription}</li>
              <li>{station.city}</li>
              <li>{station.street}</li>
              <li>{station.streetNumber}</li>
              <li>Accepting waste</li>
              {station.acceptingWaste ? <p>yes</p> : <p>no</p>}
              <li>Distributing Soil</li>
              {station.distributingSoil ? <p>yes</p> : <p>no</p>}
            </div>
          ))}
      </div>
    </div>
  );
}

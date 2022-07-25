import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SEARCH_BY_POSTCODE } from "../../utils/queries";

export function SearchPage(/* { userPostCodeQuery } */) {
  const [formState, setFormState] = useState({});
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
      refetch({ postCode: 2204 /* Number(formState.name) */ });
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    /* const populateSearch=(data)=>{
      return (!data)? null :
      {data.map((station)=>)}
    } */
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
    </div>
  );
}

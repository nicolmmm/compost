import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { SEARCH_BY_POSTCODE } from "../../utils/queries";

export function SearchPage({ userPostCodeQuery }) {
  const [formState, setFormState] = useState({ QueryPostCode: "" });
  const { loading, error, data } = useQuery(SEARCH_BY_POSTCODE, {
    variables: { postCode: formState },
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
      await data;
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      QueryPostCode: "",
    });
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

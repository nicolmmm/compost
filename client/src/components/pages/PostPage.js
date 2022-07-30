import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CREATE_NEW_STATION } from "../../utils/mutations";
import Auth from "../../utils/auth";

export const PostPage = () => {
  const [formState, setFormState] = useState({
    stationName: "",
    stationDescription: "",
    streetNumber: "",
    street: "",
    city: "",
    postCode: "",
    acceptingWaste: false,
    distributingSoil: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //returns integer value instead of string
  const handleChangeInt = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: parseInt(value),
    });
  };

  const handleChangeCheckBox = (event) => {
    const { name, value } = event.target;
    if (event.target.value === "false") {
      setFormState({
        ...formState,
        [name]: true,
      });
    } else {
      setFormState({
        ...formState,
        [name]: false,
      });
    }
  };

  const [addStation /* { error, data } */] = useMutation(CREATE_NEW_STATION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      /* const { data } =  */ await addStation(
        {
          variables: { ...formState },
        }
        // Auth.getToken(data.token)
        //console.log("data is ", data)
      );
    } catch (e) {
      console.log({ ...formState });
      console.error("woops!", e);
    }
  };

  return (
    <div className="post-page-body mx-auto">
      <h2>Post a recycling station</h2>
      <div className="post-page-input-fields mx-auto">
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input col-6 p-2 d-flex"
            placeholder="Station Name"
            name="stationName"
            type="stationName"
            value={formState.stationName}
            onChange={handleChange}
          />
          <input
            className="form-input col-6 p-4 d-flex"
            placeholder="station Description"
            name="stationDescription"
            type="stationDescription"
            value={formState.stationDescription}
            onChange={handleChange}
          />
          <input
            className="form-input col-6 d-flex"
            placeholder="street Number"
            name="streetNumber"
            type="streetNumber"
            value={formState.streetNumber}
            onChange={handleChange}
          />
          <input
            className="form-input col-6 d-flex"
            placeholder="Street Name"
            name="street"
            type="street"
            value={formState.street}
            onChange={handleChange}
          />
          <input
            className="form-input col-6 d-flex"
            placeholder="City"
            name="city"
            type="city"
            value={formState.city}
            onChange={handleChange}
          />
          <input
            className="form-input col-6 d-flex"
            placeholder="Post code"
            name="postCode"
            type="postCode"
            value={formState.postCode}
            onChange={handleChangeInt}
          />
          <div className="radio">
            <label>
              <input
                name="acceptingWaste"
                type="checkbox"
                value={formState.acceptingWaste}
                onChange={handleChangeCheckBox}
              />
              Accepting Waste
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                name="distributingSoil"
                type="checkbox"
                value={formState.distributingSoil}
                onChange={handleChangeCheckBox}
              />
              Distributing Soil
            </label>
          </div>
          <input type="submit" hidden />
        </form>
      </div>
    </div>
  );
};

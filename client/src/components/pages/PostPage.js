import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CREATE_NEW_STATION } from "../../utils/queries";

const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
    /*  const data = await refetch({ postCode: Number(formState.name) });
    setStationData(data); */
    console.log(":)");
  } catch (e) {
    console.error(e);
  }
};

const handleChange = (event) => {
  const { name, value } = event.target;
  /*  setFormState({
    name: value,
  }); */
};

export function PostPage() {
  return (
    <div className="post-page-body  mx-auto">
      <h2>Post a recycling station</h2>
      <div className="post-page-input-fields mx-auto">
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input col-6 p-2 d-flex"
            placeholder="Station Name"
            name="stationName"
            type="stationName"
            defaultValue={""}
            onChange={handleChange}
          />
          <input
            className="form-input col-6 p-4 d-flex"
            placeholder="station Description"
            name="stationDescription"
            type="stationDescription"
            defaultValue={""}
            onChange={handleChange}
          />
          <input
            className="form-input col-6 d-flex"
            placeholder="street Number"
            name="streetNumber"
            type="streetNumber"
            defaultValue={""}
            onChange={handleChange}
          />
          <input
            className="form-input col-6 d-flex"
            placeholder="Street Name"
            name="street"
            type="street"
            defaultValue={""}
            onChange={handleChange}
          />
          <input
            className="form-input col-6 d-flex"
            placeholder="City"
            name="city"
            type="city"
            defaultValue={""}
            onChange={handleChange}
          />
          <input
            className="form-input col-6 d-flex"
            placeholder="Post code"
            name="postCode"
            type="postCode"
            defaultValue={""}
            onChange={handleChange}
          />
          <div className="radio">
            <label>
              <input type="radio" defaultChecked={false} />
              Accepting Waste
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" defaultChecked={false} />
              Distributing Soil
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

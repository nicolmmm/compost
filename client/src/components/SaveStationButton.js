import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SAVE_STATION } from "../utils/mutations";

export function SaveStationButton({ stationId }) {
  const [saveStation, { loading, data }] = useMutation(SAVE_STATION);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const saveStationRes = await saveStation({
        variables: { stationId },
      });
      console.log(saveStationRes);
      return saveStationRes;
    } catch (e) {
      console.error("whoops!", e);
    }
  };

  return (
    <button
      className="homepage-btn btn  btn-outline-info"
      style={{ cursor: "pointer" }}
      type="button"
      onClick={handleSave}
    >
      Save Station
    </button>
  );
}

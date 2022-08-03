import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { INCREMENT_THUMBS_DOWN, INCREMENT_THUMBS_UP } from "../utils/mutations";

export function ThumbsComponent({ thumbsUp, thumbsDown, userId }) {
  const [thumbsUpstate, setThumbsUpstate] = useState(thumbsUp);
  const [thumbsDownstate, setThumbsDownstate] = useState(thumbsDown);

  const [thumbUp] = useMutation(INCREMENT_THUMBS_UP);
  const [thumbDown] = useMutation(INCREMENT_THUMBS_DOWN);

  const handleThumbUp = async (event) => {
    event.preventDefault();
    try {
      const thumbUpReturn = await thumbUp({
        variables: { userId },
      });
      setThumbsUpstate(thumbUpReturn.data.incrementThumbsUp.thumbsUp);
    } catch (e) {
      console.error("whoops!", e);
    }
  };

  const handleThumbDown = async (event) => {
    event.preventDefault();
    try {
      const thumbDownReturn = await thumbDown({
        variables: { userId },
      });
      setThumbsDownstate(thumbDownReturn.data.incrementThumbsDown.thumbsDown);
    } catch (e) {
      console.error("whoops!", e);
    }
  };

  return (
    <div className="thumbs-component">
      <b>Rating</b>
      <p>
        {thumbsUpstate === 0 && thumbsDownstate === 0
          ? "No rating yet"
          : `${thumbsUpstate} Thumbs Up, ${thumbsDownstate} Thumbs Down`}
      </p>
      <div className="thumbs-component-buttons">
        <button
          className="homepage-btn btn  btn-outline-info"
          style={{ cursor: "pointer" }}
          type="button"
          onClick={handleThumbUp}
        >
          Thumb Up
        </button>
        <button
          className="homepage-btn btn  btn-outline-info"
          style={{ cursor: "pointer" }}
          type="button"
          onClick={handleThumbDown}
        >
          Thumb Down
        </button>
      </div>
    </div>
  );
}

{
  /* `${thumbsUpstate * Math.abs(thumbsDownState) * -1} of ${
              thumbsUp + thumbsDown
            } votes.`} */
}

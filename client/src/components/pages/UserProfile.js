import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { USER_BY_ID_PROFILE } from "../../utils/queries";
import { Link, useParams } from "react-router-dom";
import { ListSavedStations } from "../ListSavedStations";
import { ThumbsComponent } from "../ThumbsComponent";
import { ListOwnsStations } from "../ListOwnsStations";

export function UserProfile() {
  const { userId } = useParams();

  const { loading, data } = useQuery(USER_BY_ID_PROFILE, {
    variables: { userId: userId },
  });

  const user = data?.user || {};

  console.log(userId);

  return (
    <div key={user._id} className="user-profile-container">
      <div className="user-sidebar-profile border">
        <h2>{user.userName}</h2>
        <ThumbsComponent
          thumbsDown={user.thumbsDown}
          thumbsUp={user.thumbsUp}
          userId={user._id}
        />
        <b>Phone Number:</b>
        <p>{user.phoneNumber}</p>
      </div>
      <div className="saved-stations-container">
        <div className="saved-stations-user-profile border">
          <span>{data && <ListSavedStations userId={user._id} />}</span>
          {loading ? <p>loading...</p> : null}
        </div>
        <div className="saved-stations-user-profile border">
          <span>{data && <ListOwnsStations userId={user._id} />}</span>
          {loading ? <p>loading...</p> : null}
        </div>
      </div>
    </div>
  );
}

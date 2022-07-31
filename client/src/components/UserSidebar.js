import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { USER_BY_ID } from "../utils/queries";
import { Link, useParams } from "react-router-dom";

//get user associated with station
export function UserSidebar({ userId }) {
  const { userLoading, data } = useQuery(USER_BY_ID, {
    // pass URL parameter
    variables: { userId: userId },
  });

  const user = data?.user || {};

  return (
    <div className="user-sidebar-body border">
      <h6>Station by</h6>
      <Link to={`/profile/${user._id}`}>
        <h4>{user.userName}</h4>
      </Link>
      <b>Rating</b>
      <h5>
        {user.thumbsUp === 0 && user.thumbsDown === 0
          ? "No rating yet"
          : "this rating"}
      </h5>
      <b>Phone Number:</b>
      <p>{user.phoneNumber}</p>
    </div>
  );
}

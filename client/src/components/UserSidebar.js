import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { USER_BY_ID } from "../utils/queries";
import { Link, useParams } from "react-router-dom";
import { ThumbsComponent } from "../components/ThumbsComponent";

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
      <ThumbsComponent
        thumbsDown={user.thumbsDown}
        thumbsUp={user.thumbsUp}
        userId={user._id}
      />
      <b>Phone Number:</b>
      <p>{user.phoneNumber}</p>
    </div>
  );
}

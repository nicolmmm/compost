import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { USER_BY_ID } from "../../utils/queries";
import { Link, useParams } from "react-router-dom";

export function UserProfile(/* { userId } */) {
  const { userId } = useParams();
  console.log("useId is ", userId);

  const { userLoading, data } = useQuery(USER_BY_ID, {
    // pass URL parameter
    variables: { userId: userId },
  });

  console.log("data is ", userId, "data is ", data);

  const user = data?.user || {};

  console.log("data is ", data);

  return (
    <div className="user-profile border">
      <h2>{user.userName}</h2>

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

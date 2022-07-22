import React from "react";

export const ListUsers = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div>
          <h3> {user.userName}</h3>
          {<p>Phone Number: {user.phoneNumber}</p>}
        </div>
      ))}
    </div>
  );
};

/* 
import { ListUsers } from "./UserList";
import { QUERY_ALL_USERS } from "../utils/queries";
import { useQuery } from "@apollo/client";

  const { data } = useQuery(QUERY_ALL_USERS);
  const userList = data?.users || [];

       <ListUsers users={userList} />

*/

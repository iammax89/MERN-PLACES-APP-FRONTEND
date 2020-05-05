import React from "react";
import { UsersList } from "../components/UsersList/UsersList";
import { IUser } from "../../interfaces/user.interface";

export const Users: React.FC = () => {
  const USERS: IUser[] = [
    {
      id: "u1",
      name: "Muhammad Ali",
      image:
        "https://inspirationfeed.com/wp-content/uploads/2019/07/Muhammad-Ali-Quotes.jpeg",
      places: 23,
    },
  ];
  return <UsersList items={USERS} />;
};

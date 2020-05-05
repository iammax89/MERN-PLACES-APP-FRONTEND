import React from "react";
import "./UsersList.scss";
import { UserItem } from "../UserItem/UserItem";
import { IUser } from "../../../interfaces/user.interface";
import Card from "../../../common/components/UIElements/Card/Card";

interface UsersListProps {
  items: IUser[];
}
export const UsersList: React.FC<UsersListProps> = ({ items }) => {
  const users = items.map((user: IUser) => (
    <UserItem
      key={user.id}
      id={user.id}
      image={user.image}
      name={user.name}
      placesCount={user.places}
    />
  ));
  if (!items.length) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }
  return <ul className="users-list">{users}</ul>;
};

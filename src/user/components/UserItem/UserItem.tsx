import React from "react";
import "./UserItem.scss";
import Avatar from "../../../common/components/UIElements/Avatar/Avatar";
import { Link } from "react-router-dom";
import Card from "../../../common/components/UIElements/Card/Card";

interface UserItemProps {
  id: string;
  image: any;
  name: string;
  placesCount?: number;
}
export const UserItem: React.FC<UserItemProps> = ({
  id,
  image,
  name,
  placesCount,
}) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placesCount} {placesCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

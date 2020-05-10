import React, { useEffect, useState, Fragment } from "react";
import { UsersList } from "../components/UsersList/UsersList";
import { IUser } from "../../interfaces/user.interface";
import { map } from "rxjs/operators";
import ErrorModal from "../../common/components/UIElements/ErrorModal/ErrorModal";
import Spinner from "../../common/components/UIElements/Spinner/Spinner";
import { useHttpClient } from "../../common/hooks/http-hook";
import { EMPTY } from "rxjs";

export const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { isLoading, error, sendRequest$, clearError } = useHttpClient();
  useEffect(() => {
    sendRequest$("http://localhost:5000/api/users", "GET")
      .pipe(map((data) => data.response["users"]))
      .subscribe(
        (users: IUser[]) => setUsers(users),
        () => EMPTY
      );
  }, [sendRequest$]);
  return (
    <Fragment>
      {<ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <div className="center">
          <Spinner asOverlay />
        </div>
      )}
      {users.length && <UsersList items={users} />} ;
    </Fragment>
  );
};

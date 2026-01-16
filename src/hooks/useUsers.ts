import { useContext } from "react";
import UsersContext from "../providers/UsersProvider";

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  const { users, loading, error } = context;

  return { users, loading, error };
};

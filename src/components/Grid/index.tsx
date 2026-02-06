import { useCallback, useMemo, useState } from "react";
import { filterUsers, searchUsers, type User } from "../../data/users";
import { useFetch } from "../../hooks/useFetch";
import { useFilters } from "../../hooks/useFilters";
import Button from "../Button";
import Card from "../Card";
import { Pagination } from "../Pagination";
import classes from "./styles.module.css";

const ITEMS_PER_PAGE = 8;

const Grid = () => {
  const { search, role, setSearch, setRoleFilter } = useFilters();

  const fetchFn = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      return await searchUsers(search, { signal });
    },
    [search],
  );

  const { data: users, loading, error, update } = useFetch<User[]>(fetchFn);

  const resetFilters = () => {
    setSearch(null);
    setRoleFilter(null);
  };

  const filteredUsers = useMemo(() => filterUsers(users ?? [], role), [users, role]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  if (loading) {
    return <p className={classes.message}>Loading users...</p>;
  }

  if (error) {
    return (
      <div className={classes.message}>
        <p>Error loading users: {error.message}</p>
        <Button label="Retry" className={classes.button} onClick={update} />
      </div>
    );
  }

  if (search?.length && !filteredUsers.length) {
    return (
      <div className={classes.message}>
        <p>
          No users found for "{search}" {role && `with role "${role}"`}
        </p>
        <Button label="Clear filters" className={classes.button} onClick={resetFilters} />
      </div>
    );
  }

  return (
    <div className={classes.gridContainer}>
      <div className={classes.grid}>
        {paginatedUsers.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
      {!!paginatedUsers.length && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default Grid;

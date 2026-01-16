import { describe, expect, it } from "vitest";
import { filterUsers, type User } from "./users";

const mockUsers = [
  { id: 1, name: "Alice Johnson", role: "ADMIN" },
  { id: 2, name: "Bob Smith", role: "EDITOR" },
  { id: 3, name: "Charlie Brown", role: "VIEWER" },
  { id: 4, name: "David Wilson", role: "EDITOR" },
] as User[];

describe("users data", () => {
  it("filters users by role", () => {
    const result = filterUsers(mockUsers, "EDITOR");
    expect(result).toEqual([
      { id: 2, name: "Bob Smith", role: "EDITOR" },
      { id: 4, name: "David Wilson", role: "EDITOR" },
    ]);
  });

  it("filters users by search term and role", () => {
    const result = filterUsers(mockUsers, "EDITOR");
    expect(result).toEqual([
      { id: 2, name: "Bob Smith", role: "EDITOR" },
      { id: 4, name: "David Wilson", role: "EDITOR" },
    ]);
  });

  it("returns all users when no filters are applied", () => {
    const result = filterUsers(mockUsers, null);
    expect(result).toEqual(mockUsers);
  });

  it("returns an empty array when no users match the filters", () => {
    const result = filterUsers(mockUsers, "GUEST");
    expect(result).toEqual([]);
  });
});

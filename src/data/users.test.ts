import { describe, expect, it, vi } from "vitest";
import { filterUsers, searchUsers, type User } from "./users";

vi.mock("./mockedUsers", () => ({
  allUsers: mockUsers,
}));

const mockUsers = vi.hoisted(() => [
  { id: 1, name: "Alice Johnson", role: "ADMIN" },
  { id: 2, name: "Bob Smith", role: "EDITOR" },
  { id: 3, name: "Charlie Brown", role: "VIEWER" },
  { id: 4, name: "David Wilson", role: "EDITOR" },
]) as User[];

describe("users - filterUsers", () => {
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

describe("users - searchUsers", () => {
  it("returns users matching the search term", async () => {
    const result = await searchUsers("Alice", { forceFail: false });

    expect(result).toEqual([
      expect.objectContaining({
        id: 1,
        name: "Alice Johnson",
      }),
    ]);

    const resultMulti = await searchUsers("a", { forceFail: false });
    expect(resultMulti).toEqual([
      expect.objectContaining({ id: 1, name: "Alice Johnson" }),
      expect.objectContaining({ id: 3, name: "Charlie Brown" }),
      expect.objectContaining({ id: 4, name: "David Wilson" }),
    ]);
  });

  it("returns an empty array when no users match the search term", async () => {
    const result = await searchUsers("Zachary", { forceFail: false });

    expect(result).toEqual([]);
  });

  it("returns an empty array when search term is null", async () => {
    const result = await searchUsers(null);

    expect(result).toEqual([]);
  });

  it("throws an error when the fetch fails", async () => {
    await expect(searchUsers("Alice", { forceFail: true })).rejects.toThrow(
      "Failed to fetch users",
    );
  });
});

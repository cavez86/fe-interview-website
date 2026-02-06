import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { User } from "../../data/users";
import { useFetch } from "../../hooks/useFetch";
import { useFilters } from "../../hooks/useFilters";
import { useModal } from "../../hooks/useModal";
import Grid from ".";

vi.mock("../../hooks/useFilters");
vi.mock("../../hooks/useFetch");
vi.mock("../../hooks/useModal");

describe("Grid component", () => {
  vi.mocked(useModal).mockReturnValue({
    user: null,
    openModal: vi.fn(),
    closeModal: vi.fn(),
  });

  it("should render the grid with filtered users", () => {
    vi.mocked(useFilters).mockReturnValue({
      search: null,
      setSearch: vi.fn(),
      role: null,
      setRoleFilter: vi.fn(),
    });
    vi.mocked(useFetch).mockReturnValue({
      data: [
        { id: 1, name: "User One", role: "ADMIN" },
        { id: 2, name: "User Two", role: "EDITOR" },
      ] as User[],
      loading: false,
      error: null,
      update: vi.fn(),
    });

    const { getByText } = render(<Grid />);
    expect(getByText("User One")).toBeInTheDocument();
    expect(getByText("User Two")).toBeInTheDocument();
  });

  it("should render no results message when no users match the search", () => {
    const setSearchMock = vi.fn();
    const setRoleFilterMock = vi.fn();
    vi.mocked(useFilters).mockReturnValue({
      search: "Nonexistent User",
      setSearch: setSearchMock,
      role: "ADMIN",
      setRoleFilter: setRoleFilterMock,
    });
    vi.mocked(useFetch).mockReturnValue({
      data: [],
      loading: false,
      error: null,
      update: vi.fn(),
    });

    const { getByText } = render(<Grid />);
    const noResultsMessage = getByText(/No users/);
    expect(noResultsMessage).toBeInTheDocument();
    expect(noResultsMessage).toHaveTextContent("Nonexistent User");
    expect(noResultsMessage).toHaveTextContent("ADMIN");
  });

  it("should call resetFilters when Clear filters button is clicked", () => {
    const setSearchMock = vi.fn();
    const setRoleFilterMock = vi.fn();
    vi.mocked(useFilters).mockReturnValue({
      search: "Nonexistent User",
      setSearch: setSearchMock,
      role: "ADMIN",
      setRoleFilter: setRoleFilterMock,
    });
    vi.mocked(useFetch).mockReturnValue({
      data: [],
      loading: false,
      error: null,
      update: vi.fn(),
    });

    const { getByRole } = render(<Grid />);
    const clearFiltersButton = getByRole("button", { name: "Clear filters" });
    clearFiltersButton.click();
    expect(setSearchMock).toHaveBeenCalledWith(null);
    expect(setRoleFilterMock).toHaveBeenCalledWith(null);
  });

  it("should render loading message when users are being fetched", () => {
    vi.mocked(useFilters).mockReturnValue({
      search: null,
      setSearch: vi.fn(),
      role: null,
      setRoleFilter: vi.fn(),
    });
    vi.mocked(useFetch).mockReturnValue({
      data: [],
      loading: true,
      error: null,
      update: vi.fn(),
    });

    const { getByText } = render(<Grid />);
    expect(getByText("Loading users...")).toBeInTheDocument();
  });

  it("should render error message when there is an error fetching users", () => {
    const setSearchMock = vi.fn();
    const setRoleFilterMock = vi.fn();
    vi.mocked(useFilters).mockReturnValue({
      search: null,
      setSearch: setSearchMock,
      role: null,
      setRoleFilter: setRoleFilterMock,
    });
    vi.mocked(useFetch).mockReturnValue({
      data: [],
      loading: false,
      error: new Error("Failed to fetch"),
      update: vi.fn(),
    });

    const { getByText, getByRole } = render(<Grid />);
    expect(getByText("Error loading users: Failed to fetch")).toBeInTheDocument();

    const retryButton = getByRole("button", { name: "Retry" });
    retryButton.click();
    expect(setSearchMock).toHaveBeenCalledWith(null);
    expect(setRoleFilterMock).toHaveBeenCalledWith(null);
  });
});

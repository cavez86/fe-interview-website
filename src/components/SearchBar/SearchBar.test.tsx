import { act, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useFilters } from "../../hooks/useFilters";
import SearchBar from ".";

vi.mock("../../hooks/useFilters");

describe("SearchBar component", () => {
  it("should render the search bar with default value", () => {
    vi.mocked(useFilters).mockReturnValue({
      search: "test",
      setSearch: vi.fn(),
      role: null,
      setRoleFilter: vi.fn(),
    });
    const { getByTestId } = render(<SearchBar />);
    const input = getByTestId("search-input") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("test");
  });

  it("should call setSearch on form submission", () => {
    const setSearchMock = vi.fn();
    vi.mocked(useFilters).mockReturnValue({
      search: "",
      setSearch: setSearchMock,
      role: null,
      setRoleFilter: vi.fn(),
    });
    const { getByRole, getByTestId } = render(<SearchBar />);
    const input = getByTestId("search-input") as HTMLInputElement;
    input.value = "new search";

    const button = getByRole("button", { name: /search/i });
    act(() => {
      button.click();
    });

    expect(setSearchMock).toHaveBeenCalledWith("new search");
  });

  it("should update input value on change", () => {
    vi.mocked(useFilters).mockReturnValue({
      search: "",
      setSearch: vi.fn(),
      role: null,
      setRoleFilter: vi.fn(),
    });
    const { getByTestId } = render(<SearchBar />);
    const input = getByTestId("search-input") as HTMLInputElement;
    act(() => {
      input.value = "updated value";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });

    expect(input.value).toBe("updated value");
  });

  it("should reflect external search changes", () => {
    vi.mocked(useFilters).mockReturnValue({
      search: "initial",
      setSearch: vi.fn(),
      role: null,
      setRoleFilter: vi.fn(),
    });
    const { getByTestId, rerender } = render(<SearchBar />);
    const input = getByTestId("search-input") as HTMLInputElement;

    expect(input.value).toBe("initial");

    vi.mocked(useFilters).mockReturnValue({
      search: "updated",
      setSearch: vi.fn(),
      role: null,
      setRoleFilter: vi.fn(),
    });

    act(() => {
      rerender(<SearchBar />);
    });

    expect(input.value).toBe("updated");
  });
});

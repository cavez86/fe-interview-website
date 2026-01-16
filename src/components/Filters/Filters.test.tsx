import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useFilters } from '../../hooks/useFilters';
import Filters from '.';

vi.mock('../../hooks/useFilters');

describe('Filters component', () => {
  it('should render null when no search term is provided', () => {
    vi.mocked(useFilters).mockReturnValue({
      search: '',
      setSearch: vi.fn(),
      role: null,
      setRoleFilter: vi.fn(),
    });
    const { container } = render(<Filters />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render filter badges when a search term is provided', () => {
    vi.mocked(useFilters).mockReturnValue({
      search: 'test',
      setSearch: vi.fn(),
      role: 'ADMIN',
      setRoleFilter: vi.fn(),
    });
    const { getByText } = render(<Filters />);
    expect(getByText('Filter by:')).toBeInTheDocument();
    expect(getByText('ADMIN')).toBeInTheDocument();
    expect(getByText('EDITOR')).toBeInTheDocument();
    expect(getByText('VIEWER')).toBeInTheDocument();
  });

  it('should call setRoleFilter with correct values when badges are clicked', () => {
    const setRoleFilterMock = vi.fn();
    vi.mocked(useFilters).mockReturnValue({
      search: 'test',
      setSearch: vi.fn(),
      role: 'ADMIN',
      setRoleFilter: setRoleFilterMock,
    });
    const { getByText } = render(<Filters />);
    const adminBadge = getByText('ADMIN');
    const editorBadge = getByText('EDITOR');

    act(() => {
      adminBadge.click();
    });
    expect(setRoleFilterMock).toHaveBeenCalledWith(null);

    act(() => {
      editorBadge.click();
    });
    expect(setRoleFilterMock).toHaveBeenCalledWith('EDITOR');
  });
});

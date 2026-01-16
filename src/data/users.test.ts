import { describe, expect, it } from 'vitest';
import { filterUsers, type User } from './users';

const mockUsers = [
  { id: 1, name: 'Alice Johnson', role: 'ADMIN' },
  { id: 2, name: 'Bob Smith', role: 'EDITOR' },
  { id: 3, name: 'Charlie Brown', role: 'VIEWER' },
  { id: 4, name: 'David Wilson', role: 'EDITOR' },
] as User[];

describe('users data', () => {
  it('filters users by search term', () => {
    const result = filterUsers(mockUsers, 'Alice', null);
    expect(result).toEqual([{ id: 1, name: 'Alice Johnson', role: 'ADMIN' }]);
  });

  it('filters users by role', () => {
    const result = filterUsers(mockUsers, 'i', 'EDITOR');
    expect(result).toEqual([
      { id: 2, name: 'Bob Smith', role: 'EDITOR' },
      { id: 4, name: 'David Wilson', role: 'EDITOR' },
    ]);
  });

  it('filters users by search term and role', () => {
    const result = filterUsers(mockUsers, 'David', 'EDITOR');
    expect(result).toEqual([{ id: 4, name: 'David Wilson', role: 'EDITOR' }]);
  });

  it('returns an empty array when no search term is provided', () => {
    const result = filterUsers(mockUsers, null, null);
    expect(result).toEqual([]);
  });

  it('returns an empty array when no users match the filters', () => {
    const result = filterUsers(mockUsers, 'Zoe', 'ADMIN');
    expect(result).toEqual([]);
  });
});

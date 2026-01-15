export const ROLES = ['ADMIN', 'EDITOR', 'VIEWER', 'GUEST', 'OWNER', 'INACTIVE'] as const;
export type Role = (typeof ROLES)[number];

export type Role = "USER" | "MODERATOR" | "ADMIN";

export const Roles = {
  USER: "USER" as Role,
  MODERATOR: "MODERATOR" as Role,
  ADMIN: "ADMIN" as Role,
} as const;

export function isAdmin(role: Role | undefined): boolean {
  return role === Roles.ADMIN;
}

export function isModerator(role: Role | undefined): boolean {
  return role === Roles.MODERATOR || role === Roles.ADMIN;
}

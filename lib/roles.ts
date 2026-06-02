export type Role = "USER" | "ADMIN";

export const Roles = {
  USER: "USER" as Role,
  ADMIN: "ADMIN" as Role,
} as const;

export function isAdmin(role: Role | undefined): boolean {
  return role === Roles.ADMIN;
}

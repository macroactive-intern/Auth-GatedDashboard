import type { Role } from "@/lib/roles";

export const roles = ["USER", "MODERATOR", "ADMIN"] as const;

const roleRank: Record<Role, number> = {
  USER: 0,
  MODERATOR: 1,
  ADMIN: 2,
};

export function hasRole(userRole: Role | undefined, requiredRole: Role): boolean {
  if (!userRole) return false;
  return roleRank[userRole] >= roleRank[requiredRole];
}

export function isAdmin(role: Role | undefined): boolean {
  return role === "ADMIN";
}

export function canAccessAdmin(role: Role | undefined): boolean {
  return role === "ADMIN";
}

export function canManageUsers(role: Role | undefined): boolean {
  return role === "ADMIN";
}

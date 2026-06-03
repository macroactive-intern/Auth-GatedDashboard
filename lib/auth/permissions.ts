import type { Role } from "@/lib/roles";
import { isAdmin } from "@/lib/roles";

export function canAccessAdmin(role: Role | undefined): boolean {
  return isAdmin(role);
}

export function canManageUsers(role: Role | undefined): boolean {
  return isAdmin(role);
}

export function canViewDashboard(role: Role | undefined): boolean {
  return role !== undefined;
}

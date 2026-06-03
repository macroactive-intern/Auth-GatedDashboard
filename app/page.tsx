// This file conflicts with app/(public)/page.tsx — both resolve to /.
// Delete this file after confirming app/(public)/page.tsx is working.
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/login");
}

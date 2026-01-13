import { jwtDecode } from "jwt-decode";

export function getAdminRedirectPath() {
  const token = localStorage.getItem("adminToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    // optional: check expiration
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.clear();
      return null;
    }

    if (decoded.role === "registration-admin") return "/admin";
    if (decoded.role === "giving-admin") return "/admin/giving-dashboard";
    if (decoded.role === "outreach-admin") return "/admin/community-map";

    return null;
  } catch {
    localStorage.clear();
    return null;
  }
}

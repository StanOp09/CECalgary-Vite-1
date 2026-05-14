const BASE = () => import.meta.env.VITE_BACKEND_URL;

const json = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

// ── Public ──────────────────────────────────────────────────────────────────

export const createCheckoutSession = (payload) =>
  fetch(`${BASE()}/create-checkout-session`, json("POST", payload));

export const createPortalSession = (email) =>
  fetch(`${BASE()}/create-portal-session`, json("POST", { email }));

export const submitRegistration = (formData, signal) =>
  fetch(`${BASE()}/register`, { ...json("POST", formData), signal });

export const pingHealth = (signal) =>
  fetch(`${BASE()}/health`, { signal });

// ── Admin ────────────────────────────────────────────────────────────────────

export const adminLogin = (email, password) =>
  fetch(`${BASE()}/admin/login`, json("POST", { email, password }));

export const getAdminDashboard = (token) =>
  fetch(`${BASE()}/admin/dashboard`, { headers: authHeaders(token) });

export const getRegistrations = (token, { limit = 50, skip = 0, search = "" } = {}) => {
  const params = new URLSearchParams({ limit, skip });
  if (search) params.set("search", search);
  return fetch(`${BASE()}/admin/registrations?${params}`, { headers: authHeaders(token) });
};

export const downloadRegistrationsCsv = (token) =>
  fetch(`${BASE()}/admin/registrations.csv`, { headers: authHeaders(token) });

export const getGivingDashboard = (token, params) =>
  fetch(`${BASE()}/admin/giving-dashboard?${params}`, { headers: authHeaders(token) });

export const getDonationsStreamUrl = (token) =>
  `${BASE()}/admin/recent-donations/stream?token=${token}`;

export const getCommunities = (token) =>
  fetch(`${BASE()}/admin/communities`, { headers: authHeaders(token) });

export const getCommunityAssignments = (token) =>
  fetch(`${BASE()}/admin/community-assignments`, { headers: authHeaders(token) });

export const upsertCommunityAssignment = (token, communityId, body) =>
  fetch(`${BASE()}/admin/community-assignments/${communityId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify(body),
  });

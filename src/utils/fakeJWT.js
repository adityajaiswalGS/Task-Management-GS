// Generate fake JWT (base64 encoded payload)
export const generateFakeToken = (username) => {
  const payload = {
    username,
    iat: Date.now(),
    exp: Date.now() + 60 * 60 * 1000, // 1 hour expiry
  };
  return btoa(JSON.stringify(payload)); // Simple base64 "token"
};

// Validate token
export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token));
    return payload.exp > Date.now();
  } catch (error) {
    return false;
  }
};
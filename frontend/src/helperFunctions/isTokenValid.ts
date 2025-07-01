import { jwtDecode } from "jwt-decode";

function isTokenValid(token: string): boolean {
  try {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    const now = Date.now() / 1000 + 120;
    return decodedToken.exp > now;
  } catch {
    return false;
  }
}

export default isTokenValid;

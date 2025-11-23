const API = "http://localhost:5000";

export async function createLink(longUrl, code) {
  const res = await fetch(`${API}/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: longUrl, code }),
  });
  return res.json();
}

export async function getLinks() {
  const res = await fetch(`${API}/api/links`);
  return res.json();
}

export async function getStats(code) {
  const res = await fetch(`${API}/api/links/${code}`);
  return res.json();
}

export async function deleteLink(code) {
  return fetch(`${API}/api/links/${code}`, { method: "DELETE" });
}



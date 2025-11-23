import { useState } from "react";
import { createLink } from "../services/api";

export default function CreateForm({ onCreated }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function isValidUrl(input) {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isValidUrl(url)) {
      setError("❌ Invalid URL. Please enter a valid URL.");
      return;
    }

    const data = await createLink(url, code);

    if (data.message === "Short code already exists") {
      setError("❌ This custom code already exists.");
      return;
    }

    if (data.message === "Code must be 6-8 chars A-Z, a-z, 0-9") {
      setError("❌ Custom code must be 6–8 characters.");
      return;
    }

    onCreated(); // refresh table
    setUrl("");
    setCode("");
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <label>Long URL</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/..."
        />

        <label>Custom Code</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="optional custom code (6–8 chars)"
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Create Short URL</button>
      </form>
    </div>
  );
}

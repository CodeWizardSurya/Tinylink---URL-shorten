import { deleteLink } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LinkTable({ links, refresh }) {
  const navigate = useNavigate();

  async function handleDelete(code) {
    await deleteLink(code);
    refresh();
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Long URL</th>
            <th>Clicks</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((item) => (
            <tr key={item.shortCode}>
              <td>
                <a
                  href={`http://localhost:5000/${item.shortCode}`}
                  target="_blank"
                >
                  {item.shortCode}
                </a>
              </td>

              <td className="long-url">{item.longUrl}</td>

              <td>{item.clicks}</td>

              <td>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/stats/${item.shortCode}`)}
                >
                  View
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.shortCode)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

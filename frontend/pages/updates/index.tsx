import React from "react";

const updates = [
  {
    id: 1,
    title: "New Feature Released!",
    content: "We have launched a new AI-powered case suggestion tool.",
  },
  {
    id: 2,
    title: "Webinar Announcement",
    content: "Join our upcoming webinar on medical innovation.",
  },
];

const UpdatesPage = () => (
  <div className="card" style={{ maxWidth: 700, margin: "2rem auto" }}>
    <h1 style={{ textAlign: "center", marginBottom: 32 }}>Latest Updates</h1>
    {updates.map((update) => (
      <div
        key={update.id}
        className="card"
        style={{
          marginBottom: 24,
          padding: 16,
          boxShadow: "none",
          border: "1px solid #eee",
          background: "#f8f9fa",
        }}
      >
        <h2 style={{ marginBottom: 8 }}>{update.title}</h2>
        <p>{update.content}</p>
      </div>
    ))}
  </div>
);

export default UpdatesPage;

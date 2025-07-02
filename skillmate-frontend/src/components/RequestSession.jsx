import React, { useState } from "react";
import axios from "axios";

const RequestSession = () => {
  const [toUserId, setToUserId] = useState("");
  const [skill, setSkill] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const fromUserId = localStorage.getItem("userId");

      const res = await axios.post(
        "http://localhost:5060/session/create",
        {
          fromUserId,
          toUserId,
          skill,
          preferredDate,
          message,
          meetingLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Session requested successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to request session.");
    }
  };

  return (
    <div className="container">
      <h2>Request Skill Session</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="To User ID"
          value={toUserId}
          onChange={(e) => setToUserId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="url"
          placeholder="Meeting Link"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          required
        />
        <button type="submit">Request Session</button>
      </form>
    </div>
  );
};

export default RequestSession;

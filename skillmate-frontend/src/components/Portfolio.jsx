import React, { useEffect, useState } from "react";
import axios from "axios";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:5060/api/users/profile/${userId}/portfolio`, {
        withCredentials: true,
      })
      .then((res) => {
        setPortfolio(res.data);
      })
      .catch((err) => {
        alert("Error fetching portfolio");
      });
  }, [userId]);

  return (
    <div>
      <h2>Your Portfolio</h2>
      <ul>
        {portfolio.map((item, index) => (
          <li key={index}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <a href={item.url}>{item.url}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;

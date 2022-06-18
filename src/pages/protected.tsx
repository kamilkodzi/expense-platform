import React from "react";
import { useState, useEffect } from "react";

type Post = {
  title: string;
  content: string;
};

const Protected = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/api/posts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // const result = async () => {
  //   let data = await fetch("/api/api/post");
  //   data = await data.json();
  //   return data;
  // };
  if (loading) return "Loading...";
  if (error) return "Error";
  return (
    <div>
      <h2>List of post fot test</h2>
      <ul>
        {data.map((post: Post) => {
          return (
            <li>
              Title is: {post.title} and the content is: {post.content}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Protected;

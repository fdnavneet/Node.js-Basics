import React, { useEffect, useState } from "react";
import axios from "axios";
import EmptyPost from "./EmptyPost";

const Feed = () => {
  const [post, setPost] = useState([]);

  async function fetchData() {
    const res = await axios.get("http://localhost:3000/getAll-post");
    setPost(res.data.post);
  }

  async function handleDelete(id) {
    await axios.delete(`http://localhost:3000/Delete-post/${id}`);
    setPost((prev) => prev.filter((i) => i._id !== id));
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Posts</h1>

      {post.length === 0 ? (
        <EmptyPost />
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {post?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* Image */}
              <img
                src={item.image}
                alt="post"
                className="w-full h-64 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h2 className="text-xl  font-semibold mb-2">{item.title}</h2>

                <p className="text-gray-600  text-sm">{item.description}</p>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="mt-3 mb-2 ml-1  px-12 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
              {/* <button onClick={() => handleUpdate(item._id)}>Update</button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;

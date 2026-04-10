import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogOut from "./LogOut";
import { useState } from "react";
import FullScreenLoader from "./FullScreenLoader";

const CreatePost = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("")
  const [message, setMessage] = useState('')

  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true)
    setLoadingText("Creating your post.....")
    setMessage("")

    try {
      const formData = new FormData(e.target);
      const res = await axios.post(
      "http://localhost:3000/api/post/create-post",
      formData,
        { withCredentials: true }
    );
    setLoadingText("Post created successfully")
    setTimeout(() => {
      setLoading(false)
      navigate("/allpost");
    }, 1500);
    } catch (error) {
      setLoading(false)
      setMessage(error.response?.data?.message || "Something went wrong")
    }
    
  }
  return (
    <>
    {loading && <FullScreenLoader text={loadingText}/>}
    <section className="min-h-screen flex items-center justify-center bg-gray-900 relative">
      <div className="absolute top-4 right-4 bg-amber-100">
        <LogOut />
      </div>
      <div className="border border-gray-700 rounded-lg p-6 w-full max-w-md bg-gray-800">
        <h1 className="text-xl font-semibold text-white mb-4 text-center">
          Create Post
        </h1>
        <form onSubmit={handelSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Caption"
            className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded"
          ></textarea>

          <input
            type="file"
            name="image"
            className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-1 file:mr-4 file:rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Posting..." : "Submit"}
          </button>

          <p
              className={`text-center text-sm ${
                message.toLowerCase().includes("success") ||
                message.toLowerCase().includes("created")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
        </form>
      </div>
    </section>
    </>
  );
};

export default CreatePost;

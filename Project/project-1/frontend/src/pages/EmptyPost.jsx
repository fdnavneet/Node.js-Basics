import { useNavigate } from "react-router-dom";

const EmptyPost = () => {

  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      
      {/* Icon */}
      <div className="bg-gray-200 p-6 rounded-full mb-4">
        📭
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-700">
        No Posts Yet
      </h2>

      {/* Description */}
      <p className="text-gray-500 mt-2 max-w-sm">
        Looks like you haven’t created any posts yet. Start sharing something amazing 🚀
      </p>

      {/* Button */}
      <button 
      onClick={() => navigate("/")}
      className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
        Creat Post
      </button>

    </div>
  );
}

export default EmptyPost
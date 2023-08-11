import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import Link from "next/link";

export const metadata = {
  title: "My Profile | BlogBreeeeze",
};

const page = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      {user ? (
        <div className="p-8 rounded-lg flex flex-col w-full items-center">
          <div className="border-2 w-1/2 flex flex-col justify-center items-center p-4">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile"
              className="w-32 h-34 rounded-full mb-4 object-cover border-4 border-indigo-500"
            />
            <h1 className="text-3xl font-semibold mb-2 text-indigo-600">
              Welcome, {user.name}!
            </h1>
            <p className="text-lg mb-2 text-gray-700">Email: {user.email}</p>
            <p className="text-lg">
              Number of Blogs:{" "}
              <span className="font-semibold text-indigo-500">
                {user.numOfBlogs}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="m-4 p-8 rounded-lg bg-gradient-to-br from-indigo-200 to-blue-200 text-center text-gray-800">
            <h4 className="text-2xl font-bold mb-4">
              Sign in to view your Profile!
            </h4>
            <div>
              <Link
                className="bg-blue-700 text-white rounded-lg px-6 py-3 hover:bg-blue-400 transition-colors font-semibold m-2"
                href="/sign"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

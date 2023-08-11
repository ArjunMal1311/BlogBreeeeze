import React from "react";
import SingleBlog from "../SingleBlog";
import getCurrentUser from "../actions/getCurrentUser";
import getBlogs from "../actions/getBlogs";
import Link from "next/link";

export default async function page() {
  const currentUser = await getCurrentUser();
  const blogs = await getBlogs(currentUser);

  return (
    <div>
      {currentUser ? (
        <div>
          {currentUser.numOfBlogs === 0 ? (
            <div className="m-4 p-8 rounded-lg bg-gradient-to-br from-indigo-200 to-blue-200 text-center text-gray-800">
              <h4 className="text-2xl font-bold mb-4">
                Hello {currentUser.name}, you've not created any Blogs
              </h4>
              <p className="text-lg mb-6">
                Ready to share your insights? Start a new blog now!
              </p>
              <div>
                <Link
                  className="bg-blue-700 text-white rounded-lg px-6 py-3 hover:bg-blue-400 transition-colors font-semibold m-2"
                  href="/create"
                >
                  Create Blog
                </Link>
              </div>
            </div>
          ) : (
            <div className="m-4 rounded-lg p-2">
              <h1 className="orange_gradient mb-2 mt-5 text-xl font-extrabold leading-[1.15] text-black sm:text-6xl">
                My Blogs
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {blogs.map((item) => (
                  <SingleBlog
                    key={item.id}
                    data={item}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="m-4 p-8 rounded-lg bg-gradient-to-br from-indigo-200 to-blue-200 text-center text-gray-800">
            <h4 className="text-2xl font-bold mb-4">
              Sign in to view your Blogs!
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
}

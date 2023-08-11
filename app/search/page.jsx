"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleBlog from "../SingleBlog";

export const metadata = {
  title: "Search | BlogBreeeeze",
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blog, setBlog] = useState([]);

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  useEffect(() => {
    axios
      .get(`/api/search?tags=${searchQuery}`)
      .then((response) => {
        console.log(response.data);
        setBlog(response.data);
        console.log("Blog:", blog);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, [searchQuery]);

  return (
    <div className="flex justify-center mt-4 flex-col items-center">
      <div className="rounded-lg shadow-lg p-6 w-full md:w-2/3 lg:w-1/2 border-4">
        <h2 className="orange_gradient font-extrabold text-2xl mb-4">
          Find What You're Looking For
        </h2>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search..."
            className="py-2 px-4 focus:outline-none w-full"
          />
          {/* <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2"
            onClick={handleClick}
          >
            Search
          </button> */}
        </div>
      </div>

      <div className="m-4 rounded-lg p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {blog.map((item) => (
            <SingleBlog key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

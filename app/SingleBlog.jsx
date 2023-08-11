"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SingleBlog({ data, currentUser }) {
  const timestamp = data.createdAt; // Replace with your actual timestamp
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleString("en-US", options);

  const onDelete = () => {
    axios
      .delete(`/api/blogs/${data.id}`)
      .then(() => {
        router.refresh();
      })
      .catch((error) => toast.error("Error"))
      .finally(() => toast.success("Deleted Successfully"));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-transform transform  border-2 p-3 border-gray-300 flex flex-col items-center">
      <Link href={`/blogs/${data.id}`}>
        <img
          src={data.imageSrc}
          alt={data.title}
          className="h-40 object-cover w-full"
        />
        <div className="p-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {data.name}
            </h2>
            <div>
              {data.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-700 mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3">{data.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>{formattedDate}</span>
          </div>
        </div>
      </Link>
      {data.userId === currentUser?.id ? (
        <div className="flex items-center gap-4">
          <div className="text-sm text-green-500">Edit</div>
          <div
            className="text-sm text-orange-500 hover:cursor-pointer"
            onClick={onDelete}
          >
            Delete
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

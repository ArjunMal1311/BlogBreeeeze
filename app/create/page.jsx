"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "../ImageUpload";
import axios from "axios";
import { toast } from "react-hot-toast";

export const metadata = {
  title: "Create | BlogBreeeeze",
};

const Page = () => {
  const initialState = {
    name: "",
    imageSrc: "",
    description: "",
    tags: [], // Added tags field
  };

  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleTagsChange(event) {
    const newTags = event.target.value.split(",").map((tag) => tag.trim()); // Split and trim
    setState({ ...state, tags: newTags });
  }

  const onSubmit = (event) => {
    setIsLoading(true);

    event.preventDefault();

    axios
      .post("/api/blogs", state) // Include tags in the state
      .then(() => {
        toast.success("Created successfully");
        router.refresh();
        router.push("/");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setCustomValue = (id, value) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  return (
    <div className="h-screen flex mt-4 w-full flex-col items-center">
      <div className="mb-8 text-center m-2">
        <h2 className="text-center m-8 orange_gradient mb-2 mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl">
          Create a blog!
        </h2>
        <p className="text-gray-600 m-2">
          Please fill in the details below to upload your blog.
        </p>
      </div>

      <div className="bg-white p-8 rounded shadow-md w-3/4 flex flex-wrap md:flex-nowrap h-auto md:h-3/5 border-4">
        <div className="border-2 mr-4 rounded flex flex-col items-center justify-center w-full md:w-1/2 mb-4 md:mb-0 text-gray-700 font-medium">
          <ImageUpload
            value={state.imageSrc}
            onChange={(value) => setCustomValue("imageSrc", value)}
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              placeholder="Blog Title here"
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={state.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Blog Description here"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 max-h-32"
              value={state.description}
              onChange={handleChange}
              name="description"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tags</label>
            <input
              placeholder="Tag1, Tag2, Tag3"
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={state.tags}
              onChange={handleTagsChange}
              name="tags"
            />
          </div>
          {/* Upload Button */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={onSubmit}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

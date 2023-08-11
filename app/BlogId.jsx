"use client";
import axios from "axios";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";

export default function BlogId({
  name,
  description,
  blogId,
  imageSrc,
  author,
  date,
  tags,
  blogUserId,
  currentUser,
}) {
  const initialState = {
    name: "",
    description: "",
    imageSrc: "",
  };

  const [onActive, setOnActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(initialState);

  const onDelete = () => {
    axios
      .delete(`/api/blogs/${data.id}`)
      .then(() => {
        router.refresh();
      })
      .catch((error) => toast.error("Error"))
      .finally(() => toast.success("Deleted Successfully"));
  };

  const onSubmit = (event) => {
    setIsLoading(true);

    event.preventDefault();
    axios
      .put(`/api/blogs/${blogId}`, state)
      .then(() => {
        toast.success("Updated Successfully");
        router.refresh();
        router.push("/");
      })

      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleTagsChange(event) {
    const newTags = event.target.value.split(",").map((tag) => tag.trim()); // Split and trim
    setState({ ...state, tags: newTags });
  }

  const setCustomValue = (id, value) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden border-t-2 border-t-gray-600 mt-4 w-full sm:w-1/2">
        <img
          src={imageSrc}
          alt={name}
          className="object-cover w-full h-64 md:h-96 border-2 p-2"
        />
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-800">
              {name}
            </h1>

            <div className="flex mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-blue-500 bg-blue-100 px-2 py-1 text-sm rounded-md mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-600 mb-6">{description}</p>
          <div className="border-t border-gray-300 pt-4">
            <p className="text-gray-500 text-sm">Author: {author}</p>
            <p className="text-gray-500 text-sm">Publication Date: {date}</p>
          </div>
        </div>
        {blogUserId === currentUser?.id && (
          <div className="flex justify-start gap-2 ml-6">
            <button
              onClick={() => setOnActive(!onActive)}
              className="text-orange-500"
            >
              Edit
            </button>
            <button
              disabled={isLoading}
              onClick={onDelete}
              className="text-green-500"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {onActive && (
        <form onSubmit={onSubmit} className="mt-4 ml-4 border-2">
          <div>
            <ImageUpload
              value={state.imageSrc}
              onChange={(value) => setCustomValue("imageSrc", value)}
            />
          </div>
          <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
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
              <label className="block text-gray-700 font-medium mb-2">
                Tags
              </label>
              <input
                placeholder="Tag1, Tag2, Tag3"
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={state.tags}
                onChange={handleTagsChange}
                name="tags"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setOnActive(!onActive)}
                className="text-orange-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="text-green-500"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

"use client";
import { CloudinaryImage } from "@/types/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePicture() {
  const [updateImage, setUpdateImage] = useState<CloudinaryImage>({
    image: "",
  });

  const router = useRouter();

  const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", updateImage.image[0]);

      const { data } = await axios.patch(
        "http://localhost:3000/api/users/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUpdateImage(data);

      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateImage({
      ...updateImage,
      [event.target.name]: event.target.files,
    });
  };

  return (
    <div className="bg-white w-full h-screen flex justify-center items-center text-blue-400 pt-40">
      <div
        className="bg-blue-100 border border-blue-300 rounded-lg p-8 flex flex-col items-center"
        style={{ width: "800px", height: "400px" }}
      >
        {" "}
        {/* Menyesuaikan lebar dan tinggi */}
        <form
          className="flex flex-col items-center" onSubmit={handleUploadImage}
        >
          <h1 className="text-3xl font-bold mb-4 flex justify-center items-center">
            Profile Picture
          </h1>
          <div className="mb-4" >
            <input
              type="file"
              id="image"
              name="image"
              onChange={change}
              className="hidden"
            />
            <div className="border border-dashed border-gray-400 p-4 rounded-lg w-64 cursor-pointer text-center">
              <p className="text-gray-500">
                Drop Image here or click to upload
              </p>
            </div>
          </div>
          <label htmlFor="image" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ">
            Choose Your Image
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

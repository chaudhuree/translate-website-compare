"use client";

import { motion } from "framer-motion";

import { useDeleteBlogMutation } from "@/Redux/Api/blogApi";
import ShowToastify from "@/utils/ShowToastify";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { StaticImageData } from "next/image";

export interface blog {
  id: string;
  title: string;
  image: string | StaticImageData; // Allow either a URL string or StaticImageData
  description: string
  // other fields...
}


const BlogTable = ({
  blogData,
  isLoading,
}: {
  blogData: blog[];
  isLoading: boolean;
  serial: number;
}) => {
  console.log("dsklfjxcfsdfdfj",blogData)
  const [deleteBlogFn] = useDeleteBlogMutation();

  // delete functionaltiy in blog
  const deleteBlog = async (id: string) => {
    try {
      await deleteBlogFn(id).unwrap();
      ShowToastify({ success: "Blog delete successfully!" });
    } catch (error) {
      ShowToastify({ error: "Failed to delete!" });
    }
  };

  const router = useRouter();

  //  Navigate to `/add_blog` with blog data in query params
  const handleUpdateBlog = (blog: blog) => {
    const image = typeof blog?.image === 'string' ? blog?.image : blog?.image?.src; // Extract the src if it's StaticImageData
    router.push(
      `/add_blog?id=${blog.id}&title=${encodeURIComponent(
        blog?.title
      )}&description=${encodeURIComponent(
        blog?.description
      )}&image=${encodeURIComponent(image)}`
    );
  };
  
  




  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="min-w-full table-auto">
        <thead>
        <tr className="bg-[#FFFFFF]/10 text-white py-4">
        <th className="py-2 ">Image</th>
            <th className="py-2 ">Title</th>

            <th className="py-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7} className="text-center">
                <Loader className={`w-36`}></Loader>
              </td>
            </tr>
          ) : (
            blogData?.map((item: blog, index: number) => (
              <tr
               
                key={index}
                className="text-center text-white border-b-[0.5px] border-slate-200 bg-black "
              >
                  <td className="py-4 flex justify-center items-center  ">
                  <Image
                    alt="dkfjsd"
                    width={100}
                    height={100}
                    src={item?.image}
                    className="w-16 h-16 bg-cover"
                  />
                </td>
                <td className="py-4 ">{item.title}</td>
              

                <td className="p-y" >
                  <button
                    onClick={() => handleUpdateBlog(item)}
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                  >
                    <FaEdit className="text-blue-500" />
                  </button>

                  <button
                    onClick={() => deleteBlog(item?.id)}
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                  >
                    <RiDeleteBinLine className="text-red-500" />
                  </button>
                </td>

                {/* <td className="px-4 py-2">{item.createdAt.split("T")[0]}</td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default BlogTable;

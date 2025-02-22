"use client";


import { category } from "@/Interfaces/InterFaces";
import { useDeleteCategoryMutation } from "@/Redux/Api/categoryApi";
import ShowToastify from "@/utils/ShowToastify";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Loader from "../Loader/Loader";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const CategoryTable = ({
  creatorData,
  isLoading,
}: {
  creatorData: category[];
  isLoading: boolean;
  serial: number;
}) => {
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId).unwrap();
      ShowToastify({ success: "Category delete successfully!" });
    } catch (error) {
      ShowToastify({ error: "Failed to delete category!" });
    }
  };

  // console.log("categorydata", creatorData);

  const router = useRouter();

  const handleEditCategory = (category: category) => {
    router.push(`/add_category?id=${category.id}&name=${encodeURIComponent(category.name)}&description=${encodeURIComponent(category.description)}`);
  };
  

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="min-w-full table-auto">
        <thead>
        <tr className="bg-[#FFFFFF]/10 text-white py-4">
        <th className="py-4 ">Name</th>
            <th className="py-4 ">Description</th>

            <th className="py-4 ">Action</th>
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
            creatorData?.map((item: category, index: number) => (
              <tr
                
                key={index}
                className="text-center text-white border-b-[0.5px] border-slate-200 bg-black"
              >
                <td className="p-2 py-4">{item.name}</td>
                <td className="p-2 py-4" dangerouslySetInnerHTML={{ __html: item.description }}></td>

                <td className="p-2 py-4">
                  <button
                    onClick={() => handleEditCategory(item)}
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                  >
                    <FaEdit className="text-blue-500" />
                  </button>

                  <button
                    onClick={() => handleDeleteCategory(item?.id)}
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                  >
                    <RiDeleteBinLine className="text-red-500" />
                  </button>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
      <ToastContainer/>
    </div>
  );
};

export default CategoryTable;

"use client";


import Loader from "../Loader/Loader";
import { category } from "@/Interfaces/InterFaces";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDeleteBenchMutation } from "@/Redux/Api/benchmarkApi";
import { useRouter } from "next/navigation";



const BenchmarkTable = ({
  creatorData,
  isLoading,
}: {
  creatorData: category[];
  isLoading: boolean;
  serial: number;
}) => {


  const [deletebench] = useDeleteBenchMutation();

  // delete functionaltiy in blog
  const deleteBlog = async (id: string) => {
    
    try {
      const response = await deletebench(id).unwrap();
  
if(response) {
  toast.success("Benchmark deleted successfully!" );
}
      
    } catch (error: any) {
      console.error("Error from API:", error.data.message); // Log the full error details
  
      // Show the error message from the response or a default message
      toast.error( error?.data?.message || "Failed to delete!" );
    }
  };
  
  
  

  const router = useRouter();


  const handleEdit = (creatorData: category) => {
    router.push(
      `/add_benchmark?id=${creatorData.id}&name=${encodeURIComponent(creatorData.name)}`
    );
  };




  return (
    <div className="overflow-x-auto overflow-y-hidden">
            <ToastContainer position="top-right" autoClose={3000} />

      <table className="min-w-full table-auto">
        <thead>
        <tr className="bg-[#FFFFFF]/10 text-white py-4">
        <th className="p-4">Name</th>
           
            <th className="p-4">Action</th>
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
                className="text-center text-white border-b-[0.5px] border-slate-200 bg-black "
              >
                <td className="py-4">{item.name}</td>

                <td className="py-4 ">
                  <button
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit className="text-blue-500" />
                  </button>
             
                  <button
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                    onClick={() => deleteBlog(item.id)}

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
    </div>
  );
};

export default BenchmarkTable;

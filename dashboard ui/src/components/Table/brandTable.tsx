"use client";


import { category } from "@/Interfaces/InterFaces";
import { useDeleteBrandMutation } from "@/Redux/Api/brandApi";
import ShowToastify from "@/utils/ShowToastify";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";
import Image from "next/image";

const BrandTable = ({
  creatorData,
  isLoading,
}: {
  creatorData: category[];
  isLoading: boolean;
  serial: number;
}) => {
  const [deleteBrand] = useDeleteBrandMutation();

  const handleDeleteBrand = async (brandId: string) => {
    try {
      await deleteBrand(brandId).unwrap();
      ShowToastify({ success: "Delete brand successfully" });
    } catch (error) {
      ShowToastify({ error: "Failed to delete brand!" });
    }
  };
  const router = useRouter();

  const handleEdit = (brand: category) => {
    const image = typeof brand?.image === 'string' ? brand?.image : brand?.image?.src; // Extract the src if it's StaticImageData

    router.push(
      `/add_brand?id=${brand.id}&name=${encodeURIComponent(brand.name)}&image=${encodeURIComponent(image)}`
    );
  };

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="min-w-full table-auto">
        <thead>
        <tr className="bg-[#FFFFFF]/10 text-white py-4">
        <th className="py-2 ">Image</th>


            <th className="py-4 ">Name</th>

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
                      <td className="py-4 flex justify-center items-center  ">
                                  <Image
                                    alt="dkfjsd"
                                    width={100}
                                    height={100}
                                    src={item?.image}
                                    className="w-16 h-16 bg-cover"
                                  />
                                </td>
                <td className="py-4 ">{item.name}</td>

                <td className="py-4 ">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                  >
                    <FaEdit className="text-blue-500" />
                  </button>

                  <button
                    onClick={() => handleDeleteBrand(item.id)}
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

export default BrandTable;

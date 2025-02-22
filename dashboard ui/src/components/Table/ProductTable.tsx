import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useState, useEffect } from "react";
import { useDeleteProductMutation, useProductsQuery } from "@/Redux/Api/ProductApi";
import ShowToastify from "@/utils/ShowToastify";
import { products } from "@/Interfaces/InterFaces";
import deleteImage  from "@/assests/delete.png";
import editImage  from "@/assests/edit.png";
import Image from "next/image";


const ProductTable = ({
  productData,
  isLoading,
  meta,
}: {
  productData: products[];
  isLoading: boolean;
  meta?: { page: number; totalPage: number }; // Make meta optional
}) => {
  const [currentPage, setCurrentPage] = useState(meta?.page || 1); 
  const [limit, setLimit] = useState(10); // Default limit
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null); 


  // Trigger refetch when currentPage or limit changes
  const { data, isLoading: isQueryLoading, refetch } = useProductsQuery(
  
    { page: currentPage, limit },
    { skip: !currentPage } // Skip the query until currentPage is set
  );
  const [deleteProduct] = useDeleteProductMutation()

  useEffect(() => {
    if (meta) {
      setCurrentPage(meta.page);
    }
  }, [meta]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && meta && page <= meta.totalPage) {
      setCurrentPage(page);
      refetch(); // Refetch data when page changes
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id).unwrap(); // Ensure mutation completes
      ShowToastify({ success: "Product deleted successfully!" });
    } catch (error) {
      ShowToastify({ error: "Failed to delete product!" });
    }
  };
  

  const handleAddProductBenchmark = (product: products) => {
    if (!product.id) return;
    router.push(`/add_product_benchmark/${product.id}`);
  };

  const router = useRouter();

  const handleEdit = (product: products) => {
    router.push(
      `/add-cpu-product?id=${product.id}&name=${encodeURIComponent(
        product.name
      )}`
    );
  };

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-[#FFFFFF]/10 text-white py-4">
          <th className="px-2 py-4">Image</th>
            <th className="px-2 py-4">Name</th>
            <th className="px-2  py-4">Description</th>
            <th className="px-2  py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {isQueryLoading || isLoading ? (
            <tr>
              <td colSpan={7} className="text-center">
                <Loader className={`w-36`} />
              </td>
            </tr>
          ) : (
            data?.data?.map((item: products, index: number) => (
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
                <td className="px-4 py-4   ">{item.name}</td>
                <td className="px-4 py-4">{item.description.slice(0, 30)}</td>
                <td className="px-4 py-4 ">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                  >
                                                             <Image src={editImage} alt="df" width={16} height={16}/>
                                                             </button>

                  <button
                    onClick={() => handleDeleteProduct(item.id)}
                    className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-white"
                  >
                                                             <Image src={deleteImage} alt="df" width={16} height={16}/>

                  </button>
                  <div className="relative inline-block">
                  {hoveredProduct === item.id && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-3 py-1 text-sm text-white bg-gray-800 rounded shadow-md whitespace-nowrap">
                        Add product Benchmark
                      </div>
                    )}
                    <button
                      onClick={() => handleAddProductBenchmark(item)}
                      onMouseEnter={() => setHoveredProduct(item.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      className="px-4 py-1 hover:scale-105 transition-transform font-semibold rounded-lg text-green-600 flex items-center gap-2 relative"
                    >
                      <IoMdAddCircleOutline className="w-[16px] h-[16px]" />
               
                    </button>

                    {/* Tooltip */}
                  
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {meta && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg mr-2 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="px-4 py-2 text-gray-700">{`Page ${currentPage} of ${meta.totalPage}`}</span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg ml-2 disabled:opacity-50"
            disabled={currentPage === meta.totalPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductTable;




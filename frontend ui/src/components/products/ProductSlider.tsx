
import Image from "next/image";

interface productType {
  name: string;
  images: string[];
}

const ProductSlider = ({ product }: { product: productType }) => {
  return (
    <div className="relative product-slider w-full">
      {product?.images?.length > 0 ? (
        <div className="w-full h-[410px] bg-light-blue rounded-[8px] p-[28px] overflow-hidden flex items-center justify-center">
          <Image
            src={product.images[0]} // Shows ONLY the first image
            alt={product?.name || "Product name is not set."}
            width={300}
            height={300}
            className="w-[314px] h-[314px] object-contain"
          />
        </div>
      ) : (
        <div className="w-full h-[410px] bg-light-blue rounded-[8px] p-[28px] flex items-center justify-center">
          <p className="text-gray-500">No image available</p>
        </div>
      )}
    </div>
  );
};

export default ProductSlider;





// import Image from "next/image";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// interface productType {
//   name: string;
//   images: string[];
// }

// const ProductSlider = ({ product }: { product: productType }) => {
//   return (
//     <div className="relative product-slider">
//       <Swiper
//         spaceBetween={50}
//         slidesPerView={1}
//         speed={900}
//         grabCursor={true}
//         pagination={{
//           el: ".product-pagination",
//           clickable: true,
//           type: "bullets", // Add this line to render bullets
//         }}
//         navigation={{
//           nextEl: ".product-prev",
//           prevEl: ".product-next",
//         }}
//         modules={[Pagination, Navigation]}
//       >
//         {product?.images?.map((image, index) => (
//           <SwiperSlide key={index}>
//             <div className="w-full h-[410px] bg-light-blue rounded-[8px] p-[28px] overflow-hidden flex items-center justify-center">
//               <Image
//                 src={image || "placeholder.png"}
//                 alt={product?.name || "Product name is not set."}
//                 width={300}
//                 height={300}
//                 className="w-[314px] h-[314px] object-contain"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className="absolute bottom-[20px] left-[50%] translate-x-[-50%] z-[2]">
//         <div className="flex items-center gap-2">
//           <button>
//             <Image
//               src="/previous-arrow.svg"
//               alt="Left arrow"
//               height={14}
//               width={14}
//               className="object-contain product-next"
//             />
//           </button>
//           <div className="product-pagination"></div>{" "}
//           {/* Bullets will render here */}
//           <button>
//             <Image
//               src="/next-arrow.svg"
//               alt="Right arrow"
//               height={14}
//               width={14}
//               className="object-contain product-prev"
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductSlider;

"use client";

import { useGetBlogPostQuery } from "@/redux/Api/blog/blogApi";
import Image from "next/image";
import { useParams } from "next/navigation";

const BlogDetails = () => {
  const params = useParams();
  const { data: post, isLoading: isLoadingPost } = useGetBlogPostQuery({
    id: params?.id,
  });

  return (
    <>
      {isLoadingPost ? (
        <div className="container mt-20 py-20 text-center bg-slate-950">
          Loading...
        </div>
      ) : (
        <section className="container lg:pt-5">
          <div className="">
            <Image
              src={post?.data?.image}
              alt={post?.data?.title}
              height={500}
              width={400}
              className="w-full rounded-[8px] object-cover lg:h-[400px] h-[240px] "
            />
          </div>
          <div className="md:py-20 py-10">
            <div
              className="container blog-details"
              dangerouslySetInnerHTML={{ __html: post?.data?.description }}
              ></div>
              {/* { post?.data?.description} */}
          </div>
        </section>
      )}
    </>
  );
};

export default BlogDetails;

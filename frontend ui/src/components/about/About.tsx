/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetBlogPostsQuery } from "@/redux/Api/blog/blogApi";
import Article from "../Article/Article";
import ArticleSkeleton from "../Article/ArticleSkeleton";

export default function About() {
  const { data: posts, isLoading: isLoadingPosts } = useGetBlogPostsQuery({});

  return (
    <div>
      <div className="py-5 px-5 lg;pt-[64px] pt-5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold dark:text-white text-black mb-4">Explore Blog</h2>
            <p className="text-gray max-w-2xl mx-auto">
              Discover a wide range of products tailored to meet your needs.
              From the latest innovations to timeless essentials, find what
              you&apos;re looking for in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingPosts ? (
              <>
                <ArticleSkeleton />
                <ArticleSkeleton />
                <ArticleSkeleton />
              </>
            ) : (
              posts?.data?.map((article: any) => (
                <Article key={article?.id} article={article} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

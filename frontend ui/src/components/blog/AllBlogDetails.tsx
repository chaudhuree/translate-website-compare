/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetBlogPostsQuery } from "@/redux/Api/blog/blogApi";
import Article from "../Article/Article";
import ArticleSkeleton from "../Article/ArticleSkeleton";
import { useTranslations } from "@/components/ClientLayout";

export default function Blog() {
  const { data: posts, isLoading: isLoadingPosts } = useGetBlogPostsQuery({});
const {dict} = useTranslations();
  return (
    <div>
      <div className="py-5 px-5 lg;pt-[64px] pt-5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold dark:text-white text-black mb-4">{dict.blog.title}</h2>
            <p className="text-gray max-w-2xl mx-auto">
              {dict.blog.description}
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
            )}4
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

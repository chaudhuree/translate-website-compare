/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useGetBlogPostsQuery } from "@/redux/Api/blog/blogApi";
import Article from "../Article/Article";
import ArticleSkeleton from "../Article/ArticleSkeleton";
import Link from "next/link";
import { useTranslations } from "@/components/ClientLayout";

export default function ExplorerProduct() {
  const { data: posts, isLoading: isLoadingPosts } = useGetBlogPostsQuery({});
  const { dict } = useTranslations();

  return (
    <div className="px-5">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold dark:text-white text-black mb-4">
            {dict.home.exploreOurProducts.title}
          </h2>
          <p className="dark:text-white text-black max-w-2xl mx-auto">
            {dict.home.exploreOurProducts.description}
          </p>
        </div>
        <div className="flex justify-end py-4 text-secondary text-lg font-[600]">
          <Link href="/allblogs">See All</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoadingPosts ? (
            <> 
              <ArticleSkeleton />
              <ArticleSkeleton />
              <ArticleSkeleton />
            </>
          ) : (
            posts?.data?.slice(0, 3).map((article: any) => (
              <Article key={article?.id} article={article} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

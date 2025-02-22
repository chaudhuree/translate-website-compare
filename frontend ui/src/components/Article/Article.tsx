import { ArticleProps } from "@/types/Article";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Function to format the date in UTC
const formatDateInUTC = (dateString: string): string => {
  const date = new Date(dateString);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = days[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const dayOfMonth = date.getUTCDate();

  return `${day}, ${month} ${dayOfMonth}`;
};


const Article = ({ article }: ArticleProps) => {
  return (
    <div className="dark:bg-[#0E1527] bg-white shadow-md rounded-xl overflow-hidden">
      <div className="relative h-48">
        <Image
          src={article?.image || "/placeholder.svg"}
          alt={article?.title || "Not available"}
          fill
          className="object-cover"
        />
      </div>

      <div className="lg:p-6 p-3 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="dark:text-gray text-black">
            {article?.author?.name?.split(" ")[0]} {/* Trim to first name */}
          </span>
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDateInUTC(article?.createdAt)}
          </div>
        </div>

        <h3 className="text-blue-500 text-xl font-semibold mb-3">
          {article?.title}
        </h3>

        <div
          className="text-gray text-sm mb-6 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: article?.description }}
        ></div>

        <div className="w-full mt-auto">
          <Link
            href={`/blog/${article?.id}`}
            className="flex items-center justify-center gap-2 w-[180px] h-[48px] px-4 py-2 bg-[#4D6BDD] text-white rounded-[8px] shadow-[0px_0px_20px_0px_rgba(255,255,255,0.30)] cursor-pointer transition-all duration-300 hover:opacity-80"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;

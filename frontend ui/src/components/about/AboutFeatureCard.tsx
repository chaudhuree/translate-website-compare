import { AboutIcon1, AboutIcon2, AboutIcon3, AboutIcon4 } from "./AboutIcon";
import { useTranslations } from "@/components/ClientLayout";

export default function AboutFeatureCard() {
  const { dict } = useTranslations();
  const features = [
    {
      id: 1,
      title: dict.aboutPage.cards[0].title,
      description: dict.aboutPage.cards[0].description,
      icon: <AboutIcon1 />,
    },
    {
      id: 2,
      title: dict.aboutPage.cards[1].title,
      description: dict.aboutPage.cards[1].description,
      icon: <AboutIcon2 />,
    },
    {
      id: 3,
      title: dict.aboutPage.cards[2].title,
      description: dict.aboutPage.cards[2].description,
      icon: <AboutIcon3 />,
    },
    {
      id: 4,
      title: dict.aboutPage.cards[3].title,
      description: dict.aboutPage.cards[3].description,
      icon: <AboutIcon4 />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {features.map((feature) => (
        <div key={feature.id}>
          <div
            className={`
              relative group
              dark:bg-[#4D6BDD1A] rounded-xl p-8
              border border-[#4D6BDD1A] hover:border-blue-500/50
              transition-all duration-300
              flex flex-col items-center text-center
              cursor-pointer
              shadow-lg hover:shadow-blue-500/10
            `}
          >
            {/* Icon Container */}
            <div className="dark:bg-[#4D6BDD33] bg-slate-50 rounded-[8px] w-20 h-20 flex items-center justify-center mx-auto mb-4 drop-shadow-md">
              <div className="dark:text-white group-hover:text-blue-300 transition-colors text-3xl">
                {feature.icon}
              </div>
            </div>

            {/* Content */}
            <h3 className="dark:text-[16px] font-semibold dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="dark:text-white text-sm">{feature.description}</p>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      ))}
    </div>
  );
}

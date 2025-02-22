"use client"
import CountUp from "react-countup";
import { FiCpu } from "react-icons/fi";
import { BsGpuCard } from "react-icons/bs";
import { ImPowerCord } from "react-icons/im";
import { useDashboardQuery } from "@/Redux/Api/dashboardApi";

export default function DashboardOverview() {
  const { data: dashboard, isLoading, error } = useDashboardQuery({});
  console.log(dashboard)

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <div className="pt-8 pb-32 lg:px-0 px-3">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-6 justify-between">
          {/* Total CPU Card */}
          <div className="w-full bg-secondary rounded-lg shadow-md">
            <div className="relative p-6 rounded-xl">
              <div className="space-y-4 font-poppins">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-white">Total Products</h3>
                  <div className="bg-default w-[56px] h-[56px] rounded-full flex items-center justify-center">
                    <FiCpu className="text-white text-[30px]" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight text-white">
                    <CountUp
                      start={0}
                      end={dashboard?.data?.totalProducts || 0}
                      duration={2.5}
                      separator=","
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Total GPU Card */}
          <div className="w-full bg-secondary rounded-lg shadow-md">
            <div className="relative p-6 rounded-xl">
              <div className="space-y-4 font-poppins">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-white">Total Brands</h3>
                  <div className="bg-default w-[56px] h-[56px] rounded-full flex items-center justify-center">
                    <BsGpuCard className="text-white text-[30px]" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight text-white">
                    <CountUp
                      start={0}
                      end={dashboard?.data?.totalBrands || 0}
                      duration={2.5}
                      separator=","
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Power Supply Card */}
          <div className="w-full bg-secondary rounded-lg shadow-md">
            <div className="relative p-6 rounded-xl">
              <div className="space-y-4 font-poppins">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-white">Total Benchmark</h3>
                  <div className="bg-default w-[56px] h-[56px] rounded-full flex items-center justify-center">
                    <ImPowerCord className="text-white text-[30px]" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight text-white">
                    <CountUp
                      start={0}
                      end={dashboard?.data?.totalBenchmarks || 0}
                      duration={2.5}
                      separator=","
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

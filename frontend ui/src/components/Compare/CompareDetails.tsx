import BenchmarkCom from "./benchCompare/BenchMarkCom";
import CompareCard from "./CompareCard";
import CompareGPU from "./CompareGpu";

export default function CompareDetails() {

  return (
    <div className="pb-20">
      <CompareCard />
      <CompareGPU/>
      <BenchmarkCom/>

      
   
    </div>
  );
}

import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label: string
  options: { id: string; name: string }[]
  value: string
  onChange: (value: string) => void
}

export function FilterDropdown({ options, value, onChange, label }: FilterDropdownProps) {
    return (
      <div className="relative min-w-[200px]">
        <label className="block dark:text-gray text-black mb-2 font-medium">{label}</label>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none rounded-xl dark:bg-[#1a1f2a]/80 bg-white px-4 py-3 text-sm 
            outline-none transition-colors dark:hover:bg-[#1a1f2a] hover:bg-white focus:ring-2 focus:ring-blue-500 dark:placeholder:text-black dark:text-white text-black
            border dark:border-slate-700 border-slate-50 shadow-lg"
          >                   

            {options.map((option) => (
              <option key={option.id} value={option.id} className="dark:bg-[#1a1f2a] bg-white dark:text-white text-black">
                {option.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={18}
          />
        </div>
      </div>
    )
  }
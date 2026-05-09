import { FiLoader } from "react-icons/fi";

export default function Loader() {
  return (
    <div className="flex items-center justify-center animate-pulse bg-slate-50 py-1">
      <FiLoader className="animate-spin size-5" />
    </div>
  )
}
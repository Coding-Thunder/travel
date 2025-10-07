import { Loader2 } from "lucide-react"

export default function LoadingAbsolute() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-800" />
        <p className="text-lg font-medium text-gray-900">Loading...</p>
      </div>
    </div>
  )
}

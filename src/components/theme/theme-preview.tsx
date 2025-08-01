export default function ThemePreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Theme Preview</h3>
      <div className="border rounded-lg p-4">
        <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/20 rounded"></div>
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
} 
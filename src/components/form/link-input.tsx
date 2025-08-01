export default function LinkInput() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Link Title</label>
      <input
        type="text"
        placeholder="e.g., Instagram"
        className="w-full px-3 py-2 border rounded-md"
      />
      
      <label className="text-sm font-medium">URL</label>
      <input
        type="url"
        placeholder="https://instagram.com/yourusername"
        className="w-full px-3 py-2 border rounded-md"
      />
    </div>
  )
} 
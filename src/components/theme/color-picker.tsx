export default function ColorPicker() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Colors</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Primary Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              className="w-12 h-10 border rounded cursor-pointer"
              defaultValue="#3b82f6"
            />
            <input
              type="text"
              placeholder="#3b82f6"
              className="flex-1 px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Background Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              className="w-12 h-10 border rounded cursor-pointer"
              defaultValue="#ffffff"
            />
            <input
              type="text"
              placeholder="#ffffff"
              className="flex-1 px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 
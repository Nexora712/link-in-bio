export default function PreviewContainer() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Preview</h3>
        <p className="text-sm text-muted-foreground">
          See how your link-in-bio page will look
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Preview components will be rendered here */}
        <div className="bg-card border rounded-lg p-4">
          <p className="text-center text-muted-foreground">
            Preview content will appear here
          </p>
        </div>
      </div>
    </div>
  )
} 
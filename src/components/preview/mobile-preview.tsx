export default function MobilePreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Mobile Preview</h3>
      <div className="relative mx-auto w-64 h-[500px] bg-gray-900 rounded-3xl p-2">
        <div className="w-full h-full bg-background rounded-2xl overflow-hidden">
          <div className="p-4 space-y-4">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto"></div>
              <h2 className="text-lg font-semibold">Your Name</h2>
              <p className="text-muted-foreground text-xs">
                Your bio description
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="bg-primary text-primary-foreground p-2 rounded-md text-center text-sm">
                Instagram
              </div>
              <div className="bg-primary text-primary-foreground p-2 rounded-md text-center text-sm">
                Twitter
              </div>
              <div className="bg-primary text-primary-foreground p-2 rounded-md text-center text-sm">
                Website
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
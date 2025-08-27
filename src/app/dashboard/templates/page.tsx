import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Star } from "lucide-react"

const templates = [
  {
    id: 1,
    name: "Modern Dark",
    description: "Sleek dark theme with gradient accents",
    category: "Dark",
    popularity: 95,
    preview: "/templates/modern-dark.jpg",
  },
  {
    id: 2,
    name: "Minimal Light",
    description: "Clean and minimal design",
    category: "Light",
    popularity: 88,
    preview: "/templates/minimal-light.jpg",
  },
  {
    id: 3,
    name: "Glassmorphism",
    description: "Modern glass effect design",
    category: "Modern",
    popularity: 92,
    preview: "/templates/glassmorphism.jpg",
  },
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Templates</h1>
        <p className="text-muted-foreground">
          Choose from our collection of beautiful templates for your link-in-bio page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">Preview</span>
            </div>

            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <Badge variant="secondary">{template.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span>{template.popularity}% popularity</span>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm">Use Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
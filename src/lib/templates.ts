import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface Template {
  id: string
  name: string
  tier: "free" | "pro"
  thumbnail: string
  styles: {
    background: string
    fontFamily: string
    primaryColor: string
    [key: string]: any
  }
}

export const fetchAllTemplates = async (): Promise<Template[]> => {
  try {
    const templatesRef = collection(db, "templates")
    const snapshot = await getDocs(templatesRef)
    
    const templates: Template[] = []
    snapshot.forEach((doc) => {
      templates.push({ id: doc.id, ...doc.data() } as Template)
    })
    
    return templates
  } catch (error) {
    console.error("Error fetching templates:", error)
    throw error
  }
}

export const fetchTemplate = async (templateId: string): Promise<Template | null> => {
  try {
    const templateRef = doc(db, "templates", templateId)
    const snapshot = await getDoc(templateRef)
    
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Template
    }
    
    return null
  } catch (error) {
    console.error("Error fetching template:", error)
    return null
  }
}

// server/actions/createBlogAction.ts
import { revalidatePath } from "next/cache";

const translateToEnglish = async (text: string): Promise<string> => {
  const response = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: "ko",
      target: "en",
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data.translatedText;
};

export async function createBlogAction(formData: FormData) {
  

  const subdomain = formData.get("subdomain") as string;
  const blogTitle = formData.get("blogTitle") as string;
  const blogDescription = formData.get("blogDescription") as string;
  const authorName = formData.get("authorName") as string;
  const keywords = formData.get("keywords") as string;
  const ogImage = formData.get("ogImage") as File | null;

  // Implement your logic to save the form data, e.g., to a database
  console.log("Form submitted:", {
    subdomain,
    blogTitle,
    blogDescription,
    authorName,
    keywords,
    // Handle ogImage as needed
  });

  // Optionally, revalidate the page cache after form submission
  revalidatePath("/blogs");

  return { success: true };
}

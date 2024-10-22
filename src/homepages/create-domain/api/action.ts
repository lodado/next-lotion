"use server";

export async function createBlogAction(formData: FormData) {
  const subdomain = formData.get("subdomain") as string;
  const blogTitle = formData.get("blogTitle") as string;
  const blogDescription = formData.get("blogDescription") as string;
  const authorName = formData.get("authorName") as string;
  const mainLanguage = formData.get("mainLanguage") as string;
  const ogImage = formData.get("ogImage") as File | null;

  // Implement your logic to save the form data, e.g., to a database
  console.log("Form submitted:", {
    subdomain,
    blogTitle,
    blogDescription,
    authorName,
    keywords: mainLanguage,
    // Handle ogImage as needed
  });

  return { success: true };
}

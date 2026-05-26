import BlogPublicBlogPostSlugComponent from "./_private/component";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <BlogPublicBlogPostSlugComponent
      blogPostPrisma={{
        slug,
      }}
    />
  );
}

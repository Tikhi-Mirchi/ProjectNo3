import TemplatePreviewClient from "../_components/TemplatePreviewClient";

interface PageProps {
  params: { slug: string };
}

export default function TemplatePreviewPage({ params }: PageProps) {
  return <TemplatePreviewClient slug={params.slug} />;
}


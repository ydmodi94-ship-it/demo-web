import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCategory, products } from "@/data/products";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { btn } from "@/components/site/styles";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category;
    const title = `${c?.name ?? "Category unavailable"} | ChemCore Industries (Demo)`;
    const desc = c?.description ?? "Category not found.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const list = products.filter((p) => p.category === category.slug);
  return (
    <>
      <PageHeader eyebrow="Category" title={category.name}>{category.description}</PageHeader>
      <div className="container-page py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{list.length} sample products</p>
          <Link to="/products" search={{ category: category.slug }} className={btn.outline}>Open in catalogue filters</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </div>
    </>
  );
}

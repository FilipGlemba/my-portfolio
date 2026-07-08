import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { Roadmap } from "@/components/roadmap";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <CategoryGrid />
      <Roadmap />
    </div>
  );
}

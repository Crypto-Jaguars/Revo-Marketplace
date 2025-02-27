import { ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategoryList } from '@/components/categories/CategoryList';

export default function Page() {
  return (
    <div className="container py-8 flex justify-center">
      <div className="grid gap-8 md:grid-cols-[250px_1fr] w-full max-w-6xl">
        <Card className="h-fit p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Menu className="h-5 w-5" />
          </div>
          <div className="space-y-2 mb-4">
            {[
              'Fresh Fruits',
              'Fresh Vegetables',
              'Organic Produce',
              'Citrus Fruits',
              'Berries & Grapes',
            ].map((filter) => (
              <button
                key={filter}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted"
              >
                {filter}
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}
          </div>
          <Button className="w-full bg-[#2F513F] hover:bg-[#2F513F]/90">Apply Filter</Button>
        </Card>

        <main className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Categories</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Showing 1-12 of 24 categories</span>
            </div>
          </div>

          <CategoryList />

          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" className="gap-2">
              <ChevronRight className="h-4 w-4 rotate-180" />
              Previous
            </Button>

            {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
              <Button
                key={index}
                variant={page === 1 ? 'secondary' : 'outline'}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}

            <Button variant="outline" className="gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

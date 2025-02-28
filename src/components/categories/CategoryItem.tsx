import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryIcon } from './CategoryIcon';
import type { Category } from './types';

interface CategoryItemProps {
  category: Category;
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="group transition-colors hover:bg-muted/50">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="mb-4 rounded-full bg-background p-2 ring-1 ring-border group-hover:bg-background/50">
            <CategoryIcon
              icon={category.icon}
              className="h-6 w-6 transition-colors group-hover:text-primary"
            />
          </div>
          <span className="text-sm font-medium">{category.name}</span>
        </CardContent>
      </Card>
    </Link>
  );
}

import type { Category } from './types';
import { CategoryItem } from './CategoryItem';

interface CategoryListProps {
  categories?: Category[];
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Fresh Fruits', icon: 'apple', slug: 'fresh-fruits' },
  { id: '2', name: 'Fresh Vegetables', icon: 'carrot', slug: 'fresh-vegetables' },
  { id: '3', name: 'Organic Produce', icon: 'leaf', slug: 'organic-produce' },
  { id: '4', name: 'Citrus Fruits', icon: 'citrus', slug: 'citrus-fruits' },
  // Repeat for grid demonstration
  { id: '5', name: 'Fresh Fruits', icon: 'apple', slug: 'fresh-fruits-2' },
  { id: '6', name: 'Fresh Vegetables', icon: 'carrot', slug: 'fresh-vegetables-2' },
  { id: '7', name: 'Organic Produce', icon: 'leaf', slug: 'organic-produce-2' },
  { id: '8', name: 'Citrus Fruits', icon: 'citrus', slug: 'citrus-fruits-2' },
  { id: '9', name: 'Fresh Fruits', icon: 'apple', slug: 'fresh-fruits-3' },
  { id: '10', name: 'Fresh Vegetables', icon: 'carrot', slug: 'fresh-vegetables-3' },
  { id: '11', name: 'Organic Produce', icon: 'leaf', slug: 'organic-produce-3' },
  { id: '12', name: 'Citrus Fruits', icon: 'citrus', slug: 'citrus-fruits-3' },
];

export function CategoryList({ categories = defaultCategories }: CategoryListProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

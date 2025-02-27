import { Apple, Carrot, Leaf, Citrus } from 'lucide-react';

interface Category {
  icon: 'apple' | 'carrot' | 'leaf' | 'citrus';
}

interface CategoryIconProps {
  icon: Category['icon'];
  className?: string;
}

const iconMap = {
  apple: Apple,
  carrot: Carrot,
  leaf: Leaf,
  citrus: Citrus,
};

export function CategoryIcon({ icon, className }: CategoryIconProps) {
  const Icon = iconMap[icon];
  return <Icon className={className} />;
}

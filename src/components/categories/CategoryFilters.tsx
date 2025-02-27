import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function Filters() {
  return (
    <aside className="hidden md:block">
      <Card className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Filters</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Fresh Fruits</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="fresh-fruits" />
              <Label htmlFor="fresh-fruits" className="text-sm">
                Fresh Fruits
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Fresh Vegetables</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="fresh-vegetables" />
              <Label htmlFor="fresh-vegetables" className="text-sm">
                Fresh Vegetables
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Organic Produce</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="organic-produce" />
              <Label htmlFor="organic-produce" className="text-sm">
                Organic Produce
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Citrus Fruits</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="citrus-fruits" />
              <Label htmlFor="citrus-fruits" className="text-sm">
                Citrus Fruits
              </Label>
            </div>
          </div>
          <Button className="w-full">Apply Filter</Button>
        </div>
      </Card>
    </aside>
  );
}

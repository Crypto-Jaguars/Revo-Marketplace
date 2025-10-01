'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const HexagonDemo = () => {
  const [activeDemo, setActiveDemo] = useState('variants');

  const demoSections = [
    { id: 'variants', label: 'Button Variants' },
    { id: 'sizes', label: 'Size Options' },
    { id: 'effects', label: '3D Effects' },
    { id: 'interactions', label: 'Interactions' },
  ];

  const ButtonVariantsDemo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="text-center space-y-2">
          <Button variant="hexagon-base" size="hexagon-md">
            Base
          </Button>
          <p className="text-sm text-gray-600">Basic 3D hexagon with subtle effects</p>
        </div>
        
        <div className="text-center space-y-2">
          <Button variant="hexagon-elevated" size="hexagon-md">
            Elevated
          </Button>
          <p className="text-sm text-gray-600">Enhanced depth with beveled edges</p>
        </div>
        
        <div className="text-center space-y-2">
          <Button variant="hexagon-premium" size="hexagon-md">
            Premium
          </Button>
          <p className="text-sm text-gray-600">Metallic finish with deep shadows</p>
        </div>
        
        <div className="text-center space-y-2">
          <Button variant="hexagon-secondary" size="hexagon-md">
            Secondary
          </Button>
          <p className="text-sm text-gray-600">Secondary color scheme</p>
        </div>
        
        <div className="text-center space-y-2">
          <Button variant="hexagon-accent" size="hexagon-md">
            Accent
          </Button>
          <p className="text-sm text-gray-600">Accent color with elevation</p>
        </div>
      </div>
    </div>
  );

  const SizeOptionsDemo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-6 flex-wrap">
        <div className="text-center space-y-2">
          <Button variant="hexagon-base" size="hexagon-sm">
            SM
          </Button>
          <p className="text-sm text-gray-600">Small (2rem)</p>
        </div>
        
        <div className="text-center space-y-2">
          <Button variant="hexagon-elevated" size="hexagon-md">
            MD
          </Button>
          <p className="text-sm text-gray-600">Medium (3rem)</p>
        </div>
        
        <div className="text-center space-y-2">
          <Button variant="hexagon-premium" size="hexagon-lg">
            LG
          </Button>
          <p className="text-sm text-gray-600">Large (4rem)</p>
        </div>
        
        <div className="text-center space-y-2">
          <Button variant="hexagon-base" size="hexagon-xl">
            XL
          </Button>
          <p className="text-sm text-gray-600">Extra Large (5rem)</p>
        </div>
      </div>
    </div>
  );

  const EffectsDemo = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shadow Depths</CardTitle>
            <CardDescription>Base, Medium, and Deep shadow variants</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <div className="hexagon-shape hexagon-shadow-base hexagon-primary hexagon-md flex items-center justify-center text-white text-xs">
              Base
            </div>
            <div className="hexagon-shape hexagon-shadow-medium hexagon-primary hexagon-md flex items-center justify-center text-white text-xs">
              Medium
            </div>
            <div className="hexagon-shape hexagon-shadow-deep hexagon-primary hexagon-md flex items-center justify-center text-white text-xs">
              Deep
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Surface Effects</CardTitle>
            <CardDescription>Convex and metallic surface treatments</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <div className="hexagon-shape hexagon-convex hexagon-primary hexagon-md flex items-center justify-center text-white text-xs">
              Convex
            </div>
            <div className="hexagon-shape hexagon-metallic hexagon-primary hexagon-md flex items-center justify-center text-white text-xs">
              Metallic
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">3D Transforms</CardTitle>
            <CardDescription>Perspective and rotation effects</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <div className="hexagon-shape hexagon-3d-base hexagon-primary hexagon-md flex items-center justify-center text-white text-xs">
              Base
            </div>
            <div className="hexagon-shape hexagon-3d-elevated hexagon-primary hexagon-md flex items-center justify-center text-white text-xs">
              Elevated
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const InteractionsDemo = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transition Types</CardTitle>
            <CardDescription>Different animation curves</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="hexagon-shape hexagon-transition-smooth hexagon-hover hexagon-primary hexagon-md flex items-center justify-center text-white text-xs cursor-pointer">
                Smooth
              </div>
              <p className="text-xs text-gray-600">Cubic bezier ease</p>
            </div>
            <div className="text-center space-y-2">
              <div className="hexagon-shape hexagon-transition-bounce hexagon-hover hexagon-primary hexagon-md flex items-center justify-center text-white text-xs cursor-pointer">
                Bounce
              </div>
              <p className="text-xs text-gray-600">Elastic bounce effect</p>
            </div>
            <div className="text-center space-y-2">
              <div className="hexagon-shape hexagon-transition-elastic hexagon-hover hexagon-primary hexagon-md flex items-center justify-center text-white text-xs cursor-pointer">
                Elastic
              </div>
              <p className="text-xs text-gray-600">Spring-like motion</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Interactive States</CardTitle>
            <CardDescription>Hover and active feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <Button variant="hexagon-base" size="hexagon-md">
                Hover Me
              </Button>
              <p className="text-xs text-gray-600">Enhanced on hover</p>
            </div>
            <div className="text-center space-y-2">
              <Button variant="hexagon-elevated" size="hexagon-md">
                Click Me
              </Button>
              <p className="text-xs text-gray-600">Press feedback</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Accessibility</CardTitle>
            <CardDescription>Focus and keyboard navigation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <Button variant="hexagon-premium" size="hexagon-md">
                Tab Focus
              </Button>
              <p className="text-xs text-gray-600">Keyboard accessible</p>
            </div>
            <div className="text-center space-y-2">
              <Button variant="hexagon-accent" size="hexagon-md" disabled>
                Disabled
              </Button>
              <p className="text-xs text-gray-600">Proper disabled state</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDemo = () => {
    switch (activeDemo) {
      case 'variants':
        return <ButtonVariantsDemo />;
      case 'sizes':
        return <SizeOptionsDemo />;
      case 'effects':
        return <EffectsDemo />;
      case 'interactions':
        return <InteractionsDemo />;
      default:
        return <ButtonVariantsDemo />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">3D Hexagon Effects System</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A comprehensive collection of 3D hexagon button effects with realistic shadows, 
          highlights, beveled edges, and smooth transitions that make hexagons look like physical buttons.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          {demoSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveDemo(section.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeDemo === section.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className="bg-white rounded-lg border p-8">
        {renderDemo()}
      </div>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
          <CardDescription>How to use the 3D hexagon effects in your components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Button Component Usage:</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<Button variant="hexagon-base" size="hexagon-md">
  Your Content
</Button>

<Button variant="hexagon-elevated" size="hexagon-lg">
  Enhanced Button
</Button>

<Button variant="hexagon-premium" size="hexagon-xl">
  Premium Button
</Button>`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Available CSS Classes:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Shape & Base:</strong>
                <ul className="list-disc list-inside text-gray-600 mt-1">
                  <li><code>hexagon-shape</code> - Basic hexagon shape</li>
                  <li><code>hexagon-button-base</code> - Complete base button</li>
                  <li><code>hexagon-button-elevated</code> - Enhanced button</li>
                  <li><code>hexagon-button-premium</code> - Premium button</li>
                </ul>
              </div>
              <div>
                <strong>Shadows & Effects:</strong>
                <ul className="list-disc list-inside text-gray-600 mt-1">
                  <li><code>hexagon-shadow-base/medium/deep</code> - Shadow depths</li>
                  <li><code>hexagon-highlight-top/left</code> - Lighting effects</li>
                  <li><code>hexagon-bevel</code> - Beveled edges</li>
                  <li><code>hexagon-convex/metallic</code> - Surface effects</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HexagonDemo;

import React, { useEffect, useRef, useState } from 'react';

interface SmoothScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const SmoothScrollContainer: React.FC<SmoothScrollContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    // Add smooth scrolling behavior
    element.style.scrollBehavior = 'smooth';
    
    // Optimize scroll performance
    element.style.willChange = 'scroll-position';
    element.style.contain = 'layout style paint';

    // Add momentum scrolling for iOS - properly typed
    (element.style as any).webkitOverflowScrolling = 'touch';

    return () => {
      if (element) {
        element.style.willChange = 'auto';
      }
    };
  }, []);

  return (
    <div 
      ref={scrollRef}
      className={`overflow-auto ${className}`}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent'
      }}
    >
      {children}
    </div>
  );
};

// Virtual scrolling for large lists
export const VirtualizedList: React.FC<{
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
}> = ({ items, itemHeight, containerHeight, renderItem, className = '' }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div 
      ref={scrollElementRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {items.slice(visibleStart, visibleEnd).map((item, index) => (
          <div
            key={visibleStart + index}
            style={{
              position: 'absolute',
              top: (visibleStart + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            {renderItem(item, visibleStart + index)}
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
    children: React.ReactNode;
    disableOnMobile?: boolean;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
    children,
    disableOnMobile = true,
}) => {
    const { ref, isVisible } = useScrollAnimation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const shouldAnimate = !(disableOnMobile && isMobile);

    const animationClass = `
  transition-all duration-[1000ms] ease-out transform
  ${shouldAnimate && !isVisible ? 'opacity-0 translate-y-[50px]' : ''}
  ${shouldAnimate && isVisible ? 'opacity-100 translate-y-0' : ''}`;


    return (
        <div ref={ref} className={animationClass}>
            {children}
        </div>
    );
};

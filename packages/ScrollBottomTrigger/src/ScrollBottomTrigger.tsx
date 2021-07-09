import React, {ReactElement, ReactNode, useRef} from 'react';
import { Box } from '@chakra-ui/react';

export interface ScrollBottomTriggerProps {
    height: string;
    scrollBottomCallback?: any;
}

const ScrollBottomTrigger: React.FC<ScrollBottomTriggerProps> = ({height = '300px', scrollBottomCallback, children}) => {
    const containerRef = useRef<HTMLDivElement| null>(null)
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
        if(scrollTop + clientHeight >= scrollHeight){
            scrollBottomCallback()
          }
    }

    return <Box ref={containerRef} overflow='auto' height={height} onScroll={handleScroll
    }>
        {children}
    </Box>
}

export default ScrollBottomTrigger
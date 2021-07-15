import React, {useRef} from 'react';
import { Box } from '@chakra-ui/react';
import { always } from 'ramda';

always(undefined);

export interface ScrollBottomTriggerProps {
    maxHeight: string;
    scrollBottomCallback?: any;
}

const ScrollBottomTrigger: React.FC<ScrollBottomTriggerProps> = ({maxHeight = '300px', scrollBottomCallback, children}) => {
    const containerRef = useRef<HTMLDivElement| null>(null)
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
        if(scrollTop + clientHeight >= scrollHeight){
            scrollBottomCallback()
          }
    }

    return <Box ref={containerRef} overflow='auto' maxHeight={maxHeight} onScroll={handleScroll
    }>
        {children}
    </Box>
}

export default ScrollBottomTrigger
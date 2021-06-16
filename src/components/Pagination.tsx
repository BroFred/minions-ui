import React from 'react';
import {
    IconButton,
    Button,
    Icon,
    Flex
} from "@chakra-ui/react"
import { map, range, splitAt, takeLast, take, filter } from 'ramda';
import { FaEllipsisH, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
export interface PaginationProps {
    pageLength: number;
    page:{
        currentPage: number;
        onPageChange: ( page: number)=> {};
    };
}



const Pagination = ({ pageLength, page:{currentPage, onPageChange} }: PaginationProps): JSX.Element => {
    const pages = range(1, pageLength + 1);
    const [heads, tails ] = splitAt(currentPage - 1, pages);
    const midHeads = takeLast(Math.min(currentPage - 1, 2), heads);
    const midTails = take(5 - Math.min(currentPage - 1, 2), tails);
    const compensation = 5 - midHeads.length - midTails.length;
    const mid = filter((v:number)=>v>0,[...range((midHeads[0]||0)-compensation, midHeads[0]||0),...midHeads,...midTails]);

    return <Flex>
     <IconButton onClick={()=>onPageChange(Math.max(1, currentPage - 1))} aria-label="pagination" icon={<Icon as={FaAngleLeft} color='nl.02'/>}></IconButton>
    {
        mid[0]!==1 && <Button onClick={()=>onPageChange(1)} size="md" key={1} color={1===currentPage ? 'pri.01' : 'nl.02'} mx={1}  fontSize={'sm'} borderRadius={'base'}>{1}</Button>
    }
    {
    mid[0] - 1 >1 &&
        <IconButton onClick={()=>onPageChange(Math.max(1, currentPage - 5))} aria-label="pagination" icon={<Icon as={FaEllipsisH} color='nl.02'/>}></IconButton>
    }
    {map(
        (num) => <Button onClick={()=>onPageChange(num)} onsize="md" key={num} color={num===currentPage ? 'pri.01' : 'nl.02'} mx={1}  fontSize={'sm'} borderRadius={'base'}>{num}</Button>,
        mid
    )}
    {mid[4] + 1 < pageLength &&
        <IconButton onClick={()=>onPageChange(Math.min(pageLength, currentPage + 5))} aria-label="pagination" icon={<Icon as={FaEllipsisH} color='nl.02'/>}></IconButton>
    }
    {
        mid[4]< pageLength &&  <Button size="md"  onClick={()=>onPageChange(pageLength)} key={pageLength} color={pageLength===currentPage ? 'pri.01' : 'nl.02'} mx={1}  fontSize={'sm'} borderRadius={'base'}>{pageLength}</Button>
    }
     <IconButton aria-label="pagination" onClick={()=>onPageChange(Math.min(pageLength, currentPage + 1))} icon={<Icon as={FaAngleRight} />} color='nl.02'></IconButton>
    </Flex>
}

export default Pagination;
import React from 'react';
import {
    IconButton,
    Icon,
    Flex
} from "@chakra-ui/react"
import {Button} from './Button.tsx';
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
     <IconButton  variant='secondary-outline' size='sm' onClick={()=>onPageChange(Math.max(1, currentPage - 1))} aria-label="pagination" color='nl.02' icon={<Icon as={FaAngleLeft} />}/>
    {
        mid[0]!==1 && <Button mode='secondary-outline' size='sm' onClick={()=>onPageChange(1)} key={1} borderColor={1===currentPage ? 'pri.01' : 'nl.05'} color={1===currentPage ? 'pri.01' : 'nl.02'} mx={1}  fontSize={'sm'} borderRadius={'base'}>{1}</Button>
    }
    {
    mid[0] - 1 >1 &&
        <IconButton   variant='secondary-outline' size='sm' onClick={()=>onPageChange(Math.max(1, currentPage - 5))} aria-label="pagination" icon={<Icon as={FaEllipsisH} color='nl.02'/>}/>
    }
    {map(
        (num) => <Button mode='secondary-outline' size='sm' onClick={()=>onPageChange(num)} key={num} borderColor={num===currentPage ? 'pri.01' : 'nl.05'} color={num===currentPage ? 'pri.01' : 'nl.02'} mx={1}  fontSize={'sm'} borderRadius={'base'}>{num}</Button>,
        mid
    )}
    {mid[4] + 1 < pageLength &&
        <IconButton  variant='secondary-outline' size='sm' onClick={()=>onPageChange(Math.min(pageLength, currentPage + 5))} aria-label="pagination" color='nl.02' icon={<Icon as={FaEllipsisH}/>}/>
    }
    {
        mid[4]< pageLength &&  <Button size='sm' mode='secondary-outline' onClick={()=>onPageChange(pageLength)} key={pageLength} color={pageLength===currentPage ? 'pri.01' : 'nl.02'} mx={1}  fontSize={'sm'} borderRadius={'base'}>{pageLength}</Button>
    }
     <IconButton size='sm'  variant='secondary-outline' aria-label="pagination" onClick={()=>onPageChange(Math.min(pageLength, currentPage + 1))} color='nl.02' icon={<Icon as={FaAngleRight} />}/>
    </Flex>
}

export default Pagination;
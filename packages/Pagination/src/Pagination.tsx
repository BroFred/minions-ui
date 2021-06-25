import React from 'react';
import {
    IconButton,
    Icon,
    Flex,
    useStyleConfig,
} from "@chakra-ui/react"
import Button from '@minion-ui/button';
import { map, range, splitAt, takeLast, take, filter } from 'ramda';
import { FaEllipsisH, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
export interface PaginationProps {
    pageLength: number;
    page: {
        currentPage: number;
        onPageChange: (page: number) => {};
    };
}

export const paginationTheme = {
        baseStyle: ({ colorMode }: { colorMode: string }) => (
            {
                color: colorMode === "light" ? 'nl.02' : 'nl.02',
                fontSize: "sm",
                borderRadius:'base',
                mx: 1,
            }),
};

const Pagination = ({ pageLength, page: { currentPage, onPageChange } }: PaginationProps): JSX.Element => {
    const pages = range(1, pageLength + 1);
    const [heads, tails] = splitAt(currentPage - 1, pages);
    const midHeads = takeLast(Math.min(currentPage - 1, 2), heads);
    const midTails = take(5 - Math.min(currentPage - 1, 2), tails);
    const compensation = 5 - midHeads.length - midTails.length;
    const mid = filter((v: number) => v > 0, [...range((midHeads[0] || 0) - compensation, midHeads[0] || 0), ...midHeads, ...midTails]);
    const styles = useStyleConfig('Pagination',{});

    return <Flex>
        <IconButton variant='secondary-outline' size='sm' onClick={() => onPageChange(Math.max(1, currentPage - 1))} aria-label="pagination" sx={styles} icon={<Icon as={FaAngleLeft} />} />
        {
            mid[0] !== 1 && <Button mode='secondary-outline' size='sm' onClick={() => onPageChange(1)} key={1} isActive={1 === currentPage} sx={styles}>{1}</Button>
        }
        {
            mid[0] - 1 > 1 &&
            <IconButton variant='secondary-outline' size='sm' onClick={() => onPageChange(Math.max(1, currentPage - 5))} aria-label="pagination" sx={styles} icon={<Icon as={FaEllipsisH} />} />
        }
        {map(
            (num) => <Button mode='secondary-outline' size='sm' onClick={() => onPageChange(num)} key={num} isActive={num === currentPage}  sx={styles}>{num}</Button>,
            mid
        )}
        {mid[4] + 1 < pageLength &&
            <IconButton variant='secondary-outline' size='sm' onClick={() => onPageChange(Math.min(pageLength, currentPage + 5))} aria-label="pagination" sx={styles} icon={<Icon as={FaEllipsisH} />} />
        }
        {
            mid[4] < pageLength && <Button size='sm' mode='secondary-outline' onClick={() => onPageChange(pageLength)} key={pageLength} isActive={pageLength === currentPage} sx={styles}>{pageLength}</Button>
        }
        <IconButton variant='secondary-outline' size='sm' aria-label="pagination" onClick={() => onPageChange(Math.min(pageLength, currentPage + 1))} sx={styles} icon={<Icon as={FaAngleRight} />} />
    </Flex>
}

export default Pagination;
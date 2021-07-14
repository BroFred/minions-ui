/// <reference types="react" />
export interface PaginationProps {
    pageLength: number;
    page: {
        currentPage: number;
        onPageChange: (page: number) => {};
    };
}
export declare const paginationTheme: {
    baseStyle: ({ colorMode }: {
        colorMode: string;
    }) => {
        color: string;
        fontSize: string;
        borderRadius: string;
        mx: number;
    };
};
declare const Pagination: ({ pageLength, page: { currentPage, onPageChange } }: PaginationProps) => JSX.Element;
export default Pagination;

import React from 'react';
declare type textAlign = 'left' | 'right' | undefined;
declare type size = 'sm' | 'mid' | 'lg' | undefined;
declare type sort = {
    sortKey: string;
    isSortedDesc: boolean | undefined;
};
export interface TableText {
    children: React.ReactNode;
    size?: size;
    textAlign?: textAlign;
}
export interface ThSortProps extends TableText {
    sortKey: string;
    sort: [sort, React.Dispatch<React.SetStateAction<sort>>];
}
interface TableProps {
    children: ((arg: any) => React.ReactNode[])[];
    strip?: boolean;
    columns: any[];
    data: any[][];
    template: 'auto' | 'even' | Array<number>;
    enableCollapse: boolean;
    showRange: number;
}
interface TdCollapsedProps {
    children: (arg: any) => React.ReactNode[];
    row: unknown[];
}
export declare const CellContainer: ({ children, textAlign }: {
    children: any;
    textAlign: textAlign;
}) => JSX.Element;
export declare const ThRow: ({ children }: {
    children: React.ReactNode[];
}) => JSX.Element;
export declare const ThPure: ({ children, size, textAlign }: TableText) => JSX.Element;
export declare const ThSort: ({ children, sort, size, textAlign, sortKey }: ThSortProps) => JSX.Element;
export declare const TdPure: ({ children, size, textAlign }: TableText) => JSX.Element;
export declare const TdCollapsed: ({ children, row }: TdCollapsedProps) => JSX.Element;
export declare const Table: ({ children, strip, columns, data, template, enableCollapse, showRange }: TableProps) => JSX.Element;
export {};

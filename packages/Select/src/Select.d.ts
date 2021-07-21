import React from 'react';
import { ButtonProps } from '@minion-ui/button';
declare type size = 'sm' | 'md' | 'lg';
declare type status = 'default' | 'disabled' | 'warning' | 'error';
export interface SelectProps extends ButtonProps {
    select: {
        items: {
            value: string | number;
            label: string;
        }[];
        currentSelection: string | number[];
    };
    setSelect: (param: object | string) => void;
}
interface SelectLayoutProps extends SelectProps {
    width?: string;
    height?: string;
    size?: size;
    status?: status;
    children: ((arg: any) => React.ReactNode[])[];
}
interface SelectHeaderProps extends SelectProps {
    placeholder?: string;
}
interface SelectOptionProps extends SelectProps {
    value: string;
    label: string;
    currentSelection: string | number[];
}
export declare const MultipleSelect: {
    ({ select, setSelect, placeholder }: SelectHeaderProps): JSX.Element;
    Option({ value, label, currentSelection, setSelect, ...others }: SelectOptionProps): JSX.Element;
};
export declare const SelectLayout: ({ select, children, setSelect, width, size, status, mode, colorScheme, ...others }: SelectLayoutProps) => JSX.Element;
export declare const SingleSelect: {
    ({ select, placeholder }: SelectHeaderProps): JSX.Element;
    Option({ value, label, setSelect, currentSelection, ...others }: SelectOptionProps): JSX.Element;
};
export default MultipleSelect;

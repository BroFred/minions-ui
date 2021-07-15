import React from 'react';
export interface SelectProps {
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
    Option({ value, label, currentSelection, setSelect }: SelectOptionProps): JSX.Element;
};
export declare const SelectLayout: ({ select, children, setSelect, ...others }: SelectLayoutProps) => JSX.Element;
export declare const SingleSelect: {
    ({ select, placeholder }: SelectHeaderProps): JSX.Element;
    Option({ value, label, setSelect, currentSelection }: SelectOptionProps): JSX.Element;
};
export default MultipleSelect;

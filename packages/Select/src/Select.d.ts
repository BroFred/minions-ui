import React from 'react';
export interface SelectProps {
    select: {
        items: {
            value: string | number;
            label: string;
        }[];
        currentSelection: string | number[];
    };
    setSelect: (param: object) => void;
}
interface LayoutSelectProps extends SelectProps {
    children: ((arg: any) => React.ReactNode[])[];
}
interface MultipleSelectProps extends SelectProps {
    placeholder?: string;
}
interface MultipleOptionProps extends SelectProps {
    value: string;
    label: string;
    currentSelection: number[];
}
export declare const MultipleSelect: {
    ({ select, setSelect, placeholder }: MultipleSelectProps): JSX.Element;
    Option({ value, label, currentSelection, setSelect }: MultipleOptionProps): JSX.Element;
};
export declare const SelectLayout: ({ select, children, setSelect, ...others }: LayoutSelectProps) => JSX.Element;
export default MultipleSelect;

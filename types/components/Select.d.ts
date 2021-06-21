/// <reference types="react" />
import { SelectProps as SelectPropsC } from '@chakra-ui/react';
interface SelectProps extends SelectPropsC {
    items: {
        value: unknown;
        label: string;
    }[];
}
declare const Select: {
    ({ select }: SelectProps): JSX.Element;
    Option({ value, label, currentSelection, setSelect }: {
        value: any;
        label: any;
        currentSelection: any;
        setSelect: any;
    }): JSX.Element;
};
interface multiSelect {
    select: {
        items: {
            value: string | number;
            label: string;
        }[];
        currentSelection: string | number[];
        filter: string | number;
    };
}
export declare const MultipleSelect: {
    ({ select, setSelect }: multiSelect): JSX.Element;
    Option({ value, label, currentSelection, setSelect }: {
        value: any;
        label: any;
        currentSelection: any;
        setSelect: any;
    }): JSX.Element;
};
export declare const SelectLayout: ({ select, children, setSelect }: {
    select: any;
    children: any;
    setSelect: any;
}) => JSX.Element;
export default Select;

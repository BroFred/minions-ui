import React from 'react';
import { ButtonProps as CButtonProps } from "@chakra-ui/react";
declare type size = 'sm' | 'md' | 'lg';
interface VariantProps {
    size: size;
    colorMode: 'light' | 'dark';
}
export declare const ButtonTheme: {
    baseStyle: {
        _focus: {
            boxShadow: string;
        };
    };
    variants: {
        primary: (props: VariantProps) => {
            bg: string;
            color: string;
            _hover: {
                bg: string;
            };
            _active: {
                bg: string;
            };
            _disabled: {
                pointerEvents: string;
                bg: string;
                color: string;
                opacity: number;
            };
            minWidth: string;
            height: string;
            borderRadius: string;
            fontSize: string;
        };
        secondary: (props: VariantProps) => {
            bg: string;
            color: string;
            borderWidth: string;
            borderColor: string;
            borderStyle: string;
            _hover: {
                bg: string;
            };
            _active: {
                bg: string;
            };
            _disabled: {
                pointerEvents: string;
                bg: string;
                color: string;
                borderColor: string;
                opacity: number;
            };
            minWidth: string;
            height: string;
            borderRadius: string;
            fontSize: string;
        };
        tertiary: (props: VariantProps) => {
            bg: string;
            color: string;
            _hover: {
                color: string;
            };
            _disabled: {
                pointerEvents: string;
                color: string;
                opacity: number;
            };
            minWidth: string;
            height: string;
            borderRadius: string;
            fontSize: string;
        };
        text: (props: VariantProps) => {
            minWidth: string;
            fontSize: string;
            bg: string;
            color: string;
            _hover: {
                color: string;
            };
            _active: {
                color: string;
            };
            _disabled: {
                pointerEvents: string;
                color: string;
                opacity: number;
            };
        };
        'secondary-outline': (props: VariantProps) => {
            bg: string;
            color: string;
            borderRadius: string;
            borderWidth: string;
            borderColor: string;
            borderStyle: string;
            minWidth: string;
            minHeight: string;
            textAlign: string;
            padding: string;
            _active: {
                borderColor: string;
                color: string;
            };
        };
    };
    defaultProps: {
        variant: string;
    };
};
export interface ButtonProps extends CButtonProps {
    /**
     * button type
     */
    mode?: 'primary' | 'secondary' | 'tertiary' | 'text' | 'secondary-outline';
    /**
     * button size
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Button contents
     */
    children: any;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}
/**
 * Primary UI component for user interaction
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;

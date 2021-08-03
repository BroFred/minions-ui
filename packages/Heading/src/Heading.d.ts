import React from 'react';
import { HeadingProps as CHeadingProps } from "@chakra-ui/react";
type size = '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
interface VariantProps {
    size: size;
    colorMode: 'light' | 'dark';
}
export declare const HeadingTheme: {
    sizes: {
        '4xl': {
            lineHeight: string,
            fontSize: string,
            fontWeight: number,
        },
        '3xl': {
            lineHeight: string,
            fontSize: string,
            fontWeight: number,
        },
        '2xl': {
            lineHeight: string,
            fontSize: string,
            fontWeight: number,
        },
        xl: {
            lineHeight: string,
            fontSize: string,
            fontWeight: number,
        },
        lg: {
            lineHeight: string,
            fontSize: string,
            fontWeight: number,
        },
        md: {
            lineHeight: string,
            fontSize: string,
            fontWeight: number,
        },
        sm: {
            lineHeight: string,
            fontSize: string,
            fontWeight: number,
        },
        xs: {
            lineHeight: string,
            fontSize: string,
            fontWeight: number,
        },
    },
    variants: {
        'high-emphasis': (props: VariantProps) => ({
            color: string,
        }),
        'meidum-emphasis': (props: VariantProps) => ({
            color: string,
        }),
        'low-emphasis': (props: VariantProps) => ({
            color: string,
        }),
        placeholder: (props: VariantProps) => ({
            color: string,
        }),
    };
    defaultProps: {
        variant: string;
    };
};
export interface HeadingProps extends CHeadingProps {
    /**
     * Heading size
     */
    size?: size;
    /**
     * Heading contents
     */
    children: any;
}
/**
 * Primary UI component for user interaction
 */
export declare const Heading: React.FC<HeadingProps>;
export default Heading;

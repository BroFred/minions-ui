import React from 'react';
import {
  Heading as CHeading,
  HeadingProps as CHeadingProps,
  forwardRef,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { always } from 'ramda';

always(undefined);

type size = '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

interface VariantProps {
  size: size;
  colorMode: 'light' | 'dark';
}

export const HeadingTheme = {
  sizes: {
    '4xl': {
      lineHeight: '3rem',
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    '3xl': {
      lineHeight: '2.5rem',
      fontSize: '2rem',
      fontWeight: 500,
    },
    '2xl': {
      lineHeight: '2rem',
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    xl: {
      lineHeight: '1.75rem',
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    lg: {
      lineHeight: '1.5rem',
      fontSize: '1rem',
      fontWeight: 500,
    },
    md: {
      lineHeight: '1.25rem',
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    sm: {
      lineHeight: '1rem',
      fontSize: '0.75rem',
      fontWeight: 500,
    },
    xs: {
      lineHeight: '1rem',
      fontSize: '0.75rem',
      fontWeight: 'normal',
    },
  },
  variants: {
    'high-emphasis': (props: VariantProps) => ({
      color: mode('nl.800', 'nd.100')(props),
    }),
    'meidum-emphasis': (props: VariantProps) => ({
      color: mode('nl.700', 'nd.200')(props),
    }),
    'low-emphasis': (props: VariantProps) => ({
      color: mode('nl.600', 'nd.300')(props),
    }),
    placeholder: (props: VariantProps) => ({
      color: mode('nl.500', 'nd.400')(props),
    }),
  },
  defaultProps: {
    variant: 'meidum-emphasis',
  },
};

export interface HeadingProps extends CHeadingProps {
  /**
   * heading size
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

export const Heading = forwardRef<HeadingProps, 'div'>(
  ({ size = 'md', children, ...others }, ref) => {
    return (
      <CHeading ref={ref} size={size} {...others}>
        {children}
      </CHeading>
    );
  },
);

export default Heading;

import React from 'react';
import { Button as CButton, ButtonProps as CButtonProps } from "@chakra-ui/react";
import { always } from 'ramda';

always(undefined);

type size = 'sm' | 'md' | 'lg';
interface VariantProps {
  size: size;
  colorMode: 'light' | 'dark';
  colorScheme: string;
}
const getPaddings = (size: size):object => {
 const paddings = {
  'lg': {
    py: '0.875rem',
    px: '1rem',
  },
  'md': {
    py: '0.625rem',
    px: '1rem',
  },
  'sm': {
    py: '0.375rem',
    px: '1rem',
  }
 }
 return paddings[size];
}
const defaultStyle = {
  minWidth: '2rem',
  height: 'auto',
  borderRadius: '0.25rem',
  fontSize: '0.875rem',
}
export const ButtonTheme = { 
  baseStyle: {
     _focus: { boxShadow: 'none' } 
  },
  variants: {
    primary: (props: VariantProps) => ({
      ...getPaddings(props.size),
      ...defaultStyle,
      bg: `${props.colorScheme}.500`,
      color: 'nd.50',
      _hover:{
       bg: `${props.colorScheme}.300`,
      },
      _active: {
        bg: `${props.colorScheme}.700`,
        color: props.colorMode === 'light' ? 'nd.50' : 'nd.100'
      },
      _disabled: {
        pointerEvents: 'none',
        bg: props.colorMode === 'light' ? 'nl.200': 'nd.700',
        color: props.colorMode === 'light' ? 'nl.400' : 'nd.500',
        opacity: 1,
      }
    }),
    secondary: (props: VariantProps) => ({
      ...getPaddings(props.size),
      ...defaultStyle,
      bg: props.colorMode === 'light' ? 'nd.50' : 'nd.900',
      color: props.colorMode === 'light' ? 'nl.700' : 'nd.300',
      borderWidth: '0.063rem',
      borderColor: props.colorMode === 'light' ? 'nl.600' : 'nd.300',
      borderStyle: 'solid',
      _hover:{
        bg: props.colorMode === 'light' ? `${props.colorScheme}.50` : 'nd.600' ,
        color: props.colorMode === 'light' ? 'nl.600' : 'nd.300'
      },
      _active: {
        bg: props.colorMode === 'light' ? `${props.colorScheme}.100` : 'nd.500',
        color: props.colorMode === 'light' ? 'nl.700' : 'nd.200',
        borderColor: props.colorMode === 'light' ? 'nl.700' : 'nd.200',
      },
      _disabled: {
        pointerEvents: 'none',
        bg: props.colorMode === 'light' ? 'nd.50' : 'nd.900',
        color: props.colorMode === 'light' ? 'nl.400' : 'nd.500',
        borderColor: props.colorMode === 'light' ? 'nl.400' : 'nd.500',
        opacity: 1,
      },
    }),
    tertiary: (props: VariantProps) => {
      return {...getPaddings(props.size),
      ...defaultStyle,
      bg: props.colorMode === 'light' ? 'nl.300' : 'nd.600',
      color: props.colorMode === 'light' ? 'nl.700' : 'nd.200',
      _hover: {
        color: props.colorMode === 'light' ? `${props.colorScheme}.300` : 'nd.100',
      },
      _active: {
        color: props.colorMode === 'light' ? `${props.colorScheme}.700` : 'nd.300'
      },
      _disabled: {
        pointerEvents: 'none',
        bg: props.colorMode === 'light' ? 'nl.200' : '#2C2E35',
        color: props.colorMode === 'light' ? 'nl.400' : 'nd.400',
        opacity: 1,
      }}
    },
    text: (props: VariantProps) => ({
      ...getPaddings(props.size),
      minWidth: '2rem',
      fontSize: '0.875rem',
      bg: 'transprent',
      color: props.colorMode === 'light' ? `${props.colorScheme}.500` : 'nd.200',
      _hover:{
        color: props.colorMode === 'light' ? `${props.colorScheme}.300` : 'nd.100',
      },
      _active: {
        color: props.colorMode === 'light' ? `${props.colorScheme}.700` : 'nd.300',
      },
      _disabled: {
        pointerEvents: 'none',
        color:  props.colorMode === 'light' ? 'nl.300' : 'nd.500',
        opacity: 1,
      }
    }),
    'secondary-outline': (props: VariantProps) => ({
      bg: props.colorMode === 'light' ? 'nl.13' : 'nl.13',
      color: props.colorMode === 'light' ? 'nl.02' : 'nl.02',
      borderRadius: '0.25rem',
      borderWidth: '0.063rem',
      borderColor: props.colorMode === 'light' ? 'nl.05' : 'nl.05',
      borderStyle: 'solid',
      minWidth: '2rem',
      minHeight: '2rem',
      textAlign: 'center',
      padding: '0.312rem 0.25rem',
      _active: {
        borderColor: props.colorMode === 'light' ? 'pri.01' : 'pri.01',
        color: props.colorMode === 'light' ? 'pri.01' : 'pri.01',
      }
    })
  },
  defaultProps: {
    variant: 'primary',
  }
}


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
export const Button: React.FC<ButtonProps> = ({
  mode = 'primary',
  size = 'md',
  children,
  ...others
}) => {
  return (
    <CButton variant={mode} size={size} {...others}>
      {children}
    </CButton>  
  )
};

export default Button;
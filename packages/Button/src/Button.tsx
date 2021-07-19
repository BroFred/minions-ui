import React from 'react';
import { Button as CButton, ButtonProps as CButtonProps, useColorModeValue } from "@chakra-ui/react";
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
        color: useColorModeValue('nd.50', 'nd.100'),
      },
      _disabled: {
        pointerEvents: 'none',
        bg: useColorModeValue('nl.200', 'nd.700'),
        color: useColorModeValue('nl.400', 'nd.500'),
        opacity: 1,
      }
    }),
    secondary: (props: VariantProps) => ({
      ...getPaddings(props.size),
      ...defaultStyle,
      bg: useColorModeValue('nd.50', 'nd.900'),
      color: useColorModeValue('nl.700', 'nd.300'),
      borderWidth: '0.063rem',
      borderColor: useColorModeValue('nl.600', 'nd.300'),
      borderStyle: 'solid',
      _hover:{
        bg: useColorModeValue(`${props.colorScheme}.50`, 'nd.600'),
        color: useColorModeValue('nl.600', 'nd.300'),
      },
      _active: {
        bg: useColorModeValue(`${props.colorScheme}.100`, 'nd.500'),
        color: useColorModeValue('nl.700', 'nd.200'),
        borderColor: useColorModeValue('nl.700', 'nd.200'),
      },
      _disabled: {
        pointerEvents: 'none',
        bg: useColorModeValue('nd.50', 'nd.900'),
        color: useColorModeValue('nl.400', 'nd.500'),
        borderColor: useColorModeValue('nl.400', 'nd.500'),
        opacity: 1,
      },
    }),
    tertiary: (props: VariantProps) => {
      return {...getPaddings(props.size),
      ...defaultStyle,
      bg: useColorModeValue('nl.300', 'nd.600'),
      color: useColorModeValue('nl.700', 'nd.200'),
      _hover: {
        color: useColorModeValue(`${props.colorScheme}.300`, 'nd.100'),
      },
      _active: {
        color: useColorModeValue(`${props.colorScheme}.700`, 'nd.300'),
      },
      _disabled: {
        pointerEvents: 'none',
        bg: useColorModeValue('nl.200', 'nd.700'),
        color: useColorModeValue('nl.400', 'nd.400'),
        opacity: 1,
      }}
    },
    text: (props: VariantProps) => ({
      ...getPaddings(props.size),
      minWidth: '2rem',
      fontSize: '0.875rem',
      bg: 'transprent',
      color: useColorModeValue(`${props.colorScheme}.500`, 'nd.200'),
      _hover:{
        color: useColorModeValue(`${props.colorScheme}.300`, 'nd.100'),
      },
      _active: {
        color: useColorModeValue(`${props.colorScheme}.700`, 'nd.300'),
      },
      _disabled: {
        pointerEvents: 'none',
        color:  useColorModeValue('nl.300', 'nd.500'),
        opacity: 1,
      }
    }),
    'secondary-outline': (props: VariantProps) => ({
      bg: 'transprent',
      color: useColorModeValue('blue.400', 'blue.300'), 
      borderRadius: '0.25rem',
      minWidth: '1.5rem',
      height: '1.5rem',
      textAlign: 'center',
      padding: '0.312rem 0.25rem',
      _active: {
        borderWidth: '0.063rem',
        borderColor:  useColorModeValue('blue.500', 'blue.300'),
        borderStyle: 'solid',
        color: useColorModeValue('blue.500', 'blue.300'),
        bg: useColorModeValue('blue.50', 'blue.800'),
        _hover: {
          bg: useColorModeValue('blue.100', 'blue.700'),
        }
      },
      _hover: {
        color: useColorModeValue('blue.400', 'blue.300'),
        bg: useColorModeValue('nl.200', 'nd.600')
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
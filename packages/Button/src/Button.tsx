import React from 'react';
import { Button as CButton, ButtonProps as CButtonProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools"
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
        color: mode("nd.50", "nd.100")(props),

      },
      _disabled: {
        pointerEvents: 'none',
        bg: mode("nl.200", "nd.700")(props),
        color: mode("nl.400", "nd.500")(props),
        opacity: 1,
      }
    }),
    secondary: (props: VariantProps) => ({
        ...getPaddings(props.size),
        ...defaultStyle,
        bg: mode("nd.50", "nd.900")(props),
        color: mode("nl.700", "nd.300")(props),
        borderWidth: '0.063rem',
        borderColor: mode("nl.600", "nd.300")(props),
        borderStyle: 'solid',
        _hover:{
          bg: mode("nl.200", "nd.600")(props),
          color: mode("nl.600", "nd.300")(props),
          borderColor: mode("nl.600", "nd.300")(props),
        },
        _active: {
          bg: mode("nl.300", "nd.500")(props),
          color: mode("nl.600", "nd.200")(props),
          borderColor: mode("nl.600", "nd.200")(props),
        },
        _disabled: {
          pointerEvents: 'none',
          bg: mode("nd.50", "nd.900")(props),
          color: mode("nl.400", "nd.500")(props),
          borderColor: mode("nl.400", "nd.500")(props),
          opacity: 1,
        },
    }),
    tertiary: (props: VariantProps) => {
      const colorScheme = props.colorScheme
      const darkColorScheme = colorScheme === 'nl' ? 'nd': props.colorScheme
      return {...getPaddings(props.size),
      ...defaultStyle,
      bg: mode(`${colorScheme}.200`, `${darkColorScheme}.600`)(props),
      color: mode("nl.700", "nd.200")(props),
      _hover: {
        bg: mode(`${colorScheme}.300`, `${darkColorScheme}.500`)(props
          ),
      },
      _active: {
        bg: mode(`${colorScheme}.400`, `${darkColorScheme}.700`)(props),
      },
      _disabled: {
        pointerEvents: 'none',
        bg: mode(`${colorScheme}.200`, `${darkColorScheme}.700`)(props),
        color: mode("nl.400", "nd.500")(props),
        opacity: 1,
      }}
    },
    text: (props: VariantProps) => {
      const colorScheme = props.colorScheme
      const darkColorScheme = colorScheme === 'nl' ? 'nd': props.colorScheme
      return {
        ...getPaddings(props.size),
        minWidth: '2rem',
        fontSize: '0.875rem',
        bg: 'transprent',
        color: mode(`${colorScheme}.600`, `${darkColorScheme}.300`)(props),
        _hover:{
          color: mode(`${colorScheme}.900`, `${darkColorScheme}.100`)(props),
        },
        _active: {
          color: mode(`${colorScheme}.900`, `${darkColorScheme}.100`)(props),
        },
        _disabled: {
          pointerEvents: 'none',
          color:  mode(`${colorScheme}.300`, `${darkColorScheme}.500`)(props),
          opacity: 1,
        }
      }
    },
    'secondary-outline': (props: VariantProps) => ({
      bg: 'transprent',
      color: mode("nl.600", "nd.300")(props), 
      borderRadius: '0.25rem',
      minWidth: '1.5rem',
      height: '1.5rem',
      textAlign: 'center',
      padding: '0.375rem 0.25rem',
      _active: {
        borderWidth: '0.0625rem',
        borderColor:  mode("blue.500", "blue.300")(props),
        borderStyle: 'solid',
        color: mode("blue.500", "blue.300")(props),
        bg: mode("blue.50", "blue.800")(props),
        _hover: {
          bg: mode("blue.100", "blue.700")(props),
        }
      },
      _hover: {
        color: mode("nl.600", "nd.300")(props),
        bg: mode("nl.200", "nd.600")(props)
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
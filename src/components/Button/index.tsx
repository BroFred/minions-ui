import React from 'react';
import { Button as CButton, ButtonProps as CButtonProps } from "@chakra-ui/react";
// import {ButtonProps as CButtonProps} from '@chakra-ui/button';

export interface ButtonProps extends CButtonProps {
  /**
   * button type
   */
  mode?: 'primary' | 'secondary' | 'tertiary' | 'text';
  /**
   * button size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  children: any;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * button disable status
   */
  disabled?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  mode = 'primary',
  size = 'medium',
  children,
  ...others
}) => {
  let buttonProps: object = {
    borderRadius: '0.25rem',
    height: 'auto',
  };
  switch (mode) {
    case 'primary':
      buttonProps = {
        ...buttonProps,
        bg: 'pri.01',
        color: 'nl.13',
        _hover:{
          bg: "pri.02",
        },
        _active: {
          bg: 'pri.03'
        },
        _disabled: {
          pointerEvents: 'none',
          bg: 'nl.06',
          color: 'nl.04',
        }
      }
      break;
    case 'secondary': 
      buttonProps = {
        ...buttonProps,
        bg: 'nl.13',
        color: 'nl.03',
        borderWidth: '0.063rem',
        borderColor: 'nl.03',
        borderStyle: 'solid',
        _hover:{
          bg: "nl.11",
        },
        _active: {
          bg: 'nl.12'
        },
        _disabled: {
          pointerEvents: 'none',
          bg: 'nl.13',
          color: 'nl.05',
          borderColor: 'nl.05',
        }
      }
      break;
    case 'tertiary': 
      buttonProps = {
        ...buttonProps,
        bg: 'nl.06',
        color: 'pri.03',
        _hover:{
          color: 'pri.02',
        },
        _disabled: {
          pointerEvents: 'none',
          color: 'nl.04',
        }
      }
      break;  
    case 'text': 
      buttonProps = {
        bg: 'transprent',
        color: 'pri.01',
        _hover:{
          color: 'pri.02',
        },
        _active: {
          color: 'pri.03',
        },
        _disabled: {
          pointerEvents: 'none',
          color: 'nl.05',
        }
      }
      break;  
    default:
      break;
  }
  const sizeStyle = {
    'large': {
      padding: '0.875rem 1rem',
    },
    'medium': {
      padding: '0.625rem 1rem'
    },
    'small': {
      padding: '0.375rem 1rem'
    }
  }
  buttonProps = {
    ...buttonProps,
    ...sizeStyle[size]
  }

  return (
    <CButton {...buttonProps} {...others}>
      {children}
    </CButton> 
  );
};

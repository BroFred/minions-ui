import React from 'react';
import { Button as CButton, ButtonProps as CButtonProps } from "@chakra-ui/react";

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
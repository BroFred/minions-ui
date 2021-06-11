import React from 'react';
import { Button as CButton, ButtonGroup } from "@chakra-ui/react"

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  mode?: 'primary' | 'secondary' | 'tertiary' | 'text';
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
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
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  let buttonProps;
  switch (mode) {
    case 'primary':
      buttonProps = {
        bg: 'pri.01',
        color: 'white',
        _hover:{
          background: "pri.02",
        }
      }
      break;
  
    default:
      break;
  }

  return (
    <CButton {...buttonProps}>
      Button
  </CButton>
    
  );
};

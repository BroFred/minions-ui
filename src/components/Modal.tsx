import React from 'react';
import 
{
  Modal as CModal,
  ModalOverlay,
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalProps as CModalProps,
  ModalBody,
  ModalFooter,
  useColorMode,
} from '@chakra-ui/react';
import { Button } from './Button';

interface BtnProps {
  content: string;
  callBack?: any;
}
export interface ModalProps extends CModalProps {
  hasClose?: boolean;
  isOpen: boolean;
  title: string;
  content?: any;
  extraFootInfo?: any;
  cancelBtn?: BtnProps;
  confirmBtn: BtnProps;
}
export const Modal:React.FC<ModalProps> = ({
  isOpen,
  hasClose = true,
  title,
  content,
  extraFootInfo,
  cancelBtn,
  confirmBtn,
  ...others
}) => {
  const { colorMode } = useColorMode()
  const getJustify = () => {
    return extraFootInfo ? 'space-between ': 'flex-end';
  }
  const getSpecialCSS = () => {
    if (content) {
      return {};
    }
    return {
      textAlign: 'center',
      fontSize: '1rem',
      marginTop: '2rem'
    }
  }
  return (
    <CModal isOpen={isOpen} {...others} scrollBehavior={'inside'} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader px='2rem' py='1rem' {...getSpecialCSS()}>{title}</ModalHeader>
        {hasClose && <ModalCloseButton right='2rem' />}
        <ModalBody px='2rem' py='1rem' fontSize='0.875rem' color={`${colorMode === 'light' ? 'nl.02' : 'nl.02'}`}>
          {content}
        </ModalBody>
        <ModalFooter borderRadius='0.5rem' bg={`${colorMode === 'light' ? 'nl.10' : 'nl.10'}`} mt='1rem' px='2rem' py='0.75rem' justifyContent={getJustify()}>
          {extraFootInfo}
          <div>
            {!!cancelBtn && <Button mode='secondary' onClick={cancelBtn.callBack} mr='0.5rem'>{cancelBtn.content}</Button>}
            <Button onClick={confirmBtn.callBack}>{confirmBtn.content}</Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </CModal>
  )
}
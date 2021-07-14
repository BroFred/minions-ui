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
import Button, { ButtonProps } from '@minion-ui/button';
import { always } from 'ramda';

always(undefined);

interface BtnProps extends ButtonProps {
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
  const { colorMode } = useColorMode();
  const {content: confirmContent, callBack: confirmCallBack, ...otherConfirm} = confirmBtn;
  const {content: cancelContent, callBack: cancelCallBack, ...otherCancelBtn} = cancelBtn || {};
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
      paddingTop: '2rem'
    }
  }
  return (
    <CModal isOpen={isOpen} {...others} scrollBehavior={'inside'} trapFocus={false} >
      <ModalOverlay />
      <ModalContent boxShadow='16'>
        <ModalHeader px='2rem' py='1rem' bg={colorMode === 'light' ? 'nd.50' : 'nd.600'} color={colorMode === 'light' ? 'nl.900' : 'nd.100'}  {...getSpecialCSS()}>{title}</ModalHeader>
        {hasClose && <ModalCloseButton right='2rem' />}
        <ModalBody px='2rem' py='1rem' fontSize='0.875rem' bg={colorMode === 'light' ? 'nd.50' : 'nd.600'} color={`${colorMode === 'light' ? 'nl.700' : 'nd.200'}`}>
          {content}
        </ModalBody>
        <ModalFooter borderRadius='0.5rem' bg={colorMode === 'light' ? 'nl.50' : 'nd.800'}  px='2rem' pt='1.75rem' pb='0.75rem' justifyContent={getJustify()}>
          {extraFootInfo}
          <div>
            {!!cancelContent && <Button mode='secondary' onClick={cancelCallBack} mr='0.5rem' bg={colorMode === 'light' ? 'nd.50' : 'nd.800'} color={colorMode === 'light' ? 'nl.600' : 'nd.300'} _hover={{bg: colorMode === 'light' ? 'nl.50' : 'nd.600'}} _active={{bg: colorMode === 'light' ? 'nl.100' : 'nd.500'}} {...otherCancelBtn}>{cancelContent}</Button>}
            <Button onClick={confirmCallBack} {...otherConfirm}>{confirmContent}</Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </CModal>
  )
}

export default Modal;
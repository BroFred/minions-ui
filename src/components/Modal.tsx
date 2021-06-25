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
  [propName: string]: any;
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
  const { callBack: confirmCallBack, content: cBtnContent, ...confirmBtnOth } = confirmBtn;
  const { callBack: cancelCallBack, content: cancelContent, ...cancelBtnOth } = cancelBtn;
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
      <ModalContent boxShadow='16'>
        <ModalHeader px='2rem' py='1rem' {...getSpecialCSS()}>{title}</ModalHeader>
        {hasClose && <ModalCloseButton right='2rem' />}
        <ModalBody px='2rem' py='1rem' fontSize='0.875rem' color={`${colorMode === 'light' ? 'nl.02' : 'nl.02'}`}>
          {content}
        </ModalBody>
        <ModalFooter borderRadius='0.5rem' bg={`${colorMode === 'light' ? 'nl.10' : 'nl.10'}`} mt='1rem' px='2rem' py='0.75rem' justifyContent={getJustify()}>
          {extraFootInfo}
          <div>
            {!!cancelBtn && <Button mode='secondary' onClick={cancelCallBack} mr='0.5rem' {...cancelBtnOth}>{cancelContent}</Button>}
            <Button onClick={confirmCallBack} {...confirmBtnOth}>{cBtnContent}</Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </CModal>
  )
}

export default Modal;
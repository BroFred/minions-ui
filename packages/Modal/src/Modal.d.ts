import React from 'react';
import { ModalProps as CModalProps } from '@chakra-ui/react';
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
export declare const Modal: React.FC<ModalProps>;
export default Modal;

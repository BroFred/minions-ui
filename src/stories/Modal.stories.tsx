import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Modal, ModalProps } from '../components/Modal';
import { Button } from '../components/Button';
import { useDisclosure, Input } from '@chakra-ui/react';

export default {
  title: 'Modal',
  component: Modal,
} as Meta

const Template:Story<ModalProps> = (args) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  args = {
    ...args,
    title: '标题',
    size: 'md',
    trapFocus: false,
    content: (
      <div>
        <div>小型弹窗内容，请随意添加内容，考虑到内容多的时候可以使用</div>
        <Input m='0.25rem' placeholder="custom content" />
        <p>hfkdsjfhk</p>
      </div>
    ),
    confirmBtn: {
      content: '确定',
      callBack: () => {
        alert(111);
        onClose();
      }
    },
    cancelBtn: {
      content: '取消',
      callBack: () => {
        alert('取消');
        onClose();
      }
    },
    extraFootInfo: <div color='nl.02'>额外操作</div>
  }

  return (
    <div>
      <Button size='lg' onClick={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export const mdModal = Template.bind({});
mdModal.args = {}

const NocontentTemplate:Story<ModalProps> = (args) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  args = {
    ...args,
    title: '只有一行标题',
    size: 'md',
    confirmBtn: {
      content: '确定',
      callBack: () => {
        alert(111);
        onClose();
      }
    },
  }

  return (
    <div>
      <Button size='lg' onClick={onOpen}>Open another Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={onClose} />
    </div>
  )
}
export const NocontentModal = NocontentTemplate.bind({});
NocontentTemplate.args = {}
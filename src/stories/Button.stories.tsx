import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EmailIcon } from '@chakra-ui/icons';

import { Button, ButtonProps } from '../components/Button';

export default {
  title: 'Example/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;
const IconTemplate: Story<ButtonProps> = (args) => <Button  w={200} {...args}><div><EmailIcon style={{marginRight: '0.25rem'}}/>邮件</div></Button>

export const Primary = Template.bind({});
Primary.args = {
  mode: 'primary',
  children: 'Button',
  disabled: false,
  onClick: () => {
    alert(111)
  },
};

export const SecondaryWithIcon = IconTemplate.bind({});
SecondaryWithIcon.args = {
  mode: 'secondary',
  size: 'large',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  mode: 'tertiary',
  size: 'large',
  children: 'Button',
};

export const Text = Template.bind({});
Text.args = {
  mode: 'text',
  size: 'large',
  children: 'Button',
}
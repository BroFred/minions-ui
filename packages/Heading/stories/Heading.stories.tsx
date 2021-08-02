import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EmailIcon } from '@chakra-ui/icons';

import { Heading, HeadingProps } from '../src/Heading';

export default {
  title: 'Heading',
  component: Heading,
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args} />;
const IconTemplate: Story<HeadingProps> = (args) => <Heading  w={200} {...args}><div><EmailIcon style={{marginRight: '0.25rem'}}/>邮件</div></Heading>

export const HighEmphasis = Template.bind({});
HighEmphasis.args = {
  children: 'high-emphasis',
  size:'md',
  variant:'high-emphasis'
};
export const MeidumEmphasis = Template.bind({});
MeidumEmphasis.args = {
  children: 'meidum-emphasis',
  size:'md',
  variant:'meidum-emphasis'
};
export const LowEmphasis = Template.bind({});
LowEmphasis.args = {
  children: 'low-emphasis',
  size:'md',
  variant:'low-emphasis'
};
export const Placeholder = Template.bind({});
Placeholder.args = {
  children: 'placeholder',
  size:'md',
  variant:'placeholder'
};
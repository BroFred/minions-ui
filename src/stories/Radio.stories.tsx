import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EmailIcon } from '@chakra-ui/icons';
import Radio from '../components/Radio';

import {  RadioProps, RadioGroup, Stack } from '@chakra-ui/react';
export default {
    title: 'Example/Radio',
    component: Radio,
} as Meta;

const Template: Story<RadioProps> = (args) => {
    const [value, setValue] = React.useState("1")
    return (
        <RadioGroup onChange={setValue} value={value}>
            <Stack direction="row">
                <Radio value="1" size="md">First</Radio>
                <Radio value="2" size="lg">Second</Radio>
                <Radio value="3" isDisabled>Third</Radio>
            </Stack>
        </RadioGroup>
    )
};

export const Primary = Template.bind({});
Primary.args = {

};
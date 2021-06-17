import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EmailIcon } from '@chakra-ui/icons';
import Checkbox from '../components/CheckBox';
import { CheckboxProps } from '@chakra-ui/react';

export default {
    title: 'Example/Checkbox',
    component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => {
    return (
        <>
            <Checkbox isDisabled>Checkbox</Checkbox>
            <Checkbox defaultIsChecked>
                Checkbox
        </Checkbox>
        </>
    )
};

export const Primary = Template.bind({});
Primary.args = {

};
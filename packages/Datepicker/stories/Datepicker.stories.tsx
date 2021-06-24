import  Datepicker, {DataContainerProps, ShowYearAndMonth, GoToMonthYear} from '../src/Datepicker';
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import {
    VStack,
    HStack
} from "@chakra-ui/react"
export default {
    title: 'Datepicker',
    component: Datepicker,
} as Meta;


const Template: Story<DataContainerProps> = ({selectedDate:sd}) => {
    const [selectedDate, onSelectedDateChange] = useState(sd);
    return <VStack> <HStack spacing="2rem"><GoToMonthYear direction="backward" date={{selectedDate, onSelectedDateChange}}/><ShowYearAndMonth selectedDate={selectedDate}/> <GoToMonthYear direction="forward" date={{selectedDate, onSelectedDateChange}}/></HStack><Datepicker date={{selectedDate, onSelectedDateChange}}/></VStack>
};

export const Basic = Template.bind({});
Basic.args = {
    selectedDate:'1995-10-01'
};
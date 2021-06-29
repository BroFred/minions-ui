import Datepicker, { DataContainerProps, ShowYearAndMonth, GoToMonthYear, RangeSelector } from '../src/Datepicker';
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import {
    VStack,
    HStack,
    Flex
} from "@chakra-ui/react"
import { F } from 'ramda';
export default {
    title: 'Datepicker',
    component: Datepicker,
} as Meta;


const Template: Story<DataContainerProps> = ({ selectedDate: sd }) => {
    const [selectedDate, onSelectedDateChange] = useState(sd);
    return <VStack> <HStack spacing="2rem"><GoToMonthYear direction="backward" date={{ selectedDate, onSelectedDateChange }} /><ShowYearAndMonth selectedDate={selectedDate} /> <GoToMonthYear direction="forward" date={{ selectedDate, onSelectedDateChange }} /></HStack><Datepicker date={{ selectedDate, onSelectedDateChange }} /></VStack>
};

export const Basic = Template.bind({});
Basic.args = {
    selectedDate: '1995-10-01'
};

const RangeTemplate: Story<any> = () => {
    const [selectedStartDate, onSelectedStartDateChange] = useState('1995-10-15');
    const [selectedEndDate, onSelectedEndDateChange] = useState('1995-10-31');
    return <Flex justifyContent="space-around"><RangeSelector startDate={{
        selectedDate: selectedStartDate, onSelectedDateChange: onSelectedStartDateChange
    }} endDate={{
        selectedDate: selectedEndDate, onSelectedDateChange: onSelectedEndDateChange
    }} /></Flex>
}

export const BasicRange = RangeTemplate.bind({});
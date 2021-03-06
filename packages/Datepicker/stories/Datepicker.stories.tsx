import Datepicker, { DataContainerProps, ShowYearAndMonth, GoToMonthYear, RangeSelector, TimePicker, RangeSelectorProps, TimePickerProps } from '../src/Datepicker';
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import {
    VStack,
    HStack,
    Flex
} from "@chakra-ui/react"
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

const RangeTemplate: Story<RangeSelectorProps> = () => {
    const [selectedStartDate, onSelectedStartDateChange] = useState('1995-10-15');
    const [selectedEndDate, onSelectedEndDateChange] = useState('1995-10-31');
    return <>
        <Flex justifyContent="center"><RangeSelector startDate={{
        selectedDate: selectedStartDate, onSelectedDateChange: onSelectedStartDateChange
    }} endDate={{
        selectedDate: selectedEndDate, onSelectedDateChange: onSelectedEndDateChange
    }} /></Flex>
    </>
}

export const BasicRange = RangeTemplate.bind({});

const TimePickerTemplate: Story<TimePickerProps> = ()=>{
    const [selectedTimeStart, onSelectedTimeChangeStart] = useState("9:10:10");
    const [selectedTimeEnd, onSelectedTimeChangeEnd] = useState("20:10:10");

   return <VStack>
       <TimePicker time={{selectedTime:selectedTimeStart, onSelectedTimeChange:onSelectedTimeChangeStart}} rangeEndTime={selectedTimeEnd}/>
       <TimePicker time={{selectedTime:selectedTimeEnd, onSelectedTimeChange:onSelectedTimeChangeEnd}} rangeStartTime={selectedTimeStart}/>
   </VStack>
}

export const BasicTmplate= TimePickerTemplate.bind({});

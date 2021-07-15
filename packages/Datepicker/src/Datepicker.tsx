import {
    Grid, Square, Heading, Flex, IconButton, VStack, HStack, NumberInput,
    NumberInputField, Text,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
} from '@chakra-ui/react';
import { map, range } from 'ramda';
import dayjs from 'dayjs';
import Button from '@minion-ui/button'
import { ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)
dayjs.extend(isBetween);

const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
export interface DataContainerProps {
    date: {
        selectedDate: string;
        onSelectedDateChange: (d: string) => void;
    }
    rangeStartDate?: string;
    rangeEndDate?: string;
}

export interface RangeSelectorProps {
    startDate: {
        selectedDate: string;
        onSelectedDateChange: (d: string) => void;
    }
    endDate: {
        selectedDate: string;
        onSelectedDateChange: (d: string) => void;
    }
}

export interface ShowYearAndMonthProps extends DataContainerProps {
    direction: 'forward' | 'backward';
    step?: number;
    limitDate?: string;
}
const DateContainer = ({ date: { selectedDate, onSelectedDateChange }, rangeStartDate, rangeEndDate }: DataContainerProps): JSX.Element => {
    const lastDayOfPrevMonth = dayjs(selectedDate).subtract(1, 'months').endOf('month');
    const lastWeekday = lastDayOfPrevMonth.day();
    const datePrefix = lastDayOfPrevMonth.subtract(lastWeekday, 'day').date();
    const dataPrefixArray = range(datePrefix, lastDayOfPrevMonth.date() + 1);

    const lastDayOfMonth = dayjs(selectedDate).endOf('month');
    const currentWeekday = 6 - lastDayOfMonth.day();
    const dateSuffix = lastDayOfMonth.add(currentWeekday, 'day').date();
    const dateSuffixArray = range(lastDayOfMonth.add(1, 'day').date(), dateSuffix + 1);

    let dateRange = [selectedDate, selectedDate];
    let disableFunc: (d: undefined | string) => boolean = () => !!(rangeStartDate || rangeEndDate);
    if (rangeStartDate || rangeEndDate) {
        if (rangeStartDate) {
            dateRange = [rangeStartDate, selectedDate];
            disableFunc = (d) => dayjs(d).isBefore(dateRange[0]);

        }
        if (rangeEndDate) {
            dateRange = [selectedDate, rangeEndDate];
            disableFunc = (d) => dayjs(d).isAfter(dateRange[1]);
        }
    }

    const [y, m] = selectedDate.split('-');
    return <Grid templateColumns={`repeat(${weekdays.length}, 1fr)`} gap={6}>
        {
            map((d) => <Square w="3rem" h="3rem" key={d}>{d}</Square>, weekdays)
        }
        {
            dataPrefixArray.length <= 6 &&
            map((d) => <Square w="3rem" h="3rem"><Button w="3rem" variant="link" key={d} colorScheme='gray'>{d}</Button></Square>, dataPrefixArray)
        }
        {
            map((d) => <Square w="3rem" h="3rem" 
            // border={
            //     dayjs(`${y}-${m}-${d}`).isBetween(dateRange[0], dateRange[1], null, '()') ? '1px solid grey' : `${dayjs(`${y}-${m}-${d}`).isBetween(dateRange[0], dateRange[1], null, '[]') ? '1px solid' : 'none'}`
            // } 
            bg={
                dayjs(`${y}-${m}-${d}`).isBetween(dateRange[0], dateRange[1], null, '()') ? 'blue.50' : `${dayjs(`${y}-${m}-${d}`).isBetween(dateRange[0], dateRange[1], null, '[]') ? 'blue.200' : 'nd.50'}`
            }><Button w="3rem"
                disabled={disableFunc(`${y}-${m}-${d}`)}
                colorScheme='gray'
                onClick={() => {
                    onSelectedDateChange([y, m, d].join('-'))
                }} variant="link" key={d}>{d}</Button></Square>, range(1, lastDayOfMonth.date() + 1))
        }
        {dateSuffixArray.length <= 6 &&
            map((d) => <Square w="3rem" h="3rem"><Button w="3rem" variant="link" key={d} colorScheme='gray'>{d}</Button></Square>, dateSuffixArray)
        }
    </Grid>
}


export const ShowYearAndMonth = ({ selectedDate }: { selectedDate: string; }): JSX.Element => {
    const day = dayjs(selectedDate);
    const year = day.year();
    const month = day.month();
    const date = day.date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return <Heading w="15rem" size="md" textAlign="center">{`${monthNames[month]} ${date} ${year}`}</Heading>
}


export const GoToMonthYear = ({ direction, step = 1, date: { selectedDate, onSelectedDateChange }, limitDate }: ShowYearAndMonthProps) => {
    let disableMonth = !!limitDate;
    let disabledYear = !!limitDate;
    if (limitDate && direction === 'forward') {
        disableMonth = dayjs(selectedDate).add(1, 'months').startOf('month').isAfter(limitDate);
        disabledYear = dayjs(selectedDate).add(1, 'years').startOf('year').isAfter(limitDate);
    }
    if (limitDate && direction === 'backward') {
        disableMonth = dayjs(selectedDate).subtract(1, 'months').endOf('month').isBefore(limitDate);
        disabledYear = dayjs(selectedDate).subtract(1, 'years').endOf('year').isBefore(limitDate);

    }
    const onMonthChange = () => {
        const newDate = direction === 'backward' ? dayjs(selectedDate).subtract(1, 'months').endOf('month') : dayjs(selectedDate).add(1, 'months').startOf('month');
        onSelectedDateChange(newDate.format('YYYY-MM-DD'));
    }
    const onYearChange = () => {
        const newDate = direction === 'backward' ? dayjs(selectedDate).subtract(1, 'year').endOf('month') : dayjs(selectedDate).add(1, 'year').startOf('month');
        onSelectedDateChange(newDate.format('YYYY-MM-DD'));
    }
    const icon = direction === 'backward' ? <Flex><IconButton disabled={disabledYear} variant="link" aria-label="go-to-year" icon={<ArrowLeftIcon />} colorScheme='gray' onClick={onYearChange} /><IconButton disabled={disableMonth} variant="link" aria-label="go-to-month" colorScheme='gray' onClick={onMonthChange} icon={<ChevronLeftIcon fontSize="1.7rem" />} /></Flex> :
        <Flex><IconButton disabled={disableMonth} variant="link" aria-label="go-to-month" colorScheme='gray' onClick={onMonthChange} icon={<ChevronRightIcon fontSize="1.7rem" />} /><IconButton variant="link" aria-label="go-to-year" icon={<ArrowRightIcon />} disabled={disabledYear} colorScheme='gray' onClick={onYearChange} /></Flex>

    return <Square w="3rem" h="3rem">{icon}</Square>
}

export const RangeSelector = ({ startDate, endDate }: RangeSelectorProps): JSX.Element => {
    return <>
        <VStack>
            <HStack spacing="2rem">
                <GoToMonthYear direction="backward" date={startDate} />
                <ShowYearAndMonth selectedDate={startDate.selectedDate} />
                <GoToMonthYear direction="forward" date={startDate} limitDate={endDate.selectedDate} />
            </HStack>
            <DateContainer date={startDate} rangeEndDate={endDate.selectedDate}></DateContainer>
        </VStack>
        <VStack>
            <HStack spacing="2rem">
                <GoToMonthYear direction="backward" date={endDate} limitDate={startDate.selectedDate} />
                <ShowYearAndMonth selectedDate={endDate.selectedDate} />
                <GoToMonthYear direction="forward" date={endDate} />
            </HStack>
            <DateContainer date={endDate} rangeStartDate={startDate.selectedDate}></DateContainer>
        </VStack>

    </>
}

export interface TimePickerProps {
    time: {
        selectedTime: string;
        onSelectedTimeChange: (param: string) => void;
    }
    rangeStartTime?: string;
    rangeEndTime?: string;
}

export const TimePicker = ({ time: { selectedTime, onSelectedTimeChange }, rangeStartTime = "0:0:0", rangeEndTime = "23:59:59" }: TimePickerProps): JSX.Element => {

    const preTime = dayjs(rangeStartTime, "H:m:s");
    const nextTime = dayjs(rangeEndTime, "H:m:s");
    const time = dayjs(selectedTime, "H:m:s");

    const h = time.hour();
    const m = time.minute();
    const s = time.second();

    const maxH = time.add(1, 'hour').isBetween(preTime, nextTime) ? time.add(1, 'hour').hour() : h;
    const minH = time.subtract(1, 'hour').isBetween(preTime, nextTime) ? time.subtract(1, 'hour').hour() : h;

    const maxM = time.add(1, 'minute').isBetween(preTime, nextTime) ? time.add(1, 'minute').minute() : m;
    const minM = time.subtract(1, 'minute').isBetween(preTime, nextTime) ? time.subtract(1, 'minute').minute() : m;

    const maxS = time.add(1, 'second').isBetween(preTime, nextTime) ? time.add(1, 'second').second() : s;
    const minS = time.subtract(1, 'second').isBetween(preTime, nextTime) ? time.subtract(1, 'second').second() : s;


    const onTimeChange = (t: { h?: string, m?: string, s?: string }) => {
        onSelectedTimeChange(`${t.h || h}:${t.m || m}:${t.s || s}`)
    }
    const numberInputStepperStyle = {
        _hover: {
            opacity: 1
        },
        opacity: 0.1
    }
    return <HStack>
        <NumberInput value={h} min={minH} max={maxH} onChange={(v) => onTimeChange({ h: v })} width="5rem">
            <NumberInputField />
            <NumberInputStepper {...numberInputStepperStyle}>
                <NumberIncrementStepper><AddIcon fontSize="xx-small" /></NumberIncrementStepper>
                <NumberDecrementStepper><MinusIcon fontSize="xx-small" /></NumberDecrementStepper>
            </NumberInputStepper>
        </NumberInput>
        <Box>:</Box>
        <NumberInput value={m} min={minM} max={maxM} onChange={(v) => onTimeChange({ m: v })} width="5rem">
            <NumberInputField />
            <NumberInputStepper {...numberInputStepperStyle}>
                <NumberIncrementStepper><AddIcon fontSize="xx-small" /></NumberIncrementStepper>
                <NumberDecrementStepper><MinusIcon fontSize="xx-small" /></NumberDecrementStepper>
            </NumberInputStepper>
        </NumberInput>
        <Box>:</Box>
        <NumberInput value={s} min={minS} max={maxS} onChange={(v) => onTimeChange({ s: v })} width="5rem">
            <NumberInputField />
            <NumberInputStepper {...numberInputStepperStyle}>
                <NumberIncrementStepper><AddIcon fontSize="xx-small" /></NumberIncrementStepper>
                <NumberDecrementStepper><MinusIcon fontSize="xx-small" /></NumberDecrementStepper>
            </NumberInputStepper>
        </NumberInput>
    </HStack>
}


export default DateContainer;
import { Grid, Square, Heading, Flex, IconButton } from '@chakra-ui/react';
import { map, range } from 'ramda';
import dayjs from 'dayjs';
import Button from '@minion-ui/button'
import {ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon} from '@chakra-ui/icons';

const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
export interface DataContainerProps {
    date: {
        selectedDate: string;
        onSelectedDateChange: () => {};
    }

}

export interface ShowYearAndMonthProps extends DataContainerProps{
    direction: 'forward' |  'backward';
    step: number;
}
const DateContainer = ({ date: { selectedDate, onSelectedDateChange } }: DataContainerProps): JSX.Element => {
    const lastDayOfPrevMonth = dayjs(selectedDate).subtract(1, 'months').endOf('month');
    const lastWeekday = lastDayOfPrevMonth.day();
    const datePrefix = lastDayOfPrevMonth.subtract(lastWeekday, 'day').date();
    const dataPrefixArray = range(datePrefix, lastDayOfPrevMonth.date() + 1);

    const lastDayOfMonth = dayjs(selectedDate).endOf('month');
    const currentWeekday = 6 - lastDayOfMonth.day();
    const dateSuffix = lastDayOfMonth.add(currentWeekday, 'day').date();
    const dateSuffixArray = range(lastDayOfMonth.add(1, 'day').date(), dateSuffix + 1);


    return <Grid templateColumns={`repeat(${weekdays.length}, 1fr)`} gap={6}>
        {
            map((d) => <Square w="3rem" h="3rem" key={d}>{d}</Square>, weekdays)
        }
        {
            dataPrefixArray.length <= 6 &&
            map((d) => <Square w="3rem" h="3rem"><Button w="3rem" variant="link" key={d}>{d}</Button></Square>, dataPrefixArray)
        }
        {
            map((d) => <Square w="3rem" h="3rem" border={Number(selectedDate.split('-')[2]) === Number(d) ? '1px solid' : 'none'}><Button w="3rem"
                onClick={() => {
                    const [y, m] = selectedDate.split('-');
                    onSelectedDateChange([y, m, d].join('-'))
                }} variant="link" key={d}>{d}</Button></Square>, range(1, lastDayOfMonth.date() + 1))
        }
        {dateSuffixArray.length <= 6 &&
            map((d) => <Square w="3rem" h="3rem"><Button w="3rem" variant="link" key={d}>{d}</Button></Square>, dateSuffixArray)
        }
    </Grid>
}


export const ShowYearAndMonth = ({ selectedDate }: {selectedDate:string;} ):JSX.Element => {
    const day = dayjs(selectedDate);
    const year = day.year();
    const month = day.month();
    const date = day.date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return <Heading w="15rem" size="md" textAlign="center">{`${monthNames[month]} ${date} ${year}`}</Heading>
}


export const GoToMonthYear = ({direction, step=1, date: { selectedDate, onSelectedDateChange } }: ShowYearAndMonthProps)=> {
    const onMonthChange = () => {
        const newDate = direction==='backward' ? dayjs(selectedDate).subtract(1, 'months').startOf('month') : dayjs(selectedDate).add(1, 'months').startOf('month');
        onSelectedDateChange( newDate.format('YYYY-MM-DD') );
    }
    const onYearChange = () => {
        const newDate = direction==='backward' ? dayjs(selectedDate).subtract(1, 'year').startOf('month') : dayjs(selectedDate).add(1, 'year').startOf('month');
        onSelectedDateChange( newDate.format('YYYY-MM-DD') );
    }
    const icon = direction==='backward' ? <Flex><IconButton variant="link" aria-label="go-to-year" icon={<ArrowLeftIcon/>} onClick={onYearChange}/><IconButton variant="link" aria-label="go-to-month" onClick={onMonthChange} icon={<ChevronLeftIcon fontSize="1.7rem"/>}/></Flex> :
    <Flex><IconButton variant="link" aria-label="go-to-month" onClick={onMonthChange} icon={<ChevronRightIcon fontSize="1.7rem"/>}/><IconButton variant="link" aria-label="go-to-year" icon={<ArrowRightIcon/>} onClick={onYearChange}/></Flex>
    return <Square w="3rem" h="3rem">{icon}</Square>
}

export default DateContainer;
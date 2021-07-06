/// <reference types="react" />
export interface DataContainerProps {
    date: {
        selectedDate: string;
        onSelectedDateChange: (d: string) => void;
    };
    rangeStartDate?: string;
    rangeEndDate?: string;
}
export interface RangeSelectorProps {
    startDate: {
        selectedDate: string;
        onSelectedDateChange: (d: string) => void;
    };
    endDate: {
        selectedDate: string;
        onSelectedDateChange: (d: string) => void;
    };
}
export interface ShowYearAndMonthProps extends DataContainerProps {
    direction: 'forward' | 'backward';
    step?: number;
    limitDate?: string;
}
declare const DateContainer: ({ date: { selectedDate, onSelectedDateChange }, rangeStartDate, rangeEndDate }: DataContainerProps) => JSX.Element;
export declare const ShowYearAndMonth: ({ selectedDate }: {
    selectedDate: string;
}) => JSX.Element;
export declare const GoToMonthYear: ({ direction, step, date: { selectedDate, onSelectedDateChange }, limitDate }: ShowYearAndMonthProps) => JSX.Element;
export declare const RangeSelector: ({ startDate, endDate }: RangeSelectorProps) => JSX.Element;
export default DateContainer;

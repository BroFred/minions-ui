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
export interface TimePickerProps {
    time: {
        selectedTime: string;
        onSelectedTimeChange: (param: string) => void;
    }
    rangeStartTime?: string;
    rangeEndTime?: string;
}

declare const DateContainer: ({ date: { selectedDate, onSelectedDateChange }, rangeStartDate, rangeEndDate }: DataContainerProps) => JSX.Element;
export declare const ShowYearAndMonth: ({ selectedDate }: {
    selectedDate: string;
}) => JSX.Element;
export declare const GoToMonthYear: ({ direction, step, date: { selectedDate, onSelectedDateChange }, limitDate }: ShowYearAndMonthProps) => JSX.Element;
export declare const RangeSelector: ({ startDate, endDate }: RangeSelectorProps) => JSX.Element;
export declare const TimePicker: ({ time: { selectedTime, onSelectedTimeChange }, rangeStartTime = "0:0:0", rangeEndTime = "23:59:59" }: TimePickerProps) => JSX.Element;
export default DateContainer;

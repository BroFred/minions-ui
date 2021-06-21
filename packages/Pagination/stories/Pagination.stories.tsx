import Pagination, { PaginationProps } from '../src/Pagination';
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';


export default {
    title: 'Pagination',
    component: Pagination,
} as Meta;


const Template: Story<PaginationProps> = (args) => {
    const [page, onPageChange] = useState(1);
    return <Pagination {...args} page={{
        currentPage: page,
        onPageChange
    }}></Pagination >
}

export const PaginationMany = Template.bind({});
PaginationMany.args = {
    pageLength: 1000
};


export const PaginationMinial = Template.bind({});
PaginationMinial.args = {
    pageLength: 1
};
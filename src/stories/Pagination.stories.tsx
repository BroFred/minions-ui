import Pagination, { PaginationProps } from '../components/Pagination';
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';


export default {
    title: 'Pagination',
    component: Pagination,
} as Meta;


const Template: Story<PaginationProps> = (args) => {
    const [page, onPageChange] = useState(1);
    console.log(page)
    return <Pagination {...args} page={{
        currentPage: page,
        onPageChange
    }}></Pagination >
}

export const PaginationTemplate = Template.bind({});
PaginationTemplate.args = {
    pageLength: 1000
};
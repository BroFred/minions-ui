import React, {useState, } from 'react';
import { Story, Meta } from '@storybook/react';
import SqlEditor from '../src/SqlEditor';

const SqlEditorTemplate: Story = () => {
    return <SqlEditor tableSignal='/table' />
}

export const SqlEditorStory = SqlEditorTemplate.bind({})

export default {
    title: 'SqlEditor',
    component: SqlEditorStory,
} as Meta;
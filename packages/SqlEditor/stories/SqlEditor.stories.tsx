import React, {useState, } from 'react';
import { Story, Meta } from '@storybook/react';
import SqlEditor from '../src/SqlEditor';
// import './test.css'

const SqlEditorTemplate: Story = () => {
    return <SqlEditor value='' autoComplete={true} tableName='' tableSignal='/t' wrapClassname='junior' />
}

export const SqlEditorStory = SqlEditorTemplate.bind({})

export default {
    title: 'SqlEditor',
    component: SqlEditorStory,
} as Meta;
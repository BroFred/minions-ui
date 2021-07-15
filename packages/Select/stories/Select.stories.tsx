import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import MultipleSelect, { SelectLayout, SingleSelect, SelectProps } from '../src/Select';
import { map, filter } from 'ramda';


export default {
    title: 'Select',
    component: MultipleSelect,
} as Meta;

const MutliTemplate: Story<SelectProps> = (args) => {
    const [select, setSelect] = useState({
        currentSelection: [1,7,3],
        items: [
            { value: 1, label: 'apple' }, { value: 2, label: 'orange' }, { value: 3, label: 'blanana' },
            { value: 4, label: 'Apples' }, { value: 5, label: 'Oranges' }, { value: 6, label: 'Blananas' },
            { value: 7, label: 'pink' }, { value: 8, label: 'yellow' }, { value: 9, label: 'blue' }

        ],
    });
    return (
        <SelectLayout select={select}  setSelect={setSelect}  width='25rem'>
            {
                (selection, setSelection) => <MultipleSelect select={selection} setSelect={setSelection} placeholder='请输入内容'/>
            }
            {
               (selection, setSelection) => map(({ value, label }) => <MultipleSelect.Option key={value} value={value} label={label} currentSelection={selection.currentSelection} setSelect={(v) => {
                setSelection({
                    ...selection,
                    currentSelection: selection.currentSelection.includes(v) ? filter((elem)=>elem!==v, selection.currentSelection) : [ ...selection.currentSelection,v]
                })
            }} />,selection.items)
            }
        </SelectLayout>
    )
}; 

export const multiple = MutliTemplate.bind({});
multiple.args = {
};

const SingleTemplate: Story<SelectProps> = (args) => {
    const [select, setSelect] = useState({
        currentSelection: '',
        items: [{ label: '英语',value: 'english' },{label: '中文',value: 'chinese'}, {label: '数学', value: 'math'}]
    })
    return (
        <SelectLayout select={select} setSelect={setSelect} width='12rem' height='2rem'>
            {
                (selection) => <SingleSelect select={selection}/>
            }
            {
               (selection, setSelection) => map(({ value, label }) => <SingleSelect.Option key={value} value={value} label={label} width='20rem' currentSelection={selection.currentSelection} setSelect={(v) => {
                setSelection({
                    ...selection,
                    currentSelection: v
                })
            }} />,  selection.items)
            }
        </SelectLayout>
    )
}

export const single = SingleTemplate.bind({});
single.args = {
};
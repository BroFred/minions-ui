import React, {useState, useMemo} from 'react';
import { Story, Meta } from '@storybook/react';
import SqlEditor from '../src/SqlEditor';
import { tableList } from '../src/data';
import { zipObj } from 'ramda';
// import './test.css'

const SqlEditorTemplate: Story = () => {
    const [currentValue, setCurrentValue] = useState<string>('');
    console.log('story', currentValue);
    const sqlTables = useMemo(() => zipObj(tableList.map((item) => item.name), tableList.map((item) => item.data.map((column) => column.name))), [tableList]);
    return <><SqlEditor value='' autoComplete={true} tables={sqlTables} tableName='price' wrapClassname='junior' callback={setCurrentValue} />
        <p>{currentValue}</p>
    </>
}

export const SqlEditorStory = SqlEditorTemplate.bind({})

export default {
    title: 'SqlEditor',
    component: SqlEditorStory,
} as Meta;
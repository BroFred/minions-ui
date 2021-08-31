import React, {useState, useMemo} from 'react';
import { Story, Meta } from '@storybook/react';
import SqlEditor from '../src/SqlEditor';
import { tableList } from '../src/data';
import { zipObj, clone } from 'ramda';
// import './test.css'

const SqlEditorTemplate: Story = () => {
    const [currentValue, setCurrentValue] = useState<string>('');
    console.log('story', currentValue);
    const sqlTables = useMemo(() => zipObj(clone(tableList).sort().map((item) => item.name), clone(tableList).sort().map((item) => item.data.map((column) => column.name))), [tableList]);
    return <><SqlEditor value='' autoComplete={true} tables={{}} tableName='price' wrapClassname='junior' callback={setCurrentValue} />
        <p>{currentValue}</p>
        <div id='123456'>123456</div>
    </>
}

export const SqlEditorStory = SqlEditorTemplate.bind({})

export default {
    title: 'SqlEditor',
    component: SqlEditorStory,
} as Meta;
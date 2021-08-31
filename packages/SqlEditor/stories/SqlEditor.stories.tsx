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
    return <><SqlEditor value='' autoComplete={true} tables={sqlTables} tableName='price' wrapClassname='junior' callback={setCurrentValue} />
        <p>{currentValue}</p>
        <div>123456</div>
    </>
}

const SqlEditorDragDropTemplate: Story = () => {
    const [currentValue, setCurrentValue] = useState<string>('');
    console.log('story', currentValue);
    const sqlTables = useMemo(() => zipObj(clone(tableList).sort().map((item) => item.name), clone(tableList).sort().map((item) => item.data.map((column) => column.name))), [tableList]);
    return <><SqlEditor value='' autoComplete={true} tables={{}} tableName='price' wrapClassname='junior' callback={setCurrentValue} />
        <p>{currentValue}</p>
        <div id='123456' draggable
              onDragStart={(ev) => {
                console.log('dragStart');
                ev.dataTransfer.setData('text', '爷来啦');
                // ev.currentTarget.style.border = 'dashed';
                ev.dataTransfer.dropEffect = 'copy';
                // ev.effectAllowed = 'copyMove';
              }}
              onDragEnd={(ev) => {
                console.log('dragEnd');
                ev.dataTransfer.clearData();
              }}>Drag Me</div>
    </>
}

export const SqlEditorStory = SqlEditorTemplate.bind({});

export const SqlEditorDragDropStory = SqlEditorDragDropTemplate.bind({});

export default {
    title: 'SqlEditor',
    component: SqlEditorStory,
} as Meta;
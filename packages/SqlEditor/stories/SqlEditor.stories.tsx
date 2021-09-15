import React, {useState, useMemo} from 'react';
import { Story, Meta } from '@storybook/react';
import SqlEditor from '../src/SqlEditor';
import { tableList } from '../src/data';
import { zipObj, clone } from 'ramda';
import { Button, Box, Tooltip } from '@chakra-ui/react';
// import './test.css'

const SqlEditorTemplate: Story = () => {
    const [currentValue, setCurrentValue] = useState<string>(`SELECT
    *
  FROM
    price junior 123`);
    console.log('story', currentValue);
    const sqlTables = useMemo(() => zipObj(clone(tableList).sort().map((item) => item.name), clone(tableList).sort().map((item) => item.data.map((column) => column.name))), [tableList]);
    return <><SqlEditor value={currentValue} autoComplete={true} tables={sqlTables} tableName='price' wrapClassname='junior' callback={setCurrentValue} />
        <p>{currentValue}</p>
        <div>123456</div>
        <Button onClick={() => {
            setCurrentValue(currentValue ? `${currentValue}\n123` : 'sql');
        }}>add</Button>
        <Tooltip placement='bottom-start' label={<Box maxWidth='20rem' whiteSpace='pre-wrap' >sql: "SELECT * FROM price WHERE (((CAST(_time AS timestamp) = TIMESTAMP '2020-09-08 10:49:30' AND CAST(_time AS timestamp) = TIMESTAMP '2021-09-08 10:49:30') AND CAST(_time AS timestamp) = TIMESTAMP '2020-09-08 10:51:08') AND CAST(_time AS timestamp) = TIMESTAMP '2021-09-08 10:51:08') "</Box>}>
        <Box >sql: "SELECT * FROM price WHERE (((CAST(_time AS timestamp) = TIMESTAMP '2020-09-08 10:49:30' AND CAST(_time AS timestamp) = TIMESTAMP '2021-09-08 10:49:30') AND CAST(_time AS timestamp) = TIMESTAMP '2020-09-08 10:51:08') AND CAST(_time AS timestamp) = TIMESTAMP '2021-09-08 10:51:08') "</Box>
        </Tooltip>
        <br />
        <Tooltip placement='bottom-start' label={<Box maxWidth='20rem' whiteSpace='pre-wrap' >{`SELECT
    *
  FROM
    price`}</Box>}>
        <Box >sql: "SELECT * FROM price WHERE (((CAST(_time AS timestamp) = TIMESTAMP '2020-09-08 10:49:30' AND CAST(_time AS timestamp) = TIMESTAMP '2021-09-08 10:49:30') AND CAST(_time AS timestamp) = TIMESTAMP '2020-09-08 10:51:08') AND CAST(_time AS timestamp) = TIMESTAMP '2021-09-08 10:51:08') "</Box>
        </Tooltip>
    </>
}

const SqlEditorDragDropTemplate: Story = () => {
    const [currentValue, setCurrentValue] = useState<string>('');
    console.log('story', currentValue);
    const sqlTables = useMemo(() => zipObj(clone(tableList).sort().map((item) => item.name), clone(tableList).sort().map((item) => item.data.map((column) => column.name))), [tableList]);
    return <><SqlEditor value={currentValue} autoComplete={true} tables={{}} tableName='price' wrapClassname='junior' callback={setCurrentValue} />
        <p>{currentValue}</p>
        <div id='123456' draggable
              onDragStart={(ev) => {
                console.log('dragStart');
                ev.dataTransfer.setData('text', 'select * from price');
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
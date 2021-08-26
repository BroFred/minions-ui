import React, {FC, useState, useEffect, useRef, useMemo} from 'react'
import { Box, useColorMode } from '@chakra-ui/react';
import { range, head, last } from 'ramda';
import codemirror from 'codemirror';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { format } from 'sql-formatter';

import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/edit/closebrackets.js';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/hint/show-hint.css';

import {tableList} from './data'
import init from './utils'

export interface SqlEditorProps {
    value: string;
    tables?: {[tableName: string]: string[]};
    autoComplete?: boolean; // 快捷键提示或自动提示
    placeholder?: string;
    tableName?: string;
    wrapClassname?: string;
    lineNumbers?: boolean;
    callback?(value: string): void;
}

const ThemeMap = {
    light: 'neo',
    dark: 'material',
};

const SqlEditor: FC<SqlEditorProps> = (props) => {
    const {value = '', tables = {}, autoComplete = true, placeholder = '请输入sql语句', tableName = '', wrapClassname = '', lineNumbers = true, callback} = props;
    const [editValue, setEditValue] = useState<string>(value);
    const editorInstance = useRef<codemirror.Editor>();
    // const [trigger, setTrigger] = useState<string>('');

    console.log('...', editorInstance.current);
    // const sqlTables = useMemo(() => zipObj(tableList.map((item) => item.name), tableList.map((item) => item.data.map((column) => column.name))), [tableList]);
    const sqlHint = useRef();
    const { colorMode } = useColorMode();

    const getAllTokens: Array<{ line: number, token: any }> = (editor, lineCount) => {
        const tokens = range(0, lineCount).reduce((pre, cur) => {
            const lineToken = editor.getLineTokens(cur).map(item => ({
                line: cur,
                token: item,
            }));
            return [...pre, ...lineToken];
        }, []);
        return tokens;
    };

    const checkModeActive = (editor, lineNumber): any => {
        const lineTokens = editor.getLineTokens(lineNumber);
        const lastToken = last(lineTokens)
        console.log('check', lineTokens, lastToken);
        const targetToken = lineTokens.reverse().filter((item) => /^(\?k|\?t|\?c)$/ig.test(item.string))[0];
        console.log('targetToken', targetToken);
        return targetToken ?? {start: -1, end: -1};
    }

    const onChangeEvent = (editor, changeObj, value): void => {
        console.log('changeObj', changeObj, 'editor', editor);
         // 获取当前光标相关数据
        const cur = editor.getCursor();
        // console.log('cur', cur);
        // 获取当前行数据
        const curLine = editor.getLine(cur.line);
        // console.log('curLine', curLine, /^\s*$/ig.test(curLine));

        if (
            changeObj.origin === '+input'
            && changeObj.text[0] !== ''
            && !(/(\s|;|,)/gi.test(changeObj.text[0]))
            && !/^\s*$/ig.test(curLine)
        ) {
            autoComplete && editor.execCommand('autocomplete');
        } else if (changeObj.origin === '+input' && /(\s|;|,)/gi.test(changeObj.text[0])) {
            const { start, end } = checkModeActive(editor, cur.line);
            start !== -1 && editor.replaceRange('', { line: cur.line, ch: start,}, { line: cur.line, ch: end + 1, });
        }
      };
    
    const autoFormatSql = (): void => {
        console.log('formating.formating.formating.formating.');
        setEditValue(format(editorInstance.current.getValue(), { uppercase: true} ))
        callback && callback(format(editorInstance.current.getValue(), { uppercase: true }));
    }

    const getColumns = (tableName): string[] => (head(Object.entries(tables).filter(([key]) => key === tableName)) ?? [[], []])[1];

    const singleTableColumns = useMemo(() =>  tableName ? getColumns(tableName) : [], [tableName]);

    const hintOptions = {
        // 自动匹配唯一值
        completeSingle: false,
        tables,
        hint(editor, hintOptions) {
            return sqlHint.current(editor, hintOptions, singleTableColumns);
        }
      };

    useEffect(() => {
        init(codemirror);
    }, []);

    useEffect(() => {
        sqlHint.current = codemirror.hint.defaultSql;
    }, [editorInstance.current]);


    return <Box height='auto' maxHeight='20rem' boxSize='border-box' overflow='auto'  border='solid 0.0625rem #eee'>
      <CodeMirror
        value={editValue}
        className={wrapClassname}
        options={{
          // 编辑器模式
          mode: { name: 'text/x-mysql' },
          // 提示触发快捷键配置
          extraKeys: { Ctrl: 'autocomplete' },
          // 编辑器主题
          theme: ThemeMap[colorMode],
          // 编辑器的左侧显示行号
          lineNumbers,
          // 占位符
          placeholder,
          // 自动关闭方括号和引号
          autoCloseBrackets: true,
          // 是否换行
          lineWrapping: true,
          dragDrop: true,
          viewportMargin: Infinity,
          // 提示配置
          hintOptions,
        }}
        onBeforeChange={(editor, changeObj, value) => {
            callback && callback(value);
            setEditValue(value);
        }}
        // editor: 编辑器实例对象 changeObj: 此次文本改变的记录 value:当前文本
        onChange={(editor, changeObj, value) => {
          onChangeEvent(editor, changeObj, value);
        }}
        editorDidMount={(editor: codemirror.Editor) => {
          editor.addKeyMap({ 
              'Alt-F': autoFormatSql,
              'Cmd-Enter': () => {
                console.log('god');
              },
            });
          editorInstance.current = editor;
        }}
      />
    </Box>
}

export default SqlEditor;
import React, {FC, useState, useEffect, useRef, useMemo} from 'react'
import { Box } from '@chakra-ui/react';
import { zipObj, range } from 'ramda';
import codemirror from 'codemirror';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { format } from 'sql-formatter';

import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/hint/anyword-hint';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/hint/show-hint.css';

import {tableList} from './data'
import init from './utils'

export interface SqlEditorProps {
    value: string;
    tableSignal: string;
}

const SqlEditor: FC<SqlEditorProps> = (props) => {
    const [editValue, setEditValue] = useState<string>('');
    const editorInstance = useRef<codemirror.Editor>();
    const [trigger, setTrigger] = useState<string>('');

    // console.log('...', trigger, editorInstance.current);
    const sqlTables = useMemo(() => zipObj(tableList.map((item) => item.name), tableList.map((item) => item.data.map((column) => column.name))), [tableList]);
    const sqlHint = useRef(); // add type
    // console.log('sqlHint~~~', sqlHint.current);
    // console.log('keywords~~~', codemirror.resolveMode('text/x-sql').keywords);;

    const isTableMode = (value: string): boolean => {
        // console.log('check...', /\/table/gi.test(value));
        return /\/table/gi.test(value);
    }

    const getAllTokens = (editor, lineCount) => {
        const tokens = range(0, lineCount).reduce((pre, cur) => {
            const line = editor.getLine(cur);
            // console.log('lining', line, line.length);
            const lineToken = editor.getLineTokens(cur).map(item => ({
                line: cur,
                token: item,
            }));
            return [...pre, ...lineToken];
        }, []);
        return tokens;
    }

    const onComplete = (editor, rangeEnd) => {
            setTrigger('');
            console.log('!!here', trigger);
            editor.options.hintOptions.hint = codemirror.hint.defaultSql;
            if (trigger === 'table') {
                // console.log('count', editor.lineCount());
                const tokens = getAllTokens(editor, editor.lineCount())
                console.log('tokens', tokens);
                const targetTableToken = tokens.filter(item => item.token.string === '/table')[0];
                console.log('targetTableToken', targetTableToken);
                editor.replaceRange('', {
                    line: targetTableToken.line,
                    ch: targetTableToken.token.start,
                  }, {
                    line: rangeEnd.line,
                    ch: rangeEnd.end,
                  });
            }
    }

    const onChangeEvent = (editor, changeObj, value) => {
        console.log('changeObj', changeObj, 'editor', editor);
         // 获取当前光标相关数据
        const cur = editor.getCursor();
        // console.log('cur', cur);
        // 获取当前行数据
        const curLine = editor.getLine(cur.line);
        // console.log('curLine', curLine);

        const tablemode = isTableMode(value)
        if (tablemode) {
            setTrigger('table');
            editor.options.hintOptions.hint = codemirror.hint.tableSql;
        } else if (trigger === 'table') {
            setTrigger('');
            editor.options.hintOptions.hint = codemirror.hint.defaultSql;
        }

        if (
            changeObj.origin === '+input'
            && changeObj.text[0] !== ' '
            && changeObj.text[0] !== ';'
            && curLine !== ''
        ) {
        editor.execCommand('autocomplete');
        } else if (changeObj.origin === 'complete') {
            // 选择并完成了一次自动补全
            onComplete(editor, {line: changeObj.from.line, end: changeObj.from.ch});
        } else if (changeObj.origin === '+input' && tablemode && (/\s/gi.test(changeObj.text[0]) || (changeObj.text[0] === '' && changeObj.text[1] === ''))) {
            // table模式下没用通过补全 而是 通过输入完成表名，这种情况下tokens的长度一定大于等于4
            const tokens = getAllTokens(editor, editor.lineCount());
            // console.log('999', tokens[tokens.length - 2]);
            onComplete(editor, {line: tokens[tokens.length - 2].line, end: tokens[tokens.length - 2].token.start});
        }
      };
    
    // const onKeyDown = (editor, event) => {
    //     console.log('key down');
    //     console.log(event);
    // }
    const autoFormatSql = () => {
        console.log('formating.formating.formating.formating.');
        setEditValue(format(editorInstance.current.getValue()))
    }

    const hintOptions = {
        // 自动匹配唯一值
        completeSingle: false,
        tables: sqlTables,
        hint: sqlHint.current,
      }

    useEffect(() => {
        init(codemirror);
    }, []);

    useEffect(() => {
        if (trigger === '') {
            sqlHint.current = codemirror.hint.defaultSql;
        }
        if (trigger === 'table') {
            sqlHint.current = codemirror.hint.tableSql;
        }
        // console.log('sqlHint.current', sqlHint.current);
    }, [editorInstance.current, trigger])


    return <Box  border='solid 0.0625rem #eee'>
      <CodeMirror
        value={editValue}
        // className='junior-lee'
        options={{
          // 编辑器模式
          mode: { name: 'text/x-mysql' },
          // 提示触发快捷键配置
          extraKeys: { Ctrl: 'autocomplete' },
          // 编辑器主题
          theme: 'neo',
          // 编辑器的左侧显示行号
          lineNumbers: true,
          // 占位符
          placeholder: '请输入sql语句',
          // 自动关闭方括号和引号
          autoCloseBrackets: true,
          // 是否换行
          lineWrapping: true,
          dragDrop: true,
          // 提示配置
          hintOptions,
        }}
        onBeforeChange={(editor, changeObj, value) => {
            setEditValue(value);
        }}
        // editor: 编辑器实例对象 changeObj: 此次文本改变的记录 value:当前文本
        onChange={(editor, changeObj, value) => {
          onChangeEvent(editor, changeObj, value);
        }}
        editorDidMount={(editor: codemirror.Editor) => {
            // console.log('mount', editor);
            editor.addKeyMap({'Alt-F': autoFormatSql});
          editorInstance.current = editor;
        }}
      />
    </Box>
}

export default SqlEditor;
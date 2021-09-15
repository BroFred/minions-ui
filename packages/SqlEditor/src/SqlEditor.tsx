import React, {FC, useState, useEffect, useRef, useMemo} from 'react'
import { Box, useColorMode } from '@chakra-ui/react';
import { range, head, last, clone } from 'ramda';
import codemirror from 'codemirror';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { format } from 'sql-formatter';

import 'codemirror/mode/sql/sql';
// import 'codemirror/addon/hint/sql-hint.js';
// import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/mode/keyword.js';
// import './keyword.js'
import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/edit/closebrackets.js';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/hint/show-hint.css';
import './sqlEditorStyle.css'

import {tableList} from './data'
import init, {_debounce} from './utils'
import initHint from './hintUtils'

export interface SqlEditorProps {
    value: string;
    tables?: {[tableName: string]: string[]};
    autoComplete?: boolean; // 快捷键提示或自动提示
    placeholder?: string;
    tableName?: string;
    wrapClassname?: string;
    lineNumbers?: boolean;
    keywordsAndFunctions?: { keywords: string[], functions: string[] };
    callback?(value: string): void;
}

const ThemeMap = {
    light: 'neo',
    dark: 'material',
};

const SqlEditor: FC<SqlEditorProps> = (props) => {
    const {value = '', tables = {}, autoComplete = true, placeholder = '请输入sql语句', tableName = '', wrapClassname = '', lineNumbers = true, keywordsAndFunctions = {}, callback} = props;
    const editorInstance = useRef<codemirror.Editor>();
    const flag = useRef(false)
    // const [trigger, setTrigger] = useState<string>('');

    console.log('...', editorInstance.current);
    // const cur = editorInstance.current?.getCursor();
    // const curLine = editorInstance.current?.getLine(cur.line);
    // console.log('curline', curLine);

    // const sqlTables = useMemo(() => zipObj(tableList.map((item) => item.name), tableList.map((item) => item.data.map((column) => column.name))), [tableList]);
    const sqlHint = useRef();
    const { colorMode } = useColorMode();

    // const getAllTokens: Array<{ line: number, token: any }> = (editor, lineCount) => {
    //     const tokens = range(0, lineCount).reduce((pre, cur) => {
    //         const lineToken = editor.getLineTokens(cur).map(item => ({
    //             line: cur,
    //             token: item,
    //         }));
    //         return [...pre, ...lineToken];
    //     }, []);
    //     return tokens;
    // };

    const checkModeActive = (editor, lineNumber): any => {
        const lineTokens = editor.getLineTokens(lineNumber);
        const lastToken = last(lineTokens)
        console.log('check', lineTokens, lastToken);
        const targetToken = clone(lineTokens).reverse().filter((item) => /^(\?k|\?t|\?c|\?f)$/ig.test(item.string))[0];
        console.log('targetToken', targetToken);
        return targetToken ?? {start: -1, end: -1};
    }

    const autoCompleteFunc = _debounce(() => {
      const cur = editorInstance.current?.getCursor()
      const curLine = editorInstance.current?.getLine(cur?.line);
      const target = last(curLine);
      console.log('-----', curLine, target, target.length);
      if (target && !(/^([~!@#$%^&*()_+=\\|{}\[\]]|\s)/ig.test(target)))
      autoComplete && editorInstance.current.execCommand('autocomplete')
    }, 100);

    const onChangeEvent = (editor, changeObj, value): void => {
        console.log('changeObj', changeObj, 'editor', editor);
         // 获取当前光标相关数据
        const cur = editor.getCursor();
        // console.log('cur', cur);
        // 获取当前行数据
        const curLine = editor.getLine(cur.line);
        // console.log('curLine', curLine, /^\s*$/ig.test(curLine));

        if (
            ((changeObj.origin === '+input'
            && changeObj.text[0] !== ''
            && !(/(\s|;|,)/gi.test(changeObj.text[0]))
            && !/^\s*$/ig.test(curLine)) || (changeObj.origin === 'complete' && /^(\?k\.|\?t\.|\?c\.|\?f\.)$/ig.test(changeObj.text[0])))
        ) {
          autoCompleteFunc();
            // setTimeout(() => autoComplete && editor.execCommand('autocomplete'), 100)
            console.log('ccccccccccccccccccccc');
            // autoComplete && editor.execCommand('autocomplete')
        } else if (changeObj.origin === '+input' && /(\s|;|,|\.)/gi.test(changeObj.text[0])) {
          console.log('+++++++++++++++++++++++');
            const { start, end } = checkModeActive(editor, cur.line);
            start !== -1 && editor.replaceRange('', { line: cur.line, ch: start,}, { line: cur.line, ch: end + 1, });
        } else if (changeObj.origin === 'complete' && changeObj.text[0] === changeObj.removed[0]) {
          // editor.replaceRange('', {line: cur.line, ch: cur.ch})
          // editorInstance.current?.setCursor(editorInstance.current.lineCount());
          // changeObj.origin = ''
        }
      };
    
    const autoFormatSql = (): void => {
        console.log('formating.formating.formating.formating.', value);
        flag.current = true;
          // callback && callback(`${format(editorInstance.current?.getValue(), { uppercase: true })}`);
          editorInstance.current?.setValue(format(editorInstance.current?.getValue(), { uppercase: true }))
          console.log('line Count.......', editorInstance.current.lineCount());
        editorInstance.current?.setCursor(editorInstance.current.lineCount())
        
        
    }

    const getColumns = (tableName): string[] => (head(Object.entries(tables).filter(([key]) => key === tableName)) ?? [[], []])[1];

    const singleTableColumns = useMemo(() =>  tableName ? getColumns(tableName) : [], [tableName]);

    const customHintOptions = {
        // 自动匹配唯一值
        completeSingle: false,
        tables,
        hint(editor, hintOptions) {
          console.log('000');
            return sqlHint.current(editor, hintOptions, singleTableColumns, keywordsAndFunctions);
        }
      };

      const highlightLines = (editor, start, end) => {
        const from = {line: start, ch: 0};
        const to = {line: end, ch: 999};
        editor.markText(from, to, {className: "codemirror-highlighted"});
      }

      codemirror.defineOption("keyword", {}, function(cm, val, prev) {
        if (prev == CodeMirror.Init) prev = false;
      if (prev && !val)
        cm.removeOverlay("keyword");
      else if (!prev && val)
        cm.addOverlay({
          token: function(stream) {
            for (var key in cm.options.keyword) {
              if (stream.match(key, true)) {return cm.options.keyword[key];}
            }
            stream.next();
          },
          name: "keyword"
        });
      });
    useEffect(() => {
        init(codemirror, keywordsAndFunctions);
        initHint(codemirror);
    }, []);

    useEffect(() => {
        sqlHint.current = codemirror.hint.defaultSql;
    }, [editorInstance.current]);


    return <Box height='auto' maxHeight='20rem' boxSize='border-box' overflow='auto'  border='solid 0.0625rem #eee'>
      <CodeMirror
        value={value}
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
          // 关键字
          keyword: {'junior': 'style1', 'price': 'style1'},
          // 提示配置
          customHintOptions,
        }}
        onBeforeChange={(editor, changeObj, value) => {
          editor.removeLineClass(1, 'background', 'line-error');
          console.log('before change', changeObj, value);
          // if (flag.current) {
          //   callback && callback(`${format(value, { uppercase: true })}`);
          //   flag.current = false;
          // } else {
            callback && callback(value);
          // }
        }}
        // editor: 编辑器实例对象 changeObj: 此次文本改变的记录 value:当前文本
        onChange={(editor, changeObj, value) => {
          onChangeEvent(editor, changeObj, value);
        }}
        // onDragOver={(edirot, ev) => {
        //   console.log('dragOver');
        //   ev.preventDefault();
        // }}
        // onDrop={(editor, ev) => {
        //   console.log('drop了', ev);
        // }}
        editorDidMount={(editor: codemirror.Editor) => {
          editor.addKeyMap({ 
              'Alt-F': autoFormatSql,
              'Cmd-Enter': () => {
                console.log('god');
              },
            });
            // highlightLines(editor, 0, 1)
            // const line = editor.getLineHandle(2);
            // console.log('line handle', line);
            editor.addLineClass(1, 'background', 'line-error');
          editorInstance.current = editor;
        }}
      />
    </Box>
}

export default SqlEditor;
import React from 'react'

export interface SqlEditorProps {
    value: string;
    tables?: {[tableName: string]: string[]};
    autoComplete?: boolean;
    placeholder?: string;
    tableSignal?: string;
    tableName?: string;
    wrapClassname?: string;
    lineNumbers?: boolean;
}

export declare const SqlEditor: React.FC<SqlEditorProps>
export default SqlEditor;
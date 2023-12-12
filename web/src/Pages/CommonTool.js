import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Input, Flex, Button, message, Popover } from 'antd';
import { CopyButton } from '../Components/Buttons';
import * as monaco from "monaco-editor"

const TextEdit = () => {
    const [ipt, setIpt] = useState('');
    const [opt, setOpt] = useState('');
    const [search, setSearch] = useState('');
    const [replace, setReplace] = useState('');
    const editorContainer = useRef(null);
    const myEditor = useRef(null);
    const isSet = useRef(false);
    const [statisticsOpen, setStatisticsOpen] = useState(false);

    const initEditor = () => {
        monaco.editor.setTheme("vs") //默认"vs", 支持"vs-dark"、"hc-black"

        const editor = monaco.editor.create(
            editorContainer.current,
            {
                ipt,
                language: "text/plain",
                automaticLayout: true,
                placeholder: "",
                minimap: {
                    maxColumn: 80
                }
            }
        );

        editor.onDidChangeModelContent(() => {
            setIpt(myEditor.current.getValue());
        });

        myEditor.current = editor;
    }

    useEffect(() => {
        if (isSet.current)
            return;

        initEditor()
        isSet.current = true;
    }, [])

    useEffect(() => {
        if (myEditor.current)
            myEditor.current.setValue(opt);
    }, [opt])

    return <>
        <Flex vertical='vertical' gap='middle'>
            <div ref={editorContainer} style={{ height: window.innerHeight - 320 }}></div>
            <Flex gap="small" wrap align='center'>
                <Button
                    type="primary"
                    onClick={() => {
                        try {
                            setOpt(ipt.replace(/ +/g, ''));
                        } catch (e) {
                            message.error('操作异常');
                        }
                    }}>
                    移除空格
                </Button>
                <Button
                    type="primary"
                    onClick={() => {
                        try {
                            setOpt(ipt.replace(/ +/g, ' '));
                        } catch (e) {
                            message.error('操作异常');
                        }
                    }}>
                    合并空格
                </Button>
                <Button
                    type="primary"
                    onClick={() => {
                        try {
                            setOpt(ipt.replace(/\r\n/g, '').replace(/\n/g, ''));
                        } catch (e) {
                            message.error('操作异常');
                        }
                    }}>
                    移除换行
                </Button>
                <Button
                    type="primary"
                    onClick={() => {
                        try {
                            let val = ipt;
                            while (val.indexOf('\n\n') > -1) {
                                val = val.replace(/\n\n/g, '\n');
                            }
                            setOpt(val);
                        } catch (e) {
                            message.error('操作异常');
                        }
                    }}>
                    合并换行
                </Button>
                <label>查找字符：</label>
                <Input placeholder="查找字符" style={{ width: 150 }} onChange={e => { setSearch(e.target.value) }} />
                <label>新字符：</label>
                <Input placeholder="替换/插入" style={{ width: 150 }} onChange={e => { setReplace(e.target.value) }} />
                <Button
                    type="primary"
                    onClick={() => {
                        try {
                            setOpt(ipt.replace(new RegExp(search, 'g'), replace));
                        } catch (e) {
                            message.error('操作异常');
                        }
                    }}>
                    替换
                </Button>
                <Button
                    type="default"
                    onClick={() => {
                        try {
                            let arr = ipt.split('\n');
                            arr.forEach((item, index) => {
                                arr[index] = `${replace}${item}`;
                            });
                            setOpt(arr.join('\n'));
                        } catch (e) {
                            message.error('操作异常');
                        }
                    }}>
                    行首插入
                </Button>
                <Button
                    type="default"
                    onClick={() => {
                        try {
                            setOpt(ipt.replace(/\r\n/g, `${replace}\r\n`));
                        } catch (e) {
                            message.error('操作异常');
                        }
                    }}>
                    行尾插入
                </Button>
                <CopyButton onGetText={() => myEditor.current.getValue()} />
                <Popover
                    content={
                        <div>
                            <p>行数：{ipt.split('\r\n').length}</p>
                            <p>字符数：{ipt.length}</p>
                            <p>字符数（不计空格）：{ipt.replace(/ +/g, '').length}</p>
                            <p>空格数：{(ipt.length - ipt.replace(/ +/g, '').length)}</p>
                            {search != '' && <p>共匹配到 {ipt.split(search).length - 1} 个字符 '{search}'</p>}
                        </div>
                    }
                    title="统计信息"
                    open={statisticsOpen}
                    onOpenChange={setStatisticsOpen}
                >
                    <Button type="link">查看统计</Button>
                </Popover>
            </Flex>
        </Flex >
    </>
}

const CommonTool = () => {
    return (
        <Tabs
            defaultActiveKey="0"
            size='large'
            items={[
                {
                    key: '0',
                    label: '文本编辑',
                    children: <TextEdit />,
                }
            ]} />
    )
}

export default CommonTool;
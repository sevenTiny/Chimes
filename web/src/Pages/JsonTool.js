import React, { useState, useRef, useEffect } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tabs, Input, Flex, Button, Card, message, Row, Col, Checkbox, Modal, Form, Popover, InputNumber, Slider } from 'antd';
import { CopyButton, DescriptionButton } from '../Components/Buttons';
import FormItem from 'antd/es/form/FormItem';
import helper from '../helper';
import * as monaco from "monaco-editor"

const { TextArea } = Input;
const editorHeight = helper.getEditorHeight();

const FormmatJson = () => {
    const [ipt, setIpt] = useState('');
    const [opt, setOpt] = useState('');
    return (
        <>
            <Flex vertical='vertical' gap='middle'>
                <Row gutter={16}>
                    <Col span={8}>
                        <TextArea rows={editorHeight} placeholder="来一段JSON" onChange={e => { setIpt(e.target.value) }} />
                    </Col>
                    <Col span={16}>
                        <TextArea rows={editorHeight} placeholder="输出结果" value={opt} />
                    </Col>
                </Row>
                <Flex gap="small" wrap>
                    <DescriptionButton description={'JSON 格式化工具可以将一段JSON字符串格式化为友好的可读形式，也可以将JSON字符串压缩成一行，以便于在网页中进行传输。'} />
                    <Button
                        type="primary"
                        onClick={() => {
                            try {
                                setOpt(JSON.stringify(JSON.parse(ipt), null, '\t'));
                            } catch (e) {
                                message.error('JSON 格式错误');
                            }
                        }}>
                        格式化
                    </Button>
                    <Button
                        onClick={() => {
                            try {
                                setOpt(JSON.stringify(JSON.parse(ipt)));
                            } catch (e) {
                                message.error('JSON 格式错误');
                            }
                        }}
                    >
                        压缩
                    </Button>
                    <Button
                        onClick={() => {
                            try {
                                setOpt(JSON.stringify(JSON.parse(ipt)).replace(/"/g, '\\"'));
                            } catch (e) {
                                message.error('JSON 格式错误');
                            }
                        }}
                    >
                        添加转义
                    </Button>
                    <Button
                        onClick={() => {
                            try {
                                setOpt(JSON.stringify(JSON.parse(ipt)));
                            } catch (e) {
                                message.error('JSON 格式错误');
                            }
                        }}
                    >
                        去除转义
                    </Button>
                    <Button
                        onClick={() => {
                            try {
                                setOpt(JSON.stringify(JSON.parse(ipt)).replace(/"/g, '\''));
                            } catch (e) {
                                message.error('JSON 格式错误');
                            }
                        }}
                    >
                        双引号转单引号
                    </Button>
                    <Button
                        onClick={() => {
                            try {
                                setOpt(JSON.stringify(JSON.parse(ipt.replace(/'/g, '"'))));
                            } catch (e) {
                                message.error('JSON 格式错误');
                            }
                        }}
                    >
                        单引号转双引号
                    </Button>
                    <CopyButton onGetText={() => opt} />
                </Flex>
            </Flex>
        </>
    )
}

const FieldExtraction = () => {
    const [ipt, setIpt] = useState('');
    const [keys, setKeys] = useState([])
    const [extractValues, setExtractValues] = useState([]);
    const [opt, setOpt] = useState('');
    return (
        <>
            <Flex vertical='vertical' gap='middle'>
                <Row gutter={16}>
                    <Col span={10}>
                        <TextArea rows={editorHeight} placeholder="来一段JSON" onChange={e => { setIpt(e.target.value) }} />
                    </Col>
                    <Col span={14}>
                        <TextArea rows={editorHeight} placeholder="输出结果" value={opt} />
                    </Col>
                </Row>
                <Flex gap="small" wrap align='center'>
                    <DescriptionButton description={'JSON 字段提取工具可以将JSON对象中任意层级的字段值提取出来，以便于进行其他处理。'} />
                    <label>JSON Key：</label>
                    <Input placeholder="请输入Key，多个逗号分隔" style={{ width: 200 }} onChange={e => { setKeys(e.target.value.trim().replace(' ', '').split(',')) }} />
                    <Button
                        type="primary"
                        onClick={() => {
                            try {
                                const json = JSON.parse(ipt);
                                //循环遍历json对象的每个key/value对, 筛选出key等于keys中的任何一项的 key/value对，并提取value, 对于数组list中的每个对象，也进行同样的操作
                                const result = [];
                                const extract = (json) => {
                                    Object.keys(json).forEach(key => {
                                        if (keys.includes(key)) {
                                            if (typeof json[key] === 'object' && json[key] != null) {
                                                result.push(JSON.stringify(json[key]));
                                            } else {
                                                result.push(json[key]);
                                            }
                                        }
                                        if (typeof json[key] === 'object' && json[key] != null) {
                                            extract(json[key]);
                                        }
                                        else if (Array.isArray(json[key])) {
                                            json[key].forEach(item => {
                                                extract(item);
                                            })
                                        }
                                    })
                                }

                                extract(json);
                                setExtractValues(result);
                                setOpt(result.join('\n'));
                            } catch (e) {
                                console.error(e);
                                message.error('JSON 格式错误或提取发生错误');
                            }
                        }}>
                        提取字段
                    </Button>
                    <Button
                        type="dashed"
                        onClick={() => {
                            try {
                                setOpt(JSON.stringify(extractValues));
                            } catch (e) {
                                console.error(e);
                                message.error('操作异常');
                            }
                        }}
                    >
                        结果转为JSON格式
                    </Button>
                    <Button
                        type="dashed"
                        onClick={() => {
                            try {
                                setOpt(extractValues.join(','));
                            } catch (e) {
                                console.error(e);
                                message.error('操作异常');
                            }
                        }}
                    >
                        结果逗号分割
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            try {
                                const json = JSON.parse(ipt);
                                //循环遍历json对象的每个key/value对, 筛选出key等于keys中的任何一项的 key/value对，并提取value, 对于数组list中的每个对象，也进行同样的操作
                                const extract = (json) => {
                                    const newJson = {};
                                    let exist = false;
                                    Object.keys(json).forEach(key => {
                                        if (keys.includes(key)) {
                                            newJson[key] = json[key];
                                            exist = true;
                                        }

                                        if (Array.isArray(json[key])) {
                                            const children = [];
                                            json[key].forEach(item => {
                                                const child = extract(item);
                                                if (child != undefined) {
                                                    children.push(child);
                                                    exist = true;
                                                }
                                            })

                                            if (children.length > 0) {
                                                newJson[key] = children;
                                            }
                                        }
                                        else if (typeof json[key] === 'object' && json[key] != null) {
                                            const child = extract(json[key]);
                                            if (child != undefined) {
                                                newJson[key] = child;
                                                exist = true;
                                            }
                                        }
                                    })

                                    return exist ? newJson : undefined;
                                }

                                if (Array.isArray(json)) {
                                    const result = [];
                                    json.forEach(item => {
                                        const child = extract(item);
                                        if (child != undefined) {
                                            result.push(child);
                                        }
                                    })
                                    setOpt(JSON.stringify(result, null, '\t'));
                                    return;
                                }
                                else if (typeof json === 'object' && json != null) {
                                    const child = extract(json);
                                    if (child != undefined) {
                                        setOpt(JSON.stringify(child, null, '\t'));
                                    }
                                } else {
                                    message.error('JSON 格式错误');
                                }
                            } catch (e) {
                                console.error(e);
                                message.error('JSON 格式错误或提取发生错误');
                            }
                        }}>
                        仅移除其他字段
                    </Button>
                    <CopyButton onGetText={() => opt} />
                </Flex>
            </Flex>
        </>
    )
}

const JsonEditor = () => {
    const [ipt, setIpt] = useState('');
    const [opt, setOpt] = useState('');
    const [param1, setParam1] = useState('')
    const [param2, setParam2] = useState('')
    const [keys, setKeys] = useState([])
    const [repeat, setRepeat] = useState(1)
    const [jsonFormal, setJsonFormal] = useState(true);
    const [removeEmptyProperty, setRemoveEmptyProperty] = useState(true);
    const [arrayToJsonModal, setArrayToJsonModal] = useState(false);
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const editorContainer = useRef(null);
    const myEditor = useRef(null);
    const isSet = useRef(false);

    /**
     * https://juejin.cn/post/6984683777343619102#heading-8
     * https://microsoft.github.io/monaco-editor/playground.html?source=v0.45.0#example-customizing-the-appearence-scrollbars
     */
    const initEditor = () => {
        monaco.editor.setTheme("vs") //默认"vs", 支持"vs-dark"、"hc-black"

        const editor = monaco.editor.create(
            editorContainer.current,
            {
                ipt,
                language: "javascript/javascript",
                automaticLayout: true,
                placeholder: "原始JSON，编辑器将对该JSON进行编辑。如果未输入原始JSON，将会依据数据自动创造JSON。",
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

    return (
        <>
            <Flex vertical='vertical' gap='middle'>
                <div ref={editorContainer} style={{ height: window.innerHeight - 320 }}></div>
                <Flex gap="small" wrap align='center'>
                    <Checkbox
                        defaultChecked={true}
                        onChange={e => {
                            setJsonFormal(e.target.checked);
                            if (ipt !== '') {
                                if (e.target.checked)
                                    setOpt(JSON.stringify(JSON.parse(ipt), null, '\t'));
                                else
                                    setOpt(JSON.stringify(JSON.parse(ipt)));
                            }
                        }}>格式化</Checkbox>
                    <Button
                        type="primary"
                        onClick={() => { setArrayToJsonModal(true) }}>
                        数据写入JSON
                    </Button>
                    <label>JSON Key：</label>
                    <Input placeholder="多个逗号分隔" style={{ width: 150 }} onChange={e => { setKeys(e.target.value.trim().replace(' ', '').split(',')) }} />
                    <Checkbox
                        defaultChecked={true}
                        onChange={e => {
                            setRemoveEmptyProperty(e.target.checked);
                        }}>移除空对象</Checkbox>
                    <Button
                        type="primary"
                        onClick={() => {
                            const remove = (jsonObj) => {
                                Object.keys(jsonObj).forEach(key => {
                                    if (keys.includes(key)) {
                                        delete jsonObj[key];
                                    }

                                    if (Array.isArray(jsonObj[key])) {
                                        jsonObj[key].forEach(item => {
                                            remove(item);
                                        })

                                        if (removeEmptyProperty) {
                                            const newChildren = []
                                            jsonObj[key].forEach(child => {
                                                if (Object.keys(child).length !== 0)
                                                    newChildren.push(child);
                                            })

                                            if (newChildren.length === 0) {
                                                delete jsonObj[key];
                                            } else {
                                                jsonObj[key] = newChildren;
                                            }
                                        }
                                    }
                                    else if (typeof jsonObj[key] === 'object' && jsonObj[key] != null) {
                                        remove(jsonObj[key]);

                                        if (Object.keys(jsonObj[key]).length === 0 && removeEmptyProperty)
                                            delete jsonObj[key];
                                    }
                                })
                            }

                            try {
                                const json = JSON.parse(ipt);

                                if (Array.isArray(json)) {
                                    json.forEach(item => {
                                        remove(item);
                                    })
                                }
                                else if (typeof json === 'object' && json != null) {
                                    remove(json);
                                }

                                remove(json)
                                setOpt(JSON.stringify(json, null, '\t'));
                            } catch (e) {
                                console.error(e);
                                message.error('JSON 格式错误或操作发生异常');
                            }
                        }}>
                        移除指定字段
                    </Button>
                    <CopyButton onGetText={() => myEditor.current.getValue()} />
                </Flex>
            </Flex>

            <Modal
                title="数据写入JSON"
                open={arrayToJsonModal}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            try {
                                const json = ipt === '' ? [] : JSON.parse(ipt);
                                const param2Arr = []

                                //尝试将param2转为JSON数组
                                try {
                                    const param2JsonObj = JSON.parse(param2);
                                    if (Array.isArray(param2JsonObj)) {
                                        param2Arr = param2JsonObj;
                                    } else {
                                        param2Arr.push(param2JsonObj);
                                    }
                                }
                                //如果失败，则按字符串处理
                                catch (e) {
                                    if (param2.startsWith('eval(') && param2.endsWith(')')) {
                                        //这里特殊处理repeat
                                        for (let i = 0; i < repeat; i++) {
                                            param2Arr.push(eval(param2));
                                        }
                                    } else {
                                        param2.split(',').forEach(item => param2Arr.push(item.trim()));
                                    }
                                }

                                // repeat 多份
                                if (param2Arr.length === 1) {
                                    for (let i = 0; i < repeat - 1; i++) {
                                        param2Arr.push(param2Arr[0]);
                                    }
                                }

                                if (Array.isArray(json)) {
                                    if (json.length > 0) {
                                        let last = ''
                                        json.forEach((key, index) => {
                                            if (index < param2Arr.length) {
                                                last = param2Arr[index]
                                            }
                                            key[param1] = last;
                                        })
                                    } else {
                                        param2Arr.forEach(item => {
                                            json.push({ [param1]: item });
                                        })
                                    }
                                } else {
                                    if (param2Arr.length >= 1) {
                                        json[param1] = param2Arr[0];
                                    }
                                }

                                if (jsonFormal)
                                    setOpt(JSON.stringify(json, null, '\t'));
                                else
                                    setOpt(JSON.stringify(json));
                            } catch (e) {
                                console.error(e);
                                message.error('操作异常');
                            }

                            setArrayToJsonModal(false);
                        })
                        .catch((info) => {
                            //console.log('Validate Failed:', info);
                        });
                }}
                onCancel={() => { setArrayToJsonModal(false); }}>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        modifier: 'public',
                    }}
                    style={{ paddingTop: 20 }}
                >
                    <FormItem>
                        <Card>
                            在JSON对象中插入Key或编辑现有的Key，如果JSON对象是数组，则会将数据依次写入数组中的每个对象。如果数据是多个，则会依次写入每个对象的Key中。
                        </Card>
                    </FormItem>
                    <Form.Item
                        name="jsonkey"
                        label="Key"
                        rules={[
                            {
                                required: true,
                                message: '请输入正确的Key',
                            },
                        ]}
                        onChange={e => { setParam1(e.target.value.trim().replace(' ', '')) }}
                    >
                        <Input placeholder="例如：name" />
                    </Form.Item>
                    <Form.Item
                        name="dataArray"
                        label={
                            <>
                                数据（多个逗号分割）
                                <Popover
                                    content={
                                        <div>
                                            <p>支持的格式有：</p>
                                            <p>字符串，例如：1234</p>
                                            <p>多个字符逗号分隔，例如：1,2,3,4</p>
                                            <p>JSON对象，例如：
                                                <code>
                                                    {JSON.stringify({ name: '张三', age: 18 })}
                                                </code>
                                            </p>
                                            <p>JS脚本，例如：eval(new Date().getTime())</p>
                                        </div>
                                    }>
                                    <QuestionCircleOutlined />
                                </Popover>
                            </>}
                        onChange={e => { setParam2(e.target.value) }}
                        rows={4}
                    >
                        <TextArea rows={4} placeholder='例如：1231 或 1,2,3,...' />
                    </Form.Item>
                    <Form.Item
                        name="repeat"
                        label={
                            <>
                                重复次数 &nbsp;
                                <Popover
                                    content={
                                        <div>
                                            <p>将数据复制 N 份，整合为集合进行匹配，如果数据已经为集合类型，则不生效</p>
                                            <p>例如数据：1234</p>
                                            <p>重复次数：3</p>
                                            <p>等价于直接输入数据：1234,1234,1234</p>
                                        </div>
                                    }>
                                    <QuestionCircleOutlined />
                                </Popover>
                            </>}
                        initialValue={1}
                        onChange={e => { setRepeat(e.target.value) }}
                    >
                        <InputNumber min={1} max={1000} />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}

const JsonTool = () => {
    return (
        <Tabs
            defaultActiveKey="1"
            size='large'
            items={[
                {
                    key: '1',
                    label: '压缩转义格式化',
                    children: <FormmatJson />,
                },
                {
                    key: '2',
                    label: 'JSON字段提取',
                    children: <FieldExtraction />,
                },
                {
                    key: '3',
                    label: 'JSON编辑',
                    children: <JsonEditor />,
                },
                {
                    key: '4',
                    label: '模型转换',
                    children: '敬请期待...',
                },
            ]} />
    )
}

export default JsonTool;
import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tabs, Input, Flex, Space, Button, Card, message, Row, Col, Checkbox, Modal, Form, Popover, InputNumber } from 'antd';
import { CopyButton } from '../Components/Buttons';
import FormItem from 'antd/es/form/FormItem';

const { TextArea } = Input;

const FormmatJson = () => {
    const [ipt, setIpt] = useState('');
    const [opt, setOpt] = useState('');
    return (
        <>
            <Flex vertical='vertical' gap='middle'>
                <Row gutter={16}>
                    <Col span={8}>
                        <TextArea rows={30} placeholder="来一段JSON" onChange={e => { setIpt(e.target.value) }} />
                    </Col>
                    <Col span={16}>
                        <TextArea rows={30} placeholder="输出结果" value={opt} />
                    </Col>
                </Row>
                <Space gap="small" wrap>
                    <CopyButton onGetText={() => opt} />
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
                </Space>
                <Card>
                    JSON 格式化工具可以将一段JSON字符串格式化为友好的可读形式，也可以将JSON字符串压缩成一行，以便于在网页中进行传输。
                </Card>
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
                        <TextArea rows={30} placeholder="来一段JSON" onChange={e => { setIpt(e.target.value) }} />
                    </Col>
                    <Col span={14}>
                        <TextArea rows={30} placeholder="输出结果" value={opt} />
                    </Col>
                </Row>
                <Space gap="small" wrap align='center'>
                    <label>JSON Key：</label>
                    <Input placeholder="请输入Key，多个逗号分隔" style={{ width: 200 }} onChange={e => { setKeys(e.target.value.trim().replace(' ', '').split(',')) }} />
                    <Button
                        type="primary"
                        onClick={() => {
                            try {
                                const json = JSON.parse(ipt);
                                //循环遍历json对象的每个key/value对, 筛选出key等于keys中的任何一项的 key/value对，并提取value, 对于数组list中的每个对象，也进行同样的操作
                                const result = [];
                                const extract = (json, prop) => {
                                    Object.keys(json).forEach(key => {
                                        if (key == prop) {
                                            if (typeof json[key] === 'object' && json[key] != null) {
                                                result.push(JSON.stringify(json[key]));
                                            } else {
                                                result.push(json[key]);
                                            }
                                        }
                                        if (typeof json[key] === 'object' && json[key] != null) {
                                            extract(json[key], prop);
                                        }
                                        else if (Array.isArray(json[key])) {
                                            json[key].forEach(item => {
                                                extract(item, prop);
                                            })
                                        }
                                    })
                                }

                                keys.forEach(key => {
                                    extract(json, key);
                                })

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
                    <CopyButton onGetText={() => opt} />
                </Space>
                <Card>
                    JSON 字段提取工具可以将JSON对象中任意层级的字段值提取出来，以便于进行其他处理。
                </Card>
            </Flex>
        </>
    )
}

const JsonEditor = () => {
    const [ipt, setIpt] = useState('');
    const [param1, setParam1] = useState('')
    const [param2, setParam2] = useState('')
    const [repeat, setRepeat] = useState(1)
    const [opt, setOpt] = useState('');
    const [jsonFormal, setJsonFormal] = useState(false);
    const [arrayToJsonModal, setArrayToJsonModal] = useState(false);
    const { TextArea } = Input;
    const [form] = Form.useForm();
    return (
        <>
            <Flex vertical='vertical' gap='middle'>
                <Row gutter={16}>
                    <Col span={10}>
                        <TextArea rows={30} placeholder="原始JSON，编辑器将对该JSON进行编辑。如果未输入原始JSON，将会依据数据自动创造JSON。" onChange={e => { setIpt(e.target.value) }} />
                    </Col>
                    <Col span={14}>
                        <TextArea rows={30} placeholder="输出结果" value={opt} />
                    </Col>
                </Row>
                <Flex gap="small" wrap align='center'>
                    <label>JSON Key：</label>
                    <Checkbox
                        onChange={e => {
                            setJsonFormal(e.target.checked);
                            if (opt !== '') {
                                if (e.target.checked)
                                    setOpt(JSON.stringify(JSON.parse(opt), null, '\t'));
                                else
                                    setOpt(JSON.stringify(JSON.parse(opt)));
                            }
                        }}>格式化</Checkbox>
                    <Button
                        type="primary"
                        onClick={() => { setArrayToJsonModal(true) }}>
                        数据写入JSON
                    </Button>
                    <CopyButton onGetText={() => opt} />
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
                    label: 'JSON编辑器',
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
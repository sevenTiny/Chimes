import React, { useState } from 'react';
import { Tabs, Input, Flex, Space, Button, Card, message, Row, Col } from 'antd';
import { CopyButton } from '../Components/Buttons';

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
                    <label>待提取的Keys：</label>
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
                    JSON 字段提取工具可以将JSON字符串中的指定字段提取出来，以便于进行后续处理。
                </Card>
            </Flex>
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
                    label: '模型转换',
                    children: '敬请期待...',
                },
            ]} />
    )
}

export default JsonTool;
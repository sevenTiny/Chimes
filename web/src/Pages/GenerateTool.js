import React, { useState } from 'react';
import { Tabs, Input, Flex, Space, Button, Card, message, Checkbox, Dropdown } from 'antd';
import { CopyButton, DescriptionButton } from '../Components/Buttons';
import { v4 as uuid } from 'uuid'

const { TextArea } = Input;

const GenerateGuid = () => {
    const [removeSeparator, setRemoveSeparator] = useState(false); // 去除分隔符
    const [smallCase, setSmallCase] = useState(true); // 小写
    const [opt, setOpt] = useState('');
    //生成GUID
    const generate = (count) => {
        try {
            const result = [];
            for (let i = 0; i < count; i++) {
                result.push(uuid()[smallCase ? 'toLowerCase' : 'toUpperCase']().replace(/-/g, removeSeparator ? '' : '-'));
            }
            setOpt(result.join('\n'));
        } catch (e) {
            console.error(e);
            message.error('操作异常');
        }
    }
    return (
        <>
            <Flex vertical='vertical' gap='middle'>
                <TextArea rows={20} placeholder="输出结果" value={opt} />
                <Space gap="small" wrap align='center'>
                    <DescriptionButton description={'GUID生成工具可以快速生成一个或多个GUID，支持多种格式输出。'} />
                    <CopyButton onGetText={() => opt} />
                    <Checkbox onChange={e => { setRemoveSeparator(e.target.checked) }}>去除分隔符</Checkbox>
                    <Checkbox defaultChecked={true} onChange={e => { setSmallCase(e.target.checked) }}>小写</Checkbox>
                    <Button
                        type="primary"
                        onClick={() => generate(1)}>
                        生成一个
                    </Button>
                    <Dropdown.Button
                        type="primary"
                        onClick={() => generate(10)}
                        menu={{
                            items: [
                                {
                                    key: '10',
                                    label: '10个',
                                },
                                {
                                    key: '20',
                                    label: '20个',
                                },
                                {
                                    key: '50',
                                    label: '50个',
                                },
                                {
                                    key: '100',
                                    label: '100个',
                                },
                            ],
                            onClick: e => { generate(Number(e.key)) }
                        }}>
                        生成一组
                    </Dropdown.Button>
                    <Button
                        type="dashed"
                        onClick={() => {
                            try {
                                setOpt(opt.split('\n').join(','));
                            } catch (e) {
                                message.error('操作异常');
                            }
                        }}
                    >
                        结果逗号分割
                    </Button>
                </Space>
            </Flex >
        </>
    )
}

const GenerateTool = () => {
    return (
        <Tabs
            defaultActiveKey="1"
            size='large'
            items={[
                {
                    key: '1',
                    label: 'GUID生成',
                    children: <GenerateGuid />,
                }
            ]} />
    )
}

export default GenerateTool;
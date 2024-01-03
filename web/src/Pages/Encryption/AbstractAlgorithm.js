import CryptoJS from 'crypto-js';
import React, { useState, useRef, useEffect } from 'react';
import { Input, Flex, Button, message, Radio } from 'antd';
import { CopyButton, PageBox, DescriptionBox } from '../../CustomComponents';

const { TextArea } = Input;

const AbstractAlgorithm = () => {
    const [ipt, setIpt] = useState('');
    const [opt, setOpt] = useState('');
    const [encryptType, setEncryptType] = useState('MD5');
    const [description, setDescription] = useState('MD5 是一种广泛使用的散列函数。它被用于各种安全应用，也常用于检查文件的完整性。不过，MD5 不具有抗碰撞性，不适合 SSL 证书或数字签名等依赖于此特性的应用。');
    const [encryptFunc, setEncryptFunc] = useState(() => () => { setOpt(CryptoJS.MD5(ipt)); });

    return (
        <>
            <PageBox>
                <Flex vertical='vertical' gap='middle'>
                    <TextArea rows={10} placeholder="请输入待处理内容" onChange={e => { setIpt(e.target.value) }} />
                    <Flex gap="small" align='center' wrap>
                        <label>选择加密方式：</label>
                        <Radio.Group
                            onChange={(e) => {
                                setEncryptType(e.target.value);
                                switch (e.target.value) {
                                    case 'MD5':
                                        setDescription('MD5 是一种广泛使用的散列函数。它被用于各种安全应用，也常用于检查文件的完整性。不过，MD5 不具有抗碰撞性，不适合 SSL 证书或数字签名等依赖于此特性的应用。');
                                        setEncryptFunc(() => () => { setOpt(CryptoJS.MD5(ipt)); });
                                        break;
                                    case 'SHA1':
                                        setDescription('SHA 哈希函数由美国国家安全局（NSA）设计。SHA-1 是现有 SHA 哈希函数中最成熟的一种，被广泛用于各种安全应用和协议中。不过，随着新攻击的发现或改进，SHA-1 的抗碰撞能力也在减弱。');
                                        setEncryptFunc(() => () => { setOpt(CryptoJS.SHA1(ipt)); });
                                        break;
                                    case 'SHA256':
                                        setDescription('SHA-256 是 SHA-2 集合的四个变体之一。它的使用不如 SHA-1 广泛，但它似乎提供了更好的安全性。');
                                        setEncryptFunc(() => () => { setOpt(CryptoJS.SHA256(ipt)); });
                                        break;
                                    case 'SHA512':
                                        setDescription('SHA-512与SHA-256基本相同，但操作的是64位字，而不是32位字。');
                                        setEncryptFunc(() => () => { setOpt(CryptoJS.SHA512(ipt)); });
                                        break;
                                    default:
                                        break;
                                }
                            }}
                            value={encryptType}>
                            <Radio value={'MD5'}>MD5</Radio>
                            <Radio value={'SHA1'}>SHA1</Radio>
                            <Radio value={'SHA256'}>SHA256</Radio>
                            <Radio value={'SHA512'}>SHA512</Radio>
                        </Radio.Group>
                        <Button
                            type="primary"
                            onClick={() => {
                                try {
                                    if (ipt) {
                                        encryptFunc();
                                    }
                                } catch (e) {
                                    console.log(e);
                                    message.error('操作异常');
                                }
                            }}>
                            执行计算
                        </Button>
                        <CopyButton onGetText={() => opt} />
                    </Flex>
                    <TextArea rows={10} placeholder="输出结果" value={opt} />
                    <DescriptionBox>
                        {description}
                    </DescriptionBox>
                </Flex>
            </PageBox>
        </>
    )
}

export default AbstractAlgorithm;
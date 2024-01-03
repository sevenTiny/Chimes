import React, { useEffect, useRef } from 'react';
import { Typography } from 'antd';
import Valine from 'valine';
import { PageBox } from '../CustomComponents';

const { Paragraph, Title } = Typography;

const About = () => {
    const isSet = useRef(false);

    useEffect(() => {
        if (isSet.current)
            return;

        new Valine({
            el: '#vcomments',
            appId: 'jna7lz0LGmyIgysA7RAwdAqc-gzGzoHsz',
            appKey: '1iqppXLG4oYbAswFVfL7pM7Q'
        });

        isSet.current = true;
    }, []);

    return <>
        <PageBox>
            <Typography>
                <Title level={5}> 2023年11月25日 Chimes 正式上线啦！</Title>

                <Paragraph>
                    欢迎来到这个独特的工具网站，这是一个为所有用户提供各种实用工具的在线平台。站主精心设计了一系列功能，旨在帮助您更高效地完成工作，提升您的网络使用体验。
                </Paragraph>

                <Paragraph>
                    本站静态托管于Vercel，也没有后台服务，您的数据不会被上传到任何服务器，所有数据均在您的浏览器中进行处理，您可以放心使用。
                </Paragraph>

                <Paragraph>
                    欢迎留下些宝贵的意见或建议，由于站主较懒，您的宝贵反馈也不一定会有所响应，但万一看到开心了呢~~~
                </Paragraph>
            </Typography>
            <div style={{ padding: 40 }}>
                <div id="vcomments"></div>
            </div>
        </PageBox>
    </>
}

export default About;
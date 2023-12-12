import React, { useEffect, useRef } from 'react';
import { Tabs, Typography, Timeline } from 'antd';
import Valine from 'valine';

const { Paragraph, Text } = Typography;

const TimeLine = () => {
    return <>
        <div style={{ padding: 20 }}>
            <Timeline
                items={[
                    {
                        children: '2023-12-12 改造关于页面，添加评论功能，添加文本编辑工具',
                    },
                    {
                        children: '2023-12-11 重新设计JSON编辑器UI及交互，增加JSON编辑器的高度自适应',
                    },
                    {
                        children: '2023-12-04 添加JSON编辑器中的删除Key工具，JSON字段提取增加移除其他字段功能',
                    },
                    {
                        children: '2023-11-30 添加对比工具，添加JSON编辑器',
                    },
                    {
                        children: '2023-11-25 Chimes 站点第一版上线啦！',
                    }
                ]}
            />
        </div>
    </>
}

const Comment = () => {
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
        <Typography>
            <Paragraph>
                欢迎来到这个独特的工具网站，这是一个为所有用户提供各种实用工具的在线平台。站主精心设计了一系列功能，旨在帮助您更高效地完成工作，提升您的网络使用体验。
            </Paragraph>

            <Paragraph>
                <Text>
                    本站为静态网站，没有数据存储，也没有后台服务，您的数据不会被上传到服务器，所有数据均在您的浏览器中进行处理，您可以放心使用。
                </Text>
            </Paragraph>

            <Paragraph>
                本站静态托管于Vercel，由于是免费托管，不存在服务器欠费跑路问题，只要Vercel不跑路，访问量不超免费限制，本站就会一直在线。
            </Paragraph>

            <Paragraph>
                欢迎留下些宝贵的意见或建议，由于站主较懒，您的宝贵反馈也不一定会有所响应，但万一看到开心了呢~~~
            </Paragraph>
        </Typography>

        <div id="vcomments"></div>
    </>
}

const About = () => {
    return (
        <Tabs
            defaultActiveKey="0"
            size='large'
            items={[
                {
                    key: '0',
                    label: '留言板',
                    children: <Comment />,
                },
                {
                    key: '1',
                    label: '时间轴',
                    children: <TimeLine />,
                }
            ]} />
    )
}

export default About;
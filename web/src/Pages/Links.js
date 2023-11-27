import React from 'react';
import { Card, Space } from 'antd';

const Links = () => {
    const links = [
        {
            'title': '百度',
            'desc': '百度一下，你就知道',
            'url': 'https://www.baidu.com'
        },
        {
            'title': 'Web安全色',
            'desc': 'Web安全色是一组用于网页设计的颜色',
            'url': 'http://www.bootcss.com/p/websafecolors/'
        }
    ]

    return <>
        <div style={{ padding: 20 }}>
            <Space wrap>
                {
                    links.map((link, index) => {
                        return <Card
                            title={link.title}
                            style={{ width: 300 }}
                            hoverable
                            key={index}
                            onClick={() => { window.open(link.url) }}
                        >
                            {link.desc}
                        </Card>
                    })
                }
            </Space>
        </div>
    </>
}

export default Links;
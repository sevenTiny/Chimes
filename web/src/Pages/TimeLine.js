import React from 'react';
import { Timeline } from 'antd';

const TimeLine = () => {
    return <>
        <div style={{ padding: 20 }}>
            <Timeline
                items={[
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

export default TimeLine;
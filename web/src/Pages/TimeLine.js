import React from 'react';
import { Timeline } from 'antd';

const TimeLine = () => {
    return <>
        <div style={{ padding: 20 }}>
            <Timeline
                items={[
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
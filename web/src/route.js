import { ToolOutlined, HomeOutlined, LinkOutlined, BuildOutlined, BulbOutlined, EyeOutlined, EnvironmentOutlined, FileTextOutlined, CodepenOutlined } from '@ant-design/icons';
import Home from './Pages/Home';
import JsonTool from './Pages/JsonTool';
import XuanXue from './Pages/XuanXue';
import Links from './Pages/Links';
import About from './Pages/About';
import TxtEdit from './Pages/TxtTools/TxtEdit';
import Diff from './Pages/TxtTools/Diff';
import AbstractAlgorithm from './Pages/Encryption/AbstractAlgorithm';
import GenerateGuid from './Pages/GenerateTools/GenerateGuid';

const route = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/Home",
        element: <Home />,
    },
    {
        label: '文本工具',
        path: "/TxtTools",
        icon: <FileTextOutlined />,
        children: [
            {
                label: '文本编辑',
                path: "/TxtTools/TxtEdit",
                element: <TxtEdit />,
            },
            {
                label: '对比工具',
                path: "/TxtTools/Diff",
                element: <Diff />,
            },
        ]
    },
    {
        label: '生成器',
        path: "/GenerateTools",
        icon: <BuildOutlined />,
        children: [
            {
                label: 'GUID生成',
                path: "/GenerateTools/GenerateGuid",
                element: <GenerateGuid />
            },
        ]
    },
    {
        label: 'JSON 工具',
        path: "/JsonTool",
        element: <JsonTool />,
        icon: <ToolOutlined />,
    },
    {
        label: '编码/加密',
        path: "/Encryption",
        icon: <CodepenOutlined />,
        children: [
            {
                label: '摘要算法',
                path: "/Encryption/AbstractAlgorithm",
                element: <AbstractAlgorithm />
            },
        ]
    },
    {
        label: '玄学',
        path: "/XuanXue",
        element: <XuanXue />,
        icon: <BulbOutlined />,
    },
    {
        label: '常用链接',
        path: "/Links",
        element: <Links />,
        icon: <LinkOutlined />,
    },
    {
        label: '关于',
        path: "/About",
        element: <About />,
        icon: <EnvironmentOutlined />,
    }
];

export default route;
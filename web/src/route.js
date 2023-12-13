import { ToolOutlined, HomeOutlined, LinkOutlined, BuildOutlined, BulbOutlined, EyeOutlined, EnvironmentOutlined, FileTextOutlined } from '@ant-design/icons';
import Home from './Pages/Home';
import JsonTool from './Pages/JsonTool';
import GenerateTool from './Pages/GenerateTool';
import XuanXue from './Pages/XuanXue';
import Links from './Pages/Links';
import Diff from './Pages/Diff';
import About from './Pages/About';
import TxtEdit from './Pages/TxtTools/TxtEdit';

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
        ]
    },
    {
        label: 'JSON 工具',
        path: "/JsonTool",
        element: <JsonTool />,
        icon: <ToolOutlined />,
    },
    {
        label: '生成器',
        path: "/GenerateTool",
        element: <GenerateTool />,
        icon: <BuildOutlined />,
    },
    {
        label: '对比工具',
        path: "/Diff",
        element: <Diff />,
        icon: <EyeOutlined />,
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
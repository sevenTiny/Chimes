import { Button, message, Card, Modal, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const SuccessButton = ({
    title,
    onClick,
    ...props
}) => {
    return (
        <Button
            type="default"
            style={{ backgroundColor: '#009688', color: 'white' }}
            onClick={onClick}
            {...props}
        >
            {title}
        </Button>
    )
}

const CopyButton = ({
    onGetText,
    ...props
}) => {
    return (
        <SuccessButton
            title='复制结果'
            onClick={() => {
                const text = onGetText();
                navigator.clipboard.writeText(text);
                message.success('copied');
            }}
            {...props}
        />
    )
}

const DescriptionButton = ({
    description,
    ...props
}) => {
    return (
        <>
            <Button
                type="link"
                onClick={() => {
                    Modal.info({
                        title: '使用说明',
                        width: '60%',
                        content: (
                            <p>
                                {description}
                            </p>
                        ),
                        okText: '朕已阅',
                        onOk() { },
                        maskClosable: true,
                    });
                }}
                {...props}
            >
                使用说明
            </Button>
        </>
    )
}

const PageBox = ({ children }) => {
    return (
        <div
            style={{ paddingTop: 20 }}>
            {children}
        </div>
    )
}

const DescriptionBox = ({ children }) => {
    return (
        <Typography>
            <Title level={5}>说明</Title>
            <Paragraph>
                {children}
            </Paragraph>
        </Typography>
    )
}

export {
    SuccessButton,
    CopyButton,
    DescriptionButton,
    PageBox,
    DescriptionBox
};
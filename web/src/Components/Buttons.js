import React from 'react';
import { Button, message } from 'antd';

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

export { SuccessButton, CopyButton };
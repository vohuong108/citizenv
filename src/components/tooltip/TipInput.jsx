import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const TipInput = ({ content, placement = "bottom" }) => {
    return (
        <Tooltip placement={placement} title={content} trigger={["hover", "click"]}>
            <QuestionCircleOutlined style={{fontSize: "0.875rem"}}/>
        </Tooltip>
    )
}

export default TipInput

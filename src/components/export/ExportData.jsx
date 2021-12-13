import React from 'react';
import { List, Popover, Button } from 'antd';
import { FileExcelOutlined, PrinterOutlined, PlusOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';

const ExportData = ({ title = "", placement, data}) => {
    const content = (
        <List className="list-export">
            <List.Item className="list-export-item">
                <FileExcelOutlined style={{marginRight: '8px'}}/>
                <CSVLink className="btn-export-csv" data={data} filename={"filename"}>Export CSV</CSVLink>
            </List.Item>
            <List.Item className="list-export-item">
                <PrinterOutlined style={{marginRight: '8px'}}/>
                Print
            </List.Item>
        </List>
    )
    return (
        <Popover 
            overlayClassName="export-data" 
            content={content} 
            placement={placement} 
            trigger="click"
            style={{borderRadius: '6px'}}
        >
            <Button 
                id="btn-export" 
                icon={<PlusOutlined />}
            >{title}</Button>
        </Popover>
    )
}

export default ExportData

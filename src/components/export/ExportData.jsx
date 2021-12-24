import React from 'react';
import { List, Popover, Button } from 'antd';
import { FileExcelOutlined, PrinterOutlined, PlusOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';

const ExportData = ({ title = "", placement, data, type = "multiple"}) => {
    console.log("export data: ", data);

    const content = (
        <List className="list-export">
            <List.Item className="list-export-item">
                <FileExcelOutlined style={{marginRight: '8px', color: 'green'}}/>
                <CSVLink className="btn-export-csv" data={data} filename={"filename"}>Export CSV</CSVLink>
            </List.Item>
        </List>
    )
    return (
        type === "multiple" 
        ? (<Popover 
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
        ) : (
        <Button className="btn-single-export" icon={<FileExcelOutlined style={{marginRight: '8px', color: 'green'}}/>}>
            <CSVLink className="btn-export-csv" data={data} filename={"filename"}>Export CSV</CSVLink>
        </Button>)
    )
}

export default ExportData

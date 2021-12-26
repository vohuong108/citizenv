import React from 'react';
import { List, Popover, Button } from 'antd';
import { FileExcelOutlined, PrinterOutlined, PlusOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import moment from 'moment';

const ExportData = ({ title = "", placement, data = [], type = "multiple", layout}) => {
    console.log("data export: ", data);
    console.log("layout export: ", layout);
    const [dataExport, setDataExport] = React.useState([])

    const content = (
        <List className="list-export">
            <List.Item className="list-export-item">
                <FileExcelOutlined style={{marginRight: '8px', color: 'green'}}/>
                <CSVLink className="btn-export-csv" data={dataExport} filename={"filename"}>Export CSV</CSVLink>
            </List.Item>
        </List>
    );

    React.useEffect(() => {
        let handleExportData = () => {
            if(data.length > 0 && layout === "COMBINE") {
                console.log("in combine")
                let temp = data.map(item => ({
                    "Tên đơn vị": item.locationName,
                    "Mã đơn vị": item.locationId,
                    "Dân Số": item.totalPeople,
                    "Nam giới": item.male,
                    "Nữ giới": item.female,
                    "Tiến độ": item.state ? "Hoàn Thành" : "Chưa Hoàn Thành"
                }));

                console.log("temp: ", temp);
                setDataExport([...temp]);
            } else if(data.length > 0 && layout === "ACCOUNT") {
                console.log("in account");
                let temp = data.map(item => ({
                    "Tên đơn vị": item.location ? item.location : "Tổng Cục Dân Số",
                    "Mã đơn vị": item.username,
                    "Cấp Bậc": item.level,
                    "Bắt đầu khai báo": item.start ? moment.utc(item.start).local().format('DD-MM-YYYY HH:mm:ss') : "Chưa Xác Định",
                    "Kết thúc khai báo": item.end ? moment.utc(item.end).local().format('DD-MM-YYYY HH:mm:ss') : "Chưa Xác Định",
                    "Trạng thái": item.state
                }));

                console.log("temp account: ", temp);
                setDataExport([...temp]);
            }
        }

        handleExportData();
    }, [data])

   
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
            <CSVLink className="btn-export-csv" data={dataExport} filename={"filename"}>Export CSV</CSVLink>
        </Button>)
    )
}

export default ExportData

import React from 'react';
import { Modal, Button, Divider, List, Popover, message } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import userApi from '../../api/userApi';
import { useSelector } from 'react-redux';
import { getToken } from '../../utils/localStorageHandler';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getListPopulation } from '../../features/manager/population/populationAction';
import qs from 'query-string';

const ViewPersonal = ({ id }) => {
    const user = useSelector(state => state.user.userObj);
    const dispatch = useDispatch();
    let location = useLocation();

    const personalInfo = async () => {
        let response = await userApi.viewPersonalInfo({
            access_token: getToken(),
            id: id
        });
        console.log("rview res: ", response);
        Modal.info({
            title: <><h3>Thông Tin Cá Nhân</h3><Divider /></>,
            content: (
                <div>
                    <p>
                        <span style={{fontWeight: 500}}>Họ Tên: </span>
                        <span style={{textTransform: "capitalize"}}>{response?.name}</span>
                    </p>
                    <p>
                        <span style={{fontWeight: 500}}>Số CCCD/CMND: </span>
                        <span style={{textTransform: "capitalize"}}>{response.citizenId ? response.citizenId : "Không có"}</span>
                    </p>
                    <p>
                        <span style={{fontWeight: 500}}>Ngày Sinh: </span>
                        <span style={{textTransform: "capitalize"}}>{moment(response?.dateOfBirth, 'YYYY/MM/DD').format("DD/MM/YYYY")}</span>
                    </p>
                    <p>
                        <span style={{fontWeight: 500}}>Giới Tính: </span>
                        <span style={{textTransform: "capitalize"}}>{response?.gender}</span>
                    </p>
                    <p>
                        <span style={{fontWeight: 500}}>Tôn Giáo: </span>
                        <span style={{textTransform: "capitalize"}}>{response?.religion}</span>
                    </p>
                    <p>
                        <span style={{fontWeight: 500}}>Trình Độ Văn Hóa: </span>
                        <span style={{textTransform: "capitalize"}}>{response?.educationLevel}</span>
                    </p>
                    <p>
                        <span style={{fontWeight: 500}}>Nghề Ngiệp: </span>
                        <span style={{textTransform: "capitalize"}}>{response?.job ? response.job : "Không có"}</span>
                    </p>
                    <p>
                        <span style={{fontWeight: 500}}>Quê Quán: </span>
                        <span style={{textTransform: "capitalize"}}>{
                            response?.peopleLocations.find(el => el.locationType === "quê quán").locationName
                        }</span>
                    </p>
                    <p>
                        <span style={{fontWeight: 500}}>Địa Chỉ Thường Trú: </span>
                        <span style={{textTransform: "capitalize"}}>
                            {response?.peopleLocations.find(el => el.locationType === "thường trú").locationName}
                        </span>
                    </p>
                    <p>
                        <span style={{fontWeight: 500}}>Địa chỉ Tạm Trú: </span>
                        <span style={{textTransform: "capitalize"}}>
                        {response?.peopleLocations.find(el => el.locationType === "tạm trú") 
                            ? response?.peopleLocations.find(el => el.locationType === "tạm trú").locationName
                            : "Không có"
                        }
                        </span>
                    </p>
                </div>
            ),
            icon: null,
        })
    }

    const deleteConfirm = () => {
        
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa thông tin của người này không?',
            icon: <ExclamationCircleOutlined />,
            content: 'Thông tin này sẽ bị xóa vĩnh viễn',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    let response = await userApi.deletePersonalInfo({
                        access_token: getToken(),
                        id: id
                    });

                    let newRes = await dispatch(getListPopulation({
                        access_token: getToken(),
                        params: qs.parse(location?.search)
                    }));

                    console.log("new res: ", newRes);

                    message.success({
                        content: response,
                        style: {marginTop: '72px'},
                        key: "del-info-msg"
                    })
                } catch (error) {
                    message.error({
                        content: error.message,
                        style: {marginTop: '72px'},
                        key: "del-info-msg"
                    })
                }
            },
            onCancel() {
            },
        });
    }

    const content = (
        <List className="view-list-action">
            <List.Item className="list-action-item" onClick={() => personalInfo()}>
                <EyeOutlined style={{color: 'green', marginRight: '4px'}}/>
                Xem
            </List.Item>
            {user?.userRole === "ROLE_B1" && 
            <>
                <List.Item className="list-action-item">
                    <EditOutlined style={{marginRight: '4px'}}/>
                    <Link to={`/edit/${id}`} style={{color: '#000'}}>{"Chỉnh Sửa"}</Link>
                </List.Item>
                <List.Item className="list-action-item" onClick={() => deleteConfirm()}>
                    <DeleteOutlined style={{color: 'red', marginRight: '4px'}}/>
                    Xóa
                </List.Item>
            </>
            }
        </List>
    )

    return (
        <>
        {(user?.userRole === 'ADMIN' || user?.userRole === 'A1' || user?.userRole === 'A2' || user?.userRole === 'A3')
            ? <Button
                style={{borderRadius: '8px'}}
                icon={<EyeOutlined style={{color: 'green'}}/>}
                onClick={() => personalInfo()}
            >
                Xem 
            </Button>
            : <Popover 
                overlayClassName="view-action"
                content={content} 
                placement="bottomRight"
                trigger="focus"
                style={{borderRadius: '6px'}}
            >
                <Button style={{borderRadius: '8px'}}>Hành Động</Button>
            </Popover>
        }
        </>
    )
}

export default ViewPersonal



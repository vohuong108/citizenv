import React, { useState, useEffect } from 'react';
import { Select, Divider, Input, Row, Col, Tag, DatePicker} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import userApi from '../../api/userApi';
import { getToken } from '../../utils/localStorageHandler';

const Register = () => {
    const [accountLevel, setAccountLevel] = useState(null);
    const { control, register, handleSubmit, setValue, formState: { errors }, setError } = useForm();
    const user = useSelector(state => state.user.userObj);
    const [locationData, setLocationData] = useState([]);

    let handleNextId = () => {
        let nextId = locationData.length;
        console.log("length locationData: ", nextId);

        if(user?.userRole === "ROLE_A1") return String(nextId + 1).padStart(2, '0');
        else return `${user?.username}${String(nextId + 1).padStart(2, '0')}`;
        
    }

    let getListLocation = async () => {
        let token = getToken();
        let response = await userApi.getListLocation({access_token: token});

        let temp = response.map(item => ({
            location: item.location, 
            username: item.username,
            enable: false
        }));
        
        console.log("response list location: ", temp)
        setLocationData([...temp]);
    }

    const onSubmit = async (data) => {
        console.log("data submit register: ", data);
        // console.log("data change time 1: ", data.release_date);
        // console.log("data change time 2: ", data.release_date.format());
        // console.log("data change time 3: ", moment.utc(data.release_date.format()).local());
        if(data.password !== data.confirm) {
            setError("confirm", {
                type: "manual",
                message: "Mật khẩu không khớp. Vui lòng nhập lại"
            });

        } else {
            let token = getToken();
            let response = await userApi.register({access_token: token, data: data});
            console.log("response register: ", response);

            let res_location = await getListLocation();
        }
    }

    useEffect(() => {

        if(user?.userRole === "ROLE_A1") {
            setAccountLevel('Tỉnh/Thành');
        } else if(user?.userRole === "ROLE_A2") {
            setAccountLevel('Quận/Huyện');
        } else if(user?.userRole === "ROLE_A3") {
            setAccountLevel('Xã/Phường');
        } else if(user?.userRole === "ROLE_B1") {
            setAccountLevel('Thôn/Bản/Tổ dân phố');
        }

        getListLocation();

    }, [user])
    return (
        <div className="register">
            <div className="register-container">
                <div className="register-header">
                    <p>Cấp mới tài khoản</p>
                </div>
                <div className="register-body">
                    <form id="form-register" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div className="form-item">
                            <label className="label-select" >{accountLevel}</label>
                            <Controller
                                name="location"
                                control={control}
                                rules={{ required: "Vui lòng chọn đơn vị được cấp tài khoản."}}
                                render={({ field }) =>
                                    <SelectAppend 
                                        data={locationData} 
                                        nextId={handleNextId()} 
                                        field={field} 
                                        setValue={setValue}
                                    />
                                }
                            />
                        </div>
                        {errors.location && <p className="err-msg">{errors.location.message}</p>}

                        <div className="form-item">
                            <label>Tên đăng nhập</label>
                            <input type="text" disabled {...register("username")}/>
                        </div>
                        <div className="form-item">
                            <label>Mật khẩu</label>
                            <input name="password" type="password" {...register("password", { required: "Vui lòng nhập mật khẩu." })}/>
                        </div>
                        {errors.password && <p className="err-msg">{errors.password.message}</p>}

                        <div className="form-item">
                            <label>Nhập lại mật khẩu</label>
                            <input name="confirm" type="password" {...register("confirm", { required: "Vui lòng nhập lại mật khẩu." })}/>
                        </div>
                        {errors.confirm && <p className="err-msg">{errors.confirm.message}</p>}
                        {/* <Row>
                            <Col xs={24} sm={12}>
                                <div className="form-item">
                                    <Tag color="cyan" className="start-label">Ngày bắt đầu </Tag>
                                    <Controller
                                        name="release_date"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => 
                                            <DatePicker 
                                                dropdownClassName="register-date-picker" 
                                                value={field.value} 
                                                showTime 
                                                onChange={(date) => field.onChange(date)}
                                            />
                                        }
                                    />
                                    {errors.release_date?.type === 'required' && <p className="err-msg">Vui lòng chọn ngày bắt đầu</p>}
                                </div>
                            </Col>
                            <Col xs={24} sm={12}>
                                <div className="form-item">
                                    <Tag color="#f50" className="end-label">Ngày kết thúc </Tag>
                                    <Controller
                                        name="finish_date"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => 
                                            <DatePicker 
                                                dropdownClassName="register-date-picker"
                                                value={field.value} 
                                                showTime 
                                                onChange={(date) => field.onChange(date)}
                                            />
                                        }
                                    />
                                    {errors.finish_date?.type === 'required' && <p className="err-msg">Vui lòng chọn ngày kết thúc</p>}
                                </div>
                            </Col>
                        </Row> */}
                        <div className="form-item">
                            <label className="label-select">Trạng thái</label>
                            <Controller 
                                name="state"
                                control={control}
                                defaultValue="Active"
                                render={({ field }) =>
                                    <Select 
                                        className="active-select" 
                                        onChange={(value) => field.onChange(value)}
                                        defaultValue='Active'
                                    >
                                        <Select.Option key={1} value={'Active'} >Active</Select.Option>
                                        <Select.Option key={2} value={'InActive'}>InActive</Select.Option>
                                    </Select>
                                }
                            />
                        </div>
                        
                        <input type="submit" value="Tạo tài khoản" onClick={() => console.log("click")}/>
                    </form>
                </div>
            </div>

        </div>
    )
}

const SelectAppend = ({ data, nextId, setValue, field }) => {
    const [accData, setAccData] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleAppend = () => {
        if(inputValue.trim() !== "") {
            setAccData([...accData, {username: accData?.length, location: inputValue, enable: true}])
        }
    }

    useEffect(() => {
        setAccData([...data]);
    }, [data])
    return (
        <Select
            style={{ width: 240 }}
            showSearch
            allowClear
            filterOption={(input, option) => {
                return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }}
            placeholder="Vui lòng thêm đơn vị"
            onChange={(value) => {
                field.onChange(value);
                console.log("on change: ", value); 
                if(value) {
                    setValue("username", nextId);
                } else setValue("username", "")
            }}
            dropdownRender={menu => (
            <div>
                {menu}
                <Divider style={{ margin: '4px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Input 
                    style={{ flex: 'auto', textTransform: 'capitalize' }} 
                    value={inputValue} 
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                />
                <a
                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                    onClick={() => handleAppend()}
                >
                    <PlusOutlined /> Thêm
                </a>
                </div>
            </div>
            )}
        >
            {accData?.map((item, ind) => (
                <Select.Option 
                    key={ind} 
                    disabled={!item?.enable}
                    value={item?.location}
                    style={{textTransform:"capitalize"}}
                >
                    {item?.location}
                </Select.Option>
            ))}
        </Select>
    )
}

export default Register

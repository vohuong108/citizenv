import React, { useState, useEffect } from 'react';
import { Select, Divider, Input, Row, Col, Tag, DatePicker} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm, Controller } from "react-hook-form";
import moment from "moment";

const Register = () => {
    const [accountLevel, setAccountLevel] = useState(null);
    const { control, register, handleSubmit, setValue, formState: { errors }, setError } = useForm();
    
    let user = {
        userRole: 'B1',
        username: "1"
    }
    const onSubmit = async (data) => {
        console.log("data submit register: ", data);
        console.log("data change time 1: ", data.release_date);
        console.log("data change time 2: ", data.release_date.format());
        console.log("data change time 3: ", moment.utc(data.release_date.format()).local());
        if(data.password !== data.confirm) {
            setError("confirm", {
                type: "manual",
                message: "Mật khẩu không khớp. Vui lòng nhập lại"
            });
        }
    }

    useEffect(() => {

        if(user.userRole === 'A1') {
            setAccountLevel('Tỉnh/Thành');
        } else if(user.userRole === 'A2') {
            setAccountLevel('Quận/Huyện');
        } else if(user.userRole === 'A3') {
            setAccountLevel('Xã/Phường');
        } else if(user.userRole === 'B1') {
            setAccountLevel('Thôn/Bản/Tổ dân phố');
        }

    }, [])
    return (
        <div className="register">
            <div className="register-container">
                <div className="register-header">
                    <p>Cấp mới tài khoản</p>
                </div>
                <div className="register-body">
                    <form id="form-register" onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-item">
                            <label className="label-select" >{accountLevel}</label>
                            <SelectLocation 
                                accId={user?.username} 
                                setValue={setValue} 
                                control={control} 
                                userRole={user?.userRole}
                            />
                        </div>
                        {errors.unit && <p className="err-msg">{errors.unit.message}</p>}

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
                        <Row>
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
                        </Row>
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

const SelectLocation = ({ accId, setValue, control, userRole }) => {
    const [data, setData] = useState([
        {id: 1, name: "hà nội", disable: true},
        {id: 2, name: "đà nẵng", disable: true},
        {id: 3, name: "hồ chí minh", disable: true},
    ]);

    const nextId = 4;

    const onSearch = (value) => {}

    useEffect(() => {

    }, [accId])
    return (      
        userRole === 'B1' ? (
            <Controller
                name="name"
                control={control}
                rules={{ required: "Vui lòng chọn đơn vị được cấp tài khoản."}}
                render={({ field }) =>
                    <SelectAppend 
                        data={data} 
                        nextId={nextId} 
                        field={field} 
                        setValue={setValue}
                    />
                }
            />
        ) : (
            <Controller 
                name="name"
                control={control}
                rules={{ required: "Vui lòng chọn đơn vị được cấp tài khoản."}}
                render={({ field }) =>
                    <Select
                        showSearch
                        placeholder="Vui lòng chọn"
                        optionFilterProp="children"
                        onChange={(value) => {
                            field.onChange(value); 
                            setValue("username", value);
                        }}
                        onSearch={onSearch}
                        filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }}
                    >
                        {data?.map((obj, ind) => (
                            <Select.Option key={ind} value={obj.id}>{obj.name}</Select.Option>
                        ))}
                    </Select>
                }
            />
        )
    )
}

const SelectAppend = ({ data, nextId, setValue, field }) => {
    const [accData, setAccData] = useState([...data]);
    const [inputValue, setInputValue] = useState("");

    const handleAppend = () => {
        if(inputValue.trim() !== "") {
            setAccData([...accData, {id: accData?.length, name: inputValue, disable: false}])
        }
    }

    useEffect(() => {}, [data])
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
                setValue("username", nextId);
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
                        disabled={item?.disable}
                        value={item?.name}
                        style={{textTransform:"capitalize"}}
                    >
                        {item?.name}
                    </Select.Option>
                ))}
        </Select>
    )
}

export default Register

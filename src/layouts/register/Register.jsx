import React, { useState, useEffect } from 'react';
import { Select, Divider, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
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

        if(user?.userRole === "ROLE_ADMIN") return `minister${String(nextId + 1).padStart(2, '0')}`
        else if(user?.userRole === "ROLE_A1") return String(nextId + 1).padStart(2, '0');
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

        if(user?.userRole === "ROLE_ADMIN") setValue("username", `minister${String(temp.length + 1).padStart(2, '0')}`);
    }

    const onSubmit = async (formData) => {
        console.log("data submit register: ", formData);
        // console.log("data change time 1: ", data.release_date);
        // console.log("data change time 2: ", data.release_date.format());
        // console.log("data change time 3: ", moment.utc(data.release_date.format()).local());
        if(formData.password !== formData.confirm) {
            setError("confirm", {
                type: "manual",
                message: "Mật khẩu không khớp. Vui lòng nhập lại"
            });

        } else {
            try {
                let data = {
                    location: formData?.location?.trim()?.toLowerCase(),
                    password: formData.password,
                    state: formData.state,
                    username: formData.username
                }
                
                let response = await userApi.register({access_token: getToken(), data: data});
                console.log("response register: ", response);
    
                if(response?.username) {
                    message.success({
                        content: "Cấp tài khoản thành công",
                        style: {marginTop: '72px'},
                        key: "register-msg"
                    });
                }
    
                if(user?.userRole !== "ROLE_ADMIN" && user?.userRole !== "ROLE_B2") {
                    let res_location = await getListLocation();
                }
                setValue("location", "");
                setValue("username", "");
            } catch (err) {
                message.error({
                    content: err.message,
                    style: {marginTop: '72px'},
                    key: "register-msg"
                });
            }
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

        if(user) getListLocation();

    }, [user])
    return (
        <div className="register">
            <div className="register-container">
                <div className="register-header">
                    <p>Cấp mới tài khoản</p>
                </div>
                <div className="register-body">
                    <form id="form-register" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        {(user?.userRole !== "ROLE_ADMIN" && user?.userRole !== "ROLE_B2") &&
                            <>
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
                            </>
                        }

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
            setAccData([...accData, {username: accData?.length, location: inputValue, enable: true}]);
            setInputValue("");
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
            value={field.value}
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

import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { useForm, Controller } from "react-hook-form";

const Register = () => {
    const [accountLevel, setAccountLevel] = useState(null);
    const { control, register, handleSubmit, setValue, formState: { errors }, setError } = useForm();
    
    let user = {
        userRole: 'A1',
        username: "1"
    }
    const onSubmit = async (data) => {
        console.log("data submit register: ", data)
        if(data.password !== data.confirm) {
            setError("confirm", {
                type: "manual",
                message: "Mật khẩu không khớp. Vui lòng nhập lại"
            });
        }
    }

    useEffect(() => {
        let user = {
            userRole: 'A1',
            id: "1"
        }

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
                            <SelectLocation accId={user.username} setValue={setValue} control={control}/>
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

                        <div className="form-item">
                            <label className="label-select">Trạng thái</label>
                            <Controller 
                                name="active"
                                control={control}
                                defaultValue="active"
                                render={({ field }) =>
                                    <Select 
                                        className="active-select" 
                                        onChange={(value) => field.onChange(value)}
                                        defaultValue='active'
                                    >
                                        <Select.Option key={1} value={'active'}>Active</Select.Option>
                                        <Select.Option key={2} value={'inactive'}>InActive</Select.Option>
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

const SelectLocation = ({ accId, setValue, control }) => {
    const [data, setData] = useState([
        {id: 1, name: "hà nội"},
        {id: 2, name: "đà nẵng"},
        {id: 3, name: "hồ chí minh"},
    ])

    const onSearch = (value) => {}

    useEffect(() => {

    }, [accId])
    return (            
        <Controller 
            name="unit"
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
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {data?.map((obj, ind) => (
                        <Select.Option key={ind} value={obj.id}>{obj.name}</Select.Option>
                    ))}
                </Select>
            }
        />
    )
}

export default Register

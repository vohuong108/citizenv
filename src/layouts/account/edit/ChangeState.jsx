import React, { useEffect } from 'react';
import { Select, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { getToken } from '../../../utils/localStorageHandler';
import { useDispatch } from 'react-redux';
import { getListAccount } from '../../../features/manager/account/accountAction';
import userApi from '../../../api/userApi';

const ChangeState = ({ isMultiple, data }) => {
    const { control, handleSubmit, setValue } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (formData) => {
        try {
            console.log("prop data: ", data);
            console.log("data change state: ", formData);

            if(!isMultiple) {
                let response = await userApi.changeAccountState({
                    access_token: getToken(), 
                    data: {
                        username: data.username, 
                        enable: formData.state === 'Active' ? true : false
                    }}
                );
        
                console.log("change response: ", response);

                message.success({
                    content: response,
                    style: {marginTop: '72px'},
                    key: "changestate-msg"
                })
            } else {
                let response = await userApi.changeListAccountState({
                    access_token: getToken(),
                    usernames: data, 
                    enable: formData.state,
                });
        
                console.log("mutilple change response: ", response);

                message.success({
                    content: response,
                    style: {marginTop: '72px'},
                    key: "changestate-msg"
                })

            }
            await dispatch(getListAccount({access_token: getToken()}));
    
            
        } catch (err) {
            message.error({
                content: err.message,
                style: {marginTop: '72px'},
                key: "changestate-msg"
            })
        }
    }

    useEffect(() => {
        if(!isMultiple) {
            if(data.state) {
                setValue("state", data?.state);
            }
        }
    }, [data])

    return (
        <div className="change-state">
            <div className="change-state-container">
                <div className="change-state-header">
                    <p>Thay đổi trạng thái quyền</p>
                </div>
                <div className="change-state-body">
                    <form id="form-change-state" onSubmit={handleSubmit(onSubmit)} >
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
                                    defaultValue="Active"
                                    value={field.value}
                                >
                                    <Select.Option key={1} value={'Active'}>Active</Select.Option>
                                    <Select.Option key={2} value={'InActive'}>InActive</Select.Option>
                                </Select>
                                }
                            />
                        </div>

                        <input type="submit" value="Lưu thay đổi" onClick={() => console.log("click")}/>
                    </form>
                </div>
            </div>  
        </div>
    )
}

export default ChangeState

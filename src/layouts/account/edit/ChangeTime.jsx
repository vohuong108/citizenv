import React, { useEffect } from 'react';
import { Tag, DatePicker, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';
import { getToken } from '../../../utils/localStorageHandler';
import userApi from '../../../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { getListAccount } from '../../../features/manager/account/accountAction';

const ChangeTime = ({ data, isMultiple }) => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userObj);

    const onSubmit = async (formData) => {
        try {
            console.log("prop data: ", data);
            console.log("submit change time data:  ", formData);
            
            let response;

            if(!isMultiple) {
                response = await userApi.changeTimeAccount({
                    access_token: getToken(), 
                    data: {
                        username: data.username, 
                        start: formData.startTime.format(), 
                        end: formData.endTime.format()
                    }}
                );
                console.log("change response: ", response);

            } else {
                response = await userApi.changeTimeListAccount({
                    access_token: getToken(), 
                    data: {
                        usernames: data, 
                        start: formData.startTime.format(), 
                        end: formData.endTime.format()
                    }}
                );
                console.log("multiple change response: ", response);
            }

            message.success({
                content: response?.message,
                style: {marginTop: '72px'},
                key: "changetime-msg"
            })

            await dispatch(getListAccount({access_token: getToken()}));
            

        } catch (err) {
            message.error({
                content: err.message,
                style: {marginTop: '72px'},
                key: "changetime-msg"
            })
        }
    }

    useEffect(() => {
        if(!isMultiple) {
            if(data.start && data.end) {
                setValue("startTime", moment.utc(data.start).local());
                setValue("endTime", moment.utc(data.end).local())
            }
        }

    }, [data])

    return (
        <div className="change-time">
            <div className="change-time-container">
                <div className="change-time-header">
                    <p>Thay đổi thời gian khai báo</p>
                </div>
                <div className="change-time-body">
                    <form id="form-change-time" onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-item">
                            <Tag color="cyan" className="start-label">Ngày bắt đầu </Tag>
                            <Controller
                                name="startTime"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => 
                                    <DatePicker 
                                        className="change-time-date-picker" 
                                        value={field.value} 
                                        showTime 
                                        onChange={(date) => field.onChange(date)}
                                        disabledDate={(cur) => 
                                            (cur > moment.utc(user?.end).local() || 
                                            cur < moment.utc(user?.start).local())
                                        }
                                    />
                                }
                            />
                            {errors.startTime?.type === 'required' && <p className="err-msg">Vui lòng chọn ngày bắt đầu</p>}
                        </div>
                        <div className="form-item">
                            <Tag color="#f50" className="end-label">Ngày kết thúc </Tag>
                            <Controller
                                name="endTime"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => 
                                    <DatePicker 
                                        className="change-time-date-picker"
                                        value={field.value} 
                                        showTime 
                                        onChange={(date) => field.onChange(date)}
                                        disabledDate={(cur) => 
                                            (cur > moment.utc(user?.end).local() || 
                                            cur < moment.utc(user?.start).local())
                                        }
                                    />
                                }
                            />
                            {errors.endTime?.type === 'required' && <p className="err-msg">Vui lòng chọn ngày kết thúc</p>}
                        </div>

                        <input type="submit" value="Lưu thay đổi" onClick={() => console.log("click")}/>
                    </form>
                </div>
            </div>  
        </div>
    )
}

export default ChangeTime

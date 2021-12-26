import React, { useEffect } from 'react';
import { Tag, DatePicker, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';
import { getToken } from '../../../utils/localStorageHandler';
import userApi from '../../../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { getListAccount } from '../../../features/manager/account/accountAction';

const ChangeTime = ({ data, isMultiple }) => {
    const { control, handleSubmit, formState: { errors }, setValue, setError } = useForm();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userObj);

    const onSubmit = async (formData) => {
        try {
            console.log("prop data: ", data);
            console.log("submit change time data:  ", formData);
            
            let response;
            if(formData.startTime >= formData.endTime) {
                setError("startTime", {
                    type: "manual",
                    message: "Ngày bắt đầu lớn hơn hoặc bằng ngày kết thúc"
                });
            } else {
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
            }
        } catch (err) {
            message.error({
                content: err.message,
                style: {marginTop: '72px'},
                key: "changetime-msg"
            })
        }
    }

    let handleDisableDate = (cur) => {
        let sTmp = moment.utc(user?.start)?.local().format('YYYY-MM-DD HH:mm:ss');
        let eTmp = moment.utc(user?.end)?.local().format('YYYY-MM-DD HH:mm:ss');
        
        let startCheck = cur && cur <  moment(sTmp, "YYYY-MM-DD HH:mm:ss");
        let endCheck = cur && cur > moment(eTmp, "YYYY-MM-DD HH:mm:ss").add(1, "day");

        return startCheck || endCheck;
    }

    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
    }

    let handleDisableDateTime= (type) => {
        if(type === "START") {
            let hourStart = moment.utc(user?.start)?.local().format('HH');
            let minStart = moment.utc(user?.start)?.local().format('mm');
            let secStart = moment.utc(user?.start)?.local().format('ss');

            return {
                disabledHours: () => range(0, hourStart),
                disabledMinutes: () => range(0, minStart),
                disabledSeconds: () => range(0, secStart),
            }
        } else if(type === "END") {

            let hourEnd = moment.utc(user?.end)?.local().format('HH');
            let minEnd = moment.utc(user?.end)?.local().format('mm');
            let secEnd = moment.utc(user?.end)?.local().format('ss');

            return {
                disabledHours: () => range(hourEnd, 24),
                disabledMinutes: () => range(minEnd, 60),
                disabledSeconds: () => range(secEnd, 60),
            }
        }

    }
        

    useEffect(() => {
        if(!isMultiple) {
            if(data.start && data.end) {
                setValue("startTime", moment.utc(data.start).local());
                setValue("endTime", moment.utc(data.end).local());
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
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-item">
                            <Tag color="cyan" className="start-label">Ngày bắt đầu </Tag>
                            <Controller
                                name="startTime"
                                control={control}
                                rules={{ required: "Vui lòng chọn ngày bắt đầu!" }}
                                render={({ field }) => 
                                    <DatePicker 
                                        className="change-time-date-picker" 
                                        value={field.value} 
                                        showTime 
                                        onChange={(date) => field.onChange(date)}
                                        disabledDate={(cur) => handleDisableDate(cur)}
                                        disabledTime={() => handleDisableDateTime("START")}
                                    />
                                }
                            />
                            {errors.startTime && <p className="err-msg">{errors.startTime?.message}</p>}
                        </div>
                        <div className="form-item">
                            <Tag color="#f50" className="end-label">Ngày kết thúc </Tag>
                            <Controller
                                name="endTime"
                                control={control}
                                rules={{ required: "Vui lòng chọn ngày kết thúc!" }}
                                render={({ field }) => 
                                    <DatePicker 
                                        className="change-time-date-picker"
                                        value={field.value} 
                                        showTime 
                                        onChange={(date) => field.onChange(date)}
                                        disabledDate={(cur) => handleDisableDate(cur)}
                                        disabledTime={() => handleDisableDateTime("END")}
                                    />
                                }
                            />
                            {errors.endTime && <p className="err-msg">{errors.endTime?.message}</p>}
                        </div>

                        <input type="submit" value="Lưu thay đổi" />
                    </form>
                </div>
            </div>  
        </div>
    )
}

export default ChangeTime

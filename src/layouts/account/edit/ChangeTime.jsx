import React, { useState, useEffect } from 'react';
import { Tag, DatePicker } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';

const ChangeTime = () => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = async (data) => {
        console.log("data change time 1: ", data.release_date);
        console.log("data change time 2: ", data.release_date.format());
        console.log("data change time 3: ", moment.utc(data.release_date.format()).local());
    }

    useEffect(() => {
        setValue("release_date", moment.utc("2021-12-10T07:55:41Z").local())
    }, [])

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
                                name="release_date"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => 
                                    <DatePicker 
                                        className="change-time-date-picker" 
                                        value={field.value} 
                                        showTime 
                                        onChange={(date) => field.onChange(date)}
                                    />
                                }
                            />
                            {errors.release_date?.type === 'required' && <p className="err-msg">Vui lòng chọn ngày bắt đầu</p>}
                        </div>
                        <div className="form-item">
                            <Tag color="#f50" className="end-label">Ngày kết thúc </Tag>
                            <Controller
                                name="finish_date"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => 
                                    <DatePicker 
                                        className="change-time-date-picker"
                                        value={field.value} 
                                        showTime 
                                        onChange={(date) => field.onChange(date)}
                                    />
                                }
                            />
                            {errors.finish_date?.type === 'required' && <p className="err-msg">Vui lòng chọn ngày kết thúc</p>}
                        </div>

                        <input type="submit" value="Lưu thay đổi" onClick={() => console.log("click")}/>
                    </form>
                </div>
            </div>  
        </div>
    )
}

export default ChangeTime

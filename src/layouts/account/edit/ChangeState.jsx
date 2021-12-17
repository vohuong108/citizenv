import React, { useEffect } from 'react';
import { Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';


const ChangeState = () => {
    const { control, handleSubmit, setValue } = useForm();

    const onSubmit = async (data) => {
        console.log("data change state: ", data);

    }

    useEffect(() => {
        setValue("state", "Active");
    }, [])

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
                                render={({ field }) => 
                                <Select 
                                    className="active-select" 
                                    onChange={(value) => field.onChange(value)}
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

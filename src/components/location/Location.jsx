import React from 'react';
import { Select } from 'antd';
import { Controller } from 'react-hook-form';

const Location = ( { 
    className = null, 
    name, control, 
    placeholder = "",
    data, 
    message, 
    errors = null, 
    style = null, 
    handleChange,
    handleClear=null,
}) => {
    return (
        <>
        <Controller 
            name={name}
            control={control}
            rules={{ required: message }}
            render={({ field }) => 
                <Select
                    className={className}
                    showSearch
                    allowClear
                    placeholder={placeholder}
                    style={style}
                    optionFilterProp="children"
                    value={field.value}
                    onChange={(value) => handleChange(field, value)}
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
        {(errors && errors[name]) && <p className="err-msg">{errors[name]?.message}</p>}
        </>
    )
}

export default Location

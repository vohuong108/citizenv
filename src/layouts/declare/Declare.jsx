import { Divider, Row, Col, Select, DatePicker, Switch } from 'antd';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import Location from '../../components/location/Location';
import { CaretRightOutlined } from '@ant-design/icons';

import locale from 'antd/es/date-picker/locale/vi_VN';

export default function Declare () {

    const { control, register: registerInfo, handleSubmit: handleSubmitInfo, setValue, formState: { errors }, setError } = useForm();

    const onHandleSubmit = (data)=>{
        console.log(data);
    }

    return (
        <div className="declare">
            <form onSubmit={handleSubmitInfo(onHandleSubmit)}>
                <div className="form-container">
                    <h1 className="title">Khai Báo Thông Tin Công Dân</h1>
                    <Divider />
                    <Row 
                        className="form-row-demographic"
                        align='middle'
                        gutter={[{ xs: 21, sm: 16, md: 24, xl: 30 }, { xs: 21, sm: 16, md: 24, xl: 30 }]}
                    >
                        <Col sm={12}>
                            <div className="form-item-demographic">
                                <label htmlFor="fullname">Họ và tên <span className="text-danger">*</span></label>
                                <input className="input-left" id="fullname" type="text" {...registerInfo("fullname", { required: "Vui lòng nhập họ tên." })} />
                            </div>
                            {errors.fullname && <p className="err-msg">{errors.fullname.message}</p>}
                        </Col>
                        <Col sm={12}>
                            <div className="form-item-demographic">
                                <label htmlFor="dateOfBirth">Ngày sinh <span className="text-danger">*</span></label>
                                <Controller 
                                    name="dateOfBirth"
                                    control={control}
                                    rules={{ required: "Vui lòng chọn ngày sinh."}}
                                    render={({ field }) => 
                                        <DatePicker
                                            locale={locale}
                                            id="dateOfBirth"
                                            className="input-right" 
                                            format="DD/MM/YYYY" 
                                            placeholder="ngày/tháng/năm"
                                            onChange={(value) => {
                                                field.onChange(value); 
                                            }}
                                        />
                                    }
                                />
                            </div>
                            {errors.dateOfBirth && <p className="err-msg">{errors.dateOfBirth.message}</p>}
                        </Col>
                        <Col sm={12}>
                            <div className="form-item-demographic">
                                <label htmlFor="personalId">Số CCCD/CMND</label>
                                <input className="input-left" id="personalId" type="number" {...registerInfo("personalId")}/>
                            </div>
                        </Col>
                        <Col sm={12}>
                            <div className="form-item-demographic">
                                <label htmlFor="phone" >Số điện thoại</label>
                                <input className="input-right" id="phone" type="number" {...registerInfo("phone")} />
                            </div>
                            {errors.phone && <p className="err-msg">{errors.phone.message}</p>}
                        </Col>

                        <Col sm={12}>
                            <div className="form-item-demographic">
                                <label htmlFor="religion">Tôn giáo <span className="text-danger">*</span></label>
                                <input className="input-left" id="religion" type="text" {...registerInfo("religion", { required: "Vui lòng nhập tôn giáo." })} />
                            </div>
                            {errors.religion && <p className="err-msg">{errors.religion.message}</p>}
                        </Col>
                        <Col sm={12}>
                            <div className="form-item-demographic">
                                <label htmlFor="education">Trình độ văn hóa<span className="text-danger">*</span></label>
                                <Controller 
                                    name="education"
                                    defaultValue="12/12"
                                    control={control}
                                    rules={{ required: "Vui lòng chọn trình độ văn hóa."}}
                                    render={({ field }) => 
                                        <Select 
                                            id="education"
                                            className="input-right"
                                            defaultValue="12/12"
                                            suffixIcon={<CaretRightOutlined rotate={90}/>}
                                            onChange={(value) => {
                                                field.onChange(value); 
                                            }}
                                        >
                                            {["0/12", "1/12", "2/12", "3/12", 
                                            "4/12", "5/12", "6/12", "7/12", 
                                            "8/12", "9/12", "10/12", "11/12", 
                                            "12/12", "Trung cấp", "Cao đẳng", 
                                            "Đại học", "Sau đại học"].map((item, ind) => 
                                                <Select.Option key={ind} value={item}>{item}</Select.Option>
                                            )}
                                        </Select>
                                    }
                                />
                            </div>
                            {errors.education && <p className="err-msg">{errors.education.message}</p>}
                        </Col>
                        <Col sm={12}>
                            <div className="form-item-demographic">
                                <label htmlFor="job">Nghề Nghiệp</label>
                                <input className="input-left" id="job" type="text"{...registerInfo("job")} />
                            </div>
                        </Col>
                        <Col sm={12}>
                            <div className="form-item-demographic">
                                <label htmlFor="gender">Giới tính <span className="text-danger">*</span></label>
                                <Controller 
                                    name="gender"
                                    control={control}
                                    defaultValue="nam"
                                    rules={{ required: "Vui lòng chọn giới tính."}}
                                    render={({ field }) => 
                                        <Select 
                                            id="gender"
                                            className="input-right"
                                            defaultValue="nam"
                                            suffixIcon={<CaretRightOutlined rotate={90}/>}
                                            onChange={(value) => {
                                                field.onChange(value); 
                                            }}
                                        >
                                            <Select.Option key="male" value="nam">Nam</Select.Option>
                                            <Select.Option key="female" value="nữ">Nữ</Select.Option>
                                        </Select>
                                    }
                                />
                            </div>
                            {errors.gender && <p className="err-msg">{errors.gender.message}</p>}
                        </Col>                        
                    </Row>
                    <Divider />
                    <AddressOption control={control} errors={errors}/>
                    <input value ="Kê Khai Thông Tin" type="submit" />
                </div>
            </form>
        </div>
    )
}

const AddressOption = ({ control, errors }) => {
    const [type, setType] = useState("regulary");

    const onSearch = (value) => {}
    const hamletData = [
        {id: 1, name: "hà nội"},
        {id: 2, name: "đà nẵng"},
        {id: 3, name: "hồ chí minh"},
    ];
    const wardData = [
        {id: 1, name: "hà nội"},
        {id: 2, name: "đà nẵng"},
        {id: 3, name: "hồ chí minh"},
    ];
    const districtData = [
        {id: 1, name: "hà nội"},
        {id: 2, name: "đà nẵng"},
        {id: 3, name: "hồ chí minh"},
    ];
    const provinceData = [
        {id: 1, name: "hà nội"},
        {id: 2, name: "đà nẵng"},
        {id: 3, name: "hồ chí minh"},
    ];

    return (
        <>
            <div className="form-row-address-1">
                <h3>Quê Quán <span className="text-danger">*</span></h3>
                <Row gutter={[{ xs: 21, sm: 16, md: 24, xl: 30 }, 0]}>
                    <Col span={6}>
                        <label>Thôn/Bản</label>
                        <Location
                            className="location-1" 
                            name="hamlet1"
                            errors={errors}
                            control={control}
                            message="Vui lòng chọn thôn/bản"
                            onSearch={onSearch}
                            data={hamletData}
                            placeholder="Thôn/Bản"
                        />
                    </Col>
                    <Col span={6}>
                        <label>Xã/Phường</label>
                        <Location
                            className="location-1" 
                            name="ward1"
                            errors={errors}
                            control={control}
                            message="Vui lòng chọn xã/phường"
                            onSearch={onSearch}
                            data={wardData}
                            placeholder="Xã/Phường"
                        />
                    </Col>
                    <Col span={6}>
                        <label>Huyện/Quận</label>
                        <Location
                            className="location-1" 
                            name="district1"
                            errors={errors}
                            control={control}
                            message="Vui lòng chọn huyện/quận"
                            onSearch={onSearch}
                            data={districtData}
                            placeholder="Huyện/Quận"
                        />
                    </Col>
                    <Col span={6}>
                        <label>Tỉnh/Thành</label>
                        <Location
                            className="location-1" 
                            name="province1"
                            errors={errors}
                            control={control}
                            message="Vui lòng chọn tỉnh/thành"
                            onSearch={onSearch}
                            data={provinceData}
                            placeholder="Tỉnh/Thành"
                        />
                    </Col>
                </Row>
            </div>
            <Divider />

            <div className="select-declare-type">
                <label>Đối tượng khai báo</label>
                <Switch 
                    unCheckedChildren="Tạm Trú" 
                    checkedChildren="Thường Trú" 
                    defaultChecked 
                    onChange={(checked) => checked ? setType("regulary") : setType("temporary")}
                />
            </div>

            {type === "regulary"
                ? <div className="form-item-address-only">
                    <h3>Địa Chỉ Thường Trú <span className="text-danger">*</span></h3>
                    <Location 
                        name="hamlet2"
                        control={control}
                        message="Vui lòng chọn thôn/bản của nơi thường trú"
                        onSearch={onSearch}
                        data={hamletData}
                        placeholder="Thôn/Bản"
                        style={{width: '120px'}}
                    />
                    <span>{", xã Quỳnh Hoa, huyện Quỳnh Lưu, tỉnh Nghệ An"}</span>
                    {errors?.hamlet2 && <p className="err-msg">{errors?.hamlet2?.message}</p>}
                </div>
                : <div className="form-row-address-2">
                    <h3>Địa Chỉ Thường Trú <span className="text-danger">*</span></h3>
                    <Row gutter={[{ xs: 21, sm: 16, md: 24, xl: 30 }, 0]}>
                        <Col span={6}>
                            <label>Thôn/Bản</label>
                            <Location
                                className="location-2" 
                                name="hamlet1"
                                errors={errors}
                                control={control}
                                message="Vui lòng chọn thôn/bản"
                                onSearch={onSearch}
                                data={hamletData}
                                placeholder="Thôn/Bản"
                            />
                        </Col>
                        <Col span={6}>
                            <label>Xã/Phường</label>
                            <Location
                                className="location-2" 
                                name="ward1"
                                errors={errors}
                                control={control}
                                message="Vui lòng chọn xã/phường"
                                onSearch={onSearch}
                                data={wardData}
                                placeholder="Xã/Phường"
                            />
                        </Col>
                        <Col span={6}>
                            <label>Huyện/Quận</label>
                            <Location
                                className="location-2" 
                                name="district1"
                                errors={errors}
                                control={control}
                                message="Vui lòng chọn huyện/quận"
                                onSearch={onSearch}
                                data={districtData}
                                placeholder="Huyện/Quận"
                            />
                        </Col>
                        <Col span={6}>
                            <label>Tỉnh/Thành</label>
                            <Location
                                className="location-2" 
                                name="province1"
                                errors={errors}
                                control={control}
                                message="Vui lòng chọn tỉnh/thành"
                                onSearch={onSearch}
                                data={provinceData}
                                placeholder="Tỉnh/Thành"
                            />
                        </Col>
                    </Row>
                </div>
            }
            {type === "temporary" &&
                <div className="form-item-address-only">
                    <h3>Địa Chỉ Tạm Trú<span className="text-danger">*</span></h3>
                    <Location 
                        name="hamlet3"
                        control={control}
                        message="Vui lòng chọn thôn/bản của nơi tạm trú"
                        onSearch={onSearch}
                        data={hamletData}
                        placeholder="Thôn/Bản"
                        style={{width: '120px'}}
                    />
                    <span>{", xã Quỳnh Hoa, huyện Quỳnh Lưu, tỉnh Nghệ An"}</span>
                    {errors?.hamlet3 && <p className="err-msg">{errors?.hamlet3?.message}</p>}
                </div>
            }
        </>
    )
}
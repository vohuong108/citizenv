import { Divider, Row, Col, Select, DatePicker, Switch, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import Location from '../../components/location/Location';
import { CaretRightOutlined } from '@ant-design/icons';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { DownloadOutlined  } from '@ant-design/icons';
import { removeAscent } from "../../utils/validate";
import axios from "axios";

function isFullnameValid (string) {
    var re = /^[a-zA-Z]{2,}(?: [a-zA-Z]+){1,}$/g // regex here
    return re.test(removeAscent(string))
}

function isReligionValid (string) {
    var re = /^[A-Za-z ]+$/g // regex here
    return re.test(removeAscent(string))
}

export default function Declare ({type = "declare"}) {

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
                        <Col xs={24} sm={24} md={12}>
                            <div className="form-item-demographic">
                                <label className="label-left" htmlFor="fullname">Họ và tên <span className="text-danger">*</span></label>
                                <input 
                                    className="input-left" 
                                    style={{textTransform: "capitalize"}}
                                    id="fullname" 
                                    type="text" 
                                    autoComplete="off"
                                    {...registerInfo("fullname", { 
                                        required: "Vui lòng nhập họ tên.", 
                                        validate: (value) => isFullnameValid(value) ? true : "Vui lòng nhập đúng định dạng"
                                    })} 
                                />
                            </div>
                            {errors?.fullname && <p className="err-msg">{errors.fullname.message}</p>}
                        </Col>
                        <Col xs={24} sm={24} md={12}>
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
                                            disabledDate={(current) => current && current > moment().endOf('day')}
                                            onChange={(value) => {
                                                field.onChange(value); 
                                            }}
                                        />
                                    }
                                />
                            </div>
                            {errors.dateOfBirth && <p className="err-msg">{errors.dateOfBirth.message}</p>}
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <div className="form-item-demographic">
                                <label className="label-left" htmlFor="personalId">Số CCCD/CMND</label>
                                <input 
                                className="input-left" 
                                id="personalId" 
                                type="number" 
                                {...registerInfo("personalId", {
                                    pattern: {
                                        value: /(^[0-9]{9,9}$)|(^[0-9]{12,12}$)/g,
                                        message: "Vui lòng nhập đúng định dạng."
                                    }
                                }
                                )}
                                />
                            </div>
                            {errors.personalId && <p className="err-msg">{errors.personalId.message}</p>}
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <div className="form-item-demographic">
                                <label htmlFor="phone" >Số điện thoại</label>
                                <input 
                                className="input-right" 
                                id="phone" 
                                type="number" 
                                {...registerInfo("phone", {
                                    pattern: {
                                        value: /^[0-9]{10,10}$/g,
                                        message: "Vui lòng nhập đúng định dạng."
                                    }
                                })} 
                                />
                            </div>
                            {errors.phone && <p className="err-msg">{errors.phone.message}</p>}
                        </Col>

                        <Col xs={24} sm={24} md={12}>
                            <div className="form-item-demographic">
                                <label className="label-left" htmlFor="religion">Tôn giáo <span className="text-danger">*</span></label>
                                <input 
                                    className="input-left" 
                                    id="religion" 
                                    type="text" 
                                    {...registerInfo("religion", { 
                                        required: "Vui lòng nhập tôn giáo.",
                                        validate: (value) => isReligionValid(value) ? true : "Vui lòng nhập đúng định dạng"
                                    })} 
                                />
                            </div>
                            {errors.religion && <p className="err-msg">{errors.religion.message}</p>}
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <div className="form-item-demographic">
                                <label htmlFor="education">Trình độ văn hóa <span className="text-danger">*</span></label>
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
                        <Col xs={24} sm={24} md={12}>
                            <div className="form-item-demographic">
                                <label className="label-left" htmlFor="career">Nghề Nghiệp</label>
                                <input className="input-left" id="career" type="text"{...registerInfo("career")} />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12}>
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
                    <div className="form-btn-wrap">
                        <input value={type === "EDIT" ? "Cập Nhật" : "Kê Khai Thông Tin"} type="submit" />
                        {type !== "EDIT" && 
                            <Button className="btn-download-form" icon={<DownloadOutlined  />}>
                                <a href="../../assets/file/ToKhai.docx" download> Mẫu Khai Báo</a>
                            </Button>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

const AddressOption = ({ control, errors }) => {
    const [type, setType] = useState("regulary");

    return (
        <>
            <ExpandLand 
                control={control} 
                errors={errors}
                className="form-row-address-1"
                title="Quê Quán "
                propChild={[
                    {
                        className: "location-1",
                        name: "provinceNativeExpand",
                        message: "Vui lòng chọn tỉnh/thành",
                        placeholder: "Tỉnh/Thành",
                        type: "province",
                        label: "Tỉnh/Thành"
                    }, {
                        className: "location-1",
                        name: "districtNativeExpand",
                        message: "Vui lòng chọn huyện/quận",
                        placeholder: "Huyện/Quận",
                        type: "district",
                        label: "Huyện/Quận"
                    }, {
                        className: "location-1",
                        name: "wardNativeExpand",
                        message: "Vui lòng chọn xã/phường",
                        placeholder: "Xã/Phường",
                        type: "ward",
                        label: "Xã/Phường"
                    }, {
                        className: "location-1",
                        name: "hamletNativeExpand",
                        message: "Vui lòng chọn thôn/bản",
                        placeholder: "Thôn/Bản",
                        type: "hamlet",
                        label: "Thôn/Bản"
                    }
                ]}
            />
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
                ? <StrictLand 
                    name='hamletRegularyStrict'
                    control={control}
                    errors={errors}
                    message="Vui lòng chọn thôn/bản của nơi thường trú"
                    title="Địa Chỉ Thường Trú"
                    placeholder="Thôn/Bản"
                />
                : <ExpandLand 
                    control={control} 
                    errors={errors}
                    className="form-row-address-2"
                    title="Địa Chỉ Thường Trú "
                    propChild={[
                        {
                            className: "location-2",
                            name: "provinceRegularyExpand",
                            message: "Vui lòng chọn tỉnh/thành",
                            placeholder: "Tỉnh/Thành",
                            type: "province",
                            label: "Tỉnh/Thành"
                        }, {
                            className: "location-2",
                            name: "districtRegularyExpand",
                            message: "Vui lòng chọn huyện/quận",
                            placeholder: "Huyện/Quận",
                            type: "district",
                            label: "Huyện/Quận"
                        }, {
                            className: "location-2",
                            name: "wardRegularyExpand",
                            message: "Vui lòng chọn xã/phường",
                            placeholder: "Xã/Phường",
                            type: "ward",
                            label: "Xã/Phường"
                        }, {
                            className: "location-2",
                            name: "hamletRegularyExpand",
                            message: "Vui lòng chọn thôn/bản",
                            placeholder: "Thôn/Bản",
                            type: "hamlet",
                            label: "Thôn/Bản"
                        }
                    ]}
                />
            }
            {type === "temporary" &&
                <StrictLand 
                    name='hamletTemporaryStrict'
                    control={control}
                    errors={errors}
                    message="Vui lòng chọn thôn/bản của nơi tạm trú"
                    title="Địa Chỉ Tạm Trú"
                    placeholder="Thôn/Bản"
                />
            }
        </>
    )
}

const ExpandLand = ({ control, errors, className, title, propChild }) => {
    const [addressData, setAddressData] = useState({
        provinces: [{id: "01", name: "Hà nội"}],
        districts: [{id: "0101", name: "Thanh Xuân"}],
        wards: [{id: "010101", name: "Nhân Chính"}],
        hamlets: [{id: "01010101", name: "Tổ 1"}],
    });

    const [selectedLocation, setSelectedLocation] = useState({
        province: null,
        district: null,
        ward: null,
        hamlet: null,
    });

    const handleAssignData = (type) => {
        if(type === 'hamlet') return addressData?.hamlets
        else if(type === 'ward') return addressData?.wards
        else if(type === 'district') return addressData?.districts
        else if(type === 'province') return addressData?.provinces
    }

    return (
        <div className={className}>
            <h3>{title}<span className="text-danger">*</span></h3>
            <Row gutter={[{ xs: 21, sm: 16, md: 24, xl: 30 }, { xs: 21, sm: 16, md: 24, xl: 30 }]} >
                {propChild?.map((item, ind) =>
                    <Col key={ind} className="col-address-select" xs={24} sm={12} md={6}>
                        <label>{item.label}</label>
                        <Location
                            className={item.className} 
                            name={item.name}
                            errors={errors}
                            control={control}
                            message={item.message}
                            data={handleAssignData(item?.type)}
                            placeholder={item.placeholder}
                        />
                    </Col>
                )}
            </Row>
        </div>
    )
}

const StrictLand = ({ name, control, errors, message, title, placeholder}) => {
    const [data, setData] = useState([{id: "01010101", name: "Tổ 1"}]);

    return (
        <div className="form-item-address-only">
            <h3>{title}<span className="text-danger">*</span></h3>
            <Location 
                name={name}
                control={control}
                message={message}
                data={data}
                placeholder={placeholder}
                style={{width: '120px'}}
            />
            <span>{", xã Quỳnh Hoa, huyện Quỳnh Lưu, tỉnh Nghệ An"}</span>
            {errors[name] && <p className="err-msg">{errors[name]?.message}</p>}
        </div>
    )
}
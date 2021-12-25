import { Divider, Row, Col, Select, DatePicker, Switch, Button, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import Location from '../../components/location/Location';
import { CaretRightOutlined } from '@ant-design/icons';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { DownloadOutlined  } from '@ant-design/icons';
import { removeAscent } from "../../utils/validate";
import userApi from "../../api/userApi";
import { getToken } from "../../utils/localStorageHandler";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPersonInfo } from '../../features/manager/population/populationAction';
import { unwrapResult } from '@reduxjs/toolkit';
import TipInput from '../../components/tooltip/TipInput';

function isFullnameValid (string) {
    var re = /^[a-zA-Z]{2,}(?: [a-zA-Z]+){1,}$/g // regex here
    return re.test(removeAscent(string))
}

function isReligionValid (string) {
    var re = /^[A-Za-z ]+$/g // regex here
    return re.test(removeAscent(string))
}

export default function Declare ({type = "DECLARE"}) {
    const { control, 
        register: registerInfo, 
        handleSubmit: handleSubmitInfo, 
        setValue, 
        formState: { errors }, 
        setError,
        unregister 
    } = useForm();
    const user = useSelector(state => state.user.userObj);
    const { id } = useParams();

    const onHandleSubmit = async (formData)=>{
        console.log("formData: ", formData);

        if(user) {
            let handleLocationCode = () => {
                if(user.userRole === 'ROLE_B1' && !formData.hamletTemporaryStrict) {
                    return [
                        {
                            village: {
                                villageId: formData.hamletNativeExpand.trim()
                            },
                            locationType: "quê quán",
                        }, {
                            village: {
                                villageId: formData.hamletRegularyStrict.trim()
                            },
                            locationType: "thường trú"
                        }
                    ]
                } else if(user.userRole === 'ROLE_B1' && formData.hamletTemporaryStrict) {
                    return [
                        {
                            village: {
                                villageId: formData.hamletNativeExpand.trim()
                            },
                            locationType: "quê quán",
                        }, {
                            village: {
                                villageId: formData.hamletRegularyExpand.trim()
                            },
                            locationType: "thường trú"
                        }, {
                            village: {
                                villageId: formData.hamletTemporaryStrict.trim()
                            },
                            locationType: "tạm trú"
                        }
                    ]
                } else if(user.userRole === 'ROLE_B2' && !formData.hamletTemporaryStrict) {
                    return [
                        {
                            village: {
                                villageId: formData.hamletNativeExpand.trim()
                            },
                            locationType: "quê quán",
                        }, {
                            village: {
                                villageId: user.username.trim()
                            },
                            locationType: "thường trú"
                        }
                    ]
                } else if(user.userRole === 'ROLE_B2' && formData.hamletTemporaryStrict) {
                    return [
                        {
                            village: {
                                villageId: formData.hamletNativeExpand.trim()
                            },
                            locationType: "quê quán",
                        }, {
                            village: {
                                villageId: formData.hamletRegularyExpand.trim()
                            },
                            locationType: "thường trú"
                        }, {
                            village: {
                                villageId: user.username.trim()
                            },
                            locationType: "tạm trú"
                        }
                    ]
                }
            }

            try {
                let response = null;
                if(type === "DECLARE") {
                    let requestData = {
                        access_token: getToken(),
                        data: {
                            citizenId: formData.personalId,
                            name: formData.fullname.trim().toLowerCase(),
                            gender: formData.gender.trim(),
                            religion: formData.religion.trim().toLowerCase(),
                            educationLevel: formData.education.trim(),
                            job: formData.career.trim().toLowerCase(),
                            dateOfBirth: formData.dateOfBirth.format(),
                            peopleLocations: handleLocationCode()
                        }
                    }
                    console.log("request data declare: ", requestData);

                    response =  await userApi.declare(requestData);
                    console.log("response declare: ", response);
                } else if(type === "EDIT") {
                    let requestData = {
                        access_token: getToken(),
                        data: {
                            peopleId: id,
                            citizenId: formData.personalId,
                            name: formData.fullname.trim().toLowerCase(),
                            gender: formData.gender.trim(),
                            religion: formData.religion.trim().toLowerCase(),
                            educationLevel: formData.education.trim(),
                            job: formData.career.trim().toLowerCase(),
                            dateOfBirth: formData.dateOfBirth.format(),
                            peopleLocations: handleLocationCode()
                        }
                    }
                    console.log("request data edit: ", requestData);

                    response =  await userApi.editPersonInfo(requestData);
                    console.log("response edit: ", response);
                }

                message.success({
                    content: response,
                    style: {marginTop: '72px'},
                    key: "declare-msg"
                });
            } catch (err) {
                message.error({
                    content: err.message,
                    style: {marginTop: '72px'},
                    key: "declare-msg"
                });
            }
    
        }
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
                                <label className="label-left" htmlFor="fullname">
                                    {"Họ và tên "}
                                    <span className="text-danger">*</span>
                                    <TipInput 
                                        content={
                                        "Họ Tên chỉ được phép gồm các ký tự a-z A-Z, " +
                                        "phải ít nhất có 2 từ trong tên " + 
                                        "và giữa các từ chỉ gồm một ký tự khoảng trắng"
                                        }
                                    />
                                </label>
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
                                            value={field.value}
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
                                <label className="label-left" htmlFor="personalId">
                                    {"Số CCCD/CMND "}
                                    <TipInput content={"CMND chỉ gồm 9 số và CCCD chỉ gồm 12 chữ số"} />
                                </label>
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
                                <label htmlFor="phone" >
                                    {"Số điện thoại "}
                                    <TipInput content={"Số điện thoại là loại gồm 9 chữ số"} />
                                </label>
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
                                <label className="label-left" htmlFor="religion">
                                    {"Tôn giáo "}
                                    <span className="text-danger">*</span>
                                    <TipInput content={"Chỉ gồm các ký tự a-z A-Z và ký tự khoảng trắng"} />
                                </label>
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
                    <AddressOption 
                        control={control} 
                        errors={errors} 
                        setValue={setValue} 
                        unregister={unregister} 
                        layoutType={type}
                    />
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

const AddressOption = ({ control, errors, setValue, unregister, layoutType }) => {
    const [type, setType] = useState("regulary");
    const user = useSelector(state => state.user.userObj);
    const currentPersonInfo = useSelector(state => state.population.currentPerson);
    const dispatch = useDispatch();
    const { id } = useParams();

    let handleChangeSwitch = (checked) => {
        if(checked) {
            setType("regulary");
            if(user?.userRole === "ROLE_B2") {
                setValue("hamletTemporaryStrict", null);
                setValue("hamletRegularyStrict", user.username);
            } else if (user?.userRole === "ROLE_B1") {
                setValue("hamletTemporaryStrict", null);
            }
        } else {
            setType("temporary");
            if(user?.userRole === "ROLE_B2") {
                setValue("hamletTemporaryStrict", user.username);
                setValue("hamletRegularyStrict", null);
            } else if (user?.userRole === "ROLE_B1") {
                setValue("hamletTemporaryStrict", null);
            }
        }
    }

    useEffect(() => {
        if(layoutType === "DECLARE" && user?.userRole === "ROLE_B2") {
            setValue("hamletTemporaryStrict", null);
            setValue("hamletRegularyStrict", user.username);
        }
    }, [user]);

    useEffect(() => {
        console.log("id 2: ", id);
        let getInfo = async (id) => {
            let response = await dispatch(getPersonInfo({
                access_token: getToken(),
                id: id
            }));
    
            console.log("response in getInfo: ", unwrapResult(response));
        }

        if(layoutType === "EDIT") {
            getInfo(id);
        }
    }, [id]);

    useEffect(() => {
        if(layoutType === "EDIT" && currentPersonInfo) {
        
            if(currentPersonInfo.peopleLocations.length === 3) {
                setType("temporary");
                let t = currentPersonInfo.peopleLocations.find(el => el.locationType === "tạm trú");
                setValue("hamletTemporaryStrict", t.village.villageId);
            }
            else if (currentPersonInfo.peopleLocations.length === 2) {
                setType("regulary");
                let r = currentPersonInfo.peopleLocations.find(el => el.locationType === "thường trú");
                setValue("hamletRegularyStrict", r.village.villageId);
            }
            setValue("fullname", currentPersonInfo.name, { shouldValidate: true });
            setValue("dateOfBirth", moment(currentPersonInfo.dateOfBirth, "YYYY-MM-DD"), { shouldValidate: true });
            setValue("fullname", currentPersonInfo.name, { shouldValidate: true });
            setValue("personalId", currentPersonInfo.citizenId, { shouldValidate: true });
            setValue("phone", currentPersonInfo.phone, { shouldValidate: true });
            setValue("religion", currentPersonInfo.religion, { shouldValidate: true });
            setValue("education", currentPersonInfo.educationLevel, { shouldValidate: true });
            setValue("career", currentPersonInfo.job, { shouldValidate: true });
            setValue("gender", currentPersonInfo.gender, { shouldValidate: true });
        }
    }, [currentPersonInfo]);

    return (
        <>
            <ExpandLand 
                control={control} 
                errors={errors}
                className="form-row-address-1"
                title="Quê Quán "
                setValue={setValue}
                landType="native"
                unregister={unregister}
                layoutType={layoutType}
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
                    checked={type === "regulary" ? true : false}
                    onChange={(checked) => handleChangeSwitch(checked)}
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
                    layoutType={layoutType}
                />
                : <ExpandLand 
                    control={control} 
                    errors={errors}
                    className="form-row-address-2"
                    title="Địa Chỉ Thường Trú "
                    setValue={setValue}
                    landType="regulary"
                    unregister={unregister}
                    layoutType={layoutType}
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
                    layoutType={layoutType}
                />
            }
        </>
    )
}

const ExpandLand = ({ control, errors, setValue, className, title, propChild, landType, unregister, layoutType }) => {
    const [addressData, setAddressData] = useState({
        provinces: [],
        districts: [],
        wards: [],
        hamlets: [],
    });
    const currentPersonInfo = useSelector(state => state.population.currentPerson);

    let handleAssignData = (type) => {
        if(type === 'hamlet') return addressData?.hamlets
        else if(type === 'ward') return addressData?.wards
        else if(type === 'district') return addressData?.districts
        else if(type === 'province') return addressData?.provinces
    }

    let getListProvince = async () => {
        let response = await userApi.getListProvinceVn({access_token: getToken()});
        console.log("res province: ", response);
        setAddressData((state) => ({
            ...state,
            provinces: response?.map(item => ({id: item.cityId, name: item.cityName}))
        }))
    }  

    let getListDistrict = async (value) => {
        let response = await userApi.getListDistrictByProvince({
            access_token: getToken(), 
            cityId: value
        });
        console.log("res district: ", response);

        setAddressData((state) => ({
            ...state,
            districts: response?.map(item => ({id: item.districtId, name: item.districtName}))
        }))
    }

    let getListWard = async (value) => {
        let response = await userApi.getListWardByDistrict({
            access_token: getToken(), 
            districtId: value
        });
        console.log("res ward: ", response);

        setAddressData((state) => ({
            ...state,
            wards: response?.map(item => ({id: item.wardId, name: item.wardName}))
        }))
    }

    let getListHamlet = async (value) => {
        let response = await userApi.getListHamletByWard({
            access_token: getToken(), 
            wardId: value
        });
        console.log("res hamlet: ", response);

        setAddressData((state) => ({
            ...state,
            hamlets: response?.map(item => ({id: item.villageId, name: item.villageName}))
        }))
    }

    let handleLocationChange = async (field, value, type) => {
        console.log("change: ", value, type);
        if(!value) {
            if(landType === "native") {
                if(type === "province") {
                    setValue("provinceNativeExpand", value, {shouldValidate: true});
                    setValue("districtNativeExpand", undefined, { shouldValidate: true });
                    setValue("wardNativeExpand", undefined, { shouldValidate: true });
                    setValue("hamletNativeExpand", undefined, { shouldValidate: true })
                } else if(type === "district") {
                    setValue("districtNativeExpand", value, { shouldValidate: true });
                    setValue("wardNativeExpand", undefined, { shouldValidate: true });
                    setValue("hamletNativeExpand", undefined, { shouldValidate: true });
                } else if(type === "ward") {
                    setValue("wardNativeExpand", value, { shouldValidate: true });
                    setValue("hamletNativeExpand", undefined, { shouldValidate: true });
                } else setValue("hamletNativeExpand", value, { shouldValidate: true });
            } else if(landType === "regulary") {
                if(type === "province") {
                    setValue("provinceRegularyExpand", value, {shouldValidate: true});
                    setValue("districtRegularyExpand", undefined, { shouldValidate: true });
                    setValue("wardRegularyExpand", undefined, { shouldValidate: true });
                    setValue("hamletRegularyExpand", undefined, { shouldValidate: true })
                } else if(type === "district") {
                    setValue("districtRegularyExpand", value, { shouldValidate: true });
                    setValue("wardRegularyExpand", undefined, { shouldValidate: true });
                    setValue("hamletRegularyExpand", undefined, { shouldValidate: true });
                } else if(type === "ward") {
                    setValue("wardRegularyExpand", value, { shouldValidate: true });
                    setValue("hamletRegularyExpand", undefined, { shouldValidate: true });
                } else setValue("hamletRegularyExpand", value, { shouldValidate: true });
            }
            
        } else {
            field.onChange(value);
            if(type === "province" && value) {
                await getListDistrict(value);
            } else if(type === "district" && value) {
                await getListWard(value);
            } else if(type === "ward" && value) {
                await getListHamlet(value);
            } 
        }
        
    }

    useEffect(() => {
        if (layoutType === "DECLARE") {
            console.log("call in getListProvince in DECLARE");
            getListProvince();
        }

        return () => {
            if(landType === "regulary") {
                unregister([
                    "provinceRegularyExpand", 
                    "districtRegularyExpand", 
                    "wardRegularyExpand", 
                    "hamletRegularyExpand"
                ], {keepValue: false});
            }
        };
    }, []);

    let getListAddress = async () => {
        if(landType === "native") {
            let n = currentPersonInfo.peopleLocations.find(el => el.locationType === "quê quán");
            await Promise.all([
                getListProvince(),
                getListDistrict(n.village.ward.district.city.cityId),
                getListWard(n.village.ward.district.districtId),
                getListHamlet(n.village.ward.wardId),
            ]);

            setValue("provinceNativeExpand", n.village.ward.district.city.cityId, { shouldValidate: true });
            setValue("districtNativeExpand", n.village.ward.district.districtId, { shouldValidate: true });
            setValue("wardNativeExpand", n.village.ward.wardId, { shouldValidate: true });
            setValue("hamletNativeExpand", n.village.villageId, { shouldValidate: true });

        } else if(landType === "regulary") {
            if(currentPersonInfo.peopleLocations.length === 3) {
                let r = currentPersonInfo.peopleLocations.find(el => el.locationType === "thường trú");
                await Promise.all([
                    getListProvince(),
                    getListDistrict(r.village.ward.district.city.cityId),
                    getListWard(r.village.ward.district.districtId),
                    getListHamlet(r.village.ward.wardId),
                ]);
    
                setValue("provinceRegularyExpand", r.village.ward.district.city.cityId, { shouldValidate: true });
                setValue("districtRegularyExpand", r.village.ward.district.districtId, { shouldValidate: true });
                setValue("wardRegularyExpand", r.village.ward.wardId, { shouldValidate: true });
                setValue("hamletRegularyExpand", r.village.villageId, { shouldValidate: true });
            } else if(currentPersonInfo?.peopleLocations.length === 2) {
                console.log("call in regulary expand with length 2");
                getListProvince();
            }
            
        }
    }

    useEffect(() => {
        if(layoutType === "EDIT" && currentPersonInfo) {
            console.log("call in getListProvince in EDIT");
            getListAddress();
        }
    }, [currentPersonInfo]);

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
                            handleChange={(field, value) => handleLocationChange(field, value, item?.type)}
                        />
                    </Col>
                )}
            </Row>
        </div>
    )
}

const StrictLand = ({ name, control, errors, message, title, placeholder, layoutType }) => {
    const [data, setData] = useState([]);
    const user = useSelector(state => state.user.userObj);

    let getListWard = async () => {
        let response = await userApi.getListHamletByWard({
            access_token: getToken(), 
            wardId: user?.username
        });
        console.log("res list ward in StrictLand: ", response);
        setData([...response?.map(item => ({id: item.villageId, name: item.villageName}))])
    ;}

    useEffect(() => {
        if(user?.username && user?.username?.length === 6) {
            getListWard();
        }
    }, [user]);

    return (
        <div className="form-item-address-only">
            <h3>{title}<span className="text-danger">*</span></h3>
            {user?.userRole === "ROLE_B1" &&
                <Location 
                    name={name}
                    control={control}
                    message={message}
                    data={data}
                    placeholder={placeholder}
                    style={{width: '120px'}}
                    handleChange={(field, value) => field.onChange(value)}
                />
            }
            <span style={{textTransform: "capitalize"}}> {` ${user?.location}`}</span>
            {errors[name] && <p className="err-msg">{errors[name]?.message}</p>}
        </div>
    )
}
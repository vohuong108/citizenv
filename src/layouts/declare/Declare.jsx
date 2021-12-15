import React from 'react';
import { useForm } from "react-hook-form";

export default function Declare () {

    const { register : registerInfo, handleSubmit: handleSubmitInfo, formState: { errors } } = useForm();

    const onHandleSubmit = (data)=>{
        console.log(data);
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmitInfo(onHandleSubmit)}>
                <div className='form-container'>
                    <h1 className='title'>Khai Báo Thông Tin Công Dân</h1>
                        <span className='input'>
                        <label htmlFor="name">Họ và tên<span className='text-danger'>(*)</span></label>
                        <input id='name' type="text" {...registerInfo("Name")}/>
                    </span>
                    <span className='input'>
                        <label htmlFor="DoB">Ngày sinh<span className='text-danger'>(*)</span></label>
                        <input id='phone' type="date" placeholder = 'Ngày/Tháng/Năm'{...registerInfo("DoB")}/>
                    </span>
                    <span className='input'>
                        <label htmlFor="gender">Giới tính<span className='text-danger'>(*)</span></label>
                        <select id="gender" placeholder='Giới tính' {...registerInfo("Gender")}>
                            <option value="Nam">Nam</option>
                            <option value="Nu">Nữ</option>
                        </select>
                    </span>
                    <span className='input'>
                        <label className='Label' htmlFor="phone" >Số điện thoại</label>
                        <input id='phone' type="number" {...registerInfo("phone")} />
                    </span>
                    <span className='input'>
                            <label htmlFor="religion">Tôn giáo</label>
                            <input id='religion' type="text" {...registerInfo("religion")} />
                    </span>
                    <span className='input'>
                            <label htmlFor="level">Trình độ văn hóa</label>
                            <input id='level' type="text" {...registerInfo("level")} />
                    </span>
                    <span className='input'>
                            <label htmlFor="job">Nghề Nghiệp</label>
                            <input id='job' type="text"{...registerInfo("job")} />
                    </span>
                    <span className='input'>
                        <label htmlFor="CMND">Số CCCD/CMND<span className='text-danger'>(*)</span></label>
                        <input id='CMND' type="text" {...registerInfo("CMND")}/>
                    </span>
                    <span className='input'>
                        <label htmlFor="home">Quê quán<span className='text-danger'>(*)</span></label>
                        <input id='home' type="text" {...registerInfo("address")}/>
                    </span>
            
                    <span className='input'>
                            <label htmlFor="ward">Phường/Xã<span className='text-danger'>(*)</span></label>
                            <select name="" id="ward" placeholder='Phường/Xã' {...registerInfo("ward")}></select>
                    </span>
                    <span className='input'>
                            <label htmlFor="province">Quận/Huyện<span className='text-danger'>(*)</span></label>
                            <select name="" id="" placeholder='Quận/Huyện' {...registerInfo("province")}></select>
                    </span>
                    <span className='input '>
                            <label htmlFor="city">Tỉnh/Thành Phố<span className='text-danger'>(*)</span></label>
                            <select name="" id="" placeholder='Tỉnh/Thành Phố' {...registerInfo("city")}></select>
                    </span>
                    <span className='input long_input3'>
                        <label htmlFor="address1">Đia chỉ thường trú<span className='text-danger'>(*)</span></label>
                        <input id='address1' type="text" {...registerInfo("sub-address1")}/>
                    </span>
                    <span className='input long_input4'>
                        <label htmlFor="address2">Địa chỉ tạm trú</label>
                        <input id='address2' type="text" {...registerInfo("sub-address2")}/>
                    </span>
                    <span className='input btn'>
                        <input id='' value ="Kê Khai Thông Tin" type="submit" />
                    </span>

                </div>
            </form>
        </div>
    )
}
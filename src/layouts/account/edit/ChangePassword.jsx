import React from 'react';
import { useForm } from 'react-hook-form';

const ChangePassword = ({ type }) => {
    const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm();

    const onSubmit = async (data) => {
        console.log("data submit register: ", data);

        if(data.newPass !== data.confirm) {
            setError("confirm", {
                type: "manual",
                message: "Mật khẩu không khớp. Vui lòng nhập lại"
            });
        }
    }


    return (
        <div className="change-password">
            <div className="change-pass-container">
                <div className="change-pass-header">
                    <p>Thay đổi mật khẩu</p>
                </div>
                <div className="change-pass-body">
                    <form id="form-change-pass" onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-item">
                            <label>Tên đăng nhập</label>
                            <input type="text" disabled {...register("username")}/>
                        </div>
                        {type === "personal" && 
                        <>
                            <div className="form-item">
                                <label>Mật khẩu cũ</label>
                                <input name="oldPass" type="password" {...register("oldPass", { required: "Vui lòng nhập mật khẩu." })}/>
                            </div>
                            {errors.oldPass && <p className="err-msg">{errors.oldPass.message}</p>}
                        </>}
                        <div className="form-item">
                            <label>Mật khẩu mới</label>
                            <input name="newPass" type="password" {...register("newPass", { required: "Vui lòng nhập mật khẩu mới." })}/>
                        </div>
                        {errors.newPass && <p className="err-msg">{errors.newPass.message}</p>}

                        <div className="form-item">
                            <label>Nhập lại mật khẩu mới</label>
                            <input name="confirm" type="password" {...register("confirm", { required: "Vui lòng nhập lại mật khẩu mới." })}/>
                        </div>
                        {errors.confirm && <p className="err-msg">{errors.confirm.message}</p>}
                        <input type="submit" value="Lưu thay đổi" onClick={() => console.log("click")}/>
                    </form>
                </div>
            </div>  
        </div>
    )
}

export default ChangePassword

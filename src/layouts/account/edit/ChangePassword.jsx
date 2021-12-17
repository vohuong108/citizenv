import React from 'react';
import { useForm } from 'react-hook-form';
import { removeAscent } from '../../../utils/validate';


function isNameValid (string) {
    var re = /^[A-Za-z0-9 ]+$/g // regex here
    return re.test(removeAscent(string))
}

const ChangePassword = ({ isMultiple = false, data }) => {
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
                        {!isMultiple && 
                        <>
                            <div className="form-item">
                                <label>Tên đơn vị</label>
                                <input 
                                    style={{textTransform: 'capitalize'}}
                                    type="text" 
                                    {...register("name", {
                                        required: "Vui lòng nhập tên đơn vị.",
                                        validate: (value) => isNameValid(value) ? true : "Vui lòng nhập đúng định dạng"
                                    })}
                                />
                            </div>
                            {errors.name && <p className="err-msg">{errors.name.message}</p>}
                        </>}
                        <div className="form-item">
                            <label>Tên đăng nhập</label>
                            <input type="text" disabled {...register("username")}/>
                        </div>
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

import React, { useEffect } from 'react';
import { Row, Col, Avatar, message} from 'antd';
import AccountLogo from '../../assets/image/account_logo.png';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getToken } from '../../utils/localStorageHandler';
import userApi from '../../api/userApi';

const Profile = () => {
    const user = useSelector(state => state.user.userObj);

    let handleLevel = (value) => {
        if(value === "ROLE_A1") return "Bộ y tế"
        else if(value === "ROLE_A2") return "Tỉnh/Thành phố"
        else if(value === "ROLE_A3") return "Huyện/Quận"
        else if(value === "ROLE_B1") return "Xã/Phường"
        else if(value === "ROLE_B2") return "Thôn/Bản"
    }

    let handleUnit = (user) => {
        if(user?.userRole === "ROLE_A1") return "Tổng cục dân số"
        else return user?.location
    }

    return (
        <div className="profile">
            <div className="profile-container">
                <Row className="profile-row" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="profile-row-left" xs={24} sm={24} lg={12}>
                        <div className="user-card">
                            <div className="user-card-wrap">
                                <div className="user-card-info">
                                    <Avatar className="user-avt" 
                                        src={AccountLogo} 
                                        size={80}
                                    />
                                    <div className="user-content">
                                        <h3>{`${user?.username}`}</h3>
                                        <p>{`Cấp Bậc: ${handleLevel(user?.userRole)}`}</p>
                                        <p>{`Đơn Vị: ${handleUnit(user)}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="profile-row-right" xs={24} sm={24} lg={12}>
                        <ChangePass />
                    </Col>
                </Row>
            </div>
        </div>
    )
}


const ChangePass = () => {
    const user = useSelector(state => state.user.userObj);
    const {handleSubmit: handleSubmitPass, register : registerPass, setError, formState: { errors }, setValue} = useForm();

    const onSubmitPass = async (data) => {
        let token = getToken();

        if(data.confirmPass !== data.newPass) {
            setError("confirmPass", {
                type: "manual",
                message: "Mật khẩu không khớp. Vui lòng nhập lại"
            }, { shouldFocus: true });

        } else if(user) {
            let requestData = {
                access_token: token, 
                data: {
                    oldPassword: data.oldPass,
                    password: data.newPass
                }
            }
            console.log("requestData in change personal password", requestData);
            message.loading({ 
                content: 'Vui lòng chờ trong giây lát...', 
                key: "change-personal-pass-msg",
                duration: 10
            });

            try {
                let response = await userApi.changePersonalPassword(requestData);
                console.log("response in change personal password", response);

                if(response.statusCode === 304) {
                    message.error({
                        content: response.message,
                        style: {marginTop: '72px'},
                        key: "change-personal-pass-msg"
                    });
                } else {
                    message.success({
                        content: response.message,
                        style: {marginTop: '72px'},
                        key: "change-personal-pass-msg"
                    });
                }

            } catch (err) {
                message.error({
                    content: err.message,
                    style: {marginTop: '72px'},
                    key: "change-personal-pass-msg"
                })
            }
        }
    }

    useEffect(() => {
        if(user) setValue("username", user?.username);
    }, [user])

    return (
        <div className="u-section change-password">
            <div className="u-header">
                <p>Thay đổi mật khẩu</p>
            </div>
            <div className="u-change-wrap">
                <form id="form-change" onSubmit={handleSubmitPass(onSubmitPass)}>
                    <div className="form-item">
                        <label>Tên đăng nhập</label>
                        <input type="text" disabled {...registerPass("username")}/>
                    </div>
                    <div className="form-item">
                        <label>Mật khẩu cũ</label>
                        <input type="password" {...registerPass("oldPass", { required: "Vui lòng nhập mật khẩu cũ" })}/>
                    </div>
                    {errors.oldPass && <p className="err-msg">{errors.oldPass.message}</p>}
                    <div className="form-item">
                        <label>Mật khẩu mới</label>
                        <input type="password" {...registerPass("newPass", { required: "Vui lòng nhập mật khẩu mới." })}/>
                    </div>
                    {errors.newPass && <p className="err-msg">{errors.newPass.message}</p>}
                    <div className="form-item">
                        <label>Nhập lại mật khẩu</label>
                        <input name="confirmPass" type="password" {...registerPass("confirmPass", { required: "Vui lòng xác nhận lại mật khẩu." })}/>
                    </div>
                    {errors.confirmPass && <p className="err-msg">{errors.confirmPass.message}</p>}
                    <input type="submit" value="Cập Nhật" />
                </form>
            </div>

        </div>
    )
}

export default Profile;
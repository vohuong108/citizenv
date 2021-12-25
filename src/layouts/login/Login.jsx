import React from 'react';
import { LockFilled, UserOutlined} from '@ant-design/icons'
import { Spin, message, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../utils/localStorageHandler';
import { login } from "../../features/user/userAction";
import { unwrapResult } from '@reduxjs/toolkit';

// import image
import logo from "../../assets/image/logo.png";
import TipInput from '../../components/tooltip/TipInput';
 
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const loginLoading = useSelector(state => state.user.loginLoading);
    let navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const login_res = await dispatch(login({username: data.username, password: data.password}));
            const un_login_res = unwrapResult(login_res);

            console.log("response login data: ", un_login_res);
            setToken(un_login_res?.jwt);
            
            if (un_login_res.userRole === "ROLE_B2") {
                navigate('/declare');
            } else {
                navigate('/dashboard/account');
            }

        } catch (err) {
            console.error("error in login: ", err);

            if(err?.message === "Request failed with status code 401") {
                message.error({
                    content: "Tên đăng nhập hoặc mật khẩu không chính xác!",
                    style: {marginTop: '72px'},
                    key: "login-msg"
                })
            }
        }
    }

    return (
        <div className="login">
            <div className="container login-container">
                <div className="row login-row">
                    <div className="login-wrap">
                        <Spin tip="Loading..." spinning={loginLoading}>
                            <h1>CitizenV - Tổng cục dân số</h1>
                            <div className="cus-wrap">
                                <Row className="login-inner" gutter={{xs: 16, sm: 16}}>
                                    <Col xs={24} sm={10}>
                                        <div className="inner-left">
                                            <img src={logo} alt=""/>
                                            <p>Hỗ trợ công tác điều tra dân số Việt Nam</p>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={11}>
                                        <div className="inner-right">
                                            <h3>Đăng Nhập</h3>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <label>
                                                    {"Tên đăng nhập "} 
                                                    <TipInput 
                                                        content={"Tên đăng nhập chỉ gồm các ký tự: a-z A-Z 0-9"}
                                                    />
                                                </label>
                                                <div className="input-wrap">
                                                    <UserOutlined className="input-icon" />
                                                    <input
                                                        id="username"
                                                        name="username" 
                                                        type="text"
                                                        {...register("username", {
                                                            required: "Vui lòng nhập tên đăng nhập.",
                                                            pattern: {
                                                                message: "Vui lòng nhập đúng định dạng.",
                                                                value: /^[a-zA-Z0-9]+$/i
                                                            },
                                                        })}
                                                        required 
                                                    />
                                                </div>
                                                {errors.username && <p className="err-msg">{errors.username.message}</p>}
                                                <label>Mật khẩu</label>
                                                <div className="input-wrap">
                                                    <LockFilled className="input-icon" />
                                                    <input 
                                                        name="password" 
                                                        type="password"
                                                        placeholder="Nhập mật khẩu" 
                                                        {...register("password", { required: "Vui lòng nhập mật khẩu"})}
                                                    />
                                                </div>

                                                <div className="form-btn">
                                                    <input className="submit-btn" type="submit" value="Đăng nhập"></input>
                                                </div>
                                                
                                            </form>
                                            <Link to="/help">
                                                Có phải bạn quên mật khẩu?
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Spin>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login
import React, { useState, useEffect } from 'react';
import { LockFilled, UserOutlined} from '@ant-design/icons'
import { Spin, message, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// import image
import logo from "../../assets/image/logo.png";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {}


    return (
        <div className="login">
            <div className="container login-container">
                <div className="row login-row">
                    <div className="login-wrap">
                        <Spin tip="Loading..." spinning={loading}>
                            <h1>CitizenV - Tổng cục dân số</h1>
                            <div className="cus-wrap">
                                <Row className="login-inner" gutter={{xs: 16, sm: 16}}>
                                    <Col xs={24} sm={10}>
                                        <div className="inner-left">
                                            <img src={logo} alt=""/>
                                            <p>Hỗ trợ công tác điều tra dân số Việt Nam</p>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={10}>
                                        <div className="inner-right">
                                            <h3>Đăng Nhập</h3>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <label>Tên đăng nhập</label>
                                                <div className="input-wrap">
                                                    <UserOutlined className="input-icon" />
                                                    <input
                                                        id="username"
                                                        name="username" 
                                                        type="text"
                                                        {...register("username")}
                                                        required 
                                                    />
                                                </div>
                                                <label>Mật khẩu</label>
                                                <div className="input-wrap">
                                                    <LockFilled className="input-icon" />
                                                    <input 
                                                        name="password" 
                                                        type="password"
                                                        placeholder="Enter your password" 
                                                        {...register("password")}
                                                        required 
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
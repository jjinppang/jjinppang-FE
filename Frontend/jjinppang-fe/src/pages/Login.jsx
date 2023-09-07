import React from "react";
import { ReactComponent as LoginIcon } from "../assets/loginicon.svg";
import { ReactComponent as KaKaoIcon } from "../assets/kakaoicon.svg";
import { ReactComponent as GoogleIcon } from "../assets/googleicon.svg";
import { ReactComponent as NomalIcon } from "../assets/nomallogin.svg";

function Login() {
    const KAKAO_AUTH_URL = ` http://52.79.161.114/oauth2/authorization/kakao?redirect_uri=https://localhost:3000/login/redirect`;

    const kakaologin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }

    return (
        <div className="login-layout">
            <div class="login-form">
                <div class="login-layout">
                    <LoginIcon />
                    <div>로그인 후</div>
                    <div>찐빵과 함께 나만의 방 찾기를 해보세요</div>
                    <div class="login-button">
                        <button onClick={kakaologin}>
                            <KaKaoIcon />
                        </button>
                        <button>
                            <GoogleIcon />
                        </button>
                        <button>
                            <NomalIcon />
                        </button>
                    </div>
                    <div class="separator">
                        <p>또는</p>
                    </div>
                    <div class="mt-8">
                        <span>아직 회원이 아닌신가요? </span>
                        <button>가입하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../states/userState';
import axios from 'axios';
import { getCookie } from '../cookies/Cookie';

function Navbar() {
    const [user, setUser] = useRecoilState(userState);
    const accessToken = getCookie('accesstoken');
    
    // When the component mounts, get the user's profile
    useEffect(() => {
        const fetchUserProfile = async () => {
             try {
                const response = await axios.get('http://52.79.161.114/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                
                if (response.data.status === "success") {
                    setUser(response.data.data);
                    // console.log(user)
                }
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };

        fetchUserProfile().then(() => {
            console.log(user);
        });
    }, [setUser, accessToken]);

    return (
        <>
            <div class="h-[69px] w-full flex items-center justify-between border-b-1 border-cdcdcd shadow-nav-shadow">
                <div class="flex">
                    <img alt='logo' class="w-50 h-24 ml-[28px]"
                        src={`${process.env.PUBLIC_URL}/images/logo.svg`}
                    />
                    <img alt='character' class="w-28 h-22 ml-[5px]"
                        src={`${process.env.PUBLIC_URL}/images/navCharacter.svg`}
                    />
                </div>
                <div class="flex flex-row items-center">
                    <div class="mr-[40px] text-text2 font-[600] text-[16px]">지도</div>
                    {user.nickname ? (
                          <>
                        <div class="mr-[10px] text-color6 font-[600]">{user.nickname}</div>
                        <img src={user.profileImage} alt={`Profile of ${user.nickname}`} class="h-[38px] boreder-2 border-line mr-[40px] ml-[6px]"/>
                        </>  
                    ) :
                        <div class="mr-[40px] text-text2 font-[600] text-[16px]">로그인</div>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar
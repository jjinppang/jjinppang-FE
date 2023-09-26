import React from 'react'
import { useRecoilValue } from 'recoil';
import { userState } from '../../../states/userState';


function MyPageMain() {
    const user = useRecoilValue(userState);
    console.log(user)

  return (
    <div class='sidebar-layout'>
        <img class="w-98 h-98"
              src={user.profileImage} alt={`Profile of ${user.nickname}`}
            />
    </div>
  )
}

export default MyPageMain
import React from 'react'
import { useAuth } from '../../Context/AuthManager';

const Profile = () => {
  const {user} = useAuth();
  const userObj = JSON.parse(user);

  return (
    // <div className='min-h-screen w-full flex flex-col justify-center items-center bg-black text-[#F7CA17] p-12'>
    //   <h1 className='flex-[100%] text-4xl font-[700] text-center mt-[70px] mb-5'>PROFILE</h1>
    //   <div className='personal-details flex flex-col justify-center items-start bg-[#eeeeee] rounded-lg gap-6 px-6 py-12'>
    //     <img className='max-w-[150px] w-full h-auto rounded-full self-center flex-shrink' src={userObj.user.profilePicture} alt='profile_pick'/>
    //     <h2> Name : {userObj.user.firstName} {userObj.user.lastName}</h2>
    //     <h2> Email : {userObj.user.email} </h2>
    //   </div>  
    // </div>
    <div className='w-full min-h-screen overflow-y-auto overflow-x-hidden bg-black text-black mx-auto pt-[80px] pb-[50px] px-4 sm:px-4 md:px-12 lg:px-16'>
  <div className="bg-white p-3 shadow-md rounded-lg md:p-6">
    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
        <span clas="text-green-500">
            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </span>
        <span className="tracking-wide">About</span>
        
    </div>
    <div className="mb-4">
      <img className='max-w-[150px] w-full h-auto rounded-full mx-auto' src={userObj.user.profilePicture} alt='profile_pic'/>
    </div>
    <div className="text-gray-700">
        <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
                <div className="py-2 font-semibold">First Name</div>
                <div className="py-2">{userObj.user.firstName}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="py-2 font-semibold">Last Name</div>
                <div className="py-2">{userObj.user.lastName}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="py-2 font-semibold">Gender</div>
                <div className="py-2">-</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="py-2 font-semibold">Contact No.</div>
                <div className="py-2">-</div>
            </div>
            
            <div className="grid grid-cols-2">
                <div className="py-2 font-semibold">Email</div>
                <div className="py-2">
                    <div className="text-blue-800">{userObj.user.email}</div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="py-2 font-semibold">College</div>
                <div className="py-2">-</div>
            </div>
         </div>
      </div>
    </div>

  <div className="my-4"></div>

  <div className="bg-white p-3 shadow-sm rounded-lg md:p-6">
    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span clas="text-green-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </span>
                <span className="tracking-wide">Events Registered</span>
            </div>
    <div className="grid grid-cols-1  md:grid-cols-2">
        <div> 
            <ul className="list-inside space-y-2">
                <li>
                    <div className="text-teal-600">Event 1</div>
                    <div className="text-gray-500 text-xs">Amount Paid - </div>
                </li>
                <li>
                    <div className="text-teal-600">Event 2</div>
                    <div className="text-gray-500 text-xs">Amount Paid - </div>
                </li>
                <li>
                    <div className="text-teal-600">Event 3</div>
                    <div className="text-gray-500 text-xs">Amount Paid - </div>
                </li>
            </ul>
        </div>
        <div>
            <ul className="list-inside space-y-2">
                <li>
                    <div className="text-teal-600">Event 4</div>
                    <div className="text-gray-500 text-xs">Amount Paid - </div>
                </li>
                <li>
                    <div className="text-teal-600">Event 5</div>
                    <div className="text-gray-500 text-xs">Amount Paid - </div>
                </li>
                <li>
                    <div className="text-teal-600">Event 6</div>
                    <div className="text-gray-500 text-xs">Amount Paid - </div>
                </li>
            </ul>
        </div>
      </div>
  </div>
</div>
  )
}
export default Profile
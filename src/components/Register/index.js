import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthManager";
import displayRazorpay from "../../Context/PaymentManager";

export const Register = () => {
    const {user , setLoading} = useAuth()
    console.log(user)
    let navigate = useNavigate()
    const userObj = JSON.parse(user);
    const [amount, setAmount] = useState(0);
    const [formData, setFormData] = useState({
        email:userObj.user.email,
        name : userObj.user.firstName + userObj.user.lastName,
        phoneNumber : "0",
        college: "0",
        level : "0",  
        accomDay1:false,
        accomDay2:false,
        accomDay3:false,
        regDay1:false,
        regDay2:false,
        regDay3:false,
    });
    const [fdHistory , setFdHistory] = useState(formData);
    const details = async ()=>{
      const response  = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userObj.user.email}` ,{method :"GET"})
      if(response.status !== 200) return;
      const {details} = await response.json()
      console.log(details);
      const fd = {
        email:details.email,
        name : userObj.user.firstName + " " + userObj.user.lastName,
        phoneNumber : details.mobile,
        college:details.college,
        level : details.level,  
        accomDay1:details.paidForAccomodationDay1,
        accomDay2:details.paidForAccomodationDay2,
        accomDay3:details.paidForAccomodationDay3,
        regDay1:details.paidForRegDay1,
        regDay2:details.paidForRegDay2,
        regDay3:details.paidForRegDay3,
      }
      setFdHistory(fd);
      setFormData(fd);
      console.log(fd);
    }
    useEffect(()=>{
        console.log("called")
         details()
         setAmount(calculatePrice())
        console.log("ended")
      return 
    } , [])
    const regDays = [fdHistory.regDay1 , fdHistory.regDay2 , fdHistory.regDay3];
    const accomDays = [fdHistory.accomDay1 ,fdHistory.accomDay2 , fdHistory.accomDay3];
    const calculatePrice = () =>{
      let regAmount = 0;
      regDays.forEach((val, i) => {
        if(!val) {
          regAmount += (formData['regDay' + (i+1)]) ? 100 : 0;
        }
      });
      if(regAmount === 300) regAmount -= 50;

      let accomAmount = 0;
      accomDays.forEach((val, i) => {
        if(!val) {
          accomAmount += (formData['accomDay' + (i+1)]) ? 100 : 0;
        }
      });
      if(accomAmount === 300) accomAmount -= 50;

      return regAmount + accomAmount;
  }
    // console.log(formData)
    const handleCheckBoxChange = (e) => {
        setFormData({...formData,[e.target.id]: !formData[e.target.id]});
    }

    const handleTextChange = (e) =>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }

    const handleSubmit =async (e) =>{
        e.preventDefault();
        console.log(formData);
       const confirmation = await displayRazorpay(setLoading , userObj , formData)
       console.log(confirmation)
       if(!confirmation.paymentSuccess) alert("Something went wrong , if money is deducted from account please contact us")
       navigate('/profile')
    }
    useEffect(()=>{
      setAmount(calculatePrice());
    }, [formData])
    const allComplete = () => {
      let flag = true;
      for(let i = 1; i <= 3; i++) {
        if(!fdHistory['regDay' + i]) {
          flag = false;
          break;
        }
      }
      for(let i = 1; i <= 3; i++) {
        if(!fdHistory['accomDay' + i]) {
          flag = false;
          break;
        }
      }
      return flag;
    }
    return !allComplete() ? (
    <div class="min-h-screen overflow-y-auto flex items-center justify-center bg-black">
    <section class="max-w-4xl p-6 mx-auto bg-gray rounded-md shadow-md mt-20 mb-20">
    <h1 class="text-xl font-bold text-white capitalize dark:text-white">Registration Form</h1>
    <form onSubmit={handleSubmit}>
        <div class="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            <div>
                <label class="text-white dark:text-gray-200" for="username">Name</label>
                <input disabled={true} id="name" type="text" value={formData.name} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label class="text-white dark:text-gray-200" for="emailAddress">Email Address</label>
                <input disabled={true} id="emailAddress" value={formData.email} type="email" class="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>

            {(fdHistory.phoneNumber === '0') ? (<div>
                <label class="text-white dark:text-gray-200" for="phoneNumber">Phone Number</label>
                <input onChange={handleTextChange} value={formData.phoneNumber === '0' ? null : formData.phoneNumber} placeholder={fdHistory.phoneNumber === '0' ? "Contact Number" : null} id="phoneNumber" type="tel" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>) : null
            }
            {/* <div>
                <label class="text-white dark:text-gray-200" for="gender">Gender</label>
                <input id="gender" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div> */}
            
            {(formData.college === '0' || formData.college === "") ? (<div>
                <label class="text-white dark:text-gray-200" for="college">College</label>
                <input id="college" value={formData.college === '0' ? null : formData.college} placeholder={fdHistory.college === '0' ? "College Name" : null} onChange={handleTextChange} type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>) : null}

            <div>
                <h1 class="text-white dark:text-gray-200">Registration for:</h1>
            {regDays.map((day , index)=>{
              if(day) return null;
              return (
              <div class="text-white dark:text-gray-200">
              <input
                class="text-white dark:text-gray-200 relative float-left mt-[0.15rem] mr-[6px]  h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary dark:checked:border-primary checked:bg-primary dark:checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                type="checkbox"
                value=""
                id={"regDay" + (index+1)}
                onChange={handleCheckBoxChange}
                checked = {formData['regDay' + (index+1)]}
                disabled={fdHistory['regDay' + (index+1)]}
                />
              <label
                class="inline-block pl-[0.15rem] hover:cursor-pointer"
                for={"regDay" + (index+1)}>
                Day {(index+1)}
              </label>
            </div>
            )})}
            </div>

            <div>
                <h1 class="text-white dark:text-gray-200">Accomodation:</h1>
              {accomDays.map((day , index)=>{
                if(day) return null;
                return (
              <div class="text-white dark:text-gray-200">
              <input
                class="text-white dark:text-gray-200 relative float-left mt-[0.15rem] mr-[6px]  h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary dark:checked:border-primary checked:bg-primary dark:checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                type="checkbox"
                value=""
                id={"accomDay" + (index+1)} 
                onChange={handleCheckBoxChange}
                checked = {formData['accomDay' + (index+1)]}
                disabled={fdHistory['accomDay' + (index+1)]}
                />
              <label
                class="inline-block pl-[0.15rem] hover:cursor-pointer"
                for={"accomDay" + (index+1)} >
                Day {(index+1)}
              </label>
            </div>
            )})}
            </div>
        </div>

        {amount === 0 ? (<div class="flex justify-center mt-6">
            <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600" disabled={amount===0} >Select atleast 1 day</button>
        </div>) : (<div class="flex justify-center mt-6">
            <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600" disabled={amount===0} >Pay Rs. {amount}</button>
        </div>)}
    </form>
</section>
</div>
    ) : 
    (
      <div class="min-h-screen overflow-y-auto flex items-center justify-center bg-black">
    <section class="max-w-4xl p-6 mx-auto bg-gray rounded-md shadow-md mt-20 mb-20">
    <h1 class="text-xl font-bold text-white capitalize dark:text-white">Congratulations You have registered for all days</h1>
    {/* button to redirect to profile page */}
    <div class="flex justify-center mt-6">
        <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600" onClick={navigate('/profile')} >Go to Profile</button>
    </div>
    </section>
    </div>
    )
}
import React, { useState ,useEffect } from 'react';
import appoinent from "./assets/image/appoinment.jpg" 
import { useFormik } from 'formik';
import * as yup from 'yup';
import './App.css'
import axios from 'axios';
import {API_BASE_URL} from "./Api/ApiList"
import ApiMultipartHeader from "./Api/ApiMultipartHeader"
const YourFormComponent =  ()  => {
   const [step, setStep] = useState(1);
   const [departments , setDepartments] = useState ([]) ; 
   const [selectState , setSelectState] = useState ([]) ;
   const departmentSchema = yup.object().shape({ 
    department_id: yup.number().required(),
    department_name: yup.string().required(),
  });

  const stateSchema = yup.object().shape({
    stateID: yup.number().required(),
    stateName: yup.string().required(),
  });

  useEffect(() => {
    // Fetch departments data
    axios.get('apiDeptSta')
      .then((response) => {
        setDepartments(response.data.departments);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });

    // Fetch states data
    axios.get('apiStateId')
      .then((response) => {
        setSelectState(response.data.states);
      })
      .catch((error) => {
        console.error('Error fetching states:', error);
      });
  }, []);
  
  const [formData, setFormData] = useState({
    input1: '',
    input2: '',
    // Add more inputs here as needed
  });
  const steps = ['Personal Information', 'Doctor Details', 'Payment']; // Add step names here
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
   const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      input1: '',
      input2: '',
      // Reset other inputs as needed
    });
    setStep(1);
  };
    const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const initialValues = {
    additionalDetail : "" ,
    additionalInput : ""  ,
    name : "" ,
    dob : "" ,
    gender : "" , 
    address : "" ,
    selectState : "" ,
    selectCity : "" ,
    postalCode : "" ,
    email : "" ,
    department : " " ,
    fee : " " ,
  }
 
    const validationSchema = yup.object({
      // Define your validation schema for each field
      // Example: name should be required and a string
      name: yup.string().required('Name is required'),
      // Add validation for other fields as needed
    });

    const onSubmit = (values) => {
      console.log('Form data:', values);
      // Here, you can handle the form data, such as sending it to a server
    };

    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
    
    const {  values, errors } = formik;

    const [orderData, setOrderData] = useState({});

    useEffect(() => {
      const loadRazorpayScript = async () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          // Razorpay SDK has been loaded, you can now use rzp.open()
        };
        document.head.appendChild(script);
      };
  
      loadRazorpayScript();
    }, []); // Run this effect only once when the component mounts
 
    const initiatePayment = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/payment/v1/order`); // Replace with your endpoint
        console.log(response)
        const order = response.data; // Assuming the backend returns necessary order data
        setOrderData(order);
  
        const options = {
          key: 'rzp_test_OHJnOIR8TjNFO2',
          amount: 100, // Amount in paise
          currency: 'INR',
          name: 'Symptoms Care',
          description: 'Appointment Fee',
          order_id: order.id, // Retrieved from the backend
          handler: function (response) {
            console.log(response) 

           alert(response.razorpay_payment_id)
           if (response.razorpay_order_id && response.razorpay_signature) {
            console.log("Razorpay Order ID:", response.razorpay_order_id);
            console.log("Razorpay Signature:", response.razorpay_signature);
        }

          },
          prefill: {
            name: 'User Name',
            email: 'user@example.com',
            contact: '9523227075',
          },
          theme: {
            color: '#F37254',
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open() 
        rzp.on('payment.success', function (response) {
          // Handle success
          console.log(response);
        });
        rzp.on('payment.error', function (error) {
          // Handle error
          console.error(error);
        });
        
        
      } catch (error) {
        console.error('Error initiating payment:', error);
      }
    };
  
  return (
  
    <div className="">
    <div className=" flex-auto justify-center md:mx-20 mx-4   ">
    <div className=" max-w-screen-lg overflow-hidden rounded-t-xl bg-emerald-400/60 py-20 text-center shadow-xl shadow-gray-300">
    <h3 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl"> Shree jagannath Hospital And Research Center </h3>
    <p className="mt-6 text-lg text-white">in collaboration with Symptoms Care </p>
    <img className="absolute top-0 left-0 -z-10 h-full w-full object-cover opacity-100  " src={appoinent} alt="" />
    </div>
    </div>
         <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50   p-2 sm:my-2 sm:p-4 lg:my-4 lg:p-6 ">
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 ">
    {steps.map((stepName, index) => (
    <div
    key={index}
    className={`rounded-full p-3 cursor-pointer ${
    index < step - 1 ? 'bg-emerald-400/60 text-white' : index === step - 1 ? 'bg-emerald-400 text-white text-xl font-bold' : 'bg-gray-200 text-gray-600'
    }`}
    >
   {stepName}
    </div>
    ))}
     </div>
      <div className="relative mb-4">
        <div className="h-2 bg-gray-200 rounded-full">
         <div
  className={`absolute top-0 h-2 rounded-full bg-emerald-400/60 ${
    step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : step === 3 ? 'w-full' : ''
  }`}
>
</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
        <h2 className='font-sans text-lg font-bold text-emerald-400/60 my-1'>Personal Information</h2>
         <div className='flex flex-col sm:flex-row'>
         <div className="flex flex-col sm:w-1/2 sm:ml-1">
         <label htmlFor="input2" className="text-sm mb-1">Applied Ever </label>
         <select
           id="input2"
           name="additionalDetail"
           value={formData.additionalDetail}
           onChange={handleChange}
           className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
         >
           <option value="">Select an option</option>
           <option value="yes">Yes</option>
           <option value="no">No</option>
         </select>
       </div>
        {formData.additionalDetail === 'yes' && (
        <div className="flex flex-col sm:w-1/2 lg:mr-1  sm:mr-1">
          <label htmlFor="additionalInput" className="text-sm mb-1">MR NO.</label>
          <input
            type="text"
            id="additionalInput"
            name="additionalInput"
            value={formData.additionalInput}
            onChange={handleChange}
            placeholder="Additional Input"
            className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
          />
        </div>
      )}
     <div className="flex flex-col sm:w-1/2 sm:mr-1">
    <label htmlFor="input1" className="text-sm mb-1">Name </label>
    <input
      type="text"
      id="input1"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="name"
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
      required
    />
  </div>
  <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="input2" className="text-sm mb-1">DOB</label>
    <input
      type="date"
     
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      placeholder="Input 2"
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
     />
     </div>
         </div>
         <div className='flex flex-col sm:flex-row'>
         <div className="flex flex-col sm:w-1/2 sm:ml-1">
         <label htmlFor="input2" className="text-sm mb-1">Gender</label>
         <input
           type="text"
           id="input2"
           name="gender"
           value={formData.gender}
           onChange={handleChange}
           placeholder="Gender"
           className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
         />
       </div>
     <div className="flex flex-col sm:w-1/2 sm:mr-1">
    <label htmlFor="input1" className="text-sm mb-1">Address  </label>
    <input
      type="text"
      id="input1"
      name="address"
      value={formData.address}
      onChange={handleChange}
      placeholder="Address "
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    />
  </div>
  <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="input2" className="text-sm mb-1">Select State</label>
     <select
      id="input2"
      name="selectState"
      value={formData.selectState}
      onChange={handleChange}
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    >
      <option value="">Select an option</option>
      <option value="option1">Jharkhand</option>
      <option value="option2">Bihar</option>
      {/* Add other options */}
    </select>
  </div>
         </div>

         <div className='flex flex-col sm:flex-row'>
         <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="input2" className="text-sm mb-1">Select City</label>
     <select
      id="input2"
      name="selectCity"
      value={formData.selectCity}
      onChange={handleChange}
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    >
      <option value="">Select an option</option>
      <option value="option1">Ranchi</option>
      <option value="option2">Ormanjhi</option>
      {/* Add other options */}
    </select>
  </div>
        <div className="flex flex-col sm:w-1/2 sm:mr-1">
    <label htmlFor="input1" className="text-sm mb-1">Pin Code   </label>
    <input
      type="text"
      id="input1"
      name="postalCode"
      value={formData.postalCode}
      onChange={handleChange}
      placeholder="Postal Code "
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    />
       </div>
       <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="input2" className="text-sm mb-1">E-mail</label>
      <input
      type="text"
      id="input1"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="email "
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    />
   
       </div>
 
          </div>
            {/* Add more inputs for Step 1 */}
          </>
        )}

        {/* Add other steps similarly */}
        {step === 2 && (
          <>
            <h2 className='font-sans text-lg font-bold text-emerald-400/60 my-1'>Doctor Details</h2>
            <div className='flex flex-col sm:flex-row'>
         
      <div className="flex flex-col sm:w-1/2 sm:mr-1">
    <label htmlFor="input1" className="text-sm mb-1">Department  </label>
       <select
      id="input2"
      name="department"
      value={formData.input2}
      onChange={handleChange}
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    >
      <option value="">Select Department </option>
      <option value="option1">OPD</option>
      <option value="option2">IPD</option>
      {/* Add other options */}
    </select>
      </div>
      <div className="flex flex-col sm:w-1/2 sm:ml-1">
      <label htmlFor="input2" className="text-sm mb-1">Select Doctor </label>
      <select
        id="input2"
        name="doctor"
        value={formData.input2}
        onChange={handleChange}
        className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
      >
        <option value="">Select Doctor </option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        {/* Add other options */}
      </select>
    </div>
     
      </div>
          <div className='flex flex-col sm:flex-row'>
          <div className="flex flex-col sm:w-1/2 sm:ml-1">
          <label htmlFor="input2" className="text-sm mb-1">Select Shift  </label>
          <select
            id="input2"
            name="shift"
            value={formData.input2}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
          >
            <option value="">Select Shift </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            {/* Add other options */}
          </select>
          </div>
        <div className="flex flex-col sm:w-1/2 sm:ml-1">
        <label htmlFor="input2" className="text-sm mb-1">Appointment Fee </label>
        <input
        type="text"
        id="input1"
        name="fee"
        value={formData.fee}
        onChange={handleChange}
        placeholder="Appointment Fee "
        className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
      />
         </div>
          </div>
          <div className='flex flex-col sm:flex-row'>
          <div className="flex flex-col sm:w-1/2 sm:ml-1">
          <label htmlFor="input2" className="text-sm mb-1">Select Prefered Date  </label>
          <input
          type="date"
          id="input1"
          name="fee"
          value={formData.fee}
          onChange={handleChange}
          placeholder="Appointment Fee "
          className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
        />
           </div>
       
          </div>
          </>
        )} 
       {
        step ===3 && (
          <>
          <div>
          <button onClick={initiatePayment}>Pay with Razorpay</button>
        </div>
          </>
          )
          
       }
      


       <div className="flex justify-between mt-8">
          {step > 1 && (
            <button onClick={handlePrev} type="button" className="bg-gray-300 px-4 py-2 rounded-md">
              Previous
            </button>
          )}
          {step < steps.length && (
            <button onClick={handleNext} type="button" className="bg-emerald-400/60 relative text-gray font-semibold px-4 py-2 rounded-md">
              Next
            </button>
          )}
          {step === steps.length && (
            <button type="submit" className="bg-emerald-400/60 text-gray-500 font-semibold px-4 py-2 rounded-md">
              Submit
            </button>
          )}
        </div>
      </form>
         </div>
     
    </div>
    
  )
}

export default YourFormComponent

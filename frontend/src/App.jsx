import React, { useState ,useEffect } from 'react';
import appoinent from "./assets/image/appoinment.jpg" 
import { useFormik } from 'formik';
import * as yup from 'yup';
import './App.css'
import axios from 'axios';
import {API_BASE_URL} from "./Api/ApiList"
import ApiMultipartHeader from "./Api/ApiMultipartHeader"
import {Constant} from "./Api/Laravelapi"
 

const YourFormComponent =  ()  => {
   const [step, setStep] = useState(1);
   const [hospitalId, setHospitalId] = useState(1);
   const [departments , setDepartments] = useState([]) 
   const [states, setStates] = useState([]);
   const [selectedDepartment, setSelectedDepartment] = useState('');
   const [selectedState, setSelectedState] = useState({});
   const [selectedStateId, setSelectedStateId] = useState(''); // State to hold the selected state ID
   const [cities, setCities] = useState([]); // State to hold fetched cities
   const [doctors, setDoctors] = useState([]);
   const [departmentId, setDepartmentId] = useState(1);
   const [shifts, setShifts] = useState([]);
   const [consultantId, setConsultantId] = useState('');
  const [formData, setFormData] = useState({
    appliedfor : '',
     mrno: '',
     name :'' ,
     age: '',
     dob: '',
     gender: '',
     address: '',
     selectcity: '',
     pincode: '',
     email: '',
     department: '',
     shift: '',
     fee: '',
     preffereddate: '',

    // Add more inputs here as needed
  });

  const handleDepartmentSelect = (event) => {
    const deptId = event.target.value;
    setDepartmentId(deptId);
    fetchDoctorsByHospitalAndDept();
  };


  
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [hospitalId]);

   {/*from Dept id to get state and deoartment*/}
  const fetchData = async () => { 
    try {
      const response = await axios.post('http://192.168.29.66:8001/api/master/v1/get-dept-by-hospid', {
        hospitalId: hospitalId,
      });
      

      const { departments, states } = response.data.data;
      setDepartments(departments);
      setStates(states);
      console.log("Response", response?.data?.data)

      console.log('departments:', departments);
      console.log('States:', states);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  {/*from stateId get cityId*/}
  const fetchCitiesByStateId = async (selectedStateId) => {
    try {
      // Ensure selectedStateId is an integer
      const stateIdInteger = parseInt(selectedStateId, 10); // Assuming base 10 for decimal numbers
  
      const response = await axios.post('http://192.168.29.66:8001/api/master/v1/get-city-by-stateid', {
        stateId: stateIdInteger,
      });
  
      const responseData = response.data;
  
      if (response.status === 422) {
        console.error('Validation error:', responseData.message);
        return;
      }
  
      const fetchedCities = responseData.data;
      setCities(fetchedCities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };
  {/*frrom hopsitId and DeptId geṭ Doctors list */}
  const fetchDoctorsByHospitalAndDept = async () => {
    const departmentIdString = String(departmentId).trim(); 
    try {
      if (!departmentIdString || departmentIdString === '') {
        console.error('Department ID is missing or empty.');
        return;
      }
  
      const response = await axios.post('http://192.168.29.66:8001/api/master/v1/get-doctors-by-hospdept', {
        hospitalId: hospitalId,
        departmentId: departmentIdString,
      });
  
      const responseData = response.data;
  
      if (response.status === 422) {
        console.error('Validation error:', responseData.message);
        return;
      }
  
      const fetchedDoctors = responseData.data;
      setDoctors(fetchedDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
 {/*from HospitalId And Department Id get Shiftname and shiftstatrttime */}
  const fetchShiftsByHospitalAndConsultant = async () => {
    try {
      
      const response = await axios.post('http://192.168.29.66:8001/api/master/v1/get-shifts-by-hospconsultant', {
        hospitalId: hospitalId,
        consultantId: consultantId,
      });

      const responseData = response.data;

      if (response.status === 422) {
        console.error('Validation error:', responseData.message);
        return;
      }

      const fetchedShifts = responseData.data;
      setShifts(fetchedShifts);
    } catch (error) {
      console.error('Error fetching shifts:', error);
    }
  };
 
  const handleShiftSelect = (event) => {
    const shiftId = event.target.value;
    const selectedShift = shifts.find(shift => shift.consultant_shift_id === shiftId);
  
    if (selectedShift) {
      setFee(selectedShift.fee);  // Set the fee in the state
    }
  };

  const handleDoctorSelect = (event) => {
    const consultantId = event.target.value;
    setConsultantId(consultantId);
    fetchShiftsByHospitalAndConsultant();
  };

  // Function to handle city selection
  const handleCitySelect = (event) => {
    const selectedCityId = event.target.value;
    // Do something with the selected city ID
    console.log('Selected City ID:', selectedCityId);
    // You can perform further actions based on the selected city
  };

 
// Example usage when a state is selected
 


  useEffect(() => {
    if (selectedState !== '') {
      fetchCitiesByStateId(selectedState);
    }
  }, [selectedState]);

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
      appliedfor: '',
      mrno: '',

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
           id="appliedfor"
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
            id="mrno"
            name="mrno"
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
      id="name"
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
     id ="dob"
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
           id="gender"
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
      id="address"
      name="address"
      value={formData.address}
      onChange={handleChange}
      placeholder="Address "
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    />
  </div>
  <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="stateSelect" className="text-sm mb-1">Select State</label>
     <select
      id="stateSelect"
      name="selectstate"
      value={selectedState}
      onChange={handleStateChange}
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"  style={{ color: 'black', backgroundColor: 'white' }}  >
      <option value="">Select an option</option>
      {states.map((state) => (
        <option key={state.StateID} value={state.StateID}>
          {state.StateName}
        </option>
      ))}
    </select>
  </div>
     </div>
       <div className='flex flex-col sm:flex-row'>
         <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="citySelect" className="text-sm mb-1">Select City</label>
    <select  className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"  style={{ color: 'black', backgroundColor: 'white' }}  >
    <option value="">Select City</option>
    {cities.map(city => (
      <option key={city.CityID} value={city.CityID}>
        {city.CityName}
      </option>
    ))}
  </select>
         </div>
        <div className="flex flex-col sm:w-1/2 sm:mr-1">
    <label htmlFor="input1" className="text-sm mb-1">Pin Code   </label>
    <input
      type="text"
      id="pincode"
      name="pincode"
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
      id="email"
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
    <label htmlFor="departmentSelect" className="text-sm mb-1">Department  </label>
    <select  className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full" onChange={handleDepartmentSelect}>
    <option value="">Select Department</option>
    {departments.map(dept => (
      <option key={dept.department_id} value={dept.department_id}>
        {dept.department_name}
      </option>
    ))}
  </select>
      </div>
      <div className="flex flex-col sm:w-1/2 sm:ml-1">
      <label htmlFor="input2" className="text-sm mb-1">Select Doctor </label>
      <select className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"  style={{ color: 'black', backgroundColor: 'white' }} >
        <option value="">Select Doctor</option>
        {doctors.map(doctor => (
          <option key={doctor.consultant_id} value={doctor.consultant_id}>
            {doctor.consultant_name}
          </option>
        ))}
      </select>
      </div>
     </div>
          <div className='flex flex-col sm:flex-row'>
          <div className="flex flex-col sm:w-1/2 sm:ml-1">
          <label htmlFor="input2" className="text-sm mb-1">Select Shift</label>
          <select className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full" onChange={handleShiftSelect}>
            <option value="">Select Shift</option>
            {shifts.length > 0 && // Check if 'shifts' array has elements
              shifts.map(shift => (
                <option key={shift.consultant_shift_id} value={shift.consultant_shift_id}>
                  {shift.shift_name} - {shift.shift_start_time} to {shift.shift_end_time}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col sm:w-1/2 sm:ml-1">
        <label htmlFor="input2" className="text-sm mb-1">Appointment Fee </label>
        <input
        type="text"
        id="fee"
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
          id="preffereddate"
          name="preffereddate"
          value={formData.preffereddate}
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
          <button className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={initiatePayment}>Pay with Razorpay</button>
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

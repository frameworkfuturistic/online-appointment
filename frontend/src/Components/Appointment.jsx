import React, { useState ,useEffect } from 'react';
import appoinent from "../assets/image/appoinment.jpg" 
import { useFormik } from 'formik';
import * as yup from 'yup';
import jagganath  from '../assets/image/jagganath.png' 
import axios from 'axios';
import ApiJsonHeader from "../Api/ApiMultipartHeader/" 
 

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
 
   const [consultantId, setConsultantId] = useState('');
   const [shifts, setShifts] = useState([]);
   const [selectedDoctor, setSelectedDoctor] = useState('');
   const [selectedShiftId, setSelectedShiftId] = useState('');
   const [selectedShiftFee, setSelectedShiftFee] = useState('');
   const [payloading, setPayloading] = useState(true);
  const [formData, setFormData] = useState({
    appliedfor : '',
     mrno: '',
     name :'' ,
     dob: '',
     gender: '',
     address: '',
     selectState: '',
     selectCity : "" ,
     pincode: '',
     doctor:'' ,
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

console.log('Form Data => ', formData)
  
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    if (e.target.value !== '') {
      fetchCitiesByStateId(e.target.value);
    }
  };

  useEffect(() => {
    fetchData();
  }, [hospitalId]);

  {/*from Dept id to get state and deoartment*/}
  const fetchData = async () => { 
    try {
      const response = await axios.post('http://192.168.29.66:8001/api/master/v1/get-dept-by-hospid',  {
        hospitalId: hospitalId,
      });
      

      const { departments, states } = response.data.data;
      setDepartments(departments);
      setStates(states);
      console.log("Response", response?.data?.data)
      setLoading(false); // Set loading to false once data is fetched
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
  
      const response = await axios.post('http://192.168.29.66:8001/api/master/v1/get-city-by-stateid',     {
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

  {/*from hopsitId and DeptId geṭ Doctors list */}
  const fetchDoctorsByDepartment = async (departmentId) => {
    try {
      const response = await axios.post('http://192.168.29.66:8001/api/master/v1/get-doctors-by-hospdept',  {
        hospitalId: '1', // Replace with your hospital ID
        departmentId: '2',
      });

      const responseData = response.data;

      if (response.status === 422) {
        console.error('Validation error:', responseData.message);
        return [];
      }

      const fetchedDoctors = responseData.data;
      setDoctors(fetchedDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
    }
  };
  {/*from HospitalId And Department Id get Shiftname and shiftstatrttime */}
  const fetchShiftsByDoctor = async (consultantId) => {
    try {
      const response = await axios.post('http://192.168.29.66:8001/api/master/v1/get-shifts-by-hospconsultant', {
        hospitalId: '1', // Replace with your hospital ID
        consultantId: consultantId,
      });
  
      if (response && response.data && response.status === 200) {
        const responseData = response.data;
        const fetchedShifts = responseData.data;
        setShifts(fetchedShifts);
      } else {
        console.error('Invalid response or status:', response);
        setShifts([]);
      }
    } catch (error) {
      console.error('Error fetching shifts:', error);
      setShifts([]);
    }
  };
   // Function to handle department selection
  const handleDepartmentChange = async (selectedDept) => {
    setSelectedDepartment(selectedDept);
    await fetchDoctorsByDepartment(selectedDept);
    setSelectedDoctor(''); // Reset selected doctor when department changes
    setShifts([]); // Reset shifts when department changes
  };

   // Function to handle doctor selection
   const handleDoctorChange = async (selectedDoctorId) => {
    setSelectedDoctor(selectedDoctorId);
    await fetchShiftsByDoctor(selectedDoctorId);
   };

   const handleShiftChange = (selectedShiftId) => {
    const selectedShiftData = shifts.find((shift) => shift.consultant_shift_id == selectedShiftId);
  
    if (selectedShiftData && selectedShiftData.fee !== undefined) {
      setSelectedShiftId(selectedShiftId);
      setSelectedShiftFee(selectedShiftData.fee.toString());
    } else {
      setSelectedShiftId('');
      setSelectedShiftFee('');
    }
  };
  

  // Function to handle city selection
  const handleCitySelect = (event) => {
    const selectedCityId = event.target.value;
    // Do something with the selected city ID
    console.log('Selected City ID:', selectedCityId);
    // You can perform further actions based on the selected city
  };

 
// Example usage when a state is selected
//  useEffect(() => {
//     if (selectedState !== '') {
//       fetchCitiesByStateId(selectedState);
//     }
//   }, [selectedState]);

  const steps = ['Personal Information', 'Doctor Details', 'Payment']; // Add step names here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // if(name == 'selectState'){
    //   fetchCitiesByStateId(value)
    // }
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
    selectState : formData?.selectstate ,
    selectCity : formData?.selectcity ,
    email : "" ,
    department : formData?.department ,
    doctor: formData?.doctor,
    shift: formData?.shift,
    fee : formData?.fee ,
    preffereddate:''
  }
 
  const validationSchema = yup.object({
      // Define your validation schema for each field
      // Example: name should be required and a string
      name: yup.string().required('Name is required'),
      // Add validation for other fields as needed
  });

  const submitFun = (values) => {
      console.log('Form data:', values);
      // Here, you can handle the form data, such as sending it to a server
   };

    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        submitFun(values)
      },
    });

    //logic for currebt date not go to the backdate
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      let month = now.getMonth() + 1; // January is 0
      let day = now.getDate();
  
      // Pad single digit month/day with leading zero
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }
  
      return `${year}-${month}-${day}`;
    };
    
    //logic for date 
    const [selectedDate, setSelectedDate] = useState('');
     const handleDateChange = (e) => {
      const enteredDate = e.target.value;
      const currentDate = getCurrentDate();
  
      if (enteredDate < currentDate) {
        // Reset input value to the current date if a past date is entered
        setSelectedDate(currentDate);
      } else {
        // Update selectedDate state if a valid (present or future) date is entered
        setSelectedDate(enteredDate);
      }
    }
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
 
    //payment Gateway 
    const initiatePayment = async () => {
      try {
        setPayloading(true)
        const response = await axios.post(`http://192.168.29.66:8001/api/payment/v1/order`); // Replace with your endpoint
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
      finally {
        setPayloading(false); // Set loading to false to hide the loader after the process completes
      }
    };
  
  return (
  
    <div className="m-4">
    <div className="flex justify-center">
    <div className="max-w-screen-lg overflow-hidden rounded-t-xl bg-emerald-400/60 py-20 text-center shadow-xl shadow-gray-300">
      <div className="flex flex-col md:flex-row md:items-center justify-center">
        <div className="flex items-center justify-center mb-4 md:mb-0 md:mr-2">
          <img
            className="h-22 w-22"
            src={jagganath}
            alt=""
          />
        </div>
        <div className="flex flex-col md:text-left">
          <h3 className="mt-2 text-3xl font-bold text-white md:text-5xl">Shree Jagannath Hospital And Research Center</h3>
         <p className="mt-6 text-lg text-white font-semibold">
          <span className="border-b-2 border-white">In collaboration with</span><br />
          <span className="text-4xl font-bold">Symptoms Care</span>
        </p>
        </div>
      </div>
      <img className="absolute top-0 left-0 -z-10 h-full w-full object-cover opacity-100" src={appoinent} alt="" />
    </div>
  </div>
  
  
    <div className="max-w-screen-xl md:flex-row rounded-xl mx-auto px-4 sm:px-6 md:my-2 lg:px-8 bg-slate-50   p-2 sm:my-2 sm:p-4 lg:my-4 lg:p-6 ">
    <div className="flex flex-col sm:flex-row  items-center justify-between mb-6 md:my-2 gap-2 " >
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
      <div className="relative mb-4 ">
        <div className="h-2 bg-gray-200 rounded-full">
         <div
        className={`absolute top-0 h-2 rounded-full bg-emerald-400/60 ${
        step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : step === 3 ? 'w-full' : ''
  }`}
>
</div>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
        {step === 1 && (
          <>
         <h2 className='font-sans text-lg font-bold text-emerald-400/60 my-1'>Personal Information</h2>
         <div className='flex flex-col sm:flex-row  md:flex '>
         <div className="flex flex-col sm:w-1/2 sm:ml-1 mr-2 ">
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
        <>
          <div className="flex flex-col sm:w-1/2 lg:mr-1 sm:mr-1">
            <label htmlFor="mrno" className="text-sm mb-1">MR NO.</label>
            <input
              type="text"
              id="mrno"
              name="mrno"
              value={formData.mrno}
              onChange={handleChange}
              placeholder="MR NO."
              className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
              required
            />
          </div>

          {/* New input for Mobile No. */}
          <div className="flex flex-col sm:w-1/2 lg:mr-1 sm:mr-1">
            <label htmlFor="mobileNo" className="text-sm mb-1">Mobile No.</label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Mobile No."
              className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
              required
            />
          </div>
        </>
      )}
     <div className="flex flex-col sm:w-1/2 sm:mr-1">
    <label htmlFor="input1" className="text-sm mb-1">Name </label>
    <input
      type="text"
      id="name"
      name="name"
      value={formik.values.name}
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
      required 
     />
     </div>
         </div>
         <div className='flex flex-col sm:flex-row'>
         <div className="flex flex-col sm:w-1/2 sm:ml-1 mr-2 ">
         <label htmlFor="input2" className="text-sm mb-1">Gender</label>
         <input
           type="text"
           id="gender"
           name="gender"
           value={formData.gender}
           onChange={handleChange}
           placeholder="Gender"
           className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
           required 
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
      required 
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
      <option value={formik.values.selectState}>Select an option</option>
      {states.map((state) => (
        <option key={state.StateID} value={state.StateID}>
          {state.StateName}
        </option>
      ))}
    </select>
        </div>
         </div>
         <div className='flex flex-col sm:flex-row'>
         <div className="flex flex-col sm:w-1/2 sm:ml-1 mr-2 ">
    <label htmlFor="citySelect" className="text-sm mb-1">Select City</label>
    <select  name="selectCity" className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"  style={{ color: 'black', backgroundColor: 'white' }}  >
    <option value={formData.selectcity}>Select City</option>
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
    <select name="department" className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"  onChange={(e) => handleDepartmentChange(e.target.value)}>
        <option value={formData.department}>Select Department</option>
        {departments.map((dept) => (
          <option key={dept.department_id} value={dept.department_id}>
            {dept.department_name}
          </option>
        ))}
      </select>
      </div>
      <div className="flex flex-col sm:w-1/2 sm:ml-1">
      <label htmlFor="input2" className="text-sm mb-1">Select Doctor </label>
      <select name="doctor"  className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full" onChange={(e) => handleDoctorChange(e.target.value)} value={selectedDoctor}>
      <option value={formData.doctor}>Select Doctor</option>
      {doctors.map((doctor) => (
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
        <select
        name="shift"
          className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
          onChange={(e) => handleShiftChange(e.target.value)}
        >
          <option value={formData.shift}>Select Shift</option>
          {shifts.map((shift) => (
            <option key={shift.consultant_shift_id} value={shift.shift_id}>
              {shift.shift_name} - {shift.shift_start_time} to {shift.shift_end_time}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col sm:w-1/2 sm:ml-1">
        <label htmlFor="selectedShiftFee" className="text-sm mb-1">Appointment Fee</label>
        <input
        name="fee"
          id="selectedShiftFee"
          className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
          type="text"
          value={selectedShiftFee}
          readOnly
        />
      </div>
      </div>
       <div className='flex flex-col sm:flex-row'>
          <div className="flex flex-col sm:w-1/2 sm:ml-1">
          <label htmlFor="input2" className="text-sm mb-1">Select Prefered Date  </label>
          <input
          type='date'
          className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
          value={selectedDate}
          onChange={handleDateChange}
          min={getCurrentDate()} // Use the function to set the min attribute
        />
           </div>
       
          </div>
          </>
        )} 

       {
        step ===3 && (
          <>
          <div className="flex items-center justify-center "> {/* Center the button */}
          {payloading && <div className="loader"> </div>} {/* Display loader when payloading is true */}
          <button
            className='bg-red-500 flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={initiatePayment}
            disabled={payloading} // Disable the button when payloading is true to prevent multiple clicks
                  style={{ marginLeft: '10px' }} // Add some margin to the right side of the button
          >
            Pay with Razorpay
          </button>
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
            <button type="submit"  className="bg-emerald-400/60 text-gray-500 font-semibold px-4 py-2 rounded-md">
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

import React, { useState } from 'react';
import appoinent from "./assets/image/appoinment.jpg" 
 
import './App.css'

const YourFormComponent =  ()  => {
   const [step, setStep] = useState(1);
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

  return (
  
    <div className='justify-center box-shadow '>

    <div className="w-screen flex-auto justify-center md:mx-20 mx-4   ">
    <div className=" max-w-screen-lg overflow-hidden rounded-t-xl bg-emerald-400/60 py-20 text-center shadow-xl shadow-gray-300">
      <h3 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl"> Shree jagannath Hospital And Research Center </h3>
      <p className="mt-6 text-lg text-white">in collaboration with Symptoms Care </p>
      <img className="absolute top-0 left-0 -z-10 h-full w-full object-cover opacity-100  " src={appoinent} alt="" />
    </div>
      </div>
         <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50   p-2 sm:my-2 sm:p-4 lg:my-4 lg:p-6 ">
     <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
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
  <div className="flex flex-col sm:w-1/2 sm:mr-1">
    <label htmlFor="input1" className="text-sm mb-1">Name </label>
    <input
      type="text"
      id="input1"
      name="name"
      value={formData.input1}
      onChange={handleChange}
      placeholder="name"
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    />
  </div>
  <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="input2" className="text-sm mb-1">DOB</label>
    <input
      type="date"
      id="input2"
      name="dob"
      value={formData.input2}
      onChange={handleChange}
      placeholder="Input 2"
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    />
  </div>
  <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="input2" className="text-sm mb-1">Gender</label>
    <input
      type="text"
      id="input2"
      name="gender"
      value={formData.input2}
      onChange={handleChange}
      placeholder="Gender"
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    />
  </div>
          </div>
         <div className='flex flex-col sm:flex-row'>
  <div className="flex flex-col sm:w-1/2 sm:mr-1">
    <label htmlFor="input1" className="text-sm mb-1">Address  </label>
    <input
      type="text"
      id="input1"
      name="address"
      value={formData.input1}
      onChange={handleChange}
      placeholder="Address "
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    />
  </div>
  <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="input2" className="text-sm mb-1">Select State</label>
     <select
      id="input2"
      name="select state"
      value={formData.input2}
      onChange={handleChange}
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    >
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      {/* Add other options */}
    </select>
  </div>
  <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="input2" className="text-sm mb-1">Select City</label>
     <select
      id="input2"
      name="select city"
      value={formData.input2}
      onChange={handleChange}
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    >
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      {/* Add other options */}
    </select>
  </div>
          </div>
         <div className='flex flex-col sm:flex-row'>
  <div className="flex flex-col sm:w-1/2 sm:mr-1">
    <label htmlFor="input1" className="text-sm mb-1">Postal Code   </label>
    <input
      type="text"
      id="input1"
      name="postal code"
      value={formData.input1}
      onChange={handleChange}
      placeholder="Postal Code "
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    />
  </div>
  <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="input2" className="text-sm mb-1">EMAIL</label>
      <input
      type="text"
      id="input1"
      name="email"
      value={formData.input1}
      onChange={handleChange}
      placeholder="email "
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    />
   
  </div>
  <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="input2" className="text-sm mb-1">Have You Ever Applied </label>
     <select
      id="input2"
      name="applied"
      value={formData.input2}
      onChange={handleChange}
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    >
      <option value="">Select an option</option>
      <option value="option1">yes </option>
      <option value="option2">No</option>
      {/* Add other options */}
    </select>
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
          </div>
          </>
        )} 
        {step === 3 && (
          <>
            <h2 className='font-sans text-lg font-bold text-emerald-400/60 my-1'>Payment Details </h2>
            <div className='flex flex-col sm:flex-row'>
            <div className="flex flex-col sm:w-1/2 sm:mr-1">
             <label htmlFor="input1" className="text-sm mb-1">select payment option  </label>
       <select
      id="input2"
      name="input2"
      value={formData.input2}
      onChange={handleChange}
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    >
      <option value="">Select payment Option </option>
      <option value="option1">OPD</option>
      <option value="option2">IPD</option>
      {/* Add other options */}
    </select>
  </div>
  <div className="flex flex-col sm:w-1/2 sm:ml-1">
    <label htmlFor="input2" className="text-sm mb-1">Select Bank </label>
    <select
      id="input2"
      name="input2"
      value={formData.input2}
      onChange={handleChange}
      className="border border-gray-300 rounded-md py-2 px-3 mb-2 w-full"
    >
      <option value="">Select Bank </option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      {/* Add other options */}
    </select>
  </div>
  
          </div>
          </>
        )} 
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

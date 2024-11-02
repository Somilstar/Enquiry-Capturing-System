import { useState } from "react"
import axios from "axios"


function EnquiryForm() {

const defaultEnquiry = {
    "name": "",
    "emailAddress": "",
    "category": "Service Request",
    "message": ""
}


    const [enquiryForm, setEnquiryForm] = useState(defaultEnquiry)

    const handleFormChange = (e) => {
        const {name,value} = e.target;
        setEnquiryForm((prev)=>({
            ...prev,
            [name]: value,

        }))


    };

    const handleformSubmit = (e) =>{
        e.preventDefault();

         axios.post(`${import.meta.env.VITE_API_BASE_URL}enquiry`,enquiryForm,{
            
            headers:{
                //"Content-Type": "Application Json",
                "Content-Type": "application/json",
            }
        }).then(()=>{
            setEnquiryForm(defaultEnquiry);
            alert("Enquiry Submitted");
        })
        .catch((error)=>{
            console.error(error)
            alert("unable to submit the enquiry")
        });


    };
 

    return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-700">
      <form 
      action=""
      className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      onSubmit={handleformSubmit}
      >

        <h2 className="text-xl font-bold mb-4 ">Enquiry Form</h2>

        <div className="mb-4">
             
            <label htmlFor="name" className="block text-sm font-medium mb-2 ">Name</label>
            <input type="text" id="name" name="name" className="block w-full p-2 border border-gray-300 rounded" placeholder="Please enter your name" required min={2} max={60} autoComplete="off" value={enquiryForm.name} onChange={handleFormChange} />


    
        </div>

        <div className="mb-4">
        <label htmlFor="emailAddress" className="block text-sm font-medium mb-2 ">Email Address</label>
        <input type="email" id="emailAddress" name="emailAddress" className="block w-full p-2 border border-gray-300 rounded" placeholder="Please enter your email address" required  autoComplete="off" value={enquiryForm.emailAddress} onChange={handleFormChange}/>
        </div>

        <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium mb-2 ">Category</label>
        <select name="category" id="category" className="block w-full p-2 border border-gray-300 rounded" required  value={enquiryForm.category} onChange={handleFormChange} >
            <option value="Service Request"> Service Request</option>
            <option value="Feedback">Feedback</option>
            <option value="Complaint">Complaint</option>
            
        </select>
        </div>

        <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium mb-2 ">Message</label>
        <textarea id="message" name="message" className="block w-full p-2 border border-gray-300 rounded" placeholder="Please enter your message" required rows={4}  minLength={3} maxLength={200}  autoComplete="off" value={enquiryForm.message} onChange={handleFormChange} />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Submit</button>



      </form>
    </div>
    )
  }
   
  export default EnquiryForm
  
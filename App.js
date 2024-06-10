
import { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [popup,setPopup]=useState(false)
  const [popup1,setPopup1]=useState(false)
  const [fullName,setFullName]=useState('')
  const [emailAdd,setEmailAddress]=useState('')
  const [mobileNo,setMobileNo]=useState('')
  const [department,setDepartment]=useState('')
  const [actionText,setActionText]=useState('')
  const [userData,setUserData]=useState([])
  const toggle=()=>{
    setPopup(popup=>!popup)
    setActionText('Add Student')
    setFullName('')
    setEmailAddress('')
    setMobileNo('')
    setDepartment('')
   
  }
  const toggle1=()=>{
    setPopup1(popup1=>!popup1)
      
  }
  
  useEffect(()=>{
    fetchUsers()
  })
  const fetchUsers=async()=>{
    const res = await fetch('http://localhost:6500/api/getStudents')
    const data = await res.json()
    setUserData(data.message)

  }
  const onUserSubmit=async(e)=>{
    e.preventDefault()
    if(fullName==='' || emailAdd==='' || mobileNo==='' || department===''){
      toast.error('Enter the details !!')
    }else{
      const res = await fetch('http://localhost:6500/api/insert',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Fullname:fullName,
          EmailAddress:emailAdd,
          MobileNo:mobileNo,
          Department:department

        })
      })
      const data = await res.json()
      if(data.status===true){
        toast.success(data.message)
        setTimeout(()=>{
          setFullName('')
          setEmailAddress('')
          setMobileNo('')
          setDepartment('')
        },2500);
      }else{
        toast.error(data.message)
      }
    }
  }
  return (
    <div>
      <div className='header'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <h2>Student Management System</h2>
        <div className='btn'>
          <button onClick={toggle}>Add Student</button>
          <button onClick={toggle1}>Student Details</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>SrNo</th>
            <th>Fullname</th>
            <th>Email Address</th>
            <th>MobileNo</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            userData.length == 0 ?
            <tr>
              <td colSpan="4">No students data available</td>
            </tr>
            :
            userData.map((user,index)=>{
              return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{user.Fullname}</td>
                <td>{user.EmailAddress}</td>
                <td>{user.MobileNo}</td>
                <td>{user.Department}</td>
                <td className='actions'>
                  <button><i class="fa-solid fa-user-pen"></i></button>
                  <button><i class="fa-solid fa-trash-can"></i></button>
                </td>
              </tr>
              );              
            })
          }
        </tbody>
      </table>
      {
      popup &&
      <div className='box'>
        <div className='title'>
          <h3>{actionText}</h3>
          <label onClick={toggle}>X</label>
        </div>
        <form onSubmit={onUserSubmit}>
          <div className='input-field'>
            <label>Fullname<span>*</span></label>
            <input type='text'
              value={fullName} onChange={(e)=>setFullName(e.target.value)}
            ></input>
          </div>
          <div className='input-field'>
            <label>Email Address<span>*</span></label>
            <input type='email'
              value={emailAdd} onChange={(e)=>setEmailAddress(e.target.value)}
            ></input>
          </div>
          <div className='input-field'>
            <label>Mobile No<span>*</span></label>
            <input type='number'
              value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)}
             ></input>
          </div>
          <div className='input-field'>
            <label>Department<span>*</span></label>
            <select
              value={department} onChange={(e)=>setDepartment(e.target.value)}
            >
              <option selected value=''>SELECT</option>
              <option value='CSE'>CSE</option>
              <option value='IT'>IT</option>
              <option value='E&TC'>E&TC</option>
              <option value='EEE'>EEE</option>
              <option value='Civil'>Civil</option>
            </select>
          </div>
          <input type='submit' value={actionText}></input>
        </form>
      </div>
      }
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;

import React, { useContext, useState } from 'react';
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from 'react-router-dom';
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import {MdFileUpload} from "react-icons/md" ;
import {FcGoogle} from "react-icons/fc" ;
import {BsGithub} from "react-icons/bs" ;
import { AuthProvider } from '../../../UserContext/UserContext';
import {toast} from "react-toastify" ;
import authToken from '../../../hooks/authToken';
import BeatLoader from 'react-spinners/BeatLoader';
const Register = () => {
const { register, handleSubmit, formState: { errors } } = useForm();
const [profile, setProfile] = useState({});
const [loading , setLoading] = useState(false) ;
//navigate
const navigate = useNavigate() ;
//get user data from user context
const {createUser , updateUserProfile , googelSignIn , githubSignIn , sendEmailVerify  } = useContext(AuthProvider) ;
//image bb key 
const image_bb_key = process.env.REACT_APP_imageBbKey  ;
//get form data 
const formData = new FormData() ;
formData.append("image" , profile) ;
const verifyEmailAddress = () => {
sendEmailVerify() ;
toast.info("Check your inbox to verify your email !!")  ;
}
//save user information in the mongo atlas 
const createMongoDBUser = (name , email , profileImage , role) => {
setLoading(true) ;
const userData = {
  name:name ,
  email:email , 
  profile:profileImage ,
  role:role , 
}
fetch("https://mitly.vercel.app/users" , {
  method:"POST" ,
  headers:{
  'content-type' : 'application/json' , 
  },
  body:JSON.stringify(userData)
})
.then(res => res.json())
.then(data => {
  if(data.existed){
  toast.info(data.existed) ;
  setLoading(false) ;
  return ;
  }
 if(data.insertedId){
  setLoading(false)   ;
 toast.success("Congratulation your account was created successfully 😀 ") ;
 verifyEmailAddress() ;
 navigate("/login") ;
 }
}).catch(error => {
  setLoading(false) ;
  console.log(" Error: " , error)
})
}
//
//submit form data 
const onSubmit = userFormData => {
//create new user email and password based 
setLoading(true) ;

fetch(`https://api.imgbb.com/1/upload?key=${image_bb_key}`,{
method:"POST" , 
 body:formData , 
},)
  .then(res => res.json())
  .then(data => {
   const profileImage =   data.data.url ;
   createUser(userFormData.email , userFormData.password)
   .then((result) => {
   const email = result.user.email ;
    authToken(email) ;
    updateUserProfile(userFormData.name , profileImage) 
    .then(() => {
    navigate("/") ;
   createMongoDBUser(userFormData.name , userFormData.email , profileImage ,
   userFormData.role  ) ;

    }).catch(error =>  {
      toast.error(error.message , {position:"top-center"})   ;
          setLoading(false) ;
        })
   })
   .catch(error => {
  toast.error(error.message , {position:"top-center"})   ;
      setLoading(false) ;
    }
      )
  } )
  .catch((error)  => {
    console.log(error)
    setLoading(false) ;
  });

 }

//create user by google sign in 
const handleGoogleSignIn = () => {
setLoading(true) ;
googelSignIn()
.then(result => {
navigate("/") ;
toast.success("Congratulation you are login successfully by Google 😀 ") ;
const name = result?.user?.displayName  ;
const email = result?.user?.email ;
const profileImage = result?.user?.photoURL ;
const role = "Buyer" ; 
authToken(email) ;
createMongoDBUser(name  , email , profileImage , role ) ;
})
.catch(error => {
    if(error) {setLoading(false)}
    toast.error(error.message) ;
  })
}


//create user by google sign in 
const handleGithubSignIn = () => {
  setLoading(true) ;
  navigate("/") ;
  toast.success("Congratulation you are login successfully by Github 😀 ") ;
  githubSignIn()
  .then(result => {
  const name = result?.user?.displayName  ;
  const email = result?.user?.email ;
  const profileImage = result?.user?.photoURL ;
  authToken(email) ;
  createMongoDBUser(name  , email , profileImage  ) ;
  })
  .catch(error => {
    if(error) {setLoading(false)}
    toast.error(error.message) ;
  })
  }

//on drop image callback 
const onDrop = useCallback(acceptedFiles => {
// Do something with the files
setProfile(acceptedFiles[0])
}, [])
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

return (
<>
<Helmet>
<title>Register page </title>
</Helmet>

<div className="hero min-h-96 my-8">
<div className="hero-content flex flex-col lg:flex-row">
  <div className=''>
   <img src="https://i.ibb.co/yRVxQkH/register.png"
    alt="register" className='w-full bg-base-100'
    style={{height:"868px"}}/>
  </div>
<div className="card flex-shrink-0 w-full rounded-none  max-w-xl  shadow-md ">
<form onSubmit={handleSubmit(onSubmit)} className="card-body w-full text-info">
<h2 className='text-2xl text-center my-1 animate-pulse uppercase'>Register now !</h2>
<div className="form-control">
<label className="label">
<span className="label-text"> Name </span>
</label>
<input type="text" placeholder="Please enter your  full name" 
{...register("name" , {
required : true , 
})}
className="input input-bordered" />
{ errors.name && <p className='bg-error p-3 rounded-md text-white
my-3'> Please enter your full name  before submit this form  </p> }
</div>
<div className="form-control">
<label className="label">
<span className="label-text">Email</span>
</label>
<input type="text" placeholder="Please enter your  email" {...register("email" , {
required:true , 
})} className="input input-bordered" />
{ errors.email && <p className='bg-error p-3 rounded-md text-white
my-3'> Please enter your email address before submit this form  </p> }
</div>
<div className="form-control">
<label className="label">
<span className="label-text">Password</span>
</label>
<input type="password" placeholder="Please enter your password" 
{...register("password" , {
required:true  ,  minLength:10 ,  maxLength: 20  
})}
className="input input-bordered" />

{ errors.password && <p className='bg-error p-3 rounded-md text-white
my-4'> Please enter password between 10 to 20 character   </p> }

</div>
<div className="form-control">
<label className="label">
<span className="label-text">Profile </span>
</label>
<div {...getRootProps()} className="hover:cursor-pointer">
<input {...getInputProps()} />
{
isDragActive ?
<div className='border-2 border-dotted py-6 px-2 text-info rounded-md border-lime-600  text-center '>
<BeatLoader color="white" />
<p> Your profile pictures is uploading ....  </p>
</div>

:

<div className='border-2 border-dashed py-6 px-2 rounded-md border-lime-600 '>
<MdFileUpload className='text-center text-3xl font-bold text-info
mx-auto '></MdFileUpload>
{
    profile.name  ? <p> Your profile picture name is  { profile.name}</p> : 
    <p>Drag and drop your profile picture here or click on this area to select an file </p>
    }
</div>
}
</div>
</div>


<NavLink to="/login" >
<label className="flex my-3 hover:cursor-pointer">
<span> Already have an account  please ? </span> 
<span className='mx-2'>  Login  </span>
</label>
</NavLink>

<div className="form-control mt-6">
<button className="btn btn-primary text-primary" type='submit'> 
{
    loading ? <div className='text-sm'>
         <BeatLoader color="white" />
    </div> : "Register"
}
</button>
</div>
<div className="divider">Or register with </div>
 <div className='btn btn-primary rounded-md flex justify-between' onClick={handleGoogleSignIn}>
 <>
      <FcGoogle className='text-2xl'> </FcGoogle> 
     <span> Google </span>
    </> 

   
     </div>
     <div className='btn btn-primary rounded-md flex justify-between'
     onClick={handleGithubSignIn}>
     <BsGithub className='text-2xl'> </BsGithub> 
     <span> Github  </span>
     </div>
</form>
</div>
</div>
</div>

</>
);
};

export default Register;
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from "../App.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authentication from "./../authentication.png"
import js from "./../js.js";
import validator from 'validator'
import { TiSocialFacebook, TiSocialLinkedin, TiSocialInstagram, TiSocialYoutube } from "react-icons/ti";
import { AiOutlineGithub } from "react-icons/ai";
import { BiLogoInstagram } from "react-icons/bi";





const Register = () =>{

const [emailError, setEmailError] = useState('');

const validateEmail = (e) => {
  const email = e.target.value;

  if (email === '') {
    setEmailError('');
  } else if (validator.isEmail(email)) {
    setEmailError('');
  } else {
    setEmailError('Enter valid Email xxx@email.com');
  }
}; 
	 
	
	return(
	
	
	<div>
	<div className={styles.div}>
        <div>
		
      <img className={styles.imgAuthentication} src={authentication} alt="authentication"/>
    </div>
	 
	  <form className={styles.registerForm} action="/" method="POST">
	 
	  
	<label>Email</label>
	    <input onChange={validateEmail} type="email" placeholder="" name="email" />
		<span style={{fontWeight: 'bold',color: 'red',}}>{emailError}</span>
		<br/><label>First name</label>
	    <input type="text" placeholder="" name="userFname" />
		<label>Last name</label>
	    <input type="text" placeholder="" name="userLname" />
		<label>Password</label>
        <input type="password" placeholder="" name="password" />
		<label>User type : </label>
		<br/>
		<br/>
        <select className={styles.selectList} name="user_type">
		<option value={""}></option>
		<option value={"(1)admin"}>Admin</option>
		<option value={"(2)user"}>User</option>
		</select>
		
		<button  className={styles.button} type="submit">Register</button>
		<ToastContainer />
		<p className={styles.RegisterText}>Already have an account? <span className={styles.SpanTextRegister}> <Link className={styles.SpanTextRegister} to="/login">Login </Link>  </span> </p>
		<div calssName={styles.divSocials}>
        <Link to="#"><TiSocialFacebook className={styles.icon}/></Link>
		<Link target="_blank" to="https://www.linkedin.com/in/bashar-al-thawabta/"><TiSocialLinkedin className={styles.icon}/></Link>
		<Link target="_blank" to="https://www.instagram.com/bluenir_/"><BiLogoInstagram className={styles.icon}/></Link>
		<Link to="#"><TiSocialYoutube className={styles.icon}/></Link>
		<Link target="_blank" to="https://github.com/bluenir"><AiOutlineGithub className={styles.icon}/></Link>
		
		</div>
		
      </form> 
	  
	  </div>
	  
    </div>
	
	
	)
}

function RegisterPage() {
	
	
  return (
	   
	  <Register/>
	  )
  
  
}
export default RegisterPage;



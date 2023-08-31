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
	
	
	<div className={styles.div}>
	
        <div>
		
      <img className={styles.imgAuthentication} src={authentication} alt="authentication"/>
    </div>
	 
	  <form className={styles.registerForm} action="/login" method="POST">
	 
	  
		<label>Email </label>
	    <input onChange={validateEmail} type="email" placeholder="" name="email" />
		<span style={{fontWeight: 'bold',color: 'red',}}>{emailError}</span>
		<br/>
		<label>Password</label>
        <input type="password" placeholder="" name="password" />
		<button  className={styles.button} type="submit">Login</button>
		<ToastContainer />
		<p className={styles.RegisterText}>Don't have an account? <span className={styles.SpanTextRegister}> <Link className={styles.SpanTextRegister} to="/">Register </Link>  </span> </p>
		<div calssName={styles.divSocials}>
        <Link to="#"><TiSocialFacebook className={styles.icon}/></Link>
		<Link target="_blank" to="https://www.linkedin.com/in/bashar-al-thawabta/"><TiSocialLinkedin className={styles.icon}/></Link>
		<Link target="_blank" to="https://www.instagram.com/bluenir_/"><BiLogoInstagram className={styles.icon}/></Link>
		<Link to="#"><TiSocialYoutube className={styles.icon}/></Link>
		<Link target="_blank" to="https://github.com/bluenir"><AiOutlineGithub className={styles.icon}/></Link>
		
		</div>
		 <p className={styles.hrNote}>If you set the user type <br/> Admin you can access to this page!</p>
      </form>       
       
    </div>
	
	
	)
}

function LoginPage() {
	
	
  return (
	   
	  <Register/>
	  )
  
  
}
export default LoginPage;



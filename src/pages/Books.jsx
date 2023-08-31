import {React, useState} from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import styles from "../App.module.css";






function Form(){
	var facebook;
	var twitter;
	var github;
	var linkedin;
	var instagram;
	var discord;
	
	const links =  [discord="#5865F2", facebook ="#4267B2" ,twitter="#1DA1F2",github="#000000", linkedin="#0e76a8",instagram="#F56040"]
	
	const [name, setName] = useState("");
	const change2 = (event)=>{
		setName(event.target.value)
		
	}
	
	const change = (event)=>{
		
		setName(event.target.value);
		
		if(name === "facebook"){
			
			alert("hi Your color is!" +{facebook} +"")
		}
		if(name.length === 20){
			
			event.preventDefault();
			alert("Stop!");
			
		}
		
	}
	const handleInputChange = (event) => {
		const input = event.target.value;
		if (input.length <= 20) {
			setName(input);
		}else{
		alert("You reached the maximum 20!")
		}
		
	};

const null_ = (event)=>{
	
	setName(event.target.value)
	if(!name){
		alert("null")
	}
	
	
	}
	
	const  [changeBox, setchangeBox] = useState(false);
	
	const boxChange = (event)=>{
		
		setchangeBox(event.target.checked)
		
		
		
	}
	
	return (
		
		<form method="" action="/">
        <input type="text" value={name} onChange={handleInputChange}/>
		<input  type="submit" onClick={null_} />
		<p>Your Text is : <br/> {name} <br/> And your length is : {name.length}</p>
		<input type="checkbox" checked={changeBox} onChange={boxChange}/>
		<br/>
		Blue
		<br/>
		<br/>
		{changeBox ? <div>Blue is selected!</div> : <div>Please check the box</div>}
		
		<Link to="/update">
        <button className={styles.button}>Update Page</button>
		</Link>
		</form>
		
	)
	
}

const Book = (props)=>{
	
	return(
		
		<h1>hello world, my name is {props.name}</h1>
	)
}
const Bookscolor = (prop)=>{
	
	return(
		<h1 style={{color:prop.color}}>And my color is {prop.color}</h1>
	)
}

function shoot(){
	const conditional = true
	
	
	conditional ?  alert("Hello World") : alert("False")
	
	
	
}


function Books() {
	
	const color = "red";
	
	return (
		
		<div>
		<Book name="bashar"/>
		<Bookscolor color="black"/>
		<button className={styles.button} onClick={shoot}> Press me</button>
		<Form/>
		</div>
	);
}




export default Books;

import React from "react";
import './style.css';
import './style.scss'

class Login extends React.Component {
	render(){
  return (
	<div>
	<form class="login" style={{marginLeft:'500px',marginTop:"200px"}}>
    <p class="title">Log in</p>
    <input type="text" placeholder="Username" autofocus/>
    <i class="fa fa-user"></i>
    <input type="password" placeholder="Password" />
    <i class="fa fa-key"></i>
    <a href="#">Forgot your password?</a>
    <button>
      <i class="spinner"></i>
      <span class="state">Log in</span>
    </button>
  </form>
  <footer><a target="blank" href="http://boudra.me/">boudra.me</a></footer>
</div>

   
  )}}
  export default Login





// import React,{Component} from 'react';

// import './login.css';

// export default class Login extends React.Component{
// 	render(){
// 		return(
// 			<div>
// 			<button class="btn">
// 				Click
// 			</button>
// 		</div>
// 		)
		
// 	}
// }
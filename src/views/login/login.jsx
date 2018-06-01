import React from "react";
import './style.css';
import './style.scss'
import axios from 'axios'
import $ from 'jquery'
import swal from 'sweetalert'
 //import Dashboard from '../../layouts/Dashboard/Dashboard'
 var token="";
var id=localStorage.getItem("id")
console.log(id,"id in login")
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailId: '',
      password: '',
      code: '',
      ishidden: true,
      show:""

    }

  }
  componentWillMount(){
    let id=localStorage.getItem("id")
    if(id!=""&& id!=undefined){
      window.location.href="/dashboard"
    }
  }
  // componentDidUpdate(){
  //   localStorage.removeItem("show")
  // }
  // componentDidMount(){
  //   // localStorage.removeItem("show")
  //   localStorage.setItem("show",false)
  // }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state)
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { emailId, password } = this.state

    axios.post('http://localhost:8080/login', { emailId, password })
      .then((result) => {
        if (result.data.success) {
          // console.log(result.data, "mmm")
          localStorage.setItem("id", result.data.data._id)
          localStorage.setItem("name", result.data.data.name)
          localStorage.setItem("token", result.data.data.password)
          token= result.data.data.password;
          window.location.href="/dashboard?token="+token;
        }
        else {
          swal({
            text: "email password not match",
            icon: "warning",
          })
        }
      });
     
  }
  handlelink = (e) => {
    e.preventDefault();
    $('#login').hide()
    $('#forget').show()

  }
  handlelink_login = (e) => {
    e.preventDefault();
    $('#forget').hide()
    $('#login').show()

  }
  changeState = () => {
    this.setState({ ishidden: false })
  }
  handleforget = (e) => {
    e.preventDefault();
    const { emailId } = this.state

    axios.post('http://localhost:8080/forgetPassword', { emailId })
      .then((result) => {
        if (result.data.success) {
          swal({
            text: "please check your email for reset password ! go reset password",
            icon: "success",
          })

        }

      });
  }
  handleSubmit_reset = (e) => {
    e.preventDefault();
    console.log(e, "oooo")
    const { emailId, password, code } = this.state
    console.log(this.state, "oooo")

    axios.post('http://localhost:8080/forgetPasswordReset', { emailId, password, code })
      .then((result) => {
        if (result.data.success) {
          swal({
            text: "change successfully",
            icon: "success",
          })
            .then((willdone) => {
              window.location.href = "/"
            }
            )
        }

      });

  }
  handlelink_reset = (e) => {
    e.preventDefault();
    $('#forget').hide()
    $('#relogin').show()
  }



  render() {
    const { emailId, password, code } = this.state
  
    return (
      <div>
        <form id="login" onSubmit={this.handleSubmit} class="login" style={{ marginLeft: '500px', marginTop: "200px" }}>
          <p class="title">Log in</p>
          <input type="text" placeholder="UserID" value={emailId} name="emailId" onChange={this.onChange} autofocus />
          <i class="fa fa-user"></i>
          <input type="password" name="password" value={password} placeholder="Password" onChange={this.onChange} />
          <i class="fa fa-key"></i>
          <a onClick={this.handlelink}>Forgot your password?</a>
          <button >
            <i class="spinner"></i>
            <span class="state">Log in</span>
          </button>
        </form>

        <form onSubmit={this.handleforget} id="forget" class="login" style={{ marginLeft: '500px', display: "none", marginTop: "200px" }}>
          <p class="title">Forget Password</p>
          <input type="text" placeholder="emailID" value={emailId} name="emailId" onChange={this.onChange} autofocus />
          <button >
            <i class="spinner"></i>
            <span class="state">Submit</span>

          </button>
          <a onClick={this.handlelink_login}>Log In?</a>
          <br></br>
          <a onClick={this.handlelink_reset}>Reset Password?</a>
        </form>

        <form id="relogin" onSubmit={this.handleSubmit_reset} class="login" style={{ marginLeft: '500px', display: "none", marginTop: "200px" }}>
          <p class="title">Log in</p>
          <input type="text" placeholder="UserID" value={emailId} name="emailId" onChange={this.onChange} autofocus />
          <i class="fa fa-user"></i>
          <input type="password" name="password" value={password} placeholder="newPassword" onChange={this.onChange} />

          <i class="fa fa-user"></i>
          <input type="text" name="code" value={code} placeholder="Enter code" onChange={this.onChange} />

          <button >
            <i class="spinner"></i>
            <span class="state">change Password</span>
          </button>
        </form>
       


      </div>








    )
window.location.reload()


  }
}
export default Login



import { useRef } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"

export const Register = ({setToken}) => {
  //state variables representing the properties of the User Class
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const bio = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    //confirms password and verifyPassword are the same value and data type
    if (password.current.value === verifyPassword.current.value) {
      //initializes newUser to meet the requirements of the User class for POST request
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value
      }
//POSTs the user to the Register table
      registerUser(newUser)
        .then(res => {
          //Tests both a javascript string "valid" and the property "valid" on the response. Does the register table add self.valid: "valid" property? Does it also add self.token to return the required keys/values for setToken?
          if ("valid" in res && res.valid) {
            //sets registered user into local storage and sets Token state to the embedded token object returned from the api
            setToken(res.token)
            navigate("/")
          }
        })
    } else {
      //renders a modal, I assume?
      passwordDialog.current.showModal()
    }
  }

  return (
    <section className="columns is-centered">
      {/* Form that invokes handleRegister() when submitted */}
      <form className="column is-two-thirds" onSubmit={handleRegister}>
      <h1 className="title">Rare Publishing</h1>
        <p className="subtitle">Create an account</p>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input className="input" type="text" ref={firstName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Password" ref={password} />
              </p>
            </div>

            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
              </p>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Bio</label>
          <div className="control">
            <textarea className="textarea" placeholder="Tell us about yourself..." ref={bio}></textarea>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Submit</button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-link is-light">Cancel</Link>
          </div>
        </div>

      </form>
    </section>
  )
}

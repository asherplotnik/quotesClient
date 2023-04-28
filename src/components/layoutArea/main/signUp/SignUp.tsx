import classes from "./SignUp.module.css";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserPayload from "../../../../models/UserPayload";
import globals from "../../../../Services/Globals";
import store from "../../../../Redux/Store";
import signInWithGoogleService from "../../../../Services/signInWithGoogleService";
import { setSessionAction } from "../../../../Redux/SessionState";
import { errorAlert } from "../../../../Services/commonFunctionService";
import { CredentialResponse } from "../../../../models/CredentialResponse";
function SignUp(): JSX.Element {
  const navigate = useNavigate();
  let formRef = useRef(null);
  let googleButtonRef = useRef(null);
  useEffect(() => {
    google.accounts.id.renderButton(
        googleButtonRef.current,
      {
        theme: "outline",
        size: "large",
        type: "standard",
      }
    );
  }, []);

  const handleCallbackResponse = useCallback((response: CredentialResponse) => {
    signInWithGoogleService(response);
    navigate("/today");
  },[navigate]);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: globals.CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      type: "standard",
    });
  }, [handleCallbackResponse]);

  const sendSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const password = formData.get("password") as string;
    const email = formData.get("email");
    const name = formData.get("name");
    axios
      .post<UserPayload>(globals.urls.localUrl + `signup`,{name:name,email:email,password:password})
      .then((response) => {
        console.log(JSON.stringify(response.data));
        store.dispatch(
          setSessionAction({
            id: response.data.id,
            email: response.data.email as string,
            name: response.data.name as string,
            token: response.data.token as string,
            savedQuotes: response.data.savedQuotes as string[]
          })
        );
        navigate("/today");
      })
      .catch((error) => {
        errorAlert(error);
      });
  };

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <div className={classes.SignUp}>
      <p>SignUp</p>
      <form
        className={classes.SignUpFormContainer}
        ref={formRef}
        onSubmit={sendSignUp}
      >
        <div className={classes.FormField}>
          <label>NAME</label>
          <input type="text" name="name"></input>
        </div>
        <div className={classes.FormField}>
          <label>EMAIL</label>
          <input type="email" name="email"></input>
        </div>
        <div className={classes.FormField}>
          <label>PASSWORD</label>
          <input type="password" name="password"></input>
        </div>
        <button className={classes.FormBtn} type="submit">
          submit
        </button>
      </form>
      <p>or:</p>
        <div ref={googleButtonRef}>Sign in with Google</div>
        <button className={classes.BtnLogin} onClick={handleLogin}>Back to Login</button>
    </div>
  );
}

export default SignUp;

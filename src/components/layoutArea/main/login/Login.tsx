import classes from "./Login.module.css";
import { useCallback, useEffect, useRef } from "react";
import axios from "axios";
import UserPayload from "../../../../models/UserPayload";
import globals from "../../../../Services/Globals";
import store from "../../../../Redux/Store";
import { setSessionAction } from "../../../../Redux/SessionState";
import { errorAlert } from "../../../../Services/commonFunctionService";
import signInWithGoogleService from "../../../../Services/signInWithGoogleService";
import { CredentialResponse } from "../../../../models/CredentialResponse";
import { useNavigate } from "react-router-dom";
function Login(): JSX.Element {
  const navigate = useNavigate();
  
  const handleCallbackResponse = useCallback((response: CredentialResponse) => {
    signInWithGoogleService(response);
    navigate("/today");
  },[navigate]);

  let formRef = useRef(null);
  let googleButtonRef = useRef(null);
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

  const fetchLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const password = formData.get("password") as string;
    const email = formData.get("email");
    axios
      .get<UserPayload>(globals.urls.localUrl + `login/${email}`, {
        headers: { password: password },
      })
      .then((response) => {
        console.log(JSON.stringify(response.data));
        store.dispatch(
          setSessionAction({
            id: response.data.id,
            email: response.data.email as string,
            name: response.data.name as string,
            token: response.data.token as string,
            savedQuotes: response.data.savedQuotes as string[],
          })
        );
        navigate("/today");
      })
      .catch((error) => {
        errorAlert(error);
      });
  };

  const handleSignUp = () => {
    navigate("/signup");
  }
  return (
    <div className={classes.Login}>
      <button className={classes.BtnSignUp} onClick={handleSignUp}>Sign Up</button>
      <p>or Login</p>
      <form
        className={classes.LoginFormContainer}
        ref={formRef}
        onSubmit={fetchLogin}
      >
        <div className={classes.FormField}>
          <label>EMAIL</label>
          <input type="email" name="email"></input>
        </div>
        <div className={classes.FormField}>
          <label>PASSWORD</label>
          <input type="password" name="password"></input>
        </div>

        <button className={classes.FormBtn} type="submit">
          Submit
        </button>
      </form>
      <p>or:</p>
      <div ref={googleButtonRef}>Sign in with Google</div>
    </div>
  );
}

export default Login;

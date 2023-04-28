import classes from "./Header.module.css";
import store from "../../../Redux/Store";
import { removeSessionAction } from "../../../Redux/SessionState"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../../assets/images/logo.jpg"
function Header(): JSX.Element {
  const [name, setName] = useState(store.getState().SessionState.session.name);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribeMe = store.subscribe(() => {
      setName(store.getState().SessionState.session.name);
    });
    return () => {
      unsubscribeMe();
    };
  }, []);

  const navigateTo = (selection: number) => {
    switch (selection) {
      case 0:
        navigate("/today");
        break;
      case 1:
        navigate("/favorite-quotes");
        break;
      case 2:
        navigate("/login");
        break;
      default:
    }
  };

  const handleLogout = () => {
    store.dispatch(removeSessionAction());
    navigate("/today");
  }

  return (
    
    <div className={classes.Header}>  
      <div className={classes.HeaderLogo} onClick={() => navigateTo(0)}>
        <img src={logo} alt="logo"/><p>One pearl a day</p>
      </div>
      <div className={classes.HeaderItem} onClick={() => navigateTo(0)}>
        Today's quote
      </div>
      {name && (
        <div className={classes.HeaderItem} onClick={() => navigateTo(1)}>
          My favorite quotes
        </div>
      )}
      {!name && (
        <div className={classes.HeaderItem} onClick={() => navigateTo(2)}>
          login for more features...
        </div>
      )}
      {name && (
        <div className={classes.HeaderItem} onClick={() => handleLogout()}>
          logout
        </div>
      )}
    </div>
  );
}

export default Header;
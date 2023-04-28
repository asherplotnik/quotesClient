import classes from "./Header.module.css";
import store from "../../../Redux/Store";
import { removeSessionAction } from "../../../Redux/SessionState"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Header(): JSX.Element {
  const [name, setName] = useState(store.getState().SessionState.session.name);
  const navigate = useNavigate();
  useEffect(() => {
   // validateTokenExpiration();
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

//   const validateTokenExpiration = () => {
//     const token = store.getState().SessionState.session.token;
//   }

  const handleLogout = () => {
    store.dispatch(removeSessionAction());
    navigate("/today");
  }

  return (
    <div className={classes.Header}>
      <div className={classes.HeaderItem} onClick={() => navigateTo(0)}>
        Today's Quote
      </div>
      {name && (
        <div className={classes.HeaderItem} onClick={() => navigateTo(1)}>
          My Favorite Quotes
        </div>
      )}
      {!name && (
        <div className={classes.HeaderItem} onClick={() => navigateTo(2)}>
          Login for more features...
        </div>
      )}
      {name && (
        <div className={classes.HeaderItem} onClick={() => handleLogout()}>
          Logout
        </div>
      )}
    </div>
  );
}

export default Header;
import classes from "./TodaysQuote.module.css";
import globals from "../../../../Services/Globals";
import { errorAlert, isStoreSessionNotExpired } from "../../../../Services/commonFunctionService";
import { useState, useEffect, useCallback } from "react";
import Spinner from "../../../ui/Spinner";
import Quote from "../../../../models/Quote";
import heartSavedImage from "../../../../assets/images/heartSaved.png";
import heartToSaveImage from "../../../../assets/images/heartToSave.png";
import store from "../../../../Redux/Store";
import { setSessionAction } from "../../../../Redux/SessionState";
import RatingComponent from "../../../ui/ratingComponent/RatingComponent";
import jwtAxios from "../../../../Services/jwtAxios";
function TodaysQuote(): JSX.Element {
  let emptyQuote = new Quote();
  emptyQuote.text = "Todays quote...";
  emptyQuote.author = "";
  const [quote, setQuote] = useState(emptyQuote);
  const [quoteSaved, setQuoteSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const fetchQuote = useCallback(() => {
    jwtAxios
      .get<Quote>(globals.urls.localUrl + `todaysquote`)
      .then((response) => {
        if (isStoreSessionNotExpired()){
            getRating(response.data.id);
        }
        setQuote(response.data);
        if (
          store
            .getState()
            .SessionState.session.savedQuotes?.find(
              (quoteInList) => quoteInList === response.data.id
            )
        ) {
          setQuoteSaved(true);
        } else {
          setQuoteSaved(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        errorAlert(error);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    const unsubscribeMe = store.subscribe(() => {
      fetchQuote();
    });
    return () => {
      unsubscribeMe();
    };
  }, [fetchQuote]);

  useEffect(() => fetchQuote(), [fetchQuote]);

  const getRating = (quoteId: string) => {
    console.log("HERE");
    jwtAxios
      .get<number>(globals.urls.localUrl + `getuserrating/${quoteId}`)
      .then((response) => {
        setRating(response.data);
      })
      .catch((error) => {
        errorAlert(error);
        console.log(error);
      });
  };

  const saveQuote = (quoteId: string) => {
    jwtAxios
      .post(globals.urls.localUrl + `savequote/${quoteId}`, null)
      .then((response) => {
        console.log("save success!!!");
        store.dispatch(
          setSessionAction({
            id: response.data.id,
            email: response.data.email as string,
            name: response.data.name as string,
            token: response.data.token as string,
            savedQuotes: response.data.savedQuotes as string[],
          })
        );
        if (
          store
            .getState()
            .SessionState.session.savedQuotes?.find(
              (quoteInList) => quoteInList === quote.id
            )
        ) {
          setQuoteSaved(true);
        } else {
          setQuoteSaved(false);
        }
      })
      .catch((error) => {
        errorAlert(error);
        console.log("save Error!!!");
      });
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className={classes.TodaysQuote}>
        <div className={classes.QuoteText}>{quote.text}</div>
        <div className={classes.QuoteAuthor}>
          <div
            className={classes.HeartImage}
            onClick={() => saveQuote(quote.id)}
          >
            {quoteSaved && (
              <img src={heartSavedImage} alt="saved" title="Click to cancel." />
            )}
            {store.getState().SessionState.session.email && !quoteSaved && (
              <img
                src={heartToSaveImage}
                alt="not saved"
                title="Click to save."
              />
            )}
          </div>
          <div className={classes.QuoteAuthorText}>— {quote.author}</div>
        </div>
        <div className={classes.Rating}>
          {store.getState().SessionState.session.email && 
            <RatingComponent rating={rating} quoteId={quote.id} />
          }
        </div>
      </div>
    );
  }
}

export default TodaysQuote;

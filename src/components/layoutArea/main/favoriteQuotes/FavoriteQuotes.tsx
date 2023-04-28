import { useEffect, useState } from "react";
import classes from "./FavoriteQuotes.module.css";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import { errorAlert } from "../../../../Services/commonFunctionService";
import Quote from "../../../../models/Quote";
import AverageRatingComponent from "../../../ui/averageRatingComponent/AverageRatingComponent";
import jwtAxios from "../../../../Services/jwtAxios";

function FavoriteQuotes(): JSX.Element {
  const [fetchedQuotes, setFetchedQuotes] = useState<Quote[]>([]);
  useEffect(() => {
    jwtAxios
      .post<Quote[]>(
        globals.urls.localUrl + `getsavedquotes`,
        store.getState().SessionState.session.savedQuotes)
      .then((response) => {
        setFetchedQuotes(response.data);
      })
      .catch((error) => {
        errorAlert(error);
      });
  }, []);

  const displayedQuotes = fetchedQuotes.map((quote) => {
    return (
      <div className={classes.FavoriteQuotes} key={quote.id}>
        <div className={classes.QuoteContainer}>
          <div className={classes.QuoteText}>{quote.text}</div>
          <div className={classes.LowerContainer}>
            <div className={classes.QuoteRate}>total rating: <AverageRatingComponent averageRating={quote.averageRating}/></div>
            <div className={classes.QuoteAuthor}>— {quote.author}</div>
          </div>
        </div>
      </div>
    );
  });

  return <div className={classes.FavoritesPage}> {displayedQuotes}</div>;
}

export default FavoriteQuotes;

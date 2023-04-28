import classes from "./RatingComponent.module.css";
import fullStar from "../../../assets/images/star.png";
import emptyStar from "../../../assets/images/starEmpty.png";
import { useEffect, useState } from "react";
import globals from "../../../Services/Globals";
import { errorAlert } from "../../../Services/commonFunctionService";
import jwtAxios from "../../../Services/jwtAxios";
interface RatingProps {
  rating: number;
  quoteId: string
}

const RatingComponent = (props: RatingProps): JSX.Element => {
  const populateStarArr = (rate: number): string[] => {
    const star: string[] = [
      rate > 0 ? fullStar : emptyStar,
      rate > 1 ? fullStar : emptyStar,
      rate > 2 ? fullStar : emptyStar,
      rate > 3 ? fullStar : emptyStar,
      rate > 4 ? fullStar : emptyStar,
    ];
    return star;
  };
  const [ratingState, setRating] = useState(props.rating);
  const [star, setStar] = useState<string[]>(populateStarArr(props.rating));
  useEffect(() => {
    setStar(populateStarArr(props.rating));
  }, [props.rating]);

  const updateRate = (rate: number) => {
    if (ratingState === rate) {
      handleUpdateRating(0);
    } else {
      handleUpdateRating(rate);
    }
  };

  const handleUpdateRating = (rate:number) => {
    jwtAxios
    .post(globals.urls.localUrl + `setrating/${props.quoteId}/${rate}`, null)
    .then(()=>{
       setRating(rate);
       setStar(populateStarArr(rate));
    })
    .catch((error) => {
        errorAlert(error);
        console.log("save Error!!!");
      });
  }

  return (
    <div className={classes.RatingComponent} title="Rate me.">
      <img src={star[0]} onClick={() => updateRate(1)} alt="star" />
      <img src={star[1]} onClick={() => updateRate(2)} alt="star" />
      <img src={star[2]} onClick={() => updateRate(3)} alt="star" />
      <img src={star[3]} onClick={() => updateRate(4)} alt="star" />
      <img src={star[4]} onClick={() => updateRate(5)} alt="star" />
    </div>
  );
};
export default RatingComponent;

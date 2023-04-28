import classes from "./AverageRatingComponent.module.css";
import fullStar from "../../../assets/images/star.png";
import emptyStar from "../../../assets/images/starEmpty.png";
import star25 from "../../../assets/images/star25.png";
import star50 from "../../../assets/images/star50.png";
import star75 from "../../../assets/images/star75.png";
import { useEffect, useState } from "react";
interface RatingProps {
  averageRating: number;
}

const AverageRatingComponent = (props: RatingProps): JSX.Element => {
  
  const calcFractionStar = (fraction: number): string => {
    let star:string = emptyStar;
    if (fraction >= 0.25 && fraction < 0.5) {
        star = star25;
    }
    if (fraction >= 0.5 && fraction < 0.75) {
        star = star50;
    } 
    if (fraction >= 0.75 && fraction < 1) {
        star = star75;
    }    
    return star;
  }
  const populateStarArr = (averageRating: number): string[] => {
    let star: string[] = [
      averageRating > 0 ? fullStar : emptyStar,
      averageRating > 1 ? fullStar : emptyStar,
      averageRating > 2 ? fullStar : emptyStar,
      averageRating > 3 ? fullStar : emptyStar,
      averageRating > 4 ? fullStar : emptyStar,
    ];

    if (averageRating > 0) {
      const endPosition = Math.floor(averageRating);
      const fraction = averageRating - endPosition;
      star[endPosition] = calcFractionStar(fraction);
    }
    return star;
  };
  const [star, setStar] = useState<string[]>(populateStarArr(props.averageRating));
  useEffect(() => {
    setStar(populateStarArr(props.averageRating));
  }, [props.averageRating]);


  return (
    <div className={classes.RatingComponent} title={props.averageRating?.toFixed(2)}>
      <img src={star[0]} alt="star" />
      <img src={star[1]} alt="star" />
      <img src={star[2]} alt="star" />
      <img src={star[3]} alt="star" />
      <img src={star[4]} alt="star" />
    </div>
  );
};
export default AverageRatingComponent;


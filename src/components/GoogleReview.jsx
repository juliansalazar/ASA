import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import { FaMixer } from "react-icons/fa6";

const GoogleReview = () => {
    const featurableWidgetId = "dfb8eb8f-a20b-4b27-9ccb-10e2faaad241";
    return (
    <>
      <ReactGoogleReviews layout="badge" featurableId={featurableWidgetId} />
    </>
  )
}

export default GoogleReview
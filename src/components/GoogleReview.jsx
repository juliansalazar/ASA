import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

const GoogleReview = () => {
    const featurableWidgetId = "dfb8eb8f-a20b-4b27-9ccb-10e2faaad241";

    // URL a la que se redirige cuando el usuario hace clic
    const reviewLink = "https://g.page/r/CQwLo74tBjnzEAE/review";

    const handleClick = () => {
        // Redirige al usuario al enlace de la reseña
        window.open(reviewLink, "_blank");
    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            <ReactGoogleReviews layout="badge" featurableId={featurableWidgetId} />
        </div>
    );
};

export default GoogleReview;

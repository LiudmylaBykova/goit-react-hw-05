import css from "./ShowMoreBtn.module.css";

const ShowMoreBtn = ({ onShowMore }) => {
  return (
    <button
      className={css.showMoreBtn}
      onClick={() => onShowMore()}
      type="button"
    >
      Show More...
    </button>
  );
};

export default ShowMoreBtn;

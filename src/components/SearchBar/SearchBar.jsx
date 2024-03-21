import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { BiSearchAlt } from "react-icons/bi";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const initialValues = {
    query: "",
  };
  const handleSubmit = (values, actions) => {
    if (!values.query.trim()) {
      toast("Please enter your search!", {
        position: "top-right",
      });
      return;
    }
    onSearch(values.query);
    actions.resetForm();
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.formInput}
            type="text"
            name="query"
            autoFocus
            placeholder="Search movies..."
          />
          <button className={css.formBtn} type="submit">
            <BiSearchAlt className={css.formSvg} />
          </button>
        </Form>
      </Formik>
      <Toaster />
    </>
  );
};

export default SearchBar;

import { Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import css from "./SearchForm.module.css";

const SearchForm = ({ onSearch }) => {
  const initialValues = { text: "" };

  function handleSubmit(values, actions) {
    if (!values.text) {
      toast.error("Sorry something went wrong");
    } else {
      onSearch(values.text);
    }
    actions.resetForm();
  }
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <div className={css.container}>
            <Field
              className={css.text}
              type="text"
              name="text"
              autoComplete="off"
              autoFocus
              placeholder="Search movies"
            />
            <button className={css.btn} type="submit">
              <AiOutlineSearch />
              Search
            </button>
          </div>

          <Toaster />
        </Form>
      </Formik>
    </>
  );
};
export default SearchForm;

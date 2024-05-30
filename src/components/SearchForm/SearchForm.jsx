import { Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
// import css from "./SearchForm.module.css";

const SearchForm = ({ onSearch, query }) => {
  const initialValues = { text: query };

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
        <Form>
          <Field
            type="text"
            name="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
          <button type="submit">
            <AiOutlineSearch />
            Search
          </button>
          <Toaster />
        </Form>
      </Formik>
    </>
  );
};
export default SearchForm;

import { Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useId } from "react";
import { AiOutlineExclamation } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import * as Yup from "yup";
import css from "./SearchForm.module.css";

const SearchForm = ({ onSearch }) => {
  const initialValues = { text: "" };
  const searchId = useId();

  const contactsSchema = Yup.object().shape({
    text: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .required("Required!"),
  });

  const notify = () =>
    toast(
      <p className={css.error_Toast}>
        <AiOutlineExclamation className={css.error_Icon} />
        Please enter a search query!
      </p>
    );

  function handleSubmit(values, actions) {
    if (!values.text) {
      notify();
      return;
    } else {
      onSearch(values.text);
      console.log(values.text);
    }
    actions.resetForm();
  }
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "red",
            color: "#fff",
          },

          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={contactsSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor={searchId}></label>
            <Field
              type="text"
              name="text"
              autoComplete="off"
              id={searchId}
              autoFocus
              placeholder="Search movies"
            />
          </div>
          <button type="submit">
            <AiOutlineSearch />
            Search
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default SearchForm;

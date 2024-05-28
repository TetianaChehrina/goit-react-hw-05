import { Oval } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <Oval color="#4fa94d" height={70} width={70} />
    </div>
  );
};

export default Loader;

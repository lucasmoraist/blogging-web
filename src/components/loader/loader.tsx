import style from './loader.module.scss';  // Import the CSS file for styling

const Loader = (): JSX.Element => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;
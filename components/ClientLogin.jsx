import styles from "../styles/ClientLogin.module.css";
import { useEffect, useRef, useState, useContext } from "react";
import { signIn } from "../client/requests";
import Loading from "../components/Loading";
import { CustomerAuthContext } from "../store/store";

const ClientLogin = ({
  handleLoginClose,
  handleSignUpOpen,
  handleForgetOpen,
}) => {
  const passwordRef = useRef();
  const emailWrapperRef = useRef();
  const submitBtnRef = useRef();
  const passwordWrapperRef = useRef();
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { setCustomerAuth } = useContext(CustomerAuthContext);

  // disable form submit if form inputs ae empty
  useEffect(() => {
    if (email === "" || password === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (disable) {
      submitBtnRef.current.style.cursor = "not-allowed";
    } else {
      submitBtnRef.current.style.cursor = "pointer";
    }
  }, [disable]);

  useEffect(() => {
    if (focusEmail) {
      emailWrapperRef.current.style.border = "1px solid rgb(191, 24, 191)";
    } else {
      emailWrapperRef.current.style.border = "1px solid gray";
    }

    if (focusPassword) {
      passwordWrapperRef.current.style.border = "1px solid rgb(191, 24, 191)";
    } else {
      passwordWrapperRef.current.style.border = "1px solid gray";
    }
  }, [focusEmail, focusPassword]);

  const handleForget = () => {
    handleForgetOpen();
  };

  const handleSignUp = () => {
    handleSignUpOpen();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    setLoading(true);
    const user = { email, password };
    const res = await signIn(user);

    if (res.status === 200) {
      setLoading(false);
      setSuccess(true);
      setEmail("");
      setPassword("");
      setCustomerAuth(res.data);
      handleLoginClose();
    }

    if (res.status === 500 || res.status === 401) {
      setLoading(false);
      setError(true);
    }
  };

  const showPassword = () => {
    setShowPass(true);
    passwordRef.current.type = "text";
  };

  const hidePassword = () => {
    setShowPass(false);
    passwordRef.current.type = "password";
  };

  return (
    <div className={styles.client__login}>
      {loading && <Loading />}
      {error && <p className="error">Invalid Credentials!</p>}
      {success && <p className="success">Welcome!</p>}
      <div className={styles.client__login__head__wrapper}>
        <h4 className={styles.client__login__head}>Login Page</h4>
        <svg
          onClick={() => handleLoginClose()}
          className={styles.client__login__close}
        >
          <use xlinkHref="/svg/close-sharp.svg#close-sharp"></use>
        </svg>
      </div>
      <form onSubmit={handleSignIn} className={styles.client__login__form}>
        <div ref={emailWrapperRef} className={styles.client__input__wrapper}>
          <input
            className={styles.client__input__email}
            type="email"
            placeholder="your email"
            onFocus={() => setFocusEmail(true)}
            onBlur={() => setFocusEmail(false)}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div ref={passwordWrapperRef} className={styles.client__input__wrapper}>
          <input
            ref={passwordRef}
            className={styles.client__input}
            type="password"
            placeholder="your password"
            onFocus={() => setFocusPassword(true)}
            onBlur={() => setFocusPassword(false)}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {showPass ? (
            <svg onClick={hidePassword} className={styles.client__login__icon}>
              <use xlinkHref="/svg/invisibility-icon.svg#invisibility-icon"></use>
            </svg>
          ) : (
            <svg onClick={showPassword} className={styles.client__login__icon}>
              <use xlinkHref="/svg/visibility-icon.svg#visibility-icon"></use>
            </svg>
          )}
        </div>

        <button
          disabled={disable}
          ref={submitBtnRef}
          onClick={handleSignIn}
          className={styles.client__submit}
        >
          Sign In
        </button>
      </form>

      <p className={styles.client__forgot}>
        or{" "}
        <span onClick={handleForget} className={styles.client__forgot__bold}>
          Forgot Password?
        </span>
      </p>

      <p className={styles.client__signup}>
        Don&#39;t have an account?{" "}
        <span onClick={handleSignUp} className={styles.client__signup__bold}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default ClientLogin;

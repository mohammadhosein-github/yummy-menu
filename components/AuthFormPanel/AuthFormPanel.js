import Link from "next/link";

export default function AuthFormPanel({
  children,
  type,
  redirectLink,
  formData,
  guestUser = () => console.log("no handler for guest user."),
  submitHandler = () => console.log("no handler for submit."),
}) {
  return (
    <div className="auth-form-panel p-relative d-flex flex-column h-100">
      <div className="top-section flex-fill">
        <div className="logo-container text-center">
          <img src="/logo/logo-light.svg" alt="yummy menu" className="logo" />
        </div>
        <div className="form-container">{children}</div>
        <div className="guest-user-container text-center">
          <span className="text-cap">enter as</span>
          <button
            className="guest-user-btn text-cap"
            onClick={() => guestUser()}
          >
            guest user
          </button>
        </div>
      </div>
      <div className="bottom-section">
        <button
          className="submit-btn w-100 text-uppercase"
          onClick={() => submitHandler(formData)}
        >
          {type}
        </button>
        {redirectLink && (
          <div className="redirect-link-container text-center">
            <span className="text-cap">{redirectLink.description}</span>
            <Link href={redirectLink.to}>
              <a className="redirect-link-link text-cap">
                {redirectLink.buttonTitle}
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

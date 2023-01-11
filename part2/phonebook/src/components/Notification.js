const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notification">{message}</div>;
};

const ErrorMessage = ({ error }) => {
  if (error === null) {
    return null;
  }

  return <div className="errorMessage">{error}</div>;
};


export { Notification, ErrorMessage };

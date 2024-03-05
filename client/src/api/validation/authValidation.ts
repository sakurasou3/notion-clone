type errorType = {
  key: "username" | "password" | "confirm";
  errorString: string;
};

export const registerValidation = (
  username: string,
  password: string,
  confirmPassword: string
) => {
  const errors: Array<errorType> = [];
  if (username === "") {
    errors.push({ key: "username", errorString: "名前を入力してください" });
  }
  if (password === "") {
    errors.push({
      key: "password",
      errorString: "パスワードを入力してください",
    });
  }
  if (confirmPassword === "") {
    errors.push({
      key: "confirm",
      errorString: "確認用パスワードを入力してください",
    });
  }
  if (password !== confirmPassword) {
    errors.push({
      key: "confirm",
      errorString: "パスワードと確認用パスワードが異なります。",
    });
  }
  return errors;
};

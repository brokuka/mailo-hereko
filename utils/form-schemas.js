import * as yup from "yup";
import { urlRegex, loginInputHelper, suggestInputHelper } from "./constants";
// import { modalInputHelper, checkoutInputHelper } from "./constants";

/* export const modalFormSchema = yup.object().shape({
  name: yup.string().required(modalInputHelper.REQUIRED),
  email: yup
    .string()
    .email(modalInputHelper.EMAIL)
    .required(modalInputHelper.REQUIRED),
  tel: yup
    .number()
    .typeError(modalInputHelper.NUMBER)
    .positive(modalInputHelper.NUMBER)
    .integer(modalInputHelper.NUMBER)
    .required(modalInputHelper.REQUIRED),
}); */

export const loginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const suggestFormSchema = yup.object().shape({
  title: yup.string().required(suggestInputHelper.TITLE),
  link: yup.string().matches(urlRegex, suggestInputHelper.LINK),
});

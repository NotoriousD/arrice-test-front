import * as yup from "yup"

export const schema = yup.object().shape({
    username: yup.string().required(),
    message: yup.string().min(1).max(255).required(),
})
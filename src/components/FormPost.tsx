import React, { useCallback, useState } from "react";
import styled from "styled-components";
import FormButtons from "./FormButtons";
import FormImage from "./FormImage";
import FormInputs from "./FormInputs";
import { Formik, Form, FormikHelpers, validateYupSchema } from "formik";
import * as yup from "yup";
import { PostType } from "../types/PostType";

const Wrapper = styled(Form)`
  width: 516px;
  min-height: 353px;
  margin: 133px 0 56px;
  padding: 24px;
  border-radius: 3px;
  border: solid 1px #3b3b3b;
  background-color: #313131;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
`;

const INITIAL_IMG = "/image-upload.svg";

const INITIAL: PostType = { name: "", message: "", imageURL: INITIAL_IMG };

const schema = yup.object({
  name: yup.string(),
  message: yup.string(),
  imageUrl: yup.string(),
});

const FormPost = () => {
  const [resetImage, setResetImage] = useState<boolean>(false);

  const onSubmit = useCallback(
    (values: PostType, actions: FormikHelpers<PostType>) => {
      const valuesArray = [values];
      const postsArray = localStorage.getItem("posts");
      const currentArray = postsArray
        ? [...JSON.parse(postsArray), ...valuesArray]
        : valuesArray;
      localStorage.setItem("posts", JSON.stringify(currentArray));

      actions.resetForm();
      setResetImage(true);
    },
    []
  );

  return (
    <Formik
      initialValues={INITIAL}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={schema}
    >
      <Wrapper>
        <FormImage resetImage={resetImage} setResetImage={setResetImage} />
        <FormInputs />
        <FormButtons />
      </Wrapper>
    </Formik>
  );
};

export default FormPost;

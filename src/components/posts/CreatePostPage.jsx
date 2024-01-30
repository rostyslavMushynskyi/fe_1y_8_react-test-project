import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().min(3).max(100).required(),
  category: yup.string().oneOf(["news", "nature", "it"]).optional(),
  excerpt: yup.string().min(3).max(180).required(),
  image: yup.string().url().optional(),
});

function CreatePostPage() {
  return <div>CreatePostPage</div>;
}

export default CreatePostPage;

import { useFormik } from "formik";
import * as yup from "yup";
import { Stack, Button } from "@chakra-ui/react";
import InputField from "../InputField";
import { createPostService } from "../../services/postsServices";
import PostBodyField from "./PostBodyField";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().min(3).max(100).required(),
  category: yup.string().oneOf(["news", "nature", "it"]).optional(),
  excerpt: yup.string().min(3).max(180).required(),
  image: yup.string().url().optional(),
  body: yup.string().min(3).required(),
});

function CreatePostForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      excerpt: "",
      image: "",
      body: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createPostService(values).then((post) => {
        navigate(`/posts/${post.id}`);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack>
        <InputField
          label="Title"
          placeholder="Title"
          required
          meta={formik.getFieldMeta("title")}
          {...formik.getFieldProps("title")}
        />
        <InputField
          label="Category"
          placeholder="Category"
          meta={formik.getFieldMeta("category")}
          {...formik.getFieldProps("category")}
        />
        <InputField
          label="Excerpt"
          placeholder="Excerpt"
          required
          meta={formik.getFieldMeta("excerpt")}
          {...formik.getFieldProps("excerpt")}
        />
        <InputField
          label="Image URL"
          placeholder="Image URL"
          type="url"
          meta={formik.getFieldMeta("image")}
          {...formik.getFieldProps("image")}
        />
        <PostBodyField
          label="Body"
          placeholder="Body"
          required
          meta={formik.getFieldMeta("body")}
          {...formik.getFieldProps("body")}
        />

        <Button type="submit" colorScheme="blue">
          Create Post
        </Button>
      </Stack>
    </form>
  );
}

export default CreatePostForm;

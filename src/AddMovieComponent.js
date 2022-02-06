import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddMovie() {
  const history = useHistory();

  const validation = Yup.object({
    name: Yup.string().required("Required").max(30, "Name is Too Long"),
    poster: Yup.string()
      .required("Required")
      .max(200, "Poster Link is Too Long"),
    rating: Yup.number().required("Required").min(0).max(10),
    summary: Yup.string()
      .required("Required")
      .max(200, "Decscription is Too Long")
      .min(50, "Decscription is Too Small"),
    trailer: Yup.string()
      .required("Required")
      .max(100, "Trailer Link is Too Long"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      poster: "",
      rating: "",
      summary: "",
      trailer: "",
    },
    onSubmit: (value) => {
      addMoviesThroughPost(value);
    },
    validationSchema: validation,
  });

  const addMoviesThroughPost = (movieData) => {
    fetch("https://6197ebee164fa60017c22ebd.mockapi.io/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("success : ", data);
      })
      .then(() => history.push("/movies"));
  };
  return (
    <div className="inputField">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="outlined-name"
          label="Movie Name"
          name="name"
          style={{ width: "100%", margin: "10px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="errorValidation">{formik.errors.name}</div>
        ) : null}
        <TextField
          id="outlined-name"
          label="Poster Link"
          style={{ width: "100%", margin: "10px" }}
          name="poster"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.poster}
        />
        {formik.touched.poster && formik.errors.poster ? (
          <div className="errorValidation">{formik.errors.poster}</div>
        ) : null}
        <TextField
          id="outlined-name"
          label="Rating"
          style={{ width: "100%", margin: "10px" }}
          name="rating"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rating}
        />
        {formik.touched.rating && formik.errors.rating ? (
          <div className="errorValidation">{formik.errors.rating}</div>
        ) : null}
        <TextField
          id="outlined-name"
          label="summary"
          style={{ width: "100%", margin: "10px" }}
          name="summary"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.summary}
        />
        {formik.touched.summary && formik.errors.summary ? (
          <div className="errorValidation">{formik.errors.summary}</div>
        ) : null}
        <TextField
          id="outlined-name"
          label="Trailer"
          style={{ width: "100%", margin: "10px" }}
          name="trailer"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.trailer}
        />
        {formik.touched.trailer && formik.errors.trailer ? (
          <div className="errorValidation">{formik.errors.trailer}</div>
        ) : null}
        <Button variant="outlined" type="submit" startIcon={<AddIcon />}>
          Add Movie
        </Button>
      </form>
    </div>
  );
}

export { AddMovie };

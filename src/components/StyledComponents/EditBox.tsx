import styled from "styled-components";

const EditBox = styled("div")(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "560px",
  borderRadius: "24px",
  padding: "32px",
  backgroundColor: theme.palette.background.default,
  zIndex: 20,
}));

export default EditBox;

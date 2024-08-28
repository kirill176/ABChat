import styled from "styled-components";

const BluredBox = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(4px)",
  zIndex: 1000,
}));

export default BluredBox;

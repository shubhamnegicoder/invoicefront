// ##############################
// // // RegularCard styles
// #############################

import {
  card,
  cardHeader,
  defaultFont,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader
} from "assets/jss/material-dashboard-react.jsx";

const regularCardStyle = {
  card,
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardHeader: {
    // ...cardHeader,
    // ...defaultFont,
    
  },
  cardPlainHeader: {
    marginLeft: 0,
    marginRight: 0
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardTitle: {
    color: "#76323f",
    marginTop: "0",
    marginBottom: "0",
    // ...defaultFont,
    fontSize: "2em"
  },
  cardSubtitle: {
    fontSize: "2em",
    marginBottom: "0",
    color: "#76323f",
    margin: "0 0 10px"
  },
  cardActions: {
    padding: "14px",
    display: "block",
    height: "auto"
  }
};

export default regularCardStyle;

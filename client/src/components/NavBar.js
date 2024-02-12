import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const NavBar = () => {
    return (
        <div>
        <nav style={{ display: "flex", justifyContent: "center", marginTop:"10px"}}>
  <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "40px" }}>
    <li>
      <Typography variant="body1">
        <Link
          to="/page"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </Link>
      </Typography>
    </li>
    <li>
      <Typography variant="body1">
        <Link
          to="/form"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          Expense Form
        </Link>
      </Typography>
    </li>
  </ul>
</nav>

        </div>
    )
}

export default NavBar;
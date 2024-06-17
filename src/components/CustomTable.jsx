import {
  Card,
  CardHeader,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomTable = ({
  title,
  data,
  actionHeader,
  dateStatus,
  handleChangesDateStatus,
}) => {

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ margin: "2rem" }} elevation={15}>
      <CardHeader
        sx={{
          display: "flex",
          borderBottom: `2px solid #ffbf3c`,
        }}
        title={title}
        titleTypographyProps={{
          variant: isSmallScreen? "h6" :"h2",
          align: "left",
          fontWeight: "bold",
        }}
        action={
          actionHeader ? (
            <DatePicker
              label="Select month and year"
              views={["month", "year"]}
              value={dateStatus}
              onChange={handleChangesDateStatus}
              sx={{
                "& .MuiInputBase-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "0 0 3px 0",
                    width: isSmallScreen ? "110px" : "180px",
                  },
                  width: isSmallScreen ? "110px" : "180px",
                  height: "40px",
                },
                "& .MuiInputBase-input": {
                  paddingTop: "10px",
                  paddingBottom: "2px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "rgba(0, 0, 0, 0.54)",
                },
              }}
            />
          ) : null
        }
      />
      {data?.length === 0 ? (
        <Typography variant="h2" textAlign="center">
          No results found
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell variant="h4">{customer.name}</TableCell>
                <TableCell variant="h4">{customer.address}</TableCell>
                <TableCell variant="h4">{customer.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};

CustomTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  handleChangesDateStatus: PropTypes.func,
  dateStatus: PropTypes.instanceOf(Date),
  actionHeader: PropTypes.bool,
};
export default CustomTable;

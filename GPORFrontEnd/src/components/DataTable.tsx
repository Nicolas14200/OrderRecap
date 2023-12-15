import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { VegetableInfo } from "../core/type/VegetableInfo";

export default function DataTable(props: { rows: VegetableInfo[] }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>vegetableName</TableCell>
            <TableCell >quatity</TableCell>
            <TableCell >unit</TableCell>
            <TableCell >place</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell >{row.vegetableName}</TableCell>
              <TableCell >{row.quatity}</TableCell>
              <TableCell >{row.unit}</TableCell>
              <TableCell >{row.place}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

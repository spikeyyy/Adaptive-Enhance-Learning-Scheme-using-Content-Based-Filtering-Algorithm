import { useState, useEffect } from "react";
import {
  DataGrid,
  GridCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import axios from "axios";
import { AUTH_API_URL } from "../../../api/loginAuth";
import "../../css/adminList.css";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function AdminList() {
  const [data, setData] = useState<any[]>([]);

  const handleDelete = (id: number) => {
    axios
      .delete(`${AUTH_API_URL}/delete_admin/${id}`) // Ensure this matches your backend endpoint
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting admin records: " + error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "surname", headerName: "Surname", width: 150 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "role", headerName: "Role", width: 130 },
    { field: "date_of_join", headerName: "Date of Join", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Link to={"/adminList/" + params.row.id}>
              <button className="adminListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="adminListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get(`${AUTH_API_URL}/all_admins`) // Ensure this matches your backend endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching admin data: " + error);
      });
  }, []);

  return (
    <div className="adminList">
      <DataGrid
        rows={data}
        columns={columns}
        autoPageSize={true}
        checkboxSelection
      />
    </div>
  );
}

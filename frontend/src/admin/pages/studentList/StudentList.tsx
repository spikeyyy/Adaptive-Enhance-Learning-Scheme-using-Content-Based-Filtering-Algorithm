import { useState, useEffect } from "react";
import {
  DataGrid,
  GridCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import axios from "axios";
import { AUTH_API_URL } from "../../../api/loginAuth";
import "../../css/studentList.css";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function StudentList() {
  const [data, setData] = useState<any[]>([]);

  const handleDelete = (id: number) => {
    axios
      .delete(AUTH_API_URL + "/delete_student/${id}")
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting students records: " + error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "date_of_join", headerName: "Date of Join", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.date_of_join ? "Active" : "Inactive";
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Link to={"/studentList/" + params.row.id}>
              <button className="studentListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="studentListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get(AUTH_API_URL + "/all_students")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data: " + error);
      });
  }, []);

  return (
    <div className="studentList">
      <DataGrid
        rows={data}
        columns={columns}
        autoPageSize={true}
        checkboxSelection
      />
    </div>
  );
}

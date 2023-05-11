import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Form, FormGroup, Input } from "reactstrap";
import "./style.css";
const Home = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState();
  const customStyles = {
    headCells: {
      style: {
        "&:nth-of-type(2n)": {
          backgroundColor: "#E3E4E6",
          borderRadius: "12px 12px 0 0",
          width: "40px",
          textAlign: "center",
        },
        "&:nth-of-type(6)": {
          minWidth: "130px",
        },
        "&:nth-of-type(8)": {
          minWidth: "162px",
        },
        "&:nth-of-type(9)": {
          minWidth: "145px",
        },
        "&:nth-of-type(10)": {
          minWidth: "155px",
        },
        "&:nth-of-type(11)": {
          minWidth: "150px",
        },
      },
    },
    cells: {
      style: {
        "&:nth-of-type(2n)": {
          backgroundColor: "#E3E4E6",
        },
        "&:nth-of-type(6)": {
          minWidth: "130px",
        },
        "&:nth-of-type(8)": {
          minWidth: "162px",
        },
        "&:nth-of-type(9)": {
          minWidth: "145px",
        },
        "&:nth-of-type(10)": {
          minWidth: "155px",
        },
        "&:nth-of-type(11)": {
          minWidth: "150px",
        },
      },
    },
  };

  const getData = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then((response) => response.json());
    setData(response);
    setFiltered(response);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      id: "id",
      name: "ID",
      selector: "id",
      sortable: true,
      omit: false,
    },
    {
      id: "userId",
      name: "ID de usuario",
      selector: "userId",
      sortable: true,
      omit: false,
    },
    {
      id: "title",
      name: "Titulo",
      selector: "title",
      sortable: true,
      omit: false,
    },
    {
      id: "body",
      name: "Body",
      selector: "body",
      sortable: true,
      omit: false,
    },
  ];

  const handleFilterTextChange = (filterText) => {
    setFilters(filterText);
    setFiltered(
      data.filter((record) => {
        const values = Object.values(record);
        return values.some((value) =>
          String(value).toLowerCase().includes(filterText.toLowerCase())
        );
      })
    );
  };

  return (
    <div className="container">
      <div className="Bar-content logBar">
        <p className="title-text"> Listado de información</p>
        <div className="content-menu">
          <Form>
            <FormGroup>
              <Input
                className="inputText"
                name="off"
                autoComplete="off"
                placeholder="Ingresa filtro de busqueda"
                onChange={(e) => handleFilterTextChange(e.target.value)}
                value={filters}
              />
            </FormGroup>
          </Form>
        </div>
      </div>
      <>
        <DataTable
          columns={columns}
          data={filtered}
          customStyles={customStyles}
          persistTableHead
          pagination
          noHeader
          paginationComponentOptions={{
            rowsPerPageText: "Elementos por página",
            rangeSeparatorText: "de",
          }}
          noDataComponent={"No hay datos para mostrar"}
        />
      </>
    </div>
  );
};

export default Home;

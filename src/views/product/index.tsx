import React from "react";
import TableProducts from "./component/table";
import { Button, ButtonGroup, Card } from "@mui/material";

const ProductsPage = () => {
  return (
    <Card>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => (window.location.href = "product/add")}>
          Add
        </Button>
      </ButtonGroup>
      <TableProducts />
    </Card>
  );
};

export default ProductsPage;

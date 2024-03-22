import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import EditOrderDialolg from "../components/Dialog/EditOrderDialog";
import axios from "axios";
import moment from "moment";
import { Order } from "../interface";
import ConfirmationDialog from "../components/Dialog/ConfirmationDialog";

const OrdersPage = () => {
  const [open, setOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [items, setItems] = useState<Array<Order>>([]);
  const [displayOrders, setDisplayOrders] = useState<Array<Order>>([]);
  const [order, setOrder] = useState<Order | {}>();
  const [page, setPage] = useState<number>(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('http://54.199.68.197:8081/api/v1/orders');
      setItems(response.data.data);
      setDisplayOrders(response.data.data.slice(0, itemsPerPage));
    }
    getData();
  }, [open, page])

  const handleAddItem = () => {
    setOrder({});
    setOpen(true);
  };

  const handleEditItem = (item: Order) => {
    setOrder(item);
    setOpen(true);
  };

  const handleChangePage = (event: number) => {
    const newPage = page + event;
    setPage(newPage);
    setDisplayOrders(items.slice(page * itemsPerPage, (page + 1) * itemsPerPage ));
  }

  const handleClickDelete = (item: Order) => {
    setOrder(item);
    setShowConfirmDialog(true);
  }

  const handleDeleteItem = async (id: number) => {
    setItems(items.filter((item: Order) => item.id !== id));
    await axios.delete(`http://54.199.68.197:8081/api/v1/orders/${id}`);
    setShowConfirmDialog(false);
  };

  return (
    <div style={{ margin: "20px" }}>
      {showConfirmDialog &&
        <ConfirmationDialog 
          open={showConfirmDialog}
          setOpen={setShowConfirmDialog}
          item={order}
          handleConfirm={handleDeleteItem}
        />
      }
      <Button variant="contained" onClick={handleAddItem}>
        Tạo đơn
      </Button>
      <Button variant="contained" style={{marginLeft: '20px'}}>
        Xuất excel
      </Button>
      {open && <EditOrderDialolg order={order} open={open} setOpen={setOpen} />}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Nhà cung cấp</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayOrders.map((item: Order, index: number) => (
              <TableRow key={index}>
                <TableCell>{page * itemsPerPage + 1 + index}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{moment(item.createdAt).format("YYYY-MM-DD")}</TableCell>
                <TableCell>{item.supplier.name}</TableCell>
                <TableCell>{item.status ? "Đã thanh toán" : "Chưa thanh toán"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditItem(item)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleClickDelete(item)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="right" marginTop="20px">
        <Button
          disabled={page === 0}
          onClick={() => handleChangePage(-1)}
        >
          Trang trước
        </Button>
        <Button
          disabled={items.length < itemsPerPage * (page + 1)}
          onClick={() => handleChangePage(1)}
          style={{ marginLeft: "10px" }}
        >
          Trang tiếp theo
        </Button>
      </Box>
    </div>
  );
};

export default OrdersPage;

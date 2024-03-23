import React, { useState, useEffect } from "react";
import {
  DialogTitle,
  Button,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Select,
  MenuItem,
  IconButton,
  Icon,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import axios from "axios";
import AddOrderProductDialog from "./AddOrderProductDialog";
import { Order, OrderProduct, Product, Supplier } from "../../interface";

const EditOrderDialolg = (props: any) => {
  const { open, setOpen, order } = props;

  const [note, setNote] = useState<string>("");
  const [tax, setTax] = useState(0.1);
  const [listSupplier, setListSupplier] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addPoductDialog, setAddProductDialog] = useState(false);
  const [orderProduct, setOrderProduct] = useState<OrderProduct | {}>();
  const [orderData, setOrderData] = useState<Order>({
    id: order?.id || "",
    createdAt: order?.createdAt || moment().format("YYYY-MM-DD"),
    products: order?.orderProducts || [],
    status: order?.status || false,
    supplier: {
      id: order?.supplier?.id || "",
      name: order?.supplier?.name || "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://54.199.68.197:8081/api/v1/suppliers"
      );
      setListSupplier(response.data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTotalPrice(calcTotalPrice());
  }, [orderData]);

  const handleClose = () => {
    setOpen(false);
  };

  const calcTotalPrice = () => {
    const result = orderData.products.reduce(
      (store: number, item: OrderProduct) => {
        return store + item.quantity * item.product.price;
      },
      0
    );
    return result;
  };

  const handleChangeNote = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 500) {
      setNote(inputValue);
    }
  };

  const handleUpdateItem = (data: OrderProduct, id: number) => {
    if (data?.product && data?.quantity && data?.tax) {
      setAddProductDialog(false);
      const newOrderProucts = orderData.products.map((item: OrderProduct) => {
        if (item.id === id || item.product.id === data.product.id) return data;
        return item;
      });
      setOrderData({
        ...orderData,
        products:
          id || newOrderProucts.length > 0
            ? newOrderProucts
            : [...orderData.products, data],
      });
    } else {
      alert("Vui long dien day du thong tin");
    }
  };

  const handleClickDelete = (item: OrderProduct) => {
    setOrderData({
      ...orderData,
      products: orderData.products.filter(
        (product: OrderProduct) => item.id !== product.id
      ),
    });
  };

  const handleClickEdit = (item: OrderProduct) => {
    setOrderProduct(item);
    setAddProductDialog(true);
  };

  const handleSubmit = async () => {
    const newData = orderData.products.map((product: OrderProduct) => {
      return {
        id: product.product.id,
        quantity: product.quantity,
        tax: 100,
      };
    });

    if (order?.id) {
      await axios.put(`http://54.199.68.197:8081/api/v1/orders/${order.id}`, {
        supplier: orderData.supplier,
        products: newData,
      });
    } else {
      await axios.post("http://54.199.68.197:8081/api/v1/orders", {
        ...orderData,
        products: newData,
      });
    }
    setOpen(false);
  };

  return (
    <div>
      {addPoductDialog && (
        <AddOrderProductDialog
          handleUpdateItem={handleUpdateItem}
          data={orderProduct}
          open={addPoductDialog}
          setOpen={setAddProductDialog}
        />
      )}
      <Dialog maxWidth="lg" fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>
          {order?.id ? "Sửa thông tin đơn hàng" : "Tạo đơn nhập hàng"}
          <IconButton
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={() => setOpen(false)}
          >
            <Icon color="error">x</Icon>
          </IconButton>
        </DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText style={{ marginBottom: "20px" }}>
              Thông tin cơ bản:
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid container item spacing={2} xs={9}>
                <Grid item xs={4}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="order-date"
                    label="Ngày tạo đơn"
                    type="date"
                    value={moment(orderData.createdAt).format("YYYY-MM-DD")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={4}>
                  <Select
                    style={{ marginTop: "8px" }}
                    labelId="supplierName-label"
                    id="supplier-name"
                    value={orderData.supplier.id}
                    onChange={(e) =>
                      setOrderData({
                        ...orderData,
                        supplier: {
                          ...orderData.supplier,
                          id: e.target.value,
                        },
                      })
                    }
                    fullWidth
                    displayEmpty
                    defaultOpen
                  >
                    <MenuItem value="" disabled>
                      <span>Chọn nhà cung cấp</span>
                    </MenuItem>
                    {listSupplier.map((item: Supplier, index: number) => (
                      <MenuItem value={item.id} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    label="Mã vận đơn"
                    id="order code"
                    value={"1221"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Ghi chú"
                    id="note"
                    value={note}
                    onChange={(e) => handleChangeNote(e)}
                    multiline
                    fullWidth
                    inputProps={{ maxLength: 500 }}
                    helperText={`${note.length}/500`}
                    FormHelperTextProps={{
                      style: {
                        fontSize: "14px",
                        textAlign: "left",
                        position: "absolute",
                        bottom: -25,
                        left: -14,
                        zIndex: "1",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DialogContentText style={{ margin: "10px 0px" }}>
                    Danh sách hàng hoá:
                  </DialogContentText>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setAddProductDialog(true);
                      setOrderProduct({});
                    }}
                  >
                    Thêm mặt hàng
                  </Button>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Tên mặt hàng</TableCell>
                          <TableCell>Số lượng</TableCell>
                          <TableCell>Loại</TableCell>
                          <TableCell>Giá</TableCell>
                          <TableCell>Tổng tiền</TableCell>
                          <TableCell>Thao tác</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderData.products.map(
                          (item: OrderProduct, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{item.product.name}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>
                                {item.product.category.name}
                              </TableCell>
                              <TableCell>{item.product.price}</TableCell>
                              <TableCell>
                                {item.product.price * item.quantity}
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  onClick={() => handleClickEdit(item)}
                                >
                                  <EditIcon color="primary" />
                                </IconButton>
                                <IconButton
                                  onClick={() => handleClickDelete(item)}
                                >
                                  <DeleteIcon color="error" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Grid container item xs={3}>
                <DialogContent>
                  <DialogContentText style={{ marginBottom: "10px" }}>
                    Thông tin số tiền:
                  </DialogContentText>
                  <TextField
                    margin="dense"
                    id="total"
                    label="Tổng tiền hàng hoá"
                    value={totalPrice}
                    disabled
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="tax"
                    label="Thuế"
                    value={tax * totalPrice}
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="grand-total"
                    label="Tổng hóa đơn"
                    value={tax * totalPrice + totalPrice}
                    disabled
                    fullWidth
                  />
                </DialogContent>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Button color="error" onClick={handleClose}>
              Hủy
            </Button>
            <Button color="primary" type="submit">
              Lưu
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default EditOrderDialolg;

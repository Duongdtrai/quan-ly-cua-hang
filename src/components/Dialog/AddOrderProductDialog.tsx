import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  Icon,
} from "@mui/material";
import axios from "axios";
import { Category, OrderProduct, Product } from "../../interface";

const AddOrderProductDialog = ({
  open,
  setOpen,
  handleUpdateItem,
  data,
}: any) => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [orderProduct, setOrderProduct] = useState<OrderProduct>(data);
  const [product, setProduct] = useState<Product>(data?.product);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [category, setCategory] = useState<string>(data?.product?.category?.id.toString());
  const [displayProducts, setDisplayProducts] = useState<Array<Product>>(data?.id ? [data?.product] : []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/api/v1/products");
      setProducts(response.data.data);
      setDisplayProducts(response.data.data.filter((item: Product) => item.category.id == category));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/api/v1/category");
      setCategories(response.data.data);
    };
    fetchData();
  }, []);

  const handleChangeQuantity = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOrderProduct({
      ...orderProduct,
      quantity: parseInt(e.target.value),
    });
  };

  const handleChangeProduct = (e: SelectChangeEvent<string>) => {
    const selectedProduct = products.find(
      (item: Product) => item.id === parseInt(e.target.value)
    );
    if (selectedProduct) {
      setProduct(selectedProduct);
      setOrderProduct({...orderProduct, product: selectedProduct, tax: 20})
    }
  };

  const handleChangeCategory = (e: SelectChangeEvent<string>) => {
    const categoryId = e.target.value;
    setCategory(categoryId);
    setDisplayProducts(products.filter((item: Product) => item.category.id === categoryId));
  }

  console.log(displayProducts);
  

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        {data?.id ? "Sửa thông tin mặt hàng" : "Thêm Mặt Hàng"}
        <IconButton
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => setOpen(false)}
        >
          <Icon color="error">x</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Select
          style={{ marginTop: "8px" }}
          id="category"
          value={category}
          onChange={(e) => handleChangeCategory(e)}
          fullWidth
          defaultOpen={data?.id ? false : true}
          displayEmpty
          required
          disabled={data?.id ? true : false}
        >
          <MenuItem value="" disabled>
            <span>Chọn loại mặt hàng</span>
          </MenuItem>
          {categories.map((item: Category, index: number) => (
            <MenuItem value={item.id} key={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          style={{ marginTop: "8px" }}
          id="productName"
          value={product?.id?.toString() || ""}
          onChange={(e) => handleChangeProduct(e)}
          fullWidth
          displayEmpty
          required
          disabled={data?.id ? true : false}
        >
          <MenuItem value="" disabled>
            <span>Chọn mặt hàng</span>
          </MenuItem>
          {displayProducts.map((item: Product, index: number) => (
            <MenuItem value={item.id} key={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          margin="dense"
          id="quantity"
          label="Số Lượng"
          type="number"
          inputProps={{
            min: 1,
            onKeyPress: (event) => {
              if (event.key === '-' || event.key === '.' || event.key === '+') {
                event.preventDefault();
              }
            },
          }}
          value={orderProduct?.quantity || ""}
          onChange={(e) => handleChangeQuantity(e)}
          fullWidth
          focused={data?.id ? true : false}
          disabled={!category ? true : false}
          required
        />
        <TextField
          margin="dense"
          id="price"
          label="Giá"
          type="number"
          value={product?.price || ""}
          disabled
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="error">
          Hủy
        </Button>
        <Button
          onClick={() => handleUpdateItem(orderProduct, data?.id)}
          color="primary"
        >
          {data?.id ? "Lưu" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrderProductDialog;

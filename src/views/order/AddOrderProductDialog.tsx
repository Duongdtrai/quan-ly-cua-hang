import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  Form,
  FormLayout,
  Modal,
} from "@shopify/polaris";
import axios from "axios";
import { Category, OrderProduct, Product } from "../../interface";
import { CATEGORY_API, PRODUCT_API } from "../../constants/api";

interface AddOrderProductDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateItem: (orderProduct: OrderProduct, id: number) => void;
  data: OrderProduct;
}

const AddOrderProductDialog: React.FC<AddOrderProductDialogProps> = ({
  open,
  setOpen,
  handleUpdateItem,
  data,
}: AddOrderProductDialogProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [orderProduct, setOrderProduct] = useState<OrderProduct>(data);
  const [category, setCategory] = useState<string>(
    data?.product?.category?.id.toString() || ""
  );
  const [displayProducts, setDisplayProducts] = useState<Product[]>(
    data?.id ? [data?.product] : []
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(PRODUCT_API);
      setProducts(response?.data?.data?.data);
      const newProducts = response?.data?.data?.data.filter(
        (item: Product) => item.category.id.toString() === category
      );
      setDisplayProducts(newProducts);
      setOrderProduct({
        id: data?.id,
        product: data?.product || newProducts[0],
        quantity: data?.quantity,
        importPrice: data?.importPrice
      })
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        CATEGORY_API,
        {
          params: {
            page: 0,
            size: 1000,
          },
        }
      );
      setCategories(response?.data?.data?.data);
      if (!data) setCategory(response?.data?.data?.data[0].id.toString());
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeProduct = (value: string) => {
    const selectedProduct = products.find(
      (item: Product) => item.id === parseInt(value)
    );
    if (selectedProduct) {
      setOrderProduct({ ...orderProduct, product: selectedProduct });
    }
  };

  const handleChangeCategory = (value: string) => {
    setCategory(value);
  };

  return (
    <Modal
      size="small"
      open={open}
      onClose={() => setOpen(false)}
      title={data ? "Sửa thông tin mặt hàng" : "Thêm Mặt Hàng"}
      primaryAction={{
        id:"modal--save--button",
        content: data ? "Lưu" : "Thêm",
        onAction: () => handleUpdateItem(orderProduct, data?.id),
      }}
      secondaryActions={[
        {
          id: "modal--cancel--button",
          content: "Hủy",
          onAction: () => setOpen(false),
        },
      ]}
    >
      <Form onSubmit={() => handleUpdateItem(orderProduct, data?.id)}>
        <Modal.Section>
          <FormLayout>
            <Select
              id="select--category"
              label="Chọn loại mặt hàng"
              options={categories.map((item: Category) => ({
                label: item.name,
                value: item.id.toString(),
              }))}
              value={category}
              onChange={(value) => handleChangeCategory(value as string)}
            />
            <Select
              id="select--product"
              label="Chọn mặt hàng"
              options={displayProducts.map((item: Product) => ({
                label: item.name,
                value: item.id ? item.id.toString() : "",
              }))}
              value={orderProduct?.product?.id?.toString() || ""}
              onChange={(value) => handleChangeProduct(value as string)}
            />
            <TextField
              id="quantity--input"
              label="Số Lượng"
              type="number"
              min={1}
              value={
                orderProduct?.quantity ? orderProduct?.quantity?.toString() : ""
              }
              onChange={(value) => 
                setOrderProduct({
                  ...orderProduct,
                  quantity: parseInt(value),
              })}
              disabled={!category}
              autoComplete="off"
            />
            <TextField
              id="price--input"
              label="Giá nhập"
              type="number"
              value={orderProduct?.importPrice?.toString() ?? 0}
              onChange={(value) => 
                setOrderProduct({
                  ...orderProduct,
                  importPrice: parseInt(value),
              })}
              autoComplete="off"
              suffix="vnđ"
              min={0}
            />
          </FormLayout>
        </Modal.Section>
      </Form>
    </Modal>
  );
};

export default AddOrderProductDialog;

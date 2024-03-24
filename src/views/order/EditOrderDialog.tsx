import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextContainer,
  TextField,
  Select,
  DataTable,
  FormLayout,
  Grid,
  TableData,
  ButtonGroup,
  Card,
  Text,
  Box,
  Thumbnail,
} from "@shopify/polaris";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import moment from "moment";
import axios from "axios";
import AddOrderProductDialog from "./AddOrderProductDialog";
import { Order, OrderProduct, Product, Supplier } from "../../interface";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  order: Order;
  fetchData: () => void;
}

const EditOrderDialog: React.FC<Props> = ({
  open,
  setOpen,
  order,
  fetchData,
}) => {
  const [note, setNote] = useState<string>("");
  const [tax, setTax] = useState<number>(0.1);
  const [listSupplier, setListSupplier] = useState<Supplier[]>([]);
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0);
  const [addProductDialog, setAddProductDialog] = useState<boolean>(false);
  const [orderProduct, setOrderProduct] = useState<OrderProduct>();
  const [orderData, setOrderData] = useState<Order>(order);
  const [supplier, setSupplier] = useState<string>(
    order?.supplier?.id.toString()
  );

  useEffect(() => {
    const fetchSupplierData = async () => {
      const response = await axios.get(
        "http://54.199.68.197:8081/api/v1/suppliers",
        {
          params: {
            page: 0,
            size: 100,
          },
        }
      );
      setListSupplier(response?.data?.data?.data);
    };
    fetchSupplierData();
  }, []);

  useEffect(() => {
    setTotalPrice(calcTotalPrice());
  }, [orderData]);

  const convertDataToRow = (tableData: Order | undefined): TableData[][] => {
    if (!tableData || !tableData.orderProducts) return [];

    return tableData.orderProducts.map((item: OrderProduct) => [
      <Box id="product-name-and-image">
        <Text id="product-name" as="p">
          {item.product.name}
        </Text>
        <Thumbnail source={item.product.image} alt="image" />
      </Box>,
      <div style={{ textAlign: "center" }}>{item.quantity}</div>,
      item.product.category.name,
      item.product.price,
      item.product.price * item.quantity,
      <div style={{ minWidth: "70px" }}>
        <ButtonGroup>
          <Button
            icon={EditIcon}
            onClick={() => handleClickEdit(item)}
            id="edit-order-product-btn"
          />
          <Button
            icon={DeleteIcon}
            tone="critical"
            onClick={() => handleClickDelete(item)}
            id="delete-order-product-btn"
          />
        </ButtonGroup>
      </div>,
    ]);
  };

  const calcTotalPrice = (): number | undefined => {
    return orderData?.orderProducts?.reduce(
      (store: number, item: OrderProduct) =>
        store + item.quantity * item.product.price,
      0
    );
  };

  const handleChangeNote = (value: string) => {
    if (value.length <= 500) {
      setNote(value);
    }
  };

  const handleChangeSupplier = (value: string) => {
    setSupplier(value as string);
    if (orderData) {
      setOrderData({...orderData, supplier: {id: value, name: ''}})
    } else {
      setOrderData({
        createdAt: moment().format("YYYY-MM-DD"),
        id: '',
        status: false,
        supplier: {id: value, name: ''},
        orderProducts: []
      })
    }
  }

  const handleUpdateItem = (data: OrderProduct, id: number) => {
    if (data?.product && data?.quantity && data?.tax) {
      setAddProductDialog(false);
      let isExist = false;
      const newOrderProducts = orderData?.orderProducts?.map(
        (item: OrderProduct) => {
          if (item.product.id == data.product.id || item.id === id) {
            isExist = true;
            return data;
          }
          return item;
        }
      );
      setOrderData({
        ...orderData,
        orderProducts:
          id && isExist
            ? newOrderProducts
            : orderData
            ? [...orderData?.orderProducts as Array<OrderProduct>, data]
            : [data],
      });
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };

  const handleClickDelete = (item: OrderProduct) => {
    if (orderData && orderData.orderProducts) {
      setOrderData({
        ...orderData,
        orderProducts: orderData.orderProducts.filter(
          (product: OrderProduct) => item.id !== product.id
        ),
      });
    }
  };

  const handleClickEdit = (item: OrderProduct) => {
    setOrderProduct(item);
    setAddProductDialog(true);
  };

  const handleSubmit = async () => {
    const newData = orderData?.orderProducts?.map((product: OrderProduct) => {
      return {
        id: product.product.id,
        quantity: product.quantity,
        tax: 100,
      };
    });

    if (order?.id) {
      await axios.put(`http://54.199.68.197:8081/api/v1/orders/${order.id}`, {
        supplier: orderData?.supplier,
        products: newData,
      });
    } else {
      console.log(orderData);
      
      const sendData = {
        supplier: {
          id: orderData.supplier.id
        },
        products: (orderData.orderProducts as Array<OrderProduct>).map((item: OrderProduct) => {
          return {
            id: item.product.id,
            quantity: item.quantity,
            tax: item.tax,
          }
        }),
        status: false
      }
      await axios.post("http://54.199.68.197:8081/api/v1/orders", sendData);
    }
    fetchData();
    setOpen(false);
  };

  return (
    <div>
      {addProductDialog && (
        <AddOrderProductDialog
          handleUpdateItem={handleUpdateItem}
          data={orderProduct as OrderProduct}
          open={addProductDialog}
          setOpen={setAddProductDialog}
        />
      )}
      <Modal
        title={order?.id ? "Sửa thông tin đơn hàng" : "Tạo đơn nhập hàng"}
        open={open}
        onClose={() => setOpen(false)}
        primaryAction={{
          content: "Lưu",
          onAction: handleSubmit,
        }}
        secondaryActions={[
          {
            content: "Hủy",
            onAction: () => setOpen(false),
          },
        ]}
      >
        <Modal.Section>
          <Grid>
            <Grid.Cell columnSpan={{ lg: 8 }}>
              <FormLayout>
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6 }}>
                    <TextField
                      label="Ngày tạo đơn"
                      type="date"
                      value={moment(orderData?.createdAt).format("YYYY-MM-DD")}
                      disabled
                      autoComplete="off"
                      id="order-date"
                    />
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6 }}>
                    <TextField
                      label="Mã vận đơn"
                      type="text"
                      value={"1234"}
                      disabled
                      autoComplete="off"
                      id="delivery-code"
                    />
                  </Grid.Cell>
                </Grid>
                <Select
                  id="supplier-select"
                  label="Nhà cung cấp"
                  options={listSupplier.map((item: Supplier) => {
                    return {
                      label: item.name || "",
                      value: item.id.toString(),
                    };
                  })}
                  value={supplier}
                  onChange={(value) => handleChangeSupplier(value)}
                  placeholder="Chọn nhà cung cấp"
                />
                <TextField
                  id="note"
                  label="Ghi chú"
                  value={note}
                  onChange={handleChangeNote}
                  multiline={3}
                  autoComplete="off"
                  maxLength={200}
                  showCharacterCount
                />
              </FormLayout>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 4 }}>
              <div style={{ marginBottom: "15px" }}>
                <TextField
                  id="total-product-price"
                  label="Tổng tiền hàng hoá"
                  value={totalPrice?.toString()}
                  disabled
                  autoComplete=""
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <TextField
                  id="tax"
                  label="Thuế"
                  value={totalPrice ? (tax * totalPrice).toString() : "0"}
                  disabled
                  autoComplete=""
                />
              </div>
              <TextField
                id="total"
                label="Tổng hóa đơn"
                value={
                  totalPrice ? (tax * totalPrice + totalPrice).toString() : "0"
                }
                disabled
                autoComplete=""
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ lg: 12 }}>
              <Button
                onClick={() => {
                  setAddProductDialog(true);
                  setOrderProduct(undefined);
                }}
                id="add-order-product-btn"
              >
                Thêm mặt hàng
              </Button>
              <DataTable
                columnContentTypes={[
                  "text",
                  "numeric",
                  "text",
                  "numeric",
                  "numeric",
                  "text",
                ]}
                headings={[
                  "Tên mặt hàng",
                  "Số lượng",
                  "Loại",
                  "Giá",
                  "Tổng tiền",
                  "Thao tác",
                ]}
                rows={convertDataToRow(orderData)}
              />
            </Grid.Cell>
          </Grid>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default EditOrderDialog;

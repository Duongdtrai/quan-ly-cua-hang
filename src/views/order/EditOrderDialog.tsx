import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Select,
  DataTable,
  FormLayout,
  Grid,
  TableData,
  ButtonGroup,
  Text,
  Box,
  Thumbnail,
  InlineStack,
} from "@shopify/polaris";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import moment from "moment";
import axios from "axios";
import AddOrderProductDialog from "./AddOrderProductDialog";
import { Employee, Order, OrderProduct, Supplier } from "../../interface";
import { EMPLOYEE_API, ORDER_API, SUPPLIER_API } from "../../constants/api";

interface Props {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  order: Order;
  fetchData: () => void;
  setSelectedRows: Function;
}

interface Option {
  label: string;
  value: string;
}

const EditOrderDialog: React.FC<Props> = ({
  open,
  setOpen,
  order,
  fetchData,
  setSelectedRows,
}) => {
  const [listSupplier, setListSupplier] = useState<Supplier[]>([]);
  const [employeeOptions, setEmployeeOptions] = useState<Option[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [addProductDialog, setAddProductDialog] = useState<boolean>(false);
  const [orderProduct, setOrderProduct] = useState<OrderProduct>();
  const [orderData, setOrderData] = useState<Order>(
    order || {
      createdAt: moment().format("YYYY-MM-DD"),
      status: false,
      supplier: { id: 0, name: ""},
      importOrderProducts: [],
      tax: 0,
      note: "",
      code: "",
      employeeId: "",
      payment: 0
    }
  );
  const [supplier, setSupplier] = useState<string>(
    order?.supplier?.id.toString()
  );

  const [showErr, setShowErr] = useState<boolean>(false);
  const [showCodeErr, setShowCodeErr] = useState<boolean>(false);
  const [showSupllierErr, setShowSupplierErr] = useState<boolean>(false);
  const [codeErrMessage, setCodeErrMessage] = useState<string>("");

  useEffect(() => {
    const fetchSupplierData = async () => {
      const response = await axios.get(
        SUPPLIER_API,
        {
          params: {
            page: 0,
            size: 100,
          },
        }
      );
      setListSupplier(response?.data?.data?.data);
    };

    const fetchEmployeeData = async () => {
      const response = await axios.get(EMPLOYEE_API);
      const data = response?.data?.data;
      
      setEmployeeOptions(data?.map((employee: Employee) => {
        return {
          label: employee.name,
          value: employee.id.toString()
        }
      }));
    }

    fetchSupplierData();
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    const productsPrice = calcTotalProductsPrice() as number;
    setTotalPrice(productsPrice);
    setOrderData({
      ...orderData,
      tax: 0.01 * productsPrice,
      payment: productsPrice + 0.01 * productsPrice
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData.importOrderProducts]);

  const convertDataToRow = (tableData: Order | undefined): TableData[][] => {
    if (!tableData || !tableData.importOrderProducts) return [];

    return tableData.importOrderProducts.map((item: OrderProduct) => [
      <Box id="product--name--and--image">
        <Text id="product--name" as="p">
          {item.product.name}
        </Text>
        <Thumbnail source={item.product.image} alt="image" />
      </Box>,
      <div style={{ textAlign: "center" }}>{item.quantity}</div>,
      item.product.category.name,
      item.importPrice,
      item.importPrice * item.quantity,
      <div style={{ minWidth: "70px" }}>
        <ButtonGroup>
          <Button
            id="edit--order--product--btn"
            icon={EditIcon}
            onClick={() => handleClickEdit(item)}
            disabled={orderData?.status}
          />
          <Button
            id="delete--order--product--btn"
            icon={DeleteIcon}
            tone="critical"
            onClick={() => handleClickDelete(item)}
            disabled={orderData?.status}
          />
        </ButtonGroup>
      </div>,
    ]);
  };

  const calcTotalProductsPrice = (): number | undefined => {
    return orderData?.importOrderProducts?.reduce(
      (store: number, item: OrderProduct) =>
        store + item.quantity * item.importPrice,
      0
    );
  };

  const handleChangeNote = (value: string) => {
    if (value.length <= 500) {
      setOrderData({ ...orderData, note: value });
    }
  };

  const handleChangeSupplier = (value: string) => {
    setSupplier(value as string);
    setOrderData({ ...orderData, supplier: { id: value, name: "" }});
  };

  const handleUpdateItem = (data: OrderProduct, id: number) => {
    if (data?.product && data?.quantity) {
      setShowErr(false);
      setAddProductDialog(false);
      let isExist = false;
      const newOrderProducts = orderData?.importOrderProducts?.map(
        (item: OrderProduct) => {
          if (item.product.id === data.product.id) {
            isExist = true;
            return data;
          }
          return item;
        }
      );

      setOrderData({
        ...orderData,
        importOrderProducts: isExist
          ? newOrderProducts
          : [...(orderData?.importOrderProducts as Array<OrderProduct>), data]
      });
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };

  const handleClickDelete = (item: OrderProduct) => {
    setOrderData({
      ...orderData,
      importOrderProducts: orderData?.importOrderProducts?.filter(
        (product: OrderProduct) => item.product.id !== product.product.id
      ),
    });
  };

  const handleClickEdit = (item: OrderProduct) => {
    setOrderProduct(item);
    setAddProductDialog(true);
  };

  const validate = (): boolean => {
    const codeRegex = /^[A-Za-z]{2}[A-Za-z0-9]{3}$/;
    let check = true;

    if (orderData?.importOrderProducts?.length === 0) {
      setShowErr(true);
      check = false;
    }

    if (orderData?.code.length === 0) {
      setShowCodeErr(true);
      setCodeErrMessage("Vui lòng nhập mã vận đơn.");
      check = false;
    } else if (!codeRegex.test(orderData?.code)) {
      setShowCodeErr(true);
      setCodeErrMessage("Mã vận đơn gồm 5 ký tự, bắt đầu bằng 2 chữ cái và tiếp theo là 3 chữ số bất kỳ.");
      check = false;
    }

    if (!orderData?.supplier?.id) {
      setShowSupplierErr(true);
      check = false;
    }
    return check;
  }

  const handleSubmit = async () => {
    if(!validate()) return;

    const newData = orderData?.importOrderProducts?.map((product: OrderProduct) => {
      return {
        productId: product.product.id,
        quantity: product.quantity,
        importPrice: product.importPrice
      };
    });

    const sendData = {
      ...orderData,
      supplierId: orderData?.supplier?.id,
      importOrderProducts: newData,
      employeeId: 1
    }

    if (order?.id) {
      try {
        await axios.put(
          `${ORDER_API}/${order.id}`,
          sendData
        );
        fetchData();
        setOpen(false);
        setSelectedRows([]);
      } catch (e: any) {
        alert(e.response.data.message);
      }
    } else {
      try {
        const response = await axios.post(
          ORDER_API,
          sendData
        );
        if (response?.data?.status === 200) {
          fetchData();
          setOpen(false);
        }
      } catch (e: any) {
        alert(e.response.data.message);
      }
    }
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
        size="large"
        title={order?.id ? "Sửa thông tin đơn hàng" : "Tạo đơn nhập hàng"}
        open={open}
        onClose={() => setOpen(false)}
        primaryAction={{
          content: orderData?.status ? "Đơn hàng đã thanh toán" : "Lưu",
          onAction: handleSubmit,
          disabled: orderData?.status
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
            <Grid.Cell columnSpan={{ lg: 8, md: 4, xs: 6 }}>
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
                      id="order--code"
                      label="Mã đơn hàng"
                      type="text"
                      value={orderData?.code}
                      onChange={(e) => {
                        setOrderData({ ...orderData, code: e });
                        setShowCodeErr(false);
                      }}
                      autoComplete="off"
                      disabled={orderData?.status}
                      requiredIndicator
                      error={showCodeErr && codeErrMessage}
                    />
                  </Grid.Cell>
                </Grid>
                <div>
                  <Select
                    id="order--supplier--select"
                    disabled={orderData?.status}
                    label="Nhà cung cấp"
                    options={listSupplier.map((item: Supplier) => {
                      return {
                        label: item.name || "",
                        value: item.id.toString(),
                      };
                    })}
                    value={supplier}
                    onChange={(value) => {
                      handleChangeSupplier(value);
                      setShowSupplierErr(false);
                    }}
                    placeholder="Chọn nhà cung cấp"
                    requiredIndicator
                    error={showSupllierErr && "Vui lòng chọn nhà cung cấp"}
                  />
                </div>
                <TextField
                  id="order--note"
                  label="Ghi chú"
                  value={orderData?.note}
                  onChange={handleChangeNote}
                  multiline={3}
                  autoComplete="off"
                  maxLength={200}
                  showCharacterCount
                  disabled={orderData?.status}
                />
              </FormLayout>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, md: 2, lg: 4 }}>
              <div style={{ marginBottom: "18px" }}>
                <TextField
                  id="order--total--product--price"
                  label="Tổng tiền hàng hoá"
                  value={totalPrice?.toString()}
                  disabled
                  autoComplete=""
                  suffix="vnđ"
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <TextField
                  id="order--tax"
                  label="Giá trị thuế"
                  value={orderData?.tax.toString()}
                  onChange={(value) => setOrderData({...orderData, tax: parseInt(value)})}
                  autoComplete=""
                  suffix="vnđ"
                  type="number"
                  min={0}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <TextField
                  id="order--total"
                  label="Tổng hóa đơn"
                  value={orderData?.payment.toString()}
                  disabled
                  autoComplete=""
                  suffix="vnđ"
                />
              </div>  
              <Select
                label="Nhân viên thực hiện"
                options={employeeOptions}
                onChange={(value) => setOrderData({...orderData, employeeId: parseInt(value)})}
                value={orderData?.employeeId?.toString()}
                requiredIndicator
              />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 12 }}>
              <InlineStack gap="400">
                <Button
                  disabled={orderData?.status}
                  id="add-order-product-btn"
                  onClick={() => {
                    setAddProductDialog(true);
                    setOrderProduct(undefined);
                  }}
                >
                  Thêm mặt hàng
                </Button>
                {showErr && <Text id="missing--porudct--error" tone="critical" as="p">Vui lòng nhập sản phẩm</Text>}
              </InlineStack>
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
                  <div style={{ textAlign: "center" }}>Số lượng</div>,
                  "Loại",
                  "Giá nhập",
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

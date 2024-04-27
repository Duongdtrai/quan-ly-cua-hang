import React, { useCallback, useEffect, useState } from "react";
import {
  Page,
  Card,
  DataTable,
  Button,
  ButtonGroup,
  Checkbox,
  Popover,
  InlineStack,
  BlockStack,
  ChoiceList,
} from "@shopify/polaris";
import axios from "axios";
import moment from "moment";
import { Order } from "../../interface";
import EditOrderDialog from "./EditOrderDialog";
import { useNavigate } from "react-router-dom";
import ModalDeleteProduct from "../product/modal/modal-delete-product";
import { useModal } from "../../hook/useModal";
import { EModal } from "../../constants";
import { useDocument } from "../../hook/useDocument";
import { ORDER_API } from "../../constants/api";

const OrdersPage = () => {
  const { openModal } = useModal();
  const [open, setOpen] = useState<boolean>(false);
  const [activePopover, setActivePopover] = useState<boolean>(false);

  const [items, setItems] = useState<Array<Order>>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [order, setOrder] = useState<any>();
  const [status, setStatus] = useState<string[]>(['false']);
  const [page, setPage] = useState<number>(0);
  const itemsPerPage = 10;

  useDocument("Quản lý đơn nhập hàng");

  const navigate = useNavigate();

  const headings = [
    "",
    <div style={{ textAlign: "center" }}>STT</div>,
    <div style={{ textAlign: "center" }}>Mã đơn hàng</div>,
    <div style={{ textAlign: "left" }}>Ngày tạo</div>,
    <div style={{ textAlign: "left" }}>Nhà cung cấp</div>,
    <div style={{ textAlign: "left" }}>Trạng thái</div>,
  ];

  const formatToRowData = (data: Order[]) => {
    return data.map((item: Order, index: number) => [
      <Checkbox
        id={`product${item.id}--checkbox`}
        name=""
        value=""
        label=""
        labelHidden
        checked={
          selectedRows.find((rowId: any) => rowId === item.id) ? true : false
        }
        onChange={(v: boolean) => {
          !v
            ? setSelectedRows((prev: any) =>
              prev.filter((rowId: any) => rowId !== item.id)
            )
            : setSelectedRows((prev: any) => [...prev, item.id]);
        }}
      />,
      <div style={{ textAlign: "center" }}>
        {page * itemsPerPage + index + 1}
      </div>,
      <div style={{ textAlign: "center" }}>{item.code}</div>,
      moment(item.createdAt).format("YYYY-MM-DD"),
      item.supplier.name,
      item.status ? "Đã thanh toán" : "Chưa thanh toán",
    ]);
  };

  const fetchData = () => {
    axios
      .get(ORDER_API, {
        params: { page: page, size: itemsPerPage, status: status[0] },
      })
      .then((res) => {
        if (res.status === 200) {
          const orderList = res?.data?.data?.data;
          setItems(orderList);
        }
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchData();
  }, [open, page, selectedRows, status]);

  const handleChangeStatus = useCallback((value: string[]) => {
    setStatus(value);
  }, []);

  const handleAddItem = () => {
    setOrder(undefined);
    setOpen(true);
  };

  const handleEditItem = () => {
    const item = items.find((item) => item.id === selectedRows[0]);
    setOrder(item);
    setOpen(true);
  };

  const handleConfirmPayment = async () => {
    const orders = selectedRows.map(id => {
      return axios.put(`${ORDER_API}/${id}/pay`);
    })
  
    await Promise.all(orders);
    setSelectedRows([]);
    fetchData();
  }

  return (
    <Page
      backAction={{
        onAction: () => navigate("/"),
      }}
      title="Quản lý đơn hàng"
      primaryAction={{
        content: "Tạo đơn hàng",
        onAction: () => handleAddItem(),
      }}
      fullWidth
    >
      <BlockStack gap={"400"}>
        <InlineStack gap={"400"} blockAlign="center">
          <Button
            id="cancel--select--button"
            onClick={() => setSelectedRows([])}
            disabled={!selectedRows.length}
          >
            Bỏ chọn
          </Button>
          <Popover
            active={activePopover}
            preferredAlignment="left"
            preferredPosition="below"
            activator={
              <Button
                id="active--popover--button"
                onClick={() => setActivePopover((prev) => !prev)}
                disclosure
              >
                Lọc theo trạng thái
              </Button>
            }
            onClose={() => setActivePopover((prev) => !prev)}
            ariaHaspopup={false}
            >
              <div style={{width: '145px', padding: '10px'}}>
                <ChoiceList
                  title=""
                  choices={[
                    {label: 'Đã thanh toán', value: 'true'},
                    {label: 'Chưa thanh toán', value: 'false'},
                  ]}
                  selected={status}
                  onChange={handleChangeStatus}
                />
              </div>
            </Popover>
        </InlineStack>
        <Card>
          <DataTable
            columnContentTypes={["text", "text", "text", "text", "text"]}
            headings={headings}
            rows={formatToRowData(items)}
            truncate
          />
        </Card>
      </BlockStack>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <ButtonGroup>
          <Button
            id="previous--page--button"
            disabled={page === 0}
            onClick={() => setPage(page + -1)}
          >
            Trang trước
          </Button>
          <Button
            id="next--page--button"
            disabled={items.length < itemsPerPage * (page + 1)}
            onClick={() => setPage(page + 1)}
          >
            Trang tiếp theo
          </Button>
        </ButtonGroup>
      </div>
      {selectedRows.length > 0 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "15px",
            background: "#fff",
            paddingBlock: 8,
            paddingInline: 12,
            borderRadius: 8,
            border: "1px solid #f1f1f1",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "12px",
          }}
        >
          <Button
            id="edit--order--button"
            variant="primary"
            disabled={selectedRows.length > 1}
            onClick={handleEditItem}
          >
            Sửa đơn hàng
          </Button>
          <Button
            id="delete--order--button"
            variant="primary"
            tone="critical"
            onClick={() => {
              openModal(EModal.MODAL_DELETE_PRODUCT, {
                data: { selectedRows, setSelectedRows },
              });
            }}
          >
            Xoá đơn hàng
          </Button>
          <Button
            id="confirm--payment--order--button"
            variant="secondary"
            tone="success"
            onClick={handleConfirmPayment}
            disabled={status[0] === 'true'}
          >
            Xác nhận thanh toán
          </Button>
        </div>
      )}
      {open && (
        <EditOrderDialog
          id="eidt--order--dialog"
          order={order}
          open={open}
          setOpen={setOpen}
          fetchData={fetchData}
          setSelectedRows={setSelectedRows}
        />
      )}
      <ModalDeleteProduct
        id="modal--delete-product"
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        type={"orders"}
      />
    </Page>
  );
};

export default OrdersPage;

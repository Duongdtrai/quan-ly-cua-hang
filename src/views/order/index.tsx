import React, { useEffect, useState } from "react";
import { Page, Card, DataTable, Button, ButtonGroup } from "@shopify/polaris";
import axios from "axios";
import moment from "moment";
import { Order } from "../../interface";
import EditOrderDialog from "./EditOrderDialog";
import ConfirmationDialog from "../../components/Dialog/ConfirmationDialog";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [items, setItems] = useState<Array<Order>>([]);
  const [displayOrders, setDisplayOrders] = useState<Array<Order>>([]);
  const [order, setOrder] = useState<any>();
  const [page, setPage] = useState<number>(0);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const headings = [
    <div style={{ textAlign: "center" }}>STT</div>,
    <div style={{ textAlign: "center" }}>Mã đơn hàng</div>,
    <div style={{ textAlign: "left" }}>Ngày tạo</div>,
    <div style={{ textAlign: "left" }}>Nhà cung cấp</div>,
    <div style={{ textAlign: "center" }}>Trạng thái</div>,
    <div style={{ textAlign: "center" }}>Thao tác</div>,
  ];

  const formatToRowData = (data: Order[]) => {
    return data.map((item: Order, index: number) => [
      <div style={{ textAlign: "center" }}>
        {page * itemsPerPage + index + 1}
      </div>,
      <div style={{ textAlign: "center" }}>{item.id}</div>,
      moment(item.createdAt).format("YYYY-MM-DD"),
      item.supplier.name,
      item.status ? "Đã thanh toán" : "Chưa thanh toán",
      <ButtonGroup>
        <Button onClick={() => handleEditItem(item)} id="edit-order-btn">
          Chỉnh sửa
        </Button>
        <Button
          tone="critical"
          onClick={() => handleClickDelete(item)}
          id="delete-order-btn"
        >
          Xóa
        </Button>
      </ButtonGroup>,
    ]);
  };

  const fetchData = () => {
    axios
      .get("http://54.199.68.197:8081/api/v1/orders")
      .then((res) => {
        if (res.status === 200) {
          const orderList = res?.data?.data?.data;
          setItems(orderList);
          setDisplayOrders(orderList.slice(0, itemsPerPage));
        }
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchData();
  }, [open, page]);

  const handleAddItem = () => {
    setOrder(undefined);
    setOpen(true);
  };

  const handleEditItem = (item: any) => {
    setOrder(item);
    setOpen(true);
  };

  const handleChangePage = (event: number) => {
    const newPage = page + event;
    setPage(newPage);
    setDisplayOrders(
      items.slice(newPage * itemsPerPage, (newPage + 1) * itemsPerPage)
    );
  };

  const handleClickDelete = (item: Order) => {
    setOrder(item);
    setShowConfirmDialog(true);
  };

  const handleDeleteItem = async (id: number) => {
    setItems(items.filter((item: Order) => item.id !== id));
    await axios.delete(`http://54.199.68.197:8081/api/v1/orders/${id}`);
    fetchData();
    setShowConfirmDialog(false);
  };

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
    >
      <Card>
        <DataTable
          columnContentTypes={["text", "text", "text", "text", "text"]}
          headings={headings}
          rows={formatToRowData(displayOrders)}
        />
      </Card>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <ButtonGroup>
          <Button
            disabled={page === 0}
            onClick={() => handleChangePage(-1)}
            id="previous-page"
          >
            Trang trước
          </Button>
          <Button
            disabled={items.length < itemsPerPage * (page + 1)}
            onClick={() => handleChangePage(1)}
            id="next-page"
          >
            Trang tiếp theo
          </Button>
        </ButtonGroup>
      </div>
      {showConfirmDialog && (
        <ConfirmationDialog
          open={showConfirmDialog}
          setOpen={setShowConfirmDialog}
          item={order}
          handleConfirm={handleDeleteItem}
          id="confirm-dialog"
        />
      )}
      {open && (
        <EditOrderDialog
          order={order}
          open={open}
          setOpen={setOpen}
          fetchData={fetchData}
        />
      )}
    </Page>
  );
};

export default OrdersPage;

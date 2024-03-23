import React, { useEffect, useState } from "react";
import { Page, Card, DataTable, Button, ButtonGroup } from "@shopify/polaris";
import axios from "axios";
import moment from "moment";
import { Order } from "../interface";
import EditOrderDialog from "../components/Dialog/EditOrderDialog";
import ConfirmationDialog from "../components/Dialog/ConfirmationDialog";

const OrdersPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [items, setItems] = useState<Array<Order>>([]);
  const [displayOrders, setDisplayOrders] = useState<Array<Order>>([]);
  const [order, setOrder] = useState<Order | {}>();
  const [page, setPage] = useState<number>(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://54.199.68.197:8081/api/v1/orders"
      );
      setItems(response.data.data);
      setDisplayOrders(response.data.data.slice(0, itemsPerPage));
    };
    getData();
  }, [open, page]);

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
    setShowConfirmDialog(false);
  };

  return (
    <Page title="Danh sách đơn hàng">
      <Card>
        <Button variant="primary" onClick={handleAddItem} id="create-order-btn">
          Tạo đơn hàng
        </Button>
        <DataTable
          columnContentTypes={["text", "text", "text", "text", "text"]}
          headings={[
            <div style={{textAlign: 'center'}}>STT</div>,
            <div style={{textAlign: 'center'}}>Mã đơn hàng</div>,
            <div style={{textAlign: 'left'}}>Ngày tạo</div>,
            <div style={{textAlign: 'left'}}>Nhà cung cấp</div>,
            <div style={{textAlign: 'center'}}>Trạng thái</div>,
            "",
            "",
          ]}
          rows={displayOrders.map((item: Order, index: number) => [
            <div style={{textAlign: 'center'}}>{page * itemsPerPage + index + 1}</div>,
            <div style={{textAlign: 'center'}}>{item.id}</div>,
            moment(item.createdAt).format("YYYY-MM-DD"),
            item.supplier.name,
            item.status ? "Đã thanh toán" : "Chưa thanh toán",
            <Button onClick={() => handleEditItem(item)}>Chỉnh sửa</Button>,
            <Button tone="critical" onClick={() => handleClickDelete(item)}>
              Xóa
            </Button>,
          ])}
        />
      </Card>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <ButtonGroup>
          <Button disabled={page === 0} onClick={() => handleChangePage(-1)} id="previous-page">
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
          id="edit-dialog"
        />
      )}
    </Page>
  );
};

export default OrdersPage;

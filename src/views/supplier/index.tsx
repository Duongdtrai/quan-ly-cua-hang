import { Page } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import SupplierDetailModal from "./SupplierDetailModal";
import SupplierDataTable from "./SupplierDataTable";
import axios from "axios";
import { SUPPLIER_API } from "../../constants/api";
import { Supplier } from "../../interface";
import SkeletonIndexTable from "../../components/Skeleton/skeleton-table";
import { useDocument } from "../../hook/useDocument";

const SupplierPage = () => {
  const [initTable, setInitTable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isActiveAddModal, setIsActiveAddModal] = useState(false);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [supplierData, setSupplierData] = useState<Supplier | undefined>();
  const [loadingModal, setLoadingModal] = useState(false);

  const onDismissAddModal = () => setIsActiveAddModal(false);
  const onOpenAddModal = () => setIsActiveAddModal(true);

  useDocument("Quản lý nhà cung cấp");

  const fetchSuppliers = useCallback(async () => {
    pageIndex >= 0 &&
      await axios
      .get(`${SUPPLIER_API}?page=${pageIndex}&size=${pageSize}`)
      .then((response) => response.data)
      .then((response) => response.data)
      .then((response) => {
        console.log(response);
        const metadata = response.metadata;
        setPagesNumber(metadata.totalPages);
        setSuppliers(response.data);
        if (pageIndex > metadata.totalPages - 1) {
          setPageIndex(metadata.totalPages - 1);
        } else setPageIndex(metadata.page);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageIndex, pageSize]);

  const onViewSupplier = async (id: number) => {
    setLoadingModal(true);
    onOpenAddModal();
    const response = await axios.get(`${SUPPLIER_API}/${id}`);
    const data = response.data;
    if (data.status === 200) {
      setSupplierData(data.data);
      setLoadingModal(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchSuppliers().then(() => {
      setLoading(false);
      setInitTable(false);
    });
  }, [pageIndex, pageSize, initTable, fetchSuppliers]);

  return (
    <Page
      backAction={{ content: "supplier_back", url: "/" }}
      title="Quản lý nhà cung cấp"
      primaryAction={{
        content: "Thêm nhà cung cấp",
        onAction: () => setIsActiveAddModal(true),
      }}
      fullWidth
    >
      {initTable ? (
        <SkeletonIndexTable number={4} />
      ) : (
        <>
          <SupplierDataTable
            id="supplier--data--table"
            suppliers={suppliers}
            setSuppliers={setSuppliers}
            pageIndex={pageIndex}
            pagesNumber={pagesNumber}
            setPageIndex={setPageIndex}
            loading={loading}
            setLoading={setLoading}
            fetchSuppliers={fetchSuppliers}
            onViewSupplier={onViewSupplier}
          />
          <SupplierDetailModal
            id="supplier--detail--modal"
            loading={loadingModal}
            setLoading={setLoadingModal}
            active={isActiveAddModal}
            onDismiss={onDismissAddModal}
            supplier={supplierData}
            setSupplier={setSupplierData}
            fetchSuppliers={fetchSuppliers}
          />
        </>
      )}
    </Page>
  );
};

export default SupplierPage;

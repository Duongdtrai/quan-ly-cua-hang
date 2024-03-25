import { Page } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SupplierDetailModal from "./SupplierDetailModal";
import SupplierDataTable from "./SupplierDataTable";
import axios from "axios";
import { SUPPLIER_API } from "../../constants/api";
import { Supplier } from "../../interface";
import SkeletonIndexTable from "../../components/Skeleton/skeleton-table";
function sleep(milli: number) {
  return new Promise((resolve) => setTimeout(resolve, milli));
}
const SupplierPage = () => {
  const navigate = useNavigate();
  const [initTable, setInitTable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isActiveAddModal, setIsActiveAddModal] = useState(false);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pagesNumber, setPagesNumber] = useState(0);

  const onDismissAddModal = () => setIsActiveAddModal(false);
  const addNewSuppliers = (_supplier: Supplier) =>
    setSuppliers([_supplier, ...suppliers]);

  const fetchSuppliers = async () => {
    await axios
      .get(`${SUPPLIER_API}?page=${pageIndex}&size=${pageSize}`)
      .then((response) => response.data)
      .then((response) => response.data)
      .then((response) => {
        const metadata = response.metadata;
        setPagesNumber(metadata.totalPages);
        setSuppliers(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    setLoading(true);
    fetchSuppliers().then(() => {
      setLoading(false);
      setInitTable(false);
    });
  }, [pageIndex, pageSize, initTable]);

  return (
    <Page
      backAction={{ content: "Supplier", url: "/" }}
      title="Suppliers"
      primaryAction={{
        content: "New supplier",
        onAction: () => setIsActiveAddModal(true),
      }}
      fullWidth
    >
      {initTable ? (
        <SkeletonIndexTable number={4} />
      ) : (
        <>
          <SupplierDataTable
            suppliers={suppliers}
            setSuppliers={setSuppliers}
            pageIndex={pageIndex}
            pagesNumber={pagesNumber}
            setPageIndex={setPageIndex}
            loading={loading}
            setLoading={setLoading}
            fetchSuppliers={fetchSuppliers}
          />
          <SupplierDetailModal
            active={isActiveAddModal}
            onDismiss={onDismissAddModal}
            addNewSuppliers={addNewSuppliers}
          />
        </>
      )}
    </Page>
  );
};

export default SupplierPage;

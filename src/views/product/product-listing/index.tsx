import { SearchIcon } from "@shopify/polaris-icons";
import {
  BlockStack,
  Box,
  Button,
  Checkbox,
  DataTable,
  Icon,
  InlineStack,
  Page,
  Popover,
  Scrollable,
  TableData,
  Text,
  TextField,
  Thumbnail,
} from "@shopify/polaris";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category, Product } from "../../../interface";
import { CategoryListItem } from "../CategoryListItem";

const defaultTable: {
  heading: string;
  type: "text" | "numeric";
  sortable: boolean;
}[] = [
  { heading: "", type: "text", sortable: false },
  { heading: "Id", type: "text", sortable: true },
  { heading: "Tên sản phẩm", type: "text", sortable: true },
  { heading: "Hình ảnh", type: "text", sortable: false },
  { heading: "Loại", type: "text", sortable: false },
  { heading: "Giá niêm yết", type: "numeric", sortable: true },
  { heading: "Số lượng còn lại", type: "numeric", sortable: true },
  { heading: "Mô tả", type: "text", sortable: false },
];

const formatToDataTable = (products: Product[]): TableData[][] => {
  return products
    .filter(({ isDeleted }) => !isDeleted)
    .map(
      ({
        id,
        name,
        image,
        category: { name: categoryListName, id: categoryId },
        price,
        quantity,
        description,
      }) => {
        return [
          id,
          name,
          image,
          categoryListName,
          price,
          quantity,
          description,
          categoryId,
        ];
      }
    );
};

const formatToTableRow = (
  tableData: TableData[][],
  selectedRows: any,
  setSelectedRows: (prev: any) => void
) => {
  return tableData.map((row, index) => {
    const [id, name, image, categoryListName, price, quantity, description] =
      row;
    return [
      <Checkbox
        name=""
        value=""
        label=""
        labelHidden
        checked={selectedRows.find((rowId: any) => rowId === id)}
        onChange={(v: boolean) => {
          selectedRows.find((rowId: any) => rowId === id)
            ? setSelectedRows((prev: any) =>
                prev.filter((rowId: any) => rowId !== id)
              )
            : setSelectedRows((prev: any) => [...prev, id]);
        }}
      />,
      id,
      <Text as="h4" variant="bodyLg">
        {name}
      </Text>,
      <Thumbnail source={image as string} alt={name as string} size="large" />,
      categoryListName,
      price,
      quantity,
      description,
    ];
  });
};

const ProductsListing = () => {
  const navigate = useNavigate();
  const [listCategory, setListCategory] = useState<Category[]>([]);
  const [sortedRows, setSortedRows] = useState<TableData[][]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [activePopover, setActivePopover] = useState(false);
  const [selectedCategorys, setSelectedCategorys] = useState<Category[]>([]);
  const [searchCategory, setSearchCategory] = useState("");

  const filteredListCategory = listCategory.filter((category) =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("http://54.199.68.197:8081/api/v1/products")
      .then((res) => {
        if (res.status === 200)
          setSortedRows(
            sortTable(
              formatToDataTable(res?.data?.data?.data || []),
              0,
              "ascending"
            )
          );
      })
      .catch((e) => console.error(e));

    axios
      .get("http://54.199.68.197:8081/api/v1/category")
      .then((res) => {
        if (res.status === 200) setListCategory(res?.data?.data?.data || []);
      })
      .catch((e) => console.error(e));
  }, []);

  const handleSort = (index: number, direction: "ascending" | "descending") =>
    sortedRows?.length &&
    setSortedRows(sortTable(sortedRows, index, direction));

  const filteredRows = sortedRows.filter((row) => {
    return (
      row[1]?.toString().toLowerCase().includes(searchProduct.toLowerCase()) &&
      (selectedCategorys.length
        ? selectedCategorys.find((category) => category.id === Number(row[7]))
        : true)
    );
  });

  useEffect(() => {
    const rows: NodeListOf<HTMLElement> = document.querySelectorAll(
      ".Polaris-DataTable__TableRow"
    );
    const handleClick = (index: number) => {
      navigate(`/product/${filteredRows[index][0]}`);
    };
    rows.forEach((row, index) => {
      row.style.cursor = "pointer";
      row.addEventListener("click", () => handleClick(index));
    });

    return () => {
      rows.forEach((row) =>
        row.removeEventListener("click", () => handleClick)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filteredRows)]);

  return (
    <Page
      fullWidth
      title="Danh sách sản phẩm"
      backAction={{
        onAction: () => navigate("/"),
      }}
    >
      <BlockStack gap={"400"}>
        <InlineStack gap={"400"} blockAlign="center">
          <TextField
            labelHidden
            label=""
            value={searchProduct}
            onChange={(v) => setSearchProduct(v)}
            onClearButtonClick={() => setSearchProduct("")}
            placeholder="Tìm kiếm sản phẩm..."
            autoComplete=""
            clearButton
          />
          <Box padding={"200"}>
            <Popover
              active={activePopover}
              preferredAlignment="left"
              preferredPosition="below"
              activator={
                <Button
                  onClick={() => setActivePopover((prev) => !prev)}
                  disclosure
                >
                  Lọc theo loại sản phẩm
                </Button>
              }
              onClose={() => setActivePopover((prev) => !prev)}
              ariaHaspopup={false}
            >
              <Box padding={"150"} width="240px">
                <BlockStack gap={"200"}>
                  <TextField
                    onChange={(v) => {
                      setSearchCategory(v);
                    }}
                    label="Search category"
                    labelHidden
                    placeholder="Search category"
                    value={searchCategory}
                    prefix={<Icon source={SearchIcon} tone="base" />}
                    autoComplete="off"
                    clearButton
                    onClearButtonClick={() => {
                      setSearchCategory("");
                    }}
                  />
                  <Scrollable style={{ maxHeight: 300 }}>
                    {filteredListCategory.map((category) => (
                      <CategoryListItem
                        key={category.id}
                        category={category}
                        selectedCategorys={selectedCategorys}
                        setSelectedCategorys={setSelectedCategorys}
                      />
                    ))}
                  </Scrollable>
                </BlockStack>
              </Box>
            </Popover>
          </Box>
        </InlineStack>

        <Box position="relative">
          <DataTable
            headings={defaultTable.map(({ heading }) => heading)}
            columnContentTypes={defaultTable.map(({ type }) => type)}
            sortable={defaultTable.map(({ sortable }) => sortable)}
            rows={formatToTableRow(filteredRows, selectedRows, setSelectedRows)}
            fixedFirstColumns={0}
            firstColumnMinWidth="500px"
            truncate
            verticalAlign="middle"
            hoverable
            stickyHeader
            onSort={handleSort}
            defaultSortDirection="ascending"
            initialSortColumnIndex={0}
          />
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
              }}
            >
              <Button variant="primary" tone="critical">
                Delete
              </Button>
            </div>
          )}
        </Box>
      </BlockStack>
    </Page>
  );
};

export default ProductsListing;

const sortTable = (
  rows: TableData[][],
  index: number,
  direction: "ascending" | "descending"
) => {
  switch (index) {
    case 1: {
      return [...rows].sort((a: any, b: any) => {
        return direction === "ascending"
          ? Number(a[0]) - Number(b[0])
          : Number(b[0]) - Number(a[0]);
      });
    }

    case 2: {
      return [...rows].sort((a: any, b: any) => {
        return direction === "ascending"
          ? a[1]
              ?.toString()
              .toLowerCase()
              .localeCompare(b[1]?.toString().toLowerCase())
          : b[1]
              ?.toString()
              .toLowerCase()
              .localeCompare(a[1]?.toString().toLowerCase());
      });
    }

    case 5: {
      return [...rows].sort((a: any, b: any) => {
        return direction === "ascending"
          ? Number(a[4]) - Number(b[4])
          : Number(b[4]) - Number(a[4]);
      });
    }

    case 6: {
      return [...rows].sort((a: any, b: any) => {
        return direction === "ascending"
          ? Number(a[5]) - Number(b[5])
          : Number(b[5]) - Number(a[5]);
      });
    }

    default: {
      return rows;
    }
  }
};
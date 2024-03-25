import {
  Box,
  Checkbox,
  InlineStack,
  RadioButton,
  Text,
} from "@shopify/polaris";
import { memo } from "react";
import { Category } from "../../interface";

interface ICategoryListItem {
  category: Category;
  selectedCategorys: Category[];
  setSelectedCategorys: any;
  onlyChoice?: boolean;
  closePopover?: Function;
  setCategory?: Function;
}

export const CategoryListItem = memo(
  function ListItem({
    category,
    selectedCategorys,
    setSelectedCategorys,
    onlyChoice,
    closePopover,
    setCategory,
  }: ICategoryListItem) {
    const handleChangeSelectedCategorys = () => {
      const newChecked = !selectedCategorys
        .map((p) => p.id)
        .includes(category.id);

      onlyChoice
        ? setSelectedCategorys([category])
        : setSelectedCategorys((preState: Category[]) =>
            newChecked
              ? [...preState, category]
              : preState.filter((p) => p.id !== category.id)
          );

      typeof closePopover === "function" && closePopover();
      typeof setCategory === "function" && setCategory(category);
    };

    return (
      <div
        className={`ot-select-item`}
        onClick={(e) => handleChangeSelectedCategorys()}
      >
        <Box
          borderBlockEndWidth="025"
          borderColor="border"
          paddingBlockStart="200"
          paddingBlockEnd="200"
          paddingInlineStart="400"
          paddingInlineEnd="400"
        >
          <InlineStack
            gap={"400"}
            align="start"
            blockAlign="center"
            wrap={false}
          >
            {onlyChoice ? (
              <RadioButton
                value={`${category.id}`}
                ariaDescribedBy="category"
                label={category.name}
                labelHidden
                checked={selectedCategorys
                  .map((p) => p.id)
                  .includes(category.id)}
                onChange={() => {
                  handleChangeSelectedCategorys();
                  typeof closePopover === "function" && closePopover();
                }}
              />
            ) : (
              <Checkbox
                value={`${category.id}`}
                label={category.name}
                labelHidden
                onChange={handleChangeSelectedCategorys}
                checked={selectedCategorys
                  .map((p) => p.id)
                  .includes(category.id)}
              />
            )}

            <Text as="span" variant="bodyMd" truncate>
              {category.name}
            </Text>
          </InlineStack>
        </Box>
      </div>
    );
  },
  (prevProps, nextProps) => {
    const nextCategoryIds = nextProps.selectedCategorys.map((p) => p.id);
    const prevCategoryIds = prevProps.selectedCategorys.map((p) => p.id);
    const nextDifferentCategorys = nextCategoryIds.filter(
      (item) => !prevCategoryIds.includes(item)
    );
    const prevDifferentCategorys = prevCategoryIds.filter(
      (item) => !nextCategoryIds.includes(item)
    );
    const differentCategorys = [
      ...nextDifferentCategorys,
      ...prevDifferentCategorys,
    ];

    return !differentCategorys.includes(nextProps.category.id);
  }
);

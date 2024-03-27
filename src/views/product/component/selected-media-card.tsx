import {
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  InlineStack,
  Text,
  Thumbnail,
} from "@shopify/polaris";
import { DeleteIcon, ImageIcon } from "@shopify/polaris-icons";
import { memo } from "react";
import { ECloudinary } from "../../../constants";

interface ISelectedMediaCard {
  imageUrl: string;
  filename: string;
  setImage: Function;
}



export default memo(function SelectedMediaCard(props: ISelectedMediaCard) {
  const { imageUrl, filename, setImage } = props;



  const handleUpload = async (file: any) => {
    console.log("Duog")
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('upload_preset', ECloudinary.CLOUDINARY_UPLOAD_PRESET); // Set your upload preset

    const cloudName = ECloudinary.CLOUDINARY_CLOUD_NAME; // Replace with your Cloudinary cloud name
    const apiKey = ECloudinary.CLOUDINARY_API_KEY; // Replace with your Cloudinary API key
    const apiSecret = ECloudinary.CLOUDINARY_API_SECRET; // Replace with your Cloudinary API secret

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}` // Encode API key and secret correctly
      }
    });

    const data = await response.json();
    console.log(data);
    setImage(data.secure_url);
  };

  return (
    <Box
      borderColor="border"
      borderWidth="025"
      borderRadius="200"
      padding={"300"}
    >
      <InlineStack
        wrap={false}
        gap={"200"}
        blockAlign="center"
        align="space-between"
      >
        <Box width="calc(100% - 150px)">
          <InlineStack
            wrap={false}
            gap={"200"}
            blockAlign="center"
            align="start"
          >
            <Thumbnail
              size="large"
              source={imageUrl ? imageUrl : ImageIcon}
              alt="Onetick upsell checkbox"
            />
            <Box width="100%">
              <BlockStack gap={"100"} inlineAlign="start">
                <Box width="100%">
                  <Text as="span" variant="bodySm" truncate>
                    {filename}
                  </Text>
                </Box>
              </BlockStack>
            </Box>
          </InlineStack>
        </Box>
        <ButtonGroup>
          <input
            type="file"
            id="upload-file"
            style={{ display: "none" }}
            accept="image/gif, image/jpg ,image/jpeg, image/png"
            multiple={false}
            onChange={(e: any) => {
              const file = e.target.files[0];
              handleUpload(file);
            }}
          />
          <label
            htmlFor="upload-file"
            className="Polaris-Button Polaris-Button--pressable Polaris-Button--variantSecondary Polaris-Button--sizeMedium Polaris-Button--textAlignCenter"
            style={{ fontSize: 12 }}
          >
            Chỉnh sửa
          </label>

          <Button
            icon={DeleteIcon}
            onClick={() => {
              setImage(() => "");
            }}
          />
        </ButtonGroup>
      </InlineStack>
    </Box>
  );
});

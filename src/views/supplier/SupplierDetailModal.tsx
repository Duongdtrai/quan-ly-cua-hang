import { FormLayout, Modal, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SUPPLIER_API } from "../../constants/api";
import { Supplier } from "../../interface";
import { randomInt } from "crypto";

interface SupplierDetailModalProps {
  active: boolean;
  onDismiss: () => void;
  supplier?: Supplier;
  addNewSuppliers: (supplier: Supplier) => void;
}

const SupplierDetailModal = ({
  active,
  onDismiss,
  supplier,
  addNewSuppliers,
}: SupplierDetailModalProps) => {
  const queryParameters = new URLSearchParams(window.location.search);
  const supplierId = queryParameters.get("id");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const onChangeName = (value: string) => setName(value);
  const onChangeEmail = (value: string) => setEmail(value);
  const onChangePhoneNumber = (value: string) => setPhoneNumber(value);
  const onChangeNotes = (value: string) => setNote(value);
  const onChangeAddress = (value: string) => setAddress(value);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setNote("");
    setAddress("");
    setNameError("");
    setEmailError("");
    setPhoneNumberError("");
  };

  const onCancel = () => {
    resetForm();
    onDismiss();
  };

  const onSubmit = async () => {
    const _supplier = {
      name,
      email,
      phoneNumber,
      address,
      note,
      id: Math.random() * 1000,
    };
    const response = await axios.post(SUPPLIER_API, supplier);
    if (response.status === 200) {
      addNewSuppliers(_supplier);
      onDismiss();
      resetForm();
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    if (supplierId) {
      axios
        .get(`${SUPPLIER_API}/${supplierId}`)
        .then((response) => response.data)
        .then((response) => {
          const data = response.data;
          setName(data.name);
          setAddress(data.address);
          setPhoneNumber(data.phoneNumber);
          setNote(data.note);
          setEmail(data.email);
        })
        .catch((error) => {});
    }
  });

  return (
    <Modal
      instant
      open={active}
      onClose={onDismiss}
      title={supplierId ? "Supplier Detail" : "New Supplier"}
      primaryAction={{
        content: "Save",
        onAction: onSubmit,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onCancel,
        },
      ]}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            requiredIndicator
            label="Tên nhà cung cấp"
            type="text"
            value={name}
            onChange={onChangeName}
            autoComplete="off"
            error={nameError}
          />
          <TextField
            requiredIndicator
            label="Email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            autoComplete="off"
            error={emailError}
          />
          <TextField
            requiredIndicator
            label="Số điện thoại"
            type="tel"
            value={phoneNumber}
            onChange={onChangePhoneNumber}
            autoComplete="off"
            error={phoneNumberError}
          />
          <TextField
            label="Địa chỉ"
            type="text"
            value={address}
            onChange={onChangeAddress}
            autoComplete="off"
          />
          <TextField
            label="Ghi chú"
            type="text"
            value={note}
            onChange={onChangeNotes}
            autoComplete="off"
            maxLength={500}
            multiline={5}
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
};

export default SupplierDetailModal;

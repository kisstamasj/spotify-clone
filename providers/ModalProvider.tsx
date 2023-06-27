"use client";

import React, { useEffect, useState } from "react";
import AuthModal from "../components/authmodal";
import UploadModal from "../components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "@/libs/types";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;

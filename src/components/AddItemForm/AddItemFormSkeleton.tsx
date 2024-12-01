import React from "react";
import s from "./AddItemFormSkeleton.module.css";
import { Skeleton } from "@mui/material";

export const AddItemFormSkeleton = () => {
  return (
    <div className={s.addItemSkeletonWrapper}>
      <div className={s.inputSkeleton}>
        <Skeleton height={20} width={80}/>
        <Skeleton height={36} width={20}/>
      </div>
    </div>
  );
};
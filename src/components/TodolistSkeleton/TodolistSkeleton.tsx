import React from 'react';
import s from "./TodolistSkeleton.module.css"
import { Skeleton } from "@mui/material";

export const TodolistSkeleton = () => {
  return (
    <div className={s.todolistSkeletonWrapper}>
      <div className={s.todosSkeletonHeader}>
        <div className={s.todosSkeletonHeaderLeftSide}>
          <Skeleton width={18} height={34}/>
          <div className={s.todosSkeletonHeaderText}>
            <Skeleton width={100} height={24}/>
            <Skeleton width={50} height={18}/>
          </div>
        </div>
      </div>
    </div>
  );
};
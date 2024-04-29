import style from "./pagination.module.scss";
import { ReactNode } from "react";
import cn from "classnames";

const ButtonPagination = ({
  children,
  onClick,
  isActive,
}: {
  children: ReactNode;
  onClick: () => void;
  isActive?: boolean;
}) => {
  return (
    <button
      className={cn(style.button, { [style.buttonActive]: isActive })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface IPagination {
  props: {
    page: number;
    pageSize: number;
    pageQty: number;
    totalItems: number;
  };
  changePage: (page: number) => void;
  classname?: string | undefined;
}

export const Pagination = ({ props, changePage }: IPagination) => {
  function handleChangePage(page: number) {
    changePage(page);
  }

  return (
    <div className={style.paginationContainer}>
      {props.page > 1 ? (
        <ButtonPagination onClick={() => handleChangePage(props.page - 1)}>
          Previous
        </ButtonPagination>
      ) : (
        ""
      )}
      {Array.from(new Array(props.pageQty)).map((_, index) => (
        <ButtonPagination
          key={index}
          onClick={() => handleChangePage(index + 1)}
          isActive={index + 1 === props.page}
        >
          {index + 1}
        </ButtonPagination>
      ))}
      {props.page < props.pageQty ? (
        <ButtonPagination onClick={() => handleChangePage(props.page + 1)}>
          Next
        </ButtonPagination>
      ) : (
        ""
      )}
    </div>
  );
};

import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getReport } from "../../redux/reportTable";
import { reportItems } from "../../redux/reportTable/constants";
import { EditingRow } from "./types";
import EmptyRow from "./EmptyRow";
import RowData from "./RowData";
import Loading from "../Loading/Loading";

const Table = () => {
  const dispatch = useAppDispatch();
  const dataRow = useAppSelector((state) => state.report.dataReport);
  const { error, status } = useAppSelector((state) => state.report);

  const [editingRow, setEditingRow] = useState<EditingRow | undefined>();

  useEffect(() => {
    dispatch(getReport(reportItems.CMP.GET_ROWS));
  }, []);
  return (
    <>
      <div className={styles["header-table"]}>
        <h1>Строительно-монтажные работы</h1>
        {error && <div className={styles.error}>Ошибка: {error}</div>}
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {[
              "Уровень",
              "Наименование работ",
              "Основная з/п",
              "Оборудование",
              "Накладные расходы",
              "Сметная прибыль",
            ].map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        {status === "loading" ? (
          <Loading />
        ) : (
          <tbody className={styles.tbody}>
            {dataRow.length > 0 ? (
              dataRow.map((row: any) => (
                <RowData
                  key={row.id}
                  row={row}
                  editingRow={editingRow}
                  setEditingRow={setEditingRow}
                />
              ))
            ) : (
              <EmptyRow setEditingRow={setEditingRow} />
            )}
          </tbody>
        )}
      </table>
    </>
  );
};

export default Table;

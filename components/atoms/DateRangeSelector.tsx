"use client";


import React from "react";
import { useContext } from "react";
import { YearMonthContext, YearMonthContextProvider } from "@/contexts/YearMonthContext";
import { Period } from "@/contexts/YearMonthContext";


type PeriodType = Pick<YearMonthContext, "period" | "setPeriod">;

export const DateRangeSelector= () => {
 const context  = useContext(YearMonthContextProvider);
 if (!context) {
    throw new Error(
      'DateRangeSelector must be used within YearMonthContextProvider'
    );
  }
    const { period, setPeriod } :PeriodType  = context;
  // const [period, setPeriod] = useState<PeriodType>("month");

  const onChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
    // ここで新しい期間を設定するロジックを追加できます
    
  };
  return (
    <div>
      <label htmlFor="period" style={{ marginRight: "8px" }}>
        表示期間:
      </label>
      <select
        id="period"
        value={period}
        onChange={(e) => onChange(e.target.value as Period)}
      >
        <option value="week">週</option>
        <option value="month">月</option>
      </select>
    </div>
  );
};

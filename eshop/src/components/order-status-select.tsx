"use client";

type Props = {
  status: string;
  onChange: (value: string) => void;
};

const statuses = ["pending", "paid", "shipped", "delivered", "cancelled"];

export function OrderStatusSelect({ status, onChange }: Props) {
  return (
    <label className="block text-sm text-slate-700">
      <span className="block mb-2 font-semibold text-slate-900">Order status</span>
      <select
        value={status}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none"
      >
        {statuses.map((statusOption) => (
          <option key={statusOption} value={statusOption}>
            {statusOption}
          </option>
        ))}
      </select>
    </label>
  );
}

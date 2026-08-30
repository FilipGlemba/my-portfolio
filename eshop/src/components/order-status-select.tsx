"use client";

type Props = {
  status: string;
  onChange: (value: string) => void;
};

const statuses = ["pending", "paid", "shipped", "delivered", "cancelled"];

export function OrderStatusSelect({ status, onChange }: Props) {
  return (
    <label className="block text-sm text-black/70">
      <span className="mb-2 block font-semibold text-ink">Order status</span>
      <select
        value={status}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 focus:border-flame-500 focus:outline-none"
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

const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

function format(price: number) {
  return formatter.format(price / 100);
}

export function Price({ value }: { value: number }) {
  return <span className="font-black opacity-80">{format(value)}</span>;
}

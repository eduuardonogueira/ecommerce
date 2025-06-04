export function priceFormater(value: number, format: "money" | "percent") {

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  if (format === "money") {
    return `R$ ${formatter.format(value)}`

  } else {
    return `-${value}%`
  }

}
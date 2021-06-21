export default function summaryText(descriptions, length) {
  return descriptions.length > length ? `${descriptions.substring(0, length)} ...` : descriptions;
}

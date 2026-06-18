export function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "ahora";
  if (minutes < 60) return `hace ${minutes} min`;
  if (hours < 24) return `hace ${hours}h`;
  if (days === 1) return "ayer";
  if (days < 30) return `hace ${days} días`;
  return new Date(date).toLocaleDateString("es-MX");
}

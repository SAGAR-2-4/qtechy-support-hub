function Badge({ text }) {
  const styles = {
    Open: "bg-blue-100 text-blue-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Resolved: "bg-green-100 text-green-700",
    Closed: "bg-slate-100 text-slate-700",
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    Urgent: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
        styles[text] || "bg-slate-100 text-slate-700"
      }`}
    >
      {text}
    </span>
  );
}

export default Badge;
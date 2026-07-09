export function getApiErrorMessage(error) {
  if (error?.code === "P1001" || String(error?.message || "").includes("Can't reach database server")) {
    return "Cannot connect to the database. Check that the TiDB Cloud cluster is running, public access is enabled, and your IP address is allowed.";
  }

  return "Something went wrong. Please try again.";
}

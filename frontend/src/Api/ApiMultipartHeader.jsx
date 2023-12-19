export default function ApiMultipartHeader() {
    let token = window.localStorage.getItem("token");
    const header = {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
        "API-KEY" : "7cc66b30-e913-4c23-a368-a0531f9b28a9"
      },
    };
    return header;
  }
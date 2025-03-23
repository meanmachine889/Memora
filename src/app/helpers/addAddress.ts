export default async function AddAddress({id, address} : {id: string, address: string}) {
  const res = await fetch("/api/add-address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, address }),
  });
  return res;
}
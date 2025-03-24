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

export async function AddIpfs({courseId, uri} : {courseId: string, uri: string}) {
  const res = await fetch("/api/add-ipfs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ courseId, uri }),
  });
  return res;
}

export async function getNFTs({id} : {id: string}) {
  const res = await fetch(`/api/get-nft?id=${id}`);
  return res.json();
}
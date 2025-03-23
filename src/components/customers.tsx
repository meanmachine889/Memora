"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Customers() {
  const [tokens] = useState([
    {
      id: "TKN-001",
      address: "0x1a2b3c4d5e6f7g8h9i0j",
      expirationDate: "2025-06-15",
    },
    {
      id: "TKN-002",
      address: "0x9i8h7g6f5e4d3c2b1a0",
      expirationDate: "2025-07-22",
    },
    {
      id: "TKN-003",
      address: "0x2b3c4d5e6f7g8h9i0j1a",
      expirationDate: "2025-05-30",
    },
    {
      id: "TKN-004",
      address: "0x8h9i0j1a2b3c4d5e6f7g",
      expirationDate: "2025-08-10",
    },
    {
      id: "TKN-005",
      address: "0x3c4d5e6f7g8h9i0j1a2b",
      expirationDate: "2025-09-05",
    },
  ])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="border-2 rounded-lg overflow-hidden w-[100%]">
      <Table>
        <TableHeader className="">
          <TableRow className="">
            <TableHead className="text-gray-400 font-normal text-md">Token ID</TableHead>
            <TableHead className="text-gray-400 font-normal text-md">Address</TableHead>
            <TableHead className="text-gray-400 font-normal text-md">Expiration Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token) => (
            <TableRow key={token.id} className="hover:bg-[#101010]">
              <TableCell className="font-medium text-gray-300">{token.id}</TableCell>
              <TableCell className="text-gray-400 font-mono text-sm">
                {token.address.length > 15
                  ? `${token.address.substring(0, 6)}...${token.address.substring(token.address.length - 4)}`
                  : token.address}
              </TableCell>
              <TableCell className="text-gray-400">{formatDate(token.expirationDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


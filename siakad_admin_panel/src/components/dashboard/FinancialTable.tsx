import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  name: string;
  amount: string;
  status: "VALIDATED" | "PENDING" | "REJECTED";
  date: string;
}

const transactions: Transaction[] = [
  {
    id: "20240105",
    name: "Alexander Wright",
    amount: "$1,250.00",
    status: "VALIDATED",
    date: "Oct 12, 2023",
  },
  {
    id: "20240112",
    name: "Sophie Chen",
    amount: "$840.00",
    status: "PENDING",
    date: "Oct 11, 2023",
  },
  {
    id: "20240215",
    name: "Marcus Aurelius",
    amount: "$1,250.00",
    status: "VALIDATED",
    date: "Oct 10, 2023",
  },
  {
    id: "20240301",
    name: "Elena Gilbert",
    amount: "$450.00",
    status: "REJECTED",
    date: "Oct 09, 2023",
  },
];

export default function FinancialTable() {
  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "VALIDATED":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 shadow-none text-[11px] font-bold rounded">
            VALIDATED
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 shadow-none text-[11px] font-bold rounded">
            PENDING
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge className="bg-error-container text-on-error-container hover:bg-error-container shadow-none text-[11px] font-bold rounded">
            REJECTED
          </Badge>
        );
    }
  };

  return (
    <Card className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-none">
      <div className="p-lg border-b border-outline-variant flex justify-between items-center">
        <h4 className="font-headline-sm text-headline-sm text-primary">
          Financial Monitoring
        </h4>
        <Button
          variant="link"
          className="text-primary font-label-lg text-label-lg p-0 h-auto hover:underline"
        >
          View All Transactions
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full text-left border-collapse">
          <TableHeader className="bg-surface-container-low hover:bg-surface-container-low">
            <TableRow className="border-none">
              <TableHead className="px-lg py-md font-label-md text-label-md text-on-surface-variant h-auto">
                STUDENT ID
              </TableHead>
              <TableHead className="px-lg py-md font-label-md text-label-md text-on-surface-variant h-auto">
                NAME
              </TableHead>
              <TableHead className="px-lg py-md font-label-md text-label-md text-on-surface-variant h-auto">
                AMOUNT
              </TableHead>
              <TableHead className="px-lg py-md font-label-md text-label-md text-on-surface-variant h-auto">
                STATUS
              </TableHead>
              <TableHead className="px-lg py-md font-label-md text-label-md text-on-surface-variant h-auto">
                DATE
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-outline-variant">
            {transactions.map((tx) => (
              <TableRow
                key={tx.id}
                className="hover:bg-surface-container-high transition-colors group border-none"
              >
                <TableCell className="px-lg py-md font-body-sm text-body-sm h-auto">
                  {tx.id}
                </TableCell>
                <TableCell className="px-lg py-md font-label-lg text-label-lg h-auto">
                  {tx.name}
                </TableCell>
                <TableCell className="px-lg py-md font-body-sm text-body-sm h-auto">
                  {tx.amount}
                </TableCell>
                <TableCell className="px-lg py-md h-auto">
                  {getStatusBadge(tx.status)}
                </TableCell>
                <TableCell className="px-lg py-md font-body-sm text-body-sm h-auto">
                  {tx.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

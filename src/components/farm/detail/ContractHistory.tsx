'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contract } from "./types";

interface ContractHistoryProps {
  contracts: Contract[];
}

export function ContractHistory({ contracts }: ContractHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Client</th>
                <th className="pb-2">Start Date</th>
                <th className="pb-2">End Date</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Value</th>
                <th className="pb-2">Completion</th>
                <th className="pb-2">Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-3">{contract.client}</td>
                  <td>{new Date(contract.startDate).toLocaleDateString()}</td>
                  <td>{new Date(contract.endDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      contract.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {contract.status}
                    </span>
                  </td>
                  <td>${contract.value.toLocaleString()}</td>
                  <td>{contract.completionRate}%</td>
                  <td>{contract.satisfaction}/5</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
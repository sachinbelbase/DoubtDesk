import Button from "../common/Button";

function ReportRow({ report }) {
     return (
          <tr className="border-b hover:bg-gray-50 transition-colors">

               <td className="px-6 py-4 font-medium">
                    {report.question}
               </td>

               <td className="px-6 py-4">
                    {report.reportedBy}
               </td>

               <td className="px-6 py-4">
                    {report.reason}
               </td>

               <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                         {report.status}
                    </span>
               </td>

               <td className="px-6 py-4">
                    <Button
                         variant="outline"
                         size="sm"
                    >
                         Review
                    </Button>
               </td>

          </tr>
     );
}

export default ReportRow;
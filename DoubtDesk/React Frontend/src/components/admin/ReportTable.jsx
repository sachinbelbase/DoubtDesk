import ReportRow from "./ReportRow";

const reports = [
     {
          id: 1,
          question: "How to hack Wi-Fi?",
          reportedBy: "Teacher",
          reason: "Inappropriate",
          status: "Pending",
     },
     {
          id: 2,
          question: "React state issue",
          reportedBy: "Student",
          reason: "Spam",
          status: "Pending",
     },
     {
          id: 3,
          question: "Database normalization",
          reportedBy: "Teacher",
          reason: "Duplicate",
          status: "Resolved",
     },
];

function ReportTable() {
     return (
          <div className="bg-white rounded-xl shadow overflow-hidden">

               <table className="w-full">

                    <thead className="bg-gray-100">

                         <tr>

                              <th className="px-6 py-4 text-left">Question</th>

                              <th className="px-6 py-4 text-left">Reported By</th>

                              <th className="px-6 py-4 text-left">Reason</th>

                              <th className="px-6 py-4 text-left">Status</th>

                              <th className="px-6 py-4 text-left">Action</th>

                         </tr>

                    </thead>

                    <tbody>

                         {reports.map((report) => (
                              <ReportRow
                                   key={report.id}
                                   report={report}
                              />
                         ))}

                    </tbody>

               </table>

          </div>
     );
}

export default ReportTable;
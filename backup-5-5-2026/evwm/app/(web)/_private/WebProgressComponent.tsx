// "use client";

// import { Progress } from "@/shadcn/ui/progress";
// import { ReactNode } from "react";

// export default function WebProgressComponent({
//   progressValue = 50,
//   progressShow = true,
//   progressContent,
// }: {
//   progressValue?: number;
//   progressShow?: boolean;
//   progressContent?: ReactNode;
// }) {
//   return (
//     <div>
//       <div className="flex flex-col gap-1">
//         <Progress
//           className="*:data-[slot=progress-indicator]:bg-ev-1"
//           value={progressValue}
//         />
//         {progressShow && (
//           <p className="text-ev-1 text-right font-medium">
//             {progressValue}% Completed
//           </p>
//         )}
//         {progressContent}
//       </div>
//     </div>
//   );
// }

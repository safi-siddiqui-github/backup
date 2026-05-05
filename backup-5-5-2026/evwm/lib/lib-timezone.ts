// import z from "zod";
// import { RHFDataType } from "./lib-react-hook-form";

// export const RHFTimezoneValidation = z.string().min(3, "Select a timezone");

// export function TimezoneRHFHelper(): RHFDataType[] {
//   const timeZones = Intl.supportedValuesOf("timeZone");

//   const zones = timeZones.map<RHFDataType>((tz) => {
//     const now = new Date();
//     const formatter = new Intl.DateTimeFormat("en-US", {
//       timeZone: tz,
//       timeZoneName: "shortOffset",
//     });

//     const offset = formatter
//       .formatToParts(now)
//       .find((p) => p.type === "timeZoneName")?.value;

//     return {
//       value: tz,
//       label: `(UTC${offset?.replace("GMT", "")}) ${tz}`,
//     };
//   });

//   return zones;
// }

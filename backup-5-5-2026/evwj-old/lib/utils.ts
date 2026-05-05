import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Recursive using lodash
// const getAllValues = (obj: object): string[] =>
//   lodash.flatMapDeep(obj, (value: object) =>
//     lodash.isObject(value) ? getAllValues(value) : value,
//   );

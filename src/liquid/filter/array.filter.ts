import type { LiquidFilter } from "./filter.types";

export const arrayFilters: LiquidFilter[] = [
  {
    label: "compact",
    detail: "array | compact",
    acceptedTypes: ["array"],
    documentation: "Removes any nil values from an array.",
  },
  {
    label: "concat",
    detail: "array1 | concat: array2",
    acceptedTypes: ["array"],
    documentation:
      "Concatenates (joins together) multiple arrays. The resulting array contains all the items from the input arrays.",
    insertText: "concat: ${1}",
  },
  {
    label: "find",
    detail: "array | find: property, value",
    acceptedTypes: ["array"],
    documentation:
      "Return the first object in an array for which the queried attribute has the given value or return nil if no item in the array satisfies the given criteria.",
    insertText: 'find: "${1}", ${2}',
  },
  {
    label: "find_index",
    detail: "array | find_index: property, value",
    acceptedTypes: ["array"],
    documentation:
      "Return the 0-based index of the first object in an array for which the queried attribute has the given value or return nil if no item in the array satisfies the given criteria.",
    insertText: 'find_index: "${1}", ${2}',
  },
  {
    label: "first",
    detail: "array | first",
    acceptedTypes: ["array"],
    documentation: "Returns the first item of an array.",
  },
  {
    label: "has",
    detail: "array | has: property, value",
    acceptedTypes: ["array"],
    documentation:
      "Tests if any item in an array has a specific property value. This requires you to provide both the property name and the associated value.",
    insertText: 'has: "${1}", ${2}',
  },
  {
    label: "join",
    detail: "array | join: separator",
    acceptedTypes: ["array"],
    documentation:
      "Combines all of the items in an array into a single string. You can specify a custom separator for the joined items.",
  },
  {
    label: "last",
    detail: "array | last",
    acceptedTypes: ["array"],
    documentation: "Returns the last item of an array.",
  },
  {
    label: "map",
    detail: "array | map: property",
    acceptedTypes: ["array"],
    documentation: "Creates an array of values from a specific property of the items in an array.",
    insertText: 'map: "${1}"',
  },
  {
    label: "reject",
    detail: "array | reject: property, value",
    acceptedTypes: ["array"],
    documentation:
      "Filters an array to exclude items with a specific property value. This requires you to provide both the property name and the associated value.",
    insertText: 'reject: "${1}", ${2}',
  },
  {
    label: "reverse",
    detail: "array | reverse",
    acceptedTypes: ["array"],
    documentation: "Reverses the order of the items in an array.",
  },
  {
    label: "size",
    detail: "array | size",
    acceptedTypes: ["array", "string"],
    documentation: "Returns the size of a string or array.",
  },
  {
    label: "sort",
    detail: "array | sort: property",
    acceptedTypes: ["array"],
    documentation: "Sorts the items in an array in case-sensitive alphabetical, or numerical, order.",
  },
  {
    label: "sum",
    detail: "array | sum: property",
    acceptedTypes: ["array"],
    documentation: "Returns the sum of all elements in an array.",
  },
  {
    label: "uniq",
    detail: "array | uniq",
    acceptedTypes: ["array"],
    documentation: "Removes any duplicate items in an array.",
  },
  {
    label: "where",
    detail: "array | where: property, value",
    acceptedTypes: ["array"],
    documentation:
      "Filters an array to include only items with a specific property value. This requires you to provide both the property name and the associated value.",
  },
];

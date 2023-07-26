export default function objectHasFields(obj: object, fields: string[]) {
  return fields.every((field) => obj.hasOwnProperty(field));
}

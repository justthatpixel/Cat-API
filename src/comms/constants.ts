export enum PouchSize {
  a = 'A',
  b = 'B',
  c = 'C',
  d = 'D',
  e = 'E',
  f = 'F',
}

export const pouchSizePrices: { [key in PouchSize]: number } = {
  [PouchSize.a]: 55.5,
  [PouchSize.b]: 59.5,
  [PouchSize.c]: 62.75,
  [PouchSize.d]: 66.0,
  [PouchSize.e]: 69.0,
  [PouchSize.f]: 71.25,
};

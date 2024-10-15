export default function makeFirstLetterUppercase(str = 'hola mundo') {
  const arr = str.split('');
  arr.splice(0, 1, arr[0].toUpperCase());
  const strFinal = arr.join('');
  return strFinal;
}

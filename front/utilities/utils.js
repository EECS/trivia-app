// Helper function to randomize position of correct/incorrect answers in question array
export function shuffledArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper function to normalize/decode characters/text (note: this requires a changed URL in the API call in include "&encode=base64" param)
export function decodeText(str) {
  let decodedStr = window.atob(str);
  return decodedStr;
}

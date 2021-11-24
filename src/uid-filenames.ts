export function generateOutputPictName() {
  const S4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(2);

  const d = new Date();
  return `${d.getFullYear()}/${
    d.getMonth() + 1
  }/${d.getDate()}/${S4()}-${S4()}-${S4()}-${S4()}`;
}

export function getFileExtension(fname: string): string {
  const i = fname.lastIndexOf(".");
  if (i === -1) return "";
  return fname.slice(i + 1);
}

export function getFileName(fname: string): string {
  const i = fname.lastIndexOf(".");
  if (i === -1) return fname;
  return fname.slice(0, i);
}

export function createUniqueFnames(files: Array<File>): Array<string> {
  const newNames2 = [];
  for (let i = 0; i < files.length; i++) {
    newNames2.push(
      generateOutputPictName() + "." + getFileExtension(files[i].name)
    );
  }
  return newNames2;
}

// на всякий случай
function createGuid() {
  const S4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(2);
  return `${S4()}-${S4()}-${S4()}-${S4()}${S4()}`;
}

// Генерирует случайное имя в формате 2021/04/28/asda
export function generateOutputPictName_old() {
  const d = new Date();
  let a = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}/`;
  for (let i = 1; i < 14; i++) {
    a += Math.floor(Math.random() * 16).toString(16);
  }
  return a;
}

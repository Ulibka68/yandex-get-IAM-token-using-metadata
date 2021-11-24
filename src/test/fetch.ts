import fetch from "node-fetch";

const metaDataUrlIamToken = "https://jsonplaceholder.typicode.com/todos/1";
const headers = { "Metadata-Flavor": "Google" };

async function getIam() {
  const resp = await fetch(metaDataUrlIamToken, {
    headers: headers,
  });
  const data = await resp.json();
  return data;
}

console.log("START *******************");
(async () => {
  console.log(await getIam());
})();

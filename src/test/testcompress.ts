require("dotenv").config();
import { compressImage } from "../ImageCompress";

// compressImage('pict26', 'imgs/pict1.jpg', 400, 400, 'png', { r: 46, g: 138, b: 138, alpha: 0 });
// 12 MB

async function runCompress() {
  // const retImgs = await compressImage("pict26", "imgs/20210323_070123.jpg");
  // const retImgs = await compressImage("pict26", "imgs/13mb.jpg");
  // const retImgs = await compressImage(
  //   "tmpc45254dfger66",
  //   "20210317_113328.jpg"
  // );
  const retImgs = await compressImage("tmpc45254dfger66", "13mb.jpg");
  console.log(retImgs);
}
runCompress();

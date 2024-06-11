import { readFileSync } from "fs";
import sharp from "sharp";
import satori from "satori";

export function OG({ title, imageURL }: { title: string, imageURL: string }
) {

  console.log(imageURL);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "1200px",
        scale: "50%",
        height: "630px",
        backgroundImage: `url(${imageURL})`,
        backgroundSize: "contain",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        alignItems: "center",
        position: "relative",
      }}
    >
    </div>
  );
}
const fontFilePath = `${process.cwd()}/public/fonts/GT-Ultra-Median-Black-Trial.otf`
const fontFile = readFileSync(fontFilePath);

export async function SVG(component: JSX.Element) {
  const svg = await satori(
    component,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'GT-ULTRA-BLACK',
          data: fontFile
        },
      ],
    },
  )
  return svg;
}
export async function PNG(component: JSX.Element) {
  return await sharp(Buffer.from(await SVG(component)))
    .png()
    .toBuffer();
}

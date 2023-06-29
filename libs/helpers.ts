import { Price } from "./types";

export const getUrl = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/";

  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return url;
};

export const postData = async ({
  url,
  data,
}: {
  url: string;
  data?: { price: Price };
}) => {
  console.log("POST REQUEST:", url, data);

  const res: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("Error in POST", { url, data });
    throw new Error(res.statusText);
  }

  return res.json();
};

export const toDateTime = (secs: number) => {
  var t = new Date("1970-01-01T00:30:00Z");
  t.setSeconds(secs);
  return t;
};

export const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const convertMsToTime = (milliseconds: number) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  let hoursString = hours ? `${padTo2Digits(hours)}:` : "";

  return `${hoursString}${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};

export const convertSecToTime = (seconds: number) => {
  seconds = Math.floor(seconds);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  let hoursString = hours ? `${padTo2Digits(hours)}:` : "";

  return `${hoursString}${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};

export const roundTo3Dec = (num: number) => Math.floor(num * 1000) / 1000;

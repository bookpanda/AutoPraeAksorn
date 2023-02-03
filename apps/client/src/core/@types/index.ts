import { NextPage } from "next";

export type MyPage<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  // TODO Implement
};

export type ImagesData = {
  data: {
    base64: string;
    code: number[][];
  }[];
};

export type CurrentImage = {
  base64: string;
  index: number;
  code: number[][];
};

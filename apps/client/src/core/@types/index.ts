import { NextPage } from "next";

import { z } from "zod";

export type MyPage<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  // TODO Implement
};

export const ImagesData = z.object({
  data: z
    .object({
      base64: z.string(),
      code: z.number().array().array(),
    })
    .array(),
});

export const CurrentImage = z.object({
  base64: z.string(),
  index: z.number(),
  code: z.number().array().array(),
});

export type ImagesData = z.infer<typeof ImagesData>;

export type CurrentImage = z.infer<typeof CurrentImage>;

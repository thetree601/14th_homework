import { z } from "zod";

// 게시글 작성용 스키마 (비밀번호 포함)
export const boardWriteSchema = z.object({
  writer: z.string().min(1, "필수입력 사항입니다."),
  password: z
    .string()
    .min(1, "필수입력 사항입니다.")
    .min(8, "비밀번호는 8자 이상 입력해 주세요.")
    .max(16, "비밀번호는 16자 이하로 입력해 주세요."),
  title: z
    .string()
    .min(1, "필수입력 사항입니다.")
    .min(2, "제목은 2자 이상 입력해 주세요."),
  contents: z.string().min(1, "필수입력 사항입니다."),
  youtubeUrl: z.string().optional(),
  boardAddress: z.object({
    zipcode: z.string().optional(),
    address: z.string().optional(),
    addressDetail: z.string().optional(),
  }).optional(),
  images: z.array(z.string()).optional(),
});

// 게시글 수정용 스키마 (비밀번호 제외)
export const boardEditSchema = z.object({
  writer: z.string().min(1, "필수입력 사항입니다."),
  title: z
    .string()
    .min(1, "필수입력 사항입니다.")
    .min(2, "제목은 2자 이상 입력해 주세요."),
  contents: z.string().min(1, "필수입력 사항입니다."),
  youtubeUrl: z.string().optional(),
  boardAddress: z.object({
    zipcode: z.string().optional(),
    address: z.string().optional(),
    addressDetail: z.string().optional(),
  }).optional(),
  images: z.array(z.string()).optional(),
});

// 수정 시 비밀번호 검증용 스키마
export const passwordValidationSchema = z.object({
  password: z
    .string()
    .min(1, "비밀번호를 입력해 주세요.")
    .min(8, "비밀번호는 8자 이상 입력해 주세요.")
    .max(16, "비밀번호는 16자 이하로 입력해 주세요."),
});

export type BoardWriteFormData = z.infer<typeof boardWriteSchema>;
export type BoardEditFormData = z.infer<typeof boardEditSchema>;
export type PasswordValidationData = z.infer<typeof passwordValidationSchema>;

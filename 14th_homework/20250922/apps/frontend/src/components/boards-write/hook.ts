"use client";

import { useEffect, useState, useMemo } from "react";
import { useMutation, useQuery, ApolloError, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateBoardDocument, UpdateBoardDocument, FetchBoardForEditDocument } from "@/commons/graphql/graphql";
import { FETCH_BOARD_DETAIL } from "../boards-detail/detail/queries";
import type { BoardsWriteProps, UpdateBoardInput } from "./types";
import { boardWriteSchema, boardEditSchema, passwordValidationSchema, type BoardWriteFormData, type BoardEditFormData, type PasswordValidationData } from "./schema";

// 파일 업로드 GraphQL 쿼리
const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

interface ModalState {
  isOpen: boolean;
  message: string;
  isPrompt: boolean;
  input: string;
  navigatePath: string | null;
  resolve: ((value: string | null) => void) | null;
}

export function useBoardsWrite(props: BoardsWriteProps) {
  const router = useRouter();

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const { data, loading, error } = useQuery(FetchBoardForEditDocument, {
    variables: { boardId: props.boardId as string },
    skip: !props.isEdit || !props.boardId,
  });

  // React Hook Form 설정 - 수정 모드에 따라 다른 스키마 사용
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm<BoardWriteFormData | BoardEditFormData>({
    resolver: zodResolver(props.isEdit ? boardEditSchema : boardWriteSchema),
    defaultValues: {
      writer: "",
      ...(props.isEdit ? {} : { password: "" }), // 수정 모드가 아닐 때만 password 포함
      title: "",
      contents: "",
      youtubeUrl: "",
      boardAddress: {
        zipcode: "",
        address: "",
        addressDetail: "",
      },
      images: ["", "", ""],
    },
  });

  const [images, setImages] = useState<string[]>(["", "", ""]);
  const [isPostcodeModalOpen, setIsPostcodeModalOpen] = useState(false);

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: "",
    isPrompt: false,
    input: "",
    navigatePath: null,
    resolve: null,
  });

  useEffect(() => {
    if (props.isEdit && data && data.fetchBoard) {
      const boardData = data.fetchBoard;
      reset({
        writer: boardData.writer ?? "",
        title: boardData.title ?? "",
        contents: boardData.contents ?? "",
        youtubeUrl: boardData.youtubeUrl ?? "",
        boardAddress: {
          zipcode: boardData.boardAddress?.zipcode ?? "",
          address: boardData.boardAddress?.address ?? "",
          addressDetail: boardData.boardAddress?.addressDetail ?? "",
        },
        images: boardData.images ?? ["", "", ""],
      });
      setImages(boardData.images ?? ["", "", ""]);
    }
  }, [props.isEdit, data, reset]);

  const watchedValues = watch();
  
  const isFormValid = useMemo(() => {
    // 수정 모드에서는 비밀번호 검증을 제외
    if (props.isEdit) {
      return watchedValues.writer?.trim() && watchedValues.title?.trim() && watchedValues.contents?.trim();
    }
    // 새 게시글 작성 모드에서는 모든 필드 검증
    return watchedValues.writer?.trim() && watchedValues.password?.trim() && watchedValues.title?.trim() && watchedValues.contents?.trim();
  }, [watchedValues, props.isEdit]);

  const onChangeYoutubeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("youtubeUrl", event.target.value);
  };

  const onChangeBoardAddressZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("boardAddress.zipcode", event.target.value);
  };

  const onChangeBoardAddressAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("boardAddress.address", event.target.value);
  };

  const onChangeBoardAddressAddressDetail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("boardAddress.addressDetail", event.target.value);
  };

  const onClickPostcodeSearch = () => {
    setIsPostcodeModalOpen(true);
  };

  const onCompletePostcode = (data: any) => {
    setValue("boardAddress.zipcode", data.zonecode);
    setValue("boardAddress.address", data.address);
    setIsPostcodeModalOpen(false);
  };

  const onClosePostcodeModal = () => {
    setIsPostcodeModalOpen(false);
  };

  const showAlert = (message: string, navigatePath: string | null = null) => {
    setModalState({
      isOpen: true,
      message,
      isPrompt: false,
      input: "",
      navigatePath,
      resolve: null,
    });
  };

  const showPrompt = (message: string): Promise<string | null> => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        message,
        isPrompt: true,
        input: "",
        navigatePath: null,
        resolve,
      });
    });
  };

  const handlePromptConfirm = () => {
    if (modalState.resolve) {
      modalState.resolve(modalState.input);
    }
    setModalState({ ...modalState, isOpen: false });
  };

  const handlePromptCancel = () => {
    if (modalState.resolve) {
      modalState.resolve(null);
    }
    setModalState({ ...modalState, isOpen: false });
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isOpen: false });
    if (modalState.navigatePath) {
      router.push(modalState.navigatePath);
    }
  };

  const onChangePromptInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModalState({ ...modalState, input: event.target.value });
  };

  const onSubmit = async (data: BoardWriteFormData) => {
    try {
      const createBoardInput = {
        writer: data.writer,
        password: data.password,
        title: data.title,
        contents: data.contents,
        youtubeUrl: data.youtubeUrl || "",
        boardAddress: {
          zipcode: data.boardAddress?.zipcode || "",
          address: data.boardAddress?.address || "",
          addressDetail: data.boardAddress?.addressDetail || "",
        },
        images: images.filter(img => img !== ""),
      };

      const result = await createBoard({
        variables: { createBoardInput },
      });
      showAlert("게시글이 성공적으로 등록되었습니다.", `/boards/${result.data.createBoard._id}`);
    } catch (error) {
      const apolloError = error as ApolloError;
      console.error(apolloError);
      showAlert(apolloError.message || "에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  const onClickUpdate = async () => {
    // 먼저 기존 에러들 클리어
    clearErrors();
    
    // 폼 유효성 검사 수행
    const currentValues = watch();
    try {
      boardEditSchema.parse(currentValues);
    } catch (error) {
      if (error && typeof error === 'object' && 'issues' in error) {
        const zodError = error as any;
        zodError.issues.forEach((issue: any) => {
          setError(issue.path[0] as keyof BoardEditFormData, {
            type: 'manual',
            message: issue.message
          });
        });
        return;
      }
      return;
    }

    const myPassword = await showPrompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요");
    if (!myPassword) return;

    // 비밀번호 유효성 검사
    try {
      passwordValidationSchema.parse({ password: myPassword });
    } catch (error) {
      if (error && typeof error === 'object' && 'issues' in error) {
        const zodError = error as any;
        const firstError = zodError.issues[0];
        if (firstError && firstError.message) {
          alert(firstError.message);
          return;
        }
      }
      alert("비밀번호를 확인해 주세요.");
      return;
    }

    try {
      const updateBoardInput: UpdateBoardInput = {};
      const originalData = data?.fetchBoard;

      if (currentValues.title !== originalData?.title) updateBoardInput.title = currentValues.title;
      if (currentValues.contents !== originalData?.contents) updateBoardInput.contents = currentValues.contents;
      if (currentValues.youtubeUrl !== originalData?.youtubeUrl) updateBoardInput.youtubeUrl = currentValues.youtubeUrl;
      if (
        currentValues.boardAddress?.zipcode !== originalData?.boardAddress?.zipcode ||
        currentValues.boardAddress?.address !== originalData?.boardAddress?.address ||
        currentValues.boardAddress?.addressDetail !== originalData?.boardAddress?.addressDetail
      ) {
        updateBoardInput.boardAddress = {
          zipcode: currentValues.boardAddress?.zipcode || "",
          address: currentValues.boardAddress?.address || "",
          addressDetail: currentValues.boardAddress?.addressDetail || "",
        };
      }
      // 이미지 배열 비교 - 빈 문자열 제거 후 비교
      const filteredImages = images.filter(img => img !== "");
      const originalImages = originalData?.images?.filter(img => img !== "") || [];
      
      console.log("현재 이미지 배열:", images);
      console.log("필터링된 이미지 배열:", filteredImages);
      console.log("원본 이미지 배열:", originalData?.images);
      console.log("필터링된 원본 이미지 배열:", originalImages);
      
      if (JSON.stringify(filteredImages) !== JSON.stringify(originalImages)) {
        updateBoardInput.images = filteredImages;
        console.log("이미지 변경 감지됨, 업데이트할 이미지:", filteredImages);
      }

      // 변경사항이 있는지 확인
      if (Object.keys(updateBoardInput).length === 0) {
        showAlert("변경된 내용이 없습니다.");
        return;
      }

      console.log("updateBoard API 호출 전 - updateBoardInput:", updateBoardInput);
      
      const result = await updateBoard({
        variables: {
          boardId: props.boardId as string,
          password: myPassword,
          updateBoardInput,
        },
        refetchQueries: [
          { 
            query: FetchBoardForEditDocument, 
            variables: { boardId: props.boardId as string } 
          },
          { 
            query: FETCH_BOARD_DETAIL, 
            variables: { boardId: props.boardId as string } 
          }
        ],
      });
      
      console.log("updateBoard API 호출 후 - result:", result);
      showAlert("수정 완료!", `/boards/${props.boardId}`);
    } catch (error) {
      const apolloError = error as ApolloError;
      console.error(apolloError);
      if (apolloError.graphQLErrors?.[0]?.message.includes("비밀번호가 일치하지 않습니다.")) {
        showAlert("비밀번호가 틀렸습니다.");
      } else {
        showAlert(apolloError.message);
      }
    }
  };

  const onClickCancel = () => router.push("/boards");

  return {
    router,
    data,
    loading,
    error,
    images,
    setImages,
    errors,
    register,
    handleSubmit,
    setError,
    clearErrors,
    onSubmit,
    onChangeYoutubeUrl,
    onChangeBoardAddressZipcode,
    onChangeBoardAddressAddress,
    onChangeBoardAddressAddressDetail,
    onClickPostcodeSearch,
    onCompletePostcode,
    onClosePostcodeModal,
    isPostcodeModalOpen,
    isFormValid,
    modalState,
    handleCloseModal,
    handlePromptConfirm,
    handlePromptCancel,
    onChangePromptInput,
    onClickUpdate,
    onClickCancel,
    uploadFile,
    watch,
  };
}
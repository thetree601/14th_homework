import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

interface Content {
  id: string;
  name: string;
  email: string;
  picture_url?: string;
  nat?: string;
  created_at: string;
}

export function useOpenApiNew() {
  const [content, setContent] = useState<Content>({
    id: "",
    name: "",
    email: "",
    picture_url: "",
    nat: "",
    created_at: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onClickSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from("contents").insert({
        name: content.name,
        email: content.email,
        picture_url: content.picture_url,
        nat: content.nat,
      });

      if (error) {
        setError(error.message);
      } else {
        setContent({
          id: "",
          name: "",
          email: "",
          picture_url: "",
          nat: "",
          created_at: "",
        });
      }
    } catch (err: any) {
      setError(err.message || "등록 중 에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = (field: keyof Content, value: string) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return { 
    content, 
    updateContent, 
    onClickSubmit, 
    isLoading, 
    error 
  };
}
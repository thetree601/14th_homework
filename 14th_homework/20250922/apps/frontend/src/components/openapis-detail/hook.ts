import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";

export function useOpenApiDetail(id: string) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("contents")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          setError("등록된 사용자를 찾을 수 없습니다.");
        } else {
          setUser(data);
        }
      } catch (err: any) {
        setError(err.message || "사용자를 불러오는 중 에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { user, isLoading, error };
}
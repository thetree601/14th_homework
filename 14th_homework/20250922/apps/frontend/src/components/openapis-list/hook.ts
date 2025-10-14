import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client"; 

export function useOpenApiList() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("contents")
          .select("*"); // 모든 데이터를 한 번에 가져옴

        if (error) {
          throw error;
        }
        
        setUsers(data || []);
      } catch (err) {
        setError(err.message || "사용자 목록을 불러오는 중 에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { users, isLoading, error };
}
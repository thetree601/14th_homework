// OpenApiDetail.tsx
import React, { useState } from "react"; // useState를 추가하세요.
import { useOpenApiDetail } from "./hook";
import { supabase } from "@/lib/supabase-client"; // supabase 클라이언트를 가져옵니다.
import { useRouter } from "next/navigation"; // 삭제 후 페이지 이동을 위해 추가합니다.
import styles from "./styles.module.css";
import type { Content } from "./types";

interface OpenApiDetailProps {
  id: string;
}

export default function OpenApiDetail({ id }: OpenApiDetailProps) {
  const { user, isLoading, error } = useOpenApiDetail(id);
  const router = useRouter();
  
  // 수정 기능을 위해 상태를 추가합니다.
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Content | null>(null);

  // 로딩, 에러 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>에러: {error}</div>;
  }
  if (!user) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  // 삭제 함수
  const handleDelete = async () => {
    if (!confirm("정말 이 사용자를 삭제하시겠습니까?")) return;
    try {
      const { error } = await supabase.from('contents').delete().eq('id', user.id);
      if (error) throw error;
      router.push("/openapis"); // 삭제 후 목록 페이지로 이동
    } catch (err: any) {
      alert("삭제 중 오류가 발생했습니다: " + err.message);
    }
  };

  // 수정 시작/취소 함수
  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user); // 현재 사용자 정보로 수정 상태 초기화
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(null);
  };

  // 수정 필드 변경 핸들러
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => prev ? { ...prev, [name]: value } : null);
  };

  // 수정 제출 함수
  const handleSave = async () => {
    if (!editedUser) return;
    try {
      const { error } = await supabase
        .from('contents')
        .update({
          name: editedUser.name,
          email: editedUser.email,
          picture_url: editedUser.picture_url,
          nat: editedUser.nat,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      alert("수정 완료되었습니다!");
      setIsEditing(false);
      // 페이지를 새로고침하여 수정된 정보를 반영할 수 있습니다.
      window.location.reload(); 
    } catch (err: any) {
      alert("수정 중 오류가 발생했습니다: " + err.message);
    }
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.profileCard}>
        {/* 수정 모드일 때와 아닐 때를 분기합니다 */}
        {isEditing ? (
          <div>
            <input 
              type="text" 
              name="name" 
              value={editedUser?.name || ''} 
              onChange={handleFieldChange} 
            />
            <input 
              type="text" 
              name="email" 
              value={editedUser?.email || ''} 
              onChange={handleFieldChange} 
            />
            <input 
              type="text" 
              name="picture_url" 
              value={editedUser?.picture_url || ''} 
              onChange={handleFieldChange} 
            />
            <input 
              type="text" 
              name="nat" 
              value={editedUser?.nat || ''} 
              onChange={handleFieldChange} 
            />
            <button onClick={handleSave}>저장</button>
            <button onClick={handleCancelEdit}>취소</button>
          </div>
        ) : (
          <div>
            <img
              src={user.picture_url}
              alt={user.name}
              className={styles.profileImage}
            />
            <div className={styles.profileInfo}>
              <h1 className={styles.name}>{user.name}</h1>
              <p className={styles.nat}>국적: {user.nat}</p>
              <p className={styles.email}>{user.email}</p>
            </div>
            {/* 수정 및 삭제 버튼을 추가합니다 */}
            <div className={styles.buttonGroup}>
              <button onClick={handleEdit}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
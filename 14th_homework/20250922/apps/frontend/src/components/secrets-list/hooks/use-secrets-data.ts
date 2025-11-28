import { useState, useEffect } from "react";
import { fetchHotSecrets, fetchSaleSecrets, fetchRecommendedSecrets } from "../queries";
import { Secret } from "../types";

export function useSecretsData() {
  const [hotSecrets, setHotSecrets] = useState<Secret[]>([]);
  const [saleSecrets, setSaleSecrets] = useState<Secret[]>([]);
  const [recommendedSecrets, setRecommendedSecrets] = useState<Secret[]>([]);
  const [loadingHot, setLoadingHot] = useState(true);
  const [loadingSale, setLoadingSale] = useState(true);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  useEffect(() => {
    async function loadSecrets() {
      // Hot Secrets 먼저 로딩 (가장 중요한 섹션)
      try {
        const hot = await fetchHotSecrets();
        setHotSecrets(hot);
      } catch (error) {
        console.error('Failed to load hot secrets:', error);
      } finally {
        setLoadingHot(false);
      }

      // Sale Secrets와 Recommended Secrets는 병렬로 로딩
      Promise.all([
        fetchSaleSecrets().then(sale => {
          setSaleSecrets(sale);
          setLoadingSale(false);
        }).catch(error => {
          console.error('Failed to load sale secrets:', error);
          setLoadingSale(false);
        }),
        fetchRecommendedSecrets().then(recommended => {
          setRecommendedSecrets(recommended);
          setLoadingRecommended(false);
        }).catch(error => {
          console.error('Failed to load recommended secrets:', error);
          setLoadingRecommended(false);
        })
      ]);
    }
    loadSecrets();
  }, []);

  return {
    hotSecrets,
    saleSecrets,
    recommendedSecrets,
    loadingHot,
    loadingSale,
    loadingRecommended,
  };
}


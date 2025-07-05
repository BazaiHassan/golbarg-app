// composables/useGolbargAi.ts
export interface Disease {
  disease_name: string;
  severity: string;
  affected_parts: string[];
  symptoms: string[];
  possible_causes: string[];
}

export interface TreatmentRecommendation {
  method: string;
  action: string;
  timing: string;
  notes: string;
}

export interface CareInstructions {
  watering: string;
  lighting: string;
  fertilization: string;
  environment: string;
}

export interface DiagnosisResult {
  plant_name: string;
  health_status: string;
  confidence_score: number;
  diseases_detected: Disease[];
  treatment_recommendations: TreatmentRecommendation[];
  prevention_tips: string[];
  care_instructions: CareInstructions;
}

export interface ApiResponse {
  output: {
    result: DiagnosisResult;
  };
  isSuccess: boolean;
}

export const useGolbargAi = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const result = ref<DiagnosisResult | null>(null);

  const diagnosePlant = async (imageFile: File): Promise<DiagnosisResult | null> => {
    isLoading.value = true;
    error.value = null;
    result.value = null;

    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlbElkIjoxMywidXNlcklkIjo5LCJpYXQiOjE3NDk1NTkxNzV9.Qr-8RLMpTON8ol5ayIC-SSHRZTyvwKeXAyJJcPQfeWc';
      const slug = 'tshkhys-bymary-hay-mhswlat-kshawrzy-j4f1xmra';
      
      const formData = new FormData();
      formData.append('input', imageFile);

      const response = await fetch(`https://api.mlgrid.com/v1/model/${slug}/exec`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.isSuccess && data.output?.result) {
        result.value = data.output.result;
        return data.output.result;
      } else {
        throw new Error('تشخیص ناموفق بود');
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'خطا در برقراری ارتباط با سرور';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    result.value = null;
    error.value = null;
    isLoading.value = false;
  };

  return {
    diagnosePlant,
    isLoading: readonly(isLoading),
    error: readonly(error),
    result: readonly(result),
    reset,
  };
};
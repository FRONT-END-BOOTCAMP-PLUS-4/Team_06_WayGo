"use client";
import styles from "./edit.module.scss";
import TextInput from "@/components/textInput/TextInput";
import SelectBasic from "@/components/selectBasic/selectBasic";
import Button from "@/components/button/Button";
import FileBox from "@/member/plans/create/components/fileBox/FileBox";
import Editor from "@/member/plans/create/components/editor/Editor";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/inputError/InputError";
import { useAuthStore } from "stores/authStore";
import { CreatePlanDto } from "application/usecases/plans/dto/CreatePlanDto";
import { AddPlanImgDto } from "application/usecases/planImg/dto/AddPlanImgDto";
import { useCategoryStore } from "stores/categoryStore";
import uploadImage from "utils/uploadImage";
import { useEffect, useState } from "react";
import LoadingArea from "@/components/loadingArea/LoadingArea";

interface PlanFormData {
  title: string;
  durationId: number;
  budgetId: number;
  locationId: number;
  seasonId: number;
  mainImage: FileList;
  subImages: FileList;
  schedule: string;
  details: string;
  travelTips: string;
}

const EditPlan: React.FC = () => {
  const router = useRouter();

  // category 값을 useCategoryStore 에서 획득
  const { categoryOptions } = useCategoryStore();
  // 사용자 id 값 획득
  const { id: userId } = useAuthStore();

  const { id: planId } = useParams();

  // 사용자 id 값이 획득 되었는지 확인 상태
  const [isReady, setIsReady] = useState(false);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PlanFormData>({
    mode: "onChange",
  });

  const fetchPlanInfo = async (id: number) => {
    try {
      const response = await fetch(`/api/plans/${id}`);
      const result = await response.json();

      if (result.success) {
        const planData = result.data;
        // 폼 데이터 초기화
        reset({
          title: planData.title,
          durationId: planData.duration.id,
          budgetId: planData.budget.id,
          locationId: planData.location.id,
          seasonId: planData.season.id,
          schedule: planData.schedule,
          details: planData.details,
          travelTips: planData.travelTips,
        });

        console.log(planData);
      }
    } catch (error) {
      console.error("여행 정보 조회 실패: ", error);
    }
  };

  // id 값이 로딩될 때까지 대기
  useEffect(() => {
    if (userId) {
      setIsReady(true);
    }
  }, [userId]);

  useEffect(() => {
    if (planId) {
      fetchPlanInfo(Number(planId));
    }
  }, [planId]);

  const onSubmit = async (data: PlanFormData) => {
    setIsLoading(true);

    // id 값이 로딩되지 않은 경우, 실행 취소
    if (!isReady) {
      alert("잠시 후 다시 시도해주세요.");
      return;
    }

    try {
      let mainImageUrl = "";
      const subImageUrls: string[] = [];

      // mainImage 업로드 후 이미지 url 반환
      if (data.mainImage?.[0]) {
        mainImageUrl = await uploadImage(data.mainImage[0], "plan-images");
      }

      // subImages 업로드 후 이미지 url 반환
      if (data.subImages?.length) {
        for (let i = 0; i < data.subImages.length; i++) {
          const url = await uploadImage(data.subImages[i], "plan-images");
          subImageUrls.push(url);
        }
      }

      const planData: CreatePlanDto = {
        title: data.title,
        schedule: data.schedule,
        details: data.details,
        travelTips: data.travelTips,
        durationId: data.durationId,
        locationId: data.locationId,
        budgetId: data.budgetId,
        seasonId: data.seasonId,
        userId: userId!,
      };

      const planResponse = await fetch("/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planData),
      });

      if (!planResponse.ok) {
        throw new Error("여행 계획 생성 실패");
      }

      const planResult = await planResponse.json();

      if (planResult.success && planResult.data.id) {
        const images: AddPlanImgDto[] = [
          { imgUrl: mainImageUrl, isDefault: true, planId: planResult.data.id },
          ...subImageUrls.map((url) => ({
            imgUrl: url,
            isDefault: false,
            planId: planResult.data.id,
          })),
        ];

        const planImageResponse = await fetch("/api/plan-images", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ images }),
        });

        if (!planImageResponse.ok) {
          throw new Error("이미지 정보 저장 실패");
        }

        // 모든 처리가 완료되면 완료 페이지로 이동
        router.push(`/member/plans/complete?id=${planResult.data.id}`);

        // 로딩 상태 false
        setIsLoading(false);
      } else {
        throw new Error("여행 계획 ID를 받지 못했습니다.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  const cancelEditPlan = () => {
    const cancel = confirm("여행 계획 작성을 취소하시겠어요?");
    if (cancel) {
      router.back();
      return;
    }
  };

  return (
    <main className="main-container">
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <LoadingArea />
        </div>
      ) : (
        <>
          <section className={styles["create-header"]}>
            <h1>✍️ 여행 계획 작성</h1>
            <p>나의 여행 계획을 적어 주세요.</p>
          </section>
          <form
            className={styles["create-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset>
              <legend>
                기본 정보
                <p>여행 계획의 기본 정보를 입력해주세요.</p>
              </legend>
              <TextInput
                id="planTitle"
                label="제목"
                placeholder="제목을 입력해주세요."
                register={register("title", {
                  required: "제목을 입력해주세요.",
                  pattern: {
                    value:
                      /^(?=.{4,30}$)[\p{L}\p{N}\p{Script=Hangul}\p{Emoji_Presentation} !@#&()[\]{}:;'",.?/\-_+=*~^%$]+$/u,
                    message:
                      "여행 계획 제목은 최소 4자, 최대 20자까지 작성 가능해요.",
                  },
                })}
                error={errors.title}
              />

              <div className={styles["select-container"]}>
                <Controller
                  name="durationId"
                  control={control}
                  rules={{
                    required: "기간을 선택해주세요",
                    min: { value: 1, message: "기간을 선택해주세요." },
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <SelectBasic
                        option={categoryOptions.duration.map((item) => ({
                          value: item.id,
                          title: item.content,
                        }))}
                        label="기간"
                        placeholder="여행한 기간을 선택해주세요."
                        selectedValue={value}
                        setSelectedValue={onChange}
                      />
                      {error && <InputError target={error} />}
                    </div>
                  )}
                />

                <Controller
                  name="budgetId"
                  control={control}
                  rules={{
                    required: "예산을 선택해주세요",
                    min: { value: 1, message: "예산을 선택해주세요." },
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <SelectBasic
                        option={categoryOptions.budget.map((item) => ({
                          value: item.id,
                          title: item.content,
                        }))}
                        label="예산"
                        placeholder="여행에 사용한 1인당 예산을 선택해주세요."
                        selectedValue={value}
                        setSelectedValue={onChange}
                      />
                      {error && <InputError target={error} />}
                    </div>
                  )}
                />

                <Controller
                  name="locationId"
                  control={control}
                  rules={{
                    required: "지역을 선택해주세요",
                    min: { value: 1, message: "지역을 선택해주세요." },
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <SelectBasic
                        option={categoryOptions.location.map((item) => ({
                          value: item.id,
                          title: item.content,
                        }))}
                        label="지역"
                        placeholder="여행간 지역을 선택해주세요."
                        selectedValue={value}
                        setSelectedValue={onChange}
                      />
                      {error && <InputError target={error} />}
                    </div>
                  )}
                />

                <Controller
                  name="seasonId"
                  control={control}
                  rules={{
                    required: "계절을 선택해주세요",
                    min: { value: 1, message: "계절을 선택해주세요." },
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div>
                      <SelectBasic
                        option={categoryOptions.season.map((item) => ({
                          value: item.id,
                          title: item.content,
                        }))}
                        label="계절"
                        placeholder="여행한 계절을 선택해주세요."
                        selectedValue={value}
                        setSelectedValue={onChange}
                      />
                      {error && <InputError target={error} />}
                    </div>
                  )}
                />
              </div>

              <Controller
                name="mainImage"
                control={control}
                rules={{
                  required: "대표 이미지를 선택해주세요",
                  validate: (value) => {
                    if (!value || value.length === 0) {
                      return "대표 이미지를 선택해주세요";
                    }
                    return true;
                  },
                }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <div>
                    <FileBox
                      name="mainImage"
                      label="대표 이미지"
                      multiple={false}
                      // required={true}
                      onFileSelect={(files) => {
                        onChange(files); // FileList 객체 전달
                      }}
                    />
                    {error && <InputError target={error} />}
                  </div>
                )}
              />

              <Controller
                name="subImages"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <div>
                    <FileBox
                      name="subImage"
                      label="추가 이미지"
                      multiple={true}
                      maxFiles={4}
                      onFileSelect={(files) => {
                        onChange(files); // FileList 객체 전달
                      }}
                    />
                    {error && <InputError target={error} />}
                  </div>
                )}
              />
            </fieldset>

            <fieldset>
              <legend>
                상세 정보
                <p>여행 계획의 상세 정보를 입력해주세요.</p>
              </legend>

              <Controller
                name="schedule"
                control={control}
                rules={{
                  required: "여행 일정을 입력해주세요",
                  validate: (value) => {
                    if (
                      !value ||
                      value.trim() === "<p><br></p>" ||
                      value.trim() === ""
                    ) {
                      return "여행 일정을 입력해주세요";
                    }
                    return true;
                  },
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div>
                    <Editor
                      label="여행 일정"
                      placeholder="여행 일정을 입력해주세요."
                      value={value}
                      onChange={onChange}
                      height={250}
                    />
                    {error && <InputError target={error} />}
                  </div>
                )}
              />

              <Controller
                name="details"
                control={control}
                rules={{
                  required: "여행에 대한 세부 정보를 입력해주세요",
                  validate: (value) => {
                    if (
                      !value ||
                      value.trim() === "<p><br></p>" ||
                      value.trim() === ""
                    ) {
                      return "여행에 대한 세부 정보를 입력해주세요";
                    }
                    return true;
                  },
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div>
                    <Editor
                      label="상세 정보"
                      placeholder="여행에 대한 세부 정보를 입력해주세요."
                      value={value}
                      onChange={onChange}
                      height={250}
                    />
                    {error && <InputError target={error} />}
                  </div>
                )}
              />

              <Controller
                name="travelTips"
                control={control}
                defaultValue=""
                rules={{
                  required: "여행 꿀팁을 입력해주세요",
                  validate: (value) => {
                    if (
                      !value ||
                      value.trim() === "<p><br></p>" ||
                      value.trim() === ""
                    ) {
                      return "여행 꿀팁을 입력해주세요";
                    }
                    return true;
                  },
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div>
                    <Editor
                      label="여행 꿀팁"
                      placeholder="여행하는 동안 생긴 꿀팁을 공유해주세요."
                      value={value}
                      onChange={onChange}
                      height={250}
                    />
                    {error && <InputError target={error} />}
                  </div>
                )}
              />
            </fieldset>
            <div className={styles["action-container"]}>
              <Button
                size="large"
                type="lined"
                label="작성 취소"
                onClick={cancelEditPlan}
              />
              <Button
                size="large"
                type="default"
                label="여행 계획 저장"
                htmlType="submit"
              />
            </div>
          </form>
        </>
      )}
    </main>
  );
};

export default EditPlan;

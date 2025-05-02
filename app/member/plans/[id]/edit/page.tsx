"use client";
import styles from "./edit.module.scss";
import TextInput from "@/components/textInput/TextInput";
import SelectBasic from "@/components/selectBasic/selectBasic";
import Button from "@/components/button/Button";
import FileBox from "@/member/plans/[id]/edit/components/fileBox/FileBox";
import Editor from "@/member/plans/create/components/editor/Editor";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/inputError/InputError";
import { useAuthStore } from "stores/authStore";
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
  const { categoryOptions } = useCategoryStore();
  const { id: userId } = useAuthStore();
  const { id: planId } = useParams();
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);

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
        setData(planData); // 전체 데이터 저장

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
      }
    } catch (error) {
      console.error("여행 정보 조회 실패: ", error);
    }
  };

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

  const onSubmit = async (formData: PlanFormData) => {
    setIsLoading(true);

    if (!isReady || !planId) {
      alert("잠시 후 다시 시도해주세요.");
      return;
    }

    try {
      let mainImageUrl = "";
      const subImageUrls: string[] = [];

      // 새로운 메인 이미지가 업로드된 경우
      if (formData.mainImage?.[0]) {
        mainImageUrl = await uploadImage(formData.mainImage[0], "plan-images");
      }

      // 새로운 추가 이미지가 업로드된 경우
      if (formData.subImages?.length) {
        for (let i = 0; i < formData.subImages.length; i++) {
          const url = await uploadImage(formData.subImages[i], "plan-images");
          subImageUrls.push(url);
        }
      }

      // 수정할 데이터 준비
      const updateData = {
        id: Number(planId),
        title: formData.title,
        schedule: formData.schedule,
        details: formData.details,
        travelTips: formData.travelTips,
        durationId: formData.durationId,
        locationId: formData.locationId,
        budgetId: formData.budgetId,
        seasonId: formData.seasonId,
      };

      // 여행 계획 정보 수정
      const updateResponse = await fetch(`/api/plans/${planId}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!updateResponse.ok) {
        throw new Error("여행 계획 수정 실패");
      }

      // 새로운 이미지가 있는 경우에만 이미지 처리
      if (mainImageUrl || subImageUrls.length > 0) {
        const images: AddPlanImgDto[] = [];

        if (mainImageUrl) {
          images.push({
            imgUrl: mainImageUrl,
            isDefault: true,
            planId: Number(planId),
          });
        }

        images.push(
          ...subImageUrls.map((url) => ({
            imgUrl: url,
            isDefault: false,
            planId: Number(planId),
          }))
        );

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
      }

      // 수정이 완료되면 상세 페이지로 이동
      router.push(`/plans/${planId}`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating plan:", error);
      setIsLoading(false);
      alert("여행 계획 수정에 실패했습니다.");
    }
  };

  const cancelEditPlan = () => {
    const cancel = confirm("여행 계획 수정을 취소하시겠어요?");
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
            <h1>✍️ 여행 계획 수정</h1>
            <p>여행 계획을 수정해주세요.</p>
          </section>
          <form
            className={styles["create-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset>
              <legend>
                기본 정보
                <p>여행 계획의 기본 정보를 수정해주세요.</p>
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
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <div>
                    <FileBox
                      name="mainImage"
                      label="대표 이미지"
                      multiple={false}
                      initialImages={data?.images?.filter(
                        (img) => img.isDefault
                      )}
                      onFileSelect={(files) => {
                        onChange(files);
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
                      initialImages={data?.images?.filter(
                        (img) => !img.isDefault
                      )}
                      onFileSelect={(files) => {
                        onChange(files);
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
                <p>여행 계획의 상세 정보를 수정해주세요.</p>
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
                label="수정 취소"
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

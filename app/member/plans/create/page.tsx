"use client";
import styles from "./create.module.scss";
import TextInput from "@/components/textInput/TextInput";
import SelectBasic from "@/components/selectBasic/selectBasic";
import Button from "@/components/button/Button";
import FileBox from "@/member/plans/create/components/fileBox/FileBox";
import Editor from "@/member/plans/create/components/editor/Editor";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/inputError/InputError";
import { useAuthStore } from "stores/authStore";
import { CreatePlanDto } from "application/usecases/plans/dto/CreatePlanDto";
import { AddPlanImgDto } from "application/usecases/planImg/dto/AddPlanImgDto";
import { useCategoryStore } from "stores/categoryStore";

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

const CreatePlan: React.FC = () => {
  const router = useRouter();

  // category 값을 useCategoryStore 에서 획득
  const { categoryOptions } = useCategoryStore();

  // const userInfo = useAuthStore();
  const userInfo = { userId: "bac71d3e-1ca4-4b9c-9072-da25730a0443" }; // 임시 user UUID

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PlanFormData>({
    defaultValues: {
      title: "",
      schedule: "",
      details: "",
      travelTips: "",
    },
    mode: "onChange",
  });

  // 이미지 업로드 함수 정의
  const uploadImage = async (file: File, bucketName: string) => {
    const formData = new FormData();
    formData.append("bucket", bucketName);
    formData.append("fileName", `${Date.now()}_${file.name}`);
    formData.append("fileContent", file);

    const response = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("이미지 업로드 실패");
    }

    const result = await response.json();
    return result.data.imgUrl;
  };

  const onSubmit = async (data: PlanFormData) => {
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
        userId: userInfo.userId,
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

        // 5. 모든 처리가 완료되면 완료 페이지로 이동
        router.push(`/member/plans/complete?id=${planResult.data.id}`);
      } else {
        throw new Error("여행 계획 ID를 받지 못했습니다.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const cancelCreatePlan = () => {
    const cancel = confirm("여행 계획 작성을 취소하시겠어요?");
    if (cancel) {
      router.back();
      return;
    }
  };

  return (
    <main className="main-container">
      <section className={styles["create-header"]}>
        <h1>✍️ 여행 계획 작성</h1>
        <p>나의 여행 계획을 적어 주세요.</p>
      </section>
      <form className={styles["create-form"]} onSubmit={handleSubmit(onSubmit)}>
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
            render={({ field: { value, onChange }, fieldState: { error } }) => (
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
            render={({ field: { value, onChange }, fieldState: { error } }) => (
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
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <Editor
                  label="여행 꿀팁"
                  placeholder="여행하는 동안 생긴 꿀팁을 공유해주세요."
                  value={value}
                  onChange={onChange}
                  height={250}
                />
                {error && <InputError target={error} />}
              </>
            )}
          />
        </fieldset>
        <div className={styles["action-container"]}>
          <Button
            size="large"
            type="lined"
            label="작성 취소"
            onClick={cancelCreatePlan}
          />
          <Button
            size="large"
            type="default"
            label="여행 계획 저장"
            htmlType="submit"
          />
        </div>
      </form>
    </main>
  );
};

export default CreatePlan;

"use client";

import { Users_gecko } from "@/app/types/users_gecko";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

const ReptileInform = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const { mutate } = useMutation({
    mutationFn: async (data: Users_gecko) => {
      const response = await fetch("/api/reptileInform", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("개체 등록에 실패했습니다.");
      }
      return response.json();
    },
    onError: () => {
      alert("개체 등록에 실패했습니다.");
    },
    onSuccess: () => {
      alert("개체 등록에 성공했습니다.");
      reset(); // 폼 초기화
    },
  });

  const { register, handleSubmit, formState, reset, setValue } =
    useForm<Users_gecko>({
      mode: "onChange",
      defaultValues: {
        name: "",
        birthday: "",
        mother: "",
        father: "",
        morph: "",
        gender: "",
        behavior: "",
        eatInsect: false,
        eating: "",
        mature: false,
        weight: "",
        picture: null,
        vids: null,
      },
    });

  const onSubmit = (data: Users_gecko) => {
    mutate(data);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      setValue("birthday", date.toISOString().split("T")[0]); // ISO 날짜 형식으로 변환
    }
  };

  return (
    <main className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto flex justify-center items-center border rounded-xl w-[330px]">
      <section>
        {" "}
        나의 크레 업로드
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-rows-5 grid-flow-col gap-5 justify-center"
        >
          <div className="pb-1">
            <label htmlFor="name">이름</label>
            <input
              {...register("name", {
                required: "이름은 필수입니다",
              })}
              placeholder="이름을 입력하세요"
              type="text"
              id="name"
              className="border rounded w-full py-2 px-3"
            />
            {formState.errors.name && (
              <span className="text-red-500">
                {formState.errors.name.message}
              </span>
            )}
          </div>
          <div className="pb-1 flex flex-col">
            <label htmlFor="birthday" className="mb-1">
              생일
            </label>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="날짜를 선택하세요"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="pb-1">
            <label htmlFor="father">아빠개체</label>
            <input
              {...register("father")}
              placeholder="이름을 입력하세요"
              type="text"
              id="father"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="pb-1">
            <label htmlFor="mother">엄마개체</label>
            <input
              {...register("mother")}
              placeholder="이름을 입력하세요"
              type="text"
              id="mother"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="pb-1">
            <label htmlFor="morph">모프</label>
            <input
              {...register("morph", {
                required: "모프를 선택하세요",
              })}
              placeholder="모프를 선택하세요"
              type="text"
              id="morph"
              className="border rounded w-full py-2 px-3"
            />
            {formState.errors.morph && (
              <span className="text-red-500">
                {formState.errors.morph.message}
              </span>
            )}
          </div>
          <div className="pb-1">
            <label htmlFor="gender">성별</label>
            <input
              {...register("gender")}
              placeholder="성별을 입력하세요"
              type="text"
              id="gender"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="pb-1">
            <label htmlFor="behavior">버릇</label>
            <input
              {...register("behavior")}
              placeholder="버릇이 있다면 입력하세요"
              type="text"
              id="behavior"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="pb-1">
            <label htmlFor="eatInsect">충식여부</label>
            <input
              {...register("eatInsect")}
              placeholder="충식을 하는지 여부를 선택하세요"
              type="text"
              id="eatInsect"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="pb-1">
            <label htmlFor="eating">선호음식</label>
            <input
              {...register("eating")}
              placeholder="선호 음식을 입력하세요"
              type="text"
              id="eating"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="pb-1">
            <label htmlFor="mature">성 성숙도</label>
            <input
              {...register("mature", {})}
              placeholder="성 성숙도를 알려주세요"
              type="text"
              id="mature"
              className="border rounded w-full py-2 px-3"
            />
            {formState.errors.mature && (
              <span className="text-red-500">
                {formState.errors.mature.message}
              </span>
            )}
          </div>
          <div className="pb-1">
            <label htmlFor="weight">몸무게</label>
            <input
              {...register("weight")}
              placeholder="몸무게를 입력하세요"
              type="text"
              id="weight"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="pb-1">
            <label htmlFor="picture">사진</label>
            <input
              {...register("picture")}
              placeholder="사진을 업로드해주세요"
              type="file"
              id="picture"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="pb-1">
            <label htmlFor="vids">영상</label>
            <input
              {...register("vids")}
              placeholder="영상을 업로드해주세요"
              type="file"
              id="vids"
              className="border rounded w-full py-2 px-3"
            />
          </div>
        </form>{" "}
        <div className="col-span-2 flex justify-center mt-4">
          <button
            type="button" // 기본 타입을 "button"으로 변경
            onClick={() => handleSubmit(onSubmit)()} // handleSubmit 직접 호출
            className="w-full max-w-xs flex items-center justify-center pt-4 pb-4 rounded-lg text-2xl font-black border"
          >
            등록
          </button>
        </div>
      </section>
    </main>
  );
};

export default ReptileInform;

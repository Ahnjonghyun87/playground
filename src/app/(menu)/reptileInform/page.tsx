"use client";

import { Users_gecko } from "@/app/types/users_gecko";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

const ReptileInform = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [eatInsectValue, setEatInsectValue] = useState<boolean | null>(null);
  const [Mature, setMature] = useState<boolean | null>(null);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);

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
        gender: "미구분",
        behavior: [],
        eatInsect: false,
        eating: [],
        mature: false,
        weight: "",
        picture: null,
        vids: null,
      },
    });

  const onSubmit = (data: Users_gecko) => {
    const formattedData = {
      ...data,
      birthday: data.birthday === "" ? null : data.birthday,
    };

    mutate(formattedData);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      setValue("birthday", date.toISOString().split("T")[0]); // ISO 날짜 형식으로 변환
    }
  };

  const handleFoodCheckbox = (food: string) => {
    let updatedFoods = [...selectedFoods];
    if (updatedFoods.includes(food)) {
      updatedFoods = updatedFoods.filter((item) => item !== food);
    } else {
      updatedFoods.push(food);
    }
    setSelectedFoods(updatedFoods);
    setValue("eating", updatedFoods); // 'eating' 필드에 선택된 음식 반영
  };

  const handleNBehaviorCheckbox = (Habits: string) => {
    let updatedHabits = [...selectedHabits];
    if (updatedHabits.includes(Habits)) {
      updatedHabits = updatedHabits.filter((item) => item !== Habits);
    } else {
      updatedHabits.push(Habits);
    }

    setSelectedHabits(updatedHabits);
    setValue("behavior", updatedHabits);
  };

  return (
    <main className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto flex justify-center items-center border rounded-xl w-[330px]">
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
              {...register("morph")}
              placeholder="모프를 선택하세요"
              type="text"
              id="morph"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="pb-1">
            <label htmlFor="gender">성별</label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center cursor-pointer">
                <input
                  {...register("gender")}
                  value="미구분"
                  type="radio"
                  id="gender-unselected"
                  className="hidden peer"
                />
                <span className="w-5 h-5 border border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></span>
                <span className="ml-2">미구분</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  {...register("gender")}
                  value="수컷"
                  type="radio"
                  id="gender-male"
                  className="hidden peer"
                />
                <span className="w-5 h-5 border border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></span>
                <span className="ml-2">수컷</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  {...register("gender")}
                  value="암컷"
                  type="radio"
                  id="gender-female"
                  className="hidden peer"
                />
                <span className="w-5 h-5 border border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></span>
                <span className="ml-2">암컷</span>
              </label>
            </div>
          </div>

          <div className="pb-1">
            <label htmlFor="behavior">버릇</label>
            <div className="flex flex-row mt-2 gap-4">
              {[
                "소심함",
                "호기심많음",
                "우다다다",
                "숨기 좋아함",
                "과식",
                "소식",
                "충식고집",
              ].map((Habits) => (
                <label
                  key={Habits}
                  className={`flex items-center justify-center border rounded-lg px-4 py-2 cursor-pointer text-center ${
                    selectedHabits.includes(Habits)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  } transition-all duration-200`}
                >
                  <input
                    type="checkbox"
                    value={Habits}
                    checked={selectedHabits.includes(Habits)}
                    onChange={() => handleNBehaviorCheckbox(Habits)}
                    className="hidden"
                  />
                  {Habits}
                </label>
              ))}
            </div>
          </div>
          <div className="pb-1">
            <label htmlFor="eatInsect">충식여부</label>

            <div className="flex gap-6 mt-2">
              <label className="flex items-center cursor-pointer">
                <input
                  {...register("eatInsect")}
                  value="예"
                  type="radio"
                  id="eatInsect-true"
                  onChange={() => {
                    setValue("eatInsect", true);
                    setEatInsectValue(true);
                  }}
                  checked={eatInsectValue === true}
                  className="hidden peer"
                />
                <span className="w-5 h-5 border border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></span>
                <span className="ml-2">예</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  {...register("eatInsect")}
                  value="아니오"
                  type="radio"
                  id="eatInsect-false"
                  onChange={() => {
                    setValue("eatInsect", false);
                    setEatInsectValue(false);
                  }}
                  checked={eatInsectValue === false}
                  className="hidden peer"
                />
                <span className="w-5 h-5 border border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></span>
                <span className="ml-2">아니오</span>
              </label>
            </div>
          </div>
          <div className="pb-1">
            <label htmlFor="eating">선호음식</label>
            <div className="flex flex-row mt-2 gap-4">
              {["밀웜", "귀뚜라미", "인섹트계 슈퍼푸드", "과일계 슈퍼푸드"].map(
                (food) => (
                  <label
                    key={food}
                    className={`flex items-center justify-center border rounded-lg px-4 py-2 cursor-pointer text-center ${
                      selectedFoods.includes(food)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    } transition-all duration-200`}
                  >
                    <input
                      type="checkbox"
                      value={food}
                      checked={selectedFoods.includes(food)}
                      onChange={() => handleFoodCheckbox(food)}
                      className="hidden"
                    />
                    {food}
                  </label>
                )
              )}
            </div>
          </div>
          <div className="pb-1">
            <label htmlFor="mature">성 성숙도</label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center cursor-pointer">
                <input
                  {...register("mature")}
                  value="예"
                  type="radio"
                  id="mature-true"
                  onChange={() => {
                    setValue("mature", true);
                    setMature(true);
                  }}
                  checked={Mature === true}
                  className="hidden peer"
                />
                <span className="w-5 h-5 border border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></span>
                <span className="ml-2">예</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  {...register("mature")}
                  value="아니오"
                  type="radio"
                  id="mature-false"
                  onChange={() => {
                    setValue("mature", false);
                    setMature(false);
                  }}
                  checked={Mature === false}
                  className="hidden peer"
                />
                <span className="w-5 h-5 border border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:border-transparent transition-all"></span>
                <span className="ml-2">아니오</span>
              </label>
            </div>
          </div>
          <div className="pb-1">
            <label htmlFor="weight">몸무게</label>
            <input
              {...register("weight")}
              placeholder="몸무게를 입력하세요 (단위:그램)"
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

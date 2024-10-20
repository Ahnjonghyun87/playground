import { useForm } from "react-hook-form";

interface AddNewReptile {
  name: string;
  birthday: string;
}

const ReptileInform = () => {
  const { register, handleSubmit, formState } = useForm<AddNewReptile>({
    mode: "onChange",
    defaultValues: {
      name: "",
      birthday: "",
    },
  });
  const onSubmit = () => {};
  return (
    <main className="fixed top-[100px] w-auto h-auto">
      <section>
        <form onSubmit={handleSubmit(onSubmit)} className="grid justify-center">
          <div>사진업로드</div>
          <div>
            <label htmlFor="이름">이름</label>
            <input
              {...register("name", {
                required: "이름은 필수입니다",
              })}
              placeholder="이름을 입력하세요"
              type="name"
            ></input>
            {formState.errors.name && (
              <span className="text-red-500">
                {formState.errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="생일">생일</label>
            <input
              {...register("birthday", {
                required: "날짜를 입력하세요",
              })}
              placeholder="날짜를 선택하세요"
              type="birthday"
            ></input>
            {formState.errors.birthday && (
              <span className="text-red-500">
                {formState.errors.birthday.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center pt-4 border rounded-xl pb-4 text-2xl font-black"
          >
            등록
          </button>
        </form>
      </section>
    </main>
  );
};

export default ReptileInform;

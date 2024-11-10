import { Users_gecko } from "@/app/types/users_gecko";
import { createClient } from "@/app/utils/supabase/client";

import { useQuery } from "@tanstack/react-query";

const supabase = createClient();
const ManageReptile = () => {
  const { data, isPending, error } = useQuery<
    Users_gecko[],
    Error,
    Users_gecko
  >({
    queryKey: ["users_gecko", []],
    queryFn: async () => {
      const { data, error } = await supabase.from("users_gecko").select("*");

      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });

  if (isPending) {
    return <div>불러오는중...</div>;
  }

  if (error) {
    return <h1>댓글 목록에서 에러가 발생했습니다: {error.message}</h1>;
  }

  return (
    <div>
      ManageReptile
      {data && (
        <div>
          {Array.isArray(data) ? (
            data.map((item, index) => (
              <div key={index}>{JSON.stringify(item)}</div> // 실제 데이터 필드를 사용할 수 있습니다.
            ))
          ) : (
            <div>데이터가 배열 형태가 아닙니다</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageReptile;

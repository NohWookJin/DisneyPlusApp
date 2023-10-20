import { RefObject, useEffect } from "react";

type Handler = () => void;

// ref: 클릭하는 영역이 안인지 밖인지 구분하기 위해, handler: 바깥 클릭시 모달 닫히도록 하기 위해
export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: Handler,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // ref를 아직 안찍었거나 모달창 내부를 클릭했을 경우
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      // 외부를 클릭했을 경우
      handler();
    };

    // mousedown(pc): 사용자가 해당 element에서 마우스 버튼을 눌렀을 때 발생
    // touchstart(mobile) : 사용자가 해당 element를 터치했을때 발생
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

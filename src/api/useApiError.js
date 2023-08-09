import { useCallback } from "react";

const handle400 = () => {
  alert("모든 정보를 입력해 주세요.");
};

const handle401 = () => {
  alert("401에러");
};

const handle404 = () => {
  alert("요청에 대한 정보가 없습니다.");
};

const handle403 = () => {
  alert("권한이 없습니다.");
};

const handle500 = () => {
  alert("서버 오류 발생");
};

const handleDefault = () => {
  alert("기타 오류 발생");
};

export const useApiError = (handlers, errorhandling) => {
  const handleError = useCallback(
    (error) => {
      const defaultHandlers = {
        400: {
          default: handle400,
        },
        401: {
          ExpiredJwtException: errorhandling.handleExpiredToken,
          default: errorhandling.handleRelogin,
        },
        403: {
          FORBIDDEN_ADMIN: errorhandling.handleNotAdminError,
          default: handle403,
        },
        404: {
          default: handle404,
        },
        500: {
          default: handle500,
        },
        default: handleDefault,
      };

      const httpStatus = error.response.status;
      const errorData = error.response.data;
      let errorCode;
      let errorMessage;

      if (errorData.errors === undefined) {
        errorCode = error.response.data.errorType;
        errorMessage = error.response.data.errorMessage;
      } else {
        errorCode = error.response.data.errors[0].errorType;
        errorMessage = error.response.data.errors[0].errorMessage;
      }

      switch (true) {
        case handlers && !!handlers[httpStatus]?.[errorCode]?.[errorMessage]:
          handlers[httpStatus][errorCode][errorMessage]();
          break;

        case handlers && !!handlers[httpStatus]?.[errorCode]:
          handlers[httpStatus][errorCode](error);
          break;

        case handlers && !!handlers[httpStatus]:
          handlers[httpStatus].default(error);
          break;

        case !!defaultHandlers[httpStatus][errorCode]:
          defaultHandlers[httpStatus][errorCode]();
          break;

        case !!defaultHandlers[httpStatus]:
          defaultHandlers[httpStatus].default();
          break;

        default:
          defaultHandlers.default();
      }
    },
    [handlers, errorhandling]
  );

  return { handleError };
};

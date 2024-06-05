import { useSearchParams } from "react-router-dom";

function useUrlParams() {
  const [params] = useSearchParams();
  let paramLat = params.get("lat");
  let paramLng = params.get("lng");
  return [paramLat, paramLng];
}

export {useUrlParams}
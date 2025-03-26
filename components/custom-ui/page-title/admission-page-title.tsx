import { useTopHeaderContext } from "../admission-top-header/admission-header-context";

export default function AdmissionPageTitle() {
  const { headerActiveItem } = useTopHeaderContext();

  return (
    <div className="my-4 font-[700]  text-3xl text-[#4E4E4E]">{headerActiveItem}</div>
  );
}

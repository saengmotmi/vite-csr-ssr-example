import { useRouter } from "../libs/Router";

const Root = () => {
  const { push } = useRouter();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>root</h2>
      <button onClick={() => push("/about")}>about</button>
    </div>
  );
};

export default Root;

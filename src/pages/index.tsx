import { useRouter } from "../libs/Router";

const Root = (props: any) => {
  const { push } = useRouter();
  console.log({ props });

  return (
    <div style={{ textAlign: "center" }}>
      <h2>root</h2>
      <button onClick={() => push("/about")}>about</button>
    </div>
  );
};

export default Root;

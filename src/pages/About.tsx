import { useRouter } from "../libs/Router";

const About = (props: any) => {
  const { push } = useRouter();
  console.log({ props });

  return (
    <div style={{ textAlign: "center" }}>
      <h2>about</h2>
      <button
        onClick={() => {
          console.log("hi");
          push("/");
        }}
      >
        go main
      </button>
    </div>
  );
};

export default About;

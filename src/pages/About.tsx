import { Suspense } from "react";
import { useRouter } from "../libs/Router";
import { useData } from "../utils/render";

const About = (props: any) => {
  const { push } = useRouter();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>about</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Comments />
      </Suspense>
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

About.getInitialProps = async (data: any) => {
  data.hi = "ssr data";
  return data;
};

const Comments = () => {
  const comments = useData();
  console.log({ comments });

  return (
    <>
      {comments.map((comment: any) => (
        <div key={comment}>{comment}</div>
      ))}
    </>
  );
};

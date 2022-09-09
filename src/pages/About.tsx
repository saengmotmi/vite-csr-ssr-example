import { useRouter } from "../Router";

const About = () => {
  const { push } = useRouter();

  return (
    <div>
      about
      <button
        onClick={() => {
          push("/");
        }}
      >
        go main
      </button>
    </div>
  );
};

export default About;
